# SailsSocket

In most cases, you only need to connect a single socket from your client-side application.  By default in Sails applications, the `sails.io.js` client library automatically connects a socket (`io.socket`).  This is the recommended choice for 99% of apps.

However, for certain advanced use cases, it can be helpful to connect additional sockets from the same instance of the socket client (e.g. browser tab).  For this reason, Sails exposes the `SailsSocket` class.


### Overview

The `sails.io.js` library works by wrapping low-level [Socket.io](http://socket.io) clients in instances of the `SailsSocket` class.  This class provides higher-level methods like [`.get()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-get) and [`.post()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-post) to your sockets, allowing you to communicate with your Sails app in a familiar way.


### Creating a SailsSocket instance

Any web page which loads the `sails.io.js` will create a new SailsSocket instance on page load unless [`io.sails.autoconnect`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails#?autoconnect) is set to `false`.  This instance is then available as the global variable [`io.socket`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket).

Additional SailsSocket instances can be created via calls to [`io.sails.connect`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails#?the-connect-method):

```
var newSailsSocket = io.sails.connect();
```


<docmeta name="displayName" value="SailsSocket">
