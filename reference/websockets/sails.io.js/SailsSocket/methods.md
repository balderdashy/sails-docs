# SailsSocket Methods

This section describes the methods available on each SailsSocket instance.  Most of these methods can be called even before the socket connects to the server.  In the case of request methods like `.get()` and `.request()`, calls will be queued up until the socket connects, at which time they will be replayed in order.

### Basic methods

The most common methods you will use with a SailsSocket instance are documented in the main Socket Client reference section.  These include [`.get()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-get), [`.put()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-put), [`.post()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-post), [`.delete()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-delete), [`.request()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-request), [`.on()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-on) and [`.off()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-off).

### Advanced methods

In addition to the basic communication / event listening methods, each SailsSocket instance (including `io.socket`) exposes some additional methods for dealing with server connections.

##### .isConnected()

Determines whether the SailsSocket instance is currently connected to a server, returning `true` if a connection has been established.

```js
io.socket.isConnected();
```

##### .disconnect()

Disconnect a SailsSocket instance from the server.  Will throw an error if the socket is already disconnected.

```js
io.socket.disconnect();
```

##### .reconnect()

Reconnect a SailsSocket instance to a server after being disconnected (either involuntarily or via a call to [`.disconnect()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/sails-socket/methods#?disconnect)).  The instance will connect using its currently configured [properties](http://sailsjs.org/documentation/reference/web-sockets/socket-client/sails-socket/properties).  Throws an error if the socket is already connected to a server.

```js
io.socket.reconnect();
```

> While an instance is in a disconnected state, all of its properties may be changed.  This allows you to disconnect an instance from one server and reconnect it to another without losing its event bindings or queued requests.


##### .removeAllListeners()

Stop listening for all server-related events on a SailsSocket instance.  Note that this includes `connect` and `disconnect` events!

```js
io.socket.removeAllListeners();
```



<docmeta name="displayName" value="Methods">

