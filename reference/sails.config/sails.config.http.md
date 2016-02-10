# sails.config.http

Configuration for your app's underlying HTTP server.  These properties are conventionally specified in the [`config/http.js`](http://sailsjs.org/documentation/anatomy/myApp/config/http.js.html) configuration file.


### Properties

  Property          | Type       | Default   | Details
:------------------ |:----------:|:--------- |:-------
 `middleware`       | ((dictionary)) | See [conventional defaults for HTTP middleware](http://sailsjs.org/documentation/concepts/Middleware?q=conventional-defaults) | A dictionary of all HTTP middleware functions your app will run on every incoming HTTP request.<br/>[Example](https://gist.github.com/mikermcneil/9cbd68c95839da480e97)
 `middleware.order` | ((array))  | See [conventional defaults for HTTP middleware order](https://github.com/balderdashy/sails/blob/master/lib/hooks/http/index.js#l51-66) | An array of middleware names (strings) indicating the order in which middleware should be run for all incoming HTTP requests.
 `cache`            | ((number)) | `cache: 31557600000` _(1 year)_ | The number of milliseconds to cache static assets when your app is running in a ['production' environment](http://sailsjs.org/documentation/reference/configuration/sails-config#?sailsconfigenvironment).<br/>These are any flat files like images, scripts, stylesheets, etc. that are served by Express' static middleware (by default,  these files are served from `.tmp/public`, a hidden folder compiled by Grunt).
 `serverOptions`    | ((dictionary)) | `{}`      | _SSL only_: options to send directly to the [Node `https` module](https://nodejs.org/dist/latest-v4.x/docs/api/https.html) when creating the server.  These will be merged with your [SSL settings](http://sailsjs.org/documentation/reference/configuration/sails-config#?sailsconfigssl), if any.  See the [createServer docs](https://nodejs.org/dist/latest-v4.x/docs/api/https.html#https_https_createserver_options_requestlistener) for more info.


### Compatibility

Most middleware compatible with [Express](https://github.com/expressjs/), [Connect](https://github.com/senchalabs/connect), [Kraken](http://krakenjs.com/), [Loopback](https://github.com/strongloop/loopback), or [Pillar](https://pillarjs.github.io/) can also be used in a Sails app.

### Notes

> + Note that this HTTP middleware stack configured in `sails.config.http.middleware` is only applied to true HTTP requests-- it is ignored when handling virtual requests (e.g. sockets)
> + The middleware named `router` is what handles all of your app's explicit routes (i.e. `sails.config.routes`) as well as shadow routes that are injected for blueprints, policies, etc.
> + You cannot define a custom middleware function with the key `order` (since `sails.config.http.middleware.order` has special meaning)



<docmeta name="displayName" value="sails.config.http">
<docmeta name="pageType" value="property">
