# sails.config.sockets
### What is this?
These configuration options are for the WebSocket/pubsub server encapsulated by Sails (implemented by the [`sockets` hook](https://github.com/balderdashy/sails-hook-sockets) and built on top of [Socket.io](http://socket.io).)

### Commonly-Used Options

  Property      | Type       | Default  | Details |
 ---------------|------------|----------|---------|
 `adapter`      |((string))  |`'memory'`| The socket.io adapter to use for message routing and delivery.  Can be set to either `'memory'` or `'redis'`
 `grant3rdPartyCookie`|((boolean))  | `true`     | Whether to expose the implicit, CORS-enabled `get /__getcookie` "shadow route" that sets the "sails.sid" as a 3rd party cookie (this is used by the sails.io.js socket client when you attempt a cross-origin socket connection, or if you're using client library as an npm install-ed depenency in a Node.js socket client).  This enables the use of sessions in virtual requests made from the sails.io.js socket client.
 `afterDisconnect` |((function))| `undefined`  | A function to run every time a new client-side socket disconnects from the server (e.g. a user closes a browser tab or closes your mobile app).  Accepts three arguments, and must trigger the provided callback:  `afterDisconnect: function (session, socket, cb){  return cb(); }`  Note that the provided `socket` can **no longer be used** since it is already disconnected (it is merely made available for convenience in case you need the socket id).


### Redis Configuration

These configuration options are only relevant if you are using Redis to manage your socket connections (i.e. [socket.io adapter](https://github.com/automattic/socket.io-redis) / socket store adapter / socket MQ adapter).  In other words, only worry about the settings in this section if you've also set `adapter: 'redis'` in your sockets configuration.

  Property      | Type       | Default  | Details |
 ---------------|------------|----------|---------|
 `host`         |((string))  |`'127.0.0.1'` | Hostname of your redis instance (only applicable if using the redis socket store adapter)
 `port`         |((integer)) |`6379`   | Port of your redis instance (only applicable if using the redis socket store adapter)
 `db`           |((string))  |`'sails'`   | The name of the database to use within your redis instance (only applicable if using the redis socket store adapter)
 `pass`         | ((string)) | ((undefined)) | The password for your redis instance (only applicable if using the redis socket store adapter)


### Advanced Configuration

These configuration options are primarily useful for performance tuning.  In addition to control granted from Sails core itself, these settings provide low-level access to the underlying Engine.io/Socket.io server for complete customizability.

| Property   | Type      | Default  | Details |
|------------|-----------|----------|---------|
|`sendResponseHeaders`|((boolean))  | `true`     | Whether to include response headers in the JWR (JSON WebSocket Response) originated for each socket request (e.g. `io.socket.get()` in the browser) This doesn't affect direct socket.io usage-- only if you're communicating with Sails via the request interpreter (e.g. making normal calls with the sails.io.js browser SDK).  This can be useful for squeezing out more performance when tuning high-traffic apps, since it reduces total bandwidth usage.  However, since Sails v0.10, response headers are trimmed whenever possible, so this option should almost never need to be used, even in extremely high-scale applications. |
|`beforeConnect`|((boolean)), ((function)) | `undefined` | A function to run every time a new client-side socket attempts to connect to the server which can be used to reject or allow the incoming connection.  Useful for tweaking your production environment to prevent [DoS]((http://sailsjs.org/#/documentation/concepts/Security/DDOS.html) attacks, or reject socket.io connections based on business-specific heuristics (e.g. if stooges from a competing business create bots to post spam links about their commercial product in your public, open-source chat room)  (In Sails v0.9 and v0.10, this was called `authorization`-- it has changed due to the upgrade to socket.io v1)  To define your own custom logic, specify a function like: `beforeConnect: function (handshake, cb) { /* pass back true to allow, false to deny */ return cb(null, true); }`  As of Sails v0.11, Sails no longer blocks incoming socket connections without cookies-- instead, cookies (and by corollary- sessions) are granted automatically.  If a requesting socket.io client cannot receive a cookie (i.e. making a cross-origin socket.io connection) the `sails.io.js` socket client will automatically send a CORS+JSONP request to try and obtain one **BEFORE CONNECTING** (refer to the `grant3rdPartyCookie` option above for details).  In the antagonistic scenario where even this fails, Sails will still grant a new cookie upon connection, which allows for a one-time session.`|
| `pingTimeout` | ((number)) | `60000` | This is a raw configuration option exposed from Engine.io.  It reflects how many ms without a pong packet to wait before considering a socket.io connection closed |
| `pingInterval` | ((number)) | `25000` | This is a raw configuration option exposed from Engine.io.  It reflects the number of miliseconds to wait between "ping packets" (i.e. this is what "heartbeats" has become, more or less)  |
| `maxBufferSize` | ((number)) | `10E7` | This is a raw configuration option exposed from Engine.io.  It reflects the maximum number of bytes or characters in a message when polling before automatically closing the socket (to avoid [DoS](http://sailsjs.org/#/documentation/concepts/Security/DDOS.html)). |
|`transports`|((array))  | `['polling', 'websocket']`     | An array of allowed transport methods which the clients will try to use. |
| `allowUpgrades` | ((boolean)) | `true` | This is a raw configuration option exposed from Engine.io.  It indicates whether to allow Socket.io clients to upgrade the transport that they are using (e.g. start with polling, then upgrade to a true WebSocket connection).  |
| `cookie` | ((string)), ((boolean)) | `false` | This is a raw configuration option exposed from Engine.io.  It indicates the name of the HTTP cookie that contains the connecting socket.io client's socket id.  The cookie will be set when responding to the initial Socket.io "handshake".  Alternatively, may be set to `false` to disable the cookie altogether.  Note that the `sails.io.js` client does not rely on this cookie, so it is disabled (set to `false`) by default for enhanced security.  If you are using socket.io directly and need to re-enable this cookie, keep in mind that the conventional setting is `"io"`.  |


<docmeta name="uniqueID" value="sailsconfigsockets959426">
<docmeta name="displayName" value="sails.config.sockets">

