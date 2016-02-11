# Socket Client (`sails.io.js`)

> This section of the docs is about the Sails socket client SDK for the browser.  It is written in JavaScript and is also usable on the server.
>
> There are also a handful of community projects implementing Sails/Socket.io clients for native iOS, Android, and Windows Phone.


### Overview

The Sails socket client ([`sails.io.js`](https://github.com/balderdashy/sails.io.js)) is a tiny browser library that is bundled by default in new Sails apps.  It is a lightweight wrapper that sits on top of the Socket.IO client whose purpose is to make sending and receiving messages from your Sails backend as simple as possible.

The main responsibility of `sails.io.js` is to provide a familiar ajax-like interface for communicating with your Sails app using WebSockets/Socket.io.  That basically means providing `.get()`, `.post()`, `.put()`, and `.delete()` methods that let you take advantage of realtime features while still reusing the same backend routes you're using for the rest of your app.  In other words, running `io.socket.post('/user')` in your browser will be routed within your Sails app exactly the same as an HTTP POST request to the same route.


### Basic usage (browser)

In the browser, all that is required to use `sails.io.js` is to include the library in a `<SCRIPT>` tag.  Sails adds the library to the `assets/js/dependencies` folder of all new apps, so you can do:

```html
<!--
  This will import the sails.io.js library bundled in your Sails app by default.
  The bundled version embeds minified code for the Socket.io client as well.
  One tick of the event loop after importing this script, a new "eager" socket
  will automatically be created begin connecting unless you configure it not to.
-->
<script type"text/javascript" src="/js/dependencies/sails.io.js"></script>
```

and then use `io.socket` as a global variable in subsequent inline or external scripts.  For detailed instructions and examples of everyday usage, see [`io.socket`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket).




### Basic usage (Node.js)

To use the Sails socket client SDK in a Node.js script, you will need to install and require both the `sails.io.js` and `socket.io-client` libraries:

```javascript
// Initialize the sails.io.js library with the socket.io-client module,
// which will automatically create and connect a new socket as io.socket
// unless you configure it not to.
var io = require('sails.io.js')( require('socket.io-client') );
```

See the [sails.io.js GitHub repo](http://github.com/balderdashy/sails.io.js) for more information on using the Sails socket client from Node.js.


### Configuring the `sails.io.js` library

> This section focuses on the most common runtime environment for the JavaScript socket client: the browser.  See the [`sails.io.js` GitHub repository](github.com/balderdashy/sails.io.js) for help configuring the socket client for use in a Node.js script.

There are two ways to configure Sails' socket client in the browser: using HTML attributes on the `<script>` tag or by programmatically modifying the `io.sails` object.

##### Basic configuration using HTML attributes

The easiest way to configure the four most common settings for the socket client (`autoConnect`, `environment`, `headers`, and `url`) is by sticking one or more HTML attributes on the script tag:

```html
<script src="/js/dependencies/sails.io.js"
  autoConnect="false"
  environment="production"
  headers='{ "x-csrf-token": "<%= typeof _csrf === 'undefined' ? _csrf : '' %>" }'
></script>
```

This example will disable the eager socket connection, force the client environment to "production" (which disables logs), and set an `x-csrf-token` header that will be sent in every socket request (unless overridden).  Note that comoposite values like the `headers` dictionary are wrapped in a pair of _single-quotes_.  That's because composite values specified this way must be _JSON-encoded_-- meaning they must use double-quotes around string values _and_ around key names. 

> **Note:**
> Any configuration which may be provided as an HTML attribute may alternately be provided prefixed with `data-` (e.g. `data-autoConnect`, `data-environment`, `data-headers`, `data-url`).  This is for folks who need to support browsers that have issues with nonstandard HTML attributes (or if the idea of using nonstandard HTML attributes just creeps you out). If both the standard HTML attribute and the `data-` prefixed HTML attribute are provided, the latter takes precendence.


##### Programmatic configuration using `io.sails`

As of Sails v0.12.x, only the most basic configuration options may be set using HTML attributes.  If you want to configure any of the other options not mentioned above, you will need to interact with `io.sails` programmatically.  Fortunately, the approach described above is really just a convenient shortcut for doing just that!  Heres how it works:

When you load it on the page in a `<script>` tag, the `sails.io.js` library waits for one cycle of the event loop before _automatically connecting_ a socket (if `io.sails.autoConnect` is enabled; [see below](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails#?autoconnect)).  This is to allow any properties that you specify on `io.sails` to be set before the socket begins connecting.  However, in order to ensure that the `io.sails` properties are read before connection, you should put the code setting those properties immediately after the `<script>` tag that includes `sails.io.js`:

```html
<script src="/js/dependencies/sails.io.js"></script>
<script type="text/javascript">
  io.sails.url = 'https://myapp.com';
</script>
<!-- ...other scripts... -->
```

Normally, the socket client always connects to the server where the script is being served.  The example above will cause the eager (auto-connecting) socket to attempt a (cross-domain) socket connection to the Sails server running at `https://myapp.com` instead.




### Advanced usage

You can also create and connect client sockets manually using [`io.sails.connect`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails#?the-connect-method).  This returns an instance of the `SailsSocket`. For more information about rarer / more advanced use cases such as connecting multiple sockets, see [SailsSocket](http://sailsjs.org/documentation/reference/web-sockets/socket-client/sails-socket).

##### Advanced configuration

The `sails.io.js` library and its individual client sockets have a handful of configuration options.  Global configuration lives in [`io.sails`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails).  This includes the ability to disable the "eager" socket and default settings for new sockets.  Individual sockets can also be configured when they are manually connected-- see [`io.sails.connect()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails#?the-connect-method) for more information on that.


<!--

  TODO: add a bit more of a technical description in here at some point

Under the covers, sails.io.js emits Socket.io messages with reserved names that, when interpreted by Sails, are routed to the appropriate policies/controllers/etc. according to your app's routes and blueprint configuration.
-->




### Frequently asked questions

##### Can I use this with XYZ front-end framework?

Yes.  The Sails socket client can be used to great effect with any front-end framework-- no matter whether it's angular, react, ember, backbone, knockout, jQuery, [FishBerry](http://mrsharpoblunto.github.io/foswig.js/), etc.


##### Do I have to use this?

No. The Sails socket client is extremely helpful when building realtime/chat features in a browser-based UI, but like the rest of the `assets/` directory, it is probably not particularly useful if you are building a [native Android app](http://stackoverflow.com/questions/25081188/sending-socket-request-from-client-ios-android-to-sails-js-server/25081189#25081189), or an API with no user interface at all.

Fortunately, like every other boilerplate file and folder in Sails, the socket client is completely optional. To remove it, just delete `assets/js/dependencies/sails.io.js`.



<docmeta name="displayName" value="Socket Client">

