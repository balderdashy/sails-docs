# SailsSocket

### Overview

The `sails.io.js` library works by wrapping low-level [Socket.io](http://socket.io) clients in instances of the `SailsSocket` class.  This class provides [higher-level methods](http://sailsjs.org/documentation/reference/websockets/sails.io.js/SailsSocket/methods) like `.get()` and `.post()` to your sockets, allowing you to communicate with your Sails app in a familiar way.

### Creating a SailsSocket instance

Any web page which loads the `sails.io.js` will create a new SailsSocket instance on page load unless [`io.sails.autoconnect`]() is set to `false`.  This instance is then available as the global variable `io.socket`.

Additional SailsSocket instances can be created via calls to [`io.sails.connect`]().

