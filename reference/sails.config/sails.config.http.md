# sails.config.http

Configuration for your app's underlying HTTP server.  These properties are conventionally specified in the [`config/http.js`](http://sailsjs.org/documentation/anatomy/myApp/config/http.js.html) configuration file.


### Properties

  Property          | Type       | Default   | Details
:------------------ |:----------:| --------- |:-------
 `middleware`       | ((dictionary)) | See [conventional defaults for HTTP middleware](http://sailsjs.org/documentation/concepts/Middleware?q=conventional-defaults) | A dictionary of all HTTP middleware functions your app will run on every incoming HTTP request.<br/>[Example](https://gist.github.com/mikermcneil/9cbd68c95839da480e97)
 `middleware.order` | ((array))  | See [conventional defaults for HTTP middleware order](https://github.com/balderdashy/sails/blob/master/lib/hooks/http/index.js#l51-66) | An array of middleware names (strings) indicating the order in which middleware should be run for all incoming HTTP requests.
 `cache`            | ((number)) | `cache: 31557600000` _(1 year)_ | The number of milliseconds to cache static assets when your app is running in a ['production' environment](http://sailsjs.org/documentation/reference/configuration/sails-config#?sailsconfigenvironment).<br/>These are any flat files like images, scripts, stylesheets, etc. that are served by Express' static middleware (by default,  these files are served from `.tmp/public`, a hidden folder compiled by Grunt).
 `serverOptions`    | ((dictionary)) | `{}`      | _SSL only_: options to send directly to the [Node `https` module](https://nodejs.org/dist/latest-v4.x/docs/api/https.html) when creating the server.  These will be merged with your [SSL settings](http://sailsjs.org/documentation/reference/configuration/sails-config#?sailsconfigssl), if any.  See the [createServer docs](https://nodejs.org/dist/latest-v4.x/docs/api/https.html#https_https_createserver_options_requestlistener) for more info.


### Configuring Skipper

To customize Skipper, the default body parser and file uploader, you can uncomment the direct call to `require('skipper')`:

```javascript

```

Then pass in any of the following options from the table below.

  Property                               | Type        | Default   | Details
:--------------------------------------- |:-----------:|:--------- |:-------
 `maxWaitTimeBeforePassingControlToApp`  | ((number))  | `500`     | The maximum number of miliseconds to wait when processing an incoming multipart request before passing control to your app's policies and controllers.  If this number of miliseconds goes by, and no incoming file uploads have arrived yet, and the request hasn't finished sending other data like text parameters (i.e. the form emits "close"), then control will be passed without further delay.  For apps running behind particular combinations of load balancers, proxies, and/or SSL, it may be necessary to increase this delay (see https://github.com/balderdashy/skipper/issues/71#issuecomment-217556631).
 `maxTimeToWaitForFirstFile`             | ((number))  | `10000`   | The maximum number of miliseconds to wait for the first file upload to arrive in any given upstream before triggering `.upload()`'s callback.  If the first file upload on a given upstream does not arrive before this number of miliseconds have elapsed, then an `ETIMEOUT` error will fire.
 `maxBufferTime`                         | ((number))  | `4500`    | The maximum number of miliseconds to wait for any given live [upstream](https://github.com/balderdashy/skipper#what-are-upstreams) to be plugged in to a receiver after it begins receiving an incoming file upload.  Skipper pauses upstreams to allow custom code in your app's policies and controller actions to run (e.g. doing database lookups) before you "plug in" the incoming file uploads (e.g. `req.file('avatar').upload(...)`) into your desired upload target (local disk, S3, gridfs, etc).  Incoming bytes are managed using [a combination of buffering and TCP backpressure](https://howtonode.org/streams-explained) built in to Node.js streams.  The max buffer time is a configurable layer of defense to protect against denial of service attacks that attempt to flood servers with pending file uploads.  If the timeout is exceeded, an EMAXBUFFER error will fire.  The best defense against these types of attacks is to plug incoming file uploads into receivers as early as possible at the top of your controller actions.
 `strict`           | ((boolean)) | `true`    | When enabled, only arrays and dictionaries (i.e. JavaScript objects) will be interpeted and parsed as JSON when sent in the HTTP request body.  Other values (including `null`, `true`, `false`, numbers, and double-quote-wrapped strings) which are technically JSON compatible, but uncommon in practice, are not interpreted as JSON.  Enabled by default.
 `extended`         | ((boolean)) | `true`    | Whether or not to understand multiple text parameters in square bracket notation in the URL-encoded request body (e.g. `courseId[]=ARY%20301&courseId[]=PSY%20420`) encoded  the HTTP body as an array (e.g. `courseId: ['ARY 301', 'PSY 420'], ...`).  Enabled by default.  See https://github.com/expressjs/body-parser#extended for more details.
 

> Note that for performance tuning and other advanced configuration, the options you pass in to Skipper this way are also passed through to the underlying Express body parser.  See the [body-parser repo](https://github.com/expressjs/body-parser) for a full list of options.


### Compatibility

Most middleware compatible with [Express](https://github.com/expressjs/), [Connect](https://github.com/senchalabs/connect), [Kraken](http://krakenjs.com/), [Loopback](https://github.com/strongloop/loopback), or [Pillar](https://pillarjs.github.io/) can also be used in a Sails app.

### Notes

> + Note that this HTTP middleware stack configured in `sails.config.http.middleware` is only applied to true HTTP requests-- it is ignored when handling virtual requests (e.g. sockets)
> + The middleware named `router` is what handles all of your app's explicit routes (i.e. `sails.config.routes`) as well as shadow routes that are injected for blueprints, policies, etc.
> + You cannot define a custom middleware function with the key `order` (since `sails.config.http.middleware.order` has special meaning)



<docmeta name="displayName" value="sails.config.http">
<docmeta name="pageType" value="property">
