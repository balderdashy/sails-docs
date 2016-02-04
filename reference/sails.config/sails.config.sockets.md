# sails.config.sockets

### What is this?
These configuration options provide transparent access to Socket.io, the WebSocket/pubsub server encapsulated by Sails.

### Commonly-Used Options

  Property      | Type       | Default  | Details |
 ---------------|------------|----------|---------|
 `adapter`      |((string))  |`'memory'`| The database where socket.io will store its message queue and answer pubsub logic.  Can be set to either `'memory'` or `'redis'`. In versions 0.11, `'redis'` is deprecated and `'socket.io-redis'` must be used. Install the appropiate dependency using `npm install socket.io-redis@0.1.4 --save`
 `host`         |((string))  |`'127.0.0.1'` | Hostname of your redis instance (only applicable if using the redis socket store adapter)
 `port`         |((integer)) |`6379`   | Port of your redis instance (only applicable if using the redis socket store adapter)
 `db`           |((string))  |`'sails'`   | The name of the database to use within your redis instance (only applicable if using the redis socket store adapter)
 `pass`         | ((string)) | ((undefined)) | The password for your redis instance (only applicable if using the redis socket store adapter)


### Advanced Configuration

These configuration options provide lower-level access to the underlying Socket.io server settings for complete customizability.

| Property   | Type      | Default  | Details |
|------------|-----------|----------|---------|
| `afterDisconnect`| ((function)) | `undefined` | A function to run when a client-side socket disconnects from the server.  To define your own custom logic, specify a function like `afterDisconnect: function (session, socket, cb) {}`.
| `allowUpgrades` | ((boolean)) | `true` | This is a raw configuration option exposed from Engine.io.  It indicates whether to allow Socket.io clients to upgrade the transport that they are using (e.g. start with polling, then upgrade to a true WebSocket connection).  |
| `beforeConnect`|((boolean)), ((function)) | `undefined` | A function to run every time a new client-side socket attempts to connect to the server which can be used to reject or allow the incoming connection.  Useful for tweaking your production environment to prevent [DoS]((http://sailsjs.org/documentation/concepts/Security/DDOS.html) attacks, or reject socket.io connections based on business-specific heuristics (e.g. if stooges from a competing business create bots to post spam links about their commercial product in your public, open-source chat room)  (In Sails v0.9 and v0.10, this was called `authorization`-- it has changed due to the upgrade to socket.io v1)  To define your own custom logic, specify a function like: `beforeConnect: function (handshake, cb) { /* pass back true to allow, false to deny */ return cb(null, true); }`  As of Sails v0.11, Sails no longer blocks incoming socket connections without cookies-- instead, cookies (and by corollary- sessions) are granted automatically.  If a requesting socket.io client cannot receive a cookie (i.e. making a cross-origin socket.io connection) the `sails.io.js` socket client will automatically send a CORS+JSONP request to try and obtain one **BEFORE CONNECTING** (refer to the `grant3rdPartyCookie` option above for details).  In the antagonistic scenario where even this fails, Sails will still grant a new cookie upon connection, which allows for a one-time session.|
| `cookie` | ((string)), ((boolean)) | `false` | This is a raw configuration option exposed from Engine.io.  It indicates the name of the HTTP cookie that contains the connecting socket.io client's socket id.  The cookie will be set when responding to the initial Socket.io "handshake".  Alternatively, may be set to `false` to disable the cookie altogether.  Note that the `sails.io.js` client does not rely on this cookie, so it is disabled (set to `false`) by default for enhanced security.  If you are using socket.io directly and need to re-enable this cookie, keep in mind that the conventional setting is `"io"`.  |
| `maxBufferSize` | ((number)) | `10E7` | This is a raw configuration option exposed from Engine.io.  It reflects the maximum number of bytes or characters in a message when polling before automatically closing the socket (to avoid [DoS](http://sailsjs.org/documentation/concepts/Security/DDOS.html)). |
| `path`        | ((string)) | `/socket.io` | Path that client-side sockets should connect to on the server.  See http://socket.io/docs/server-api/#server(opts:object).
| `pingInterval` | ((number)) | `25000` | This is a raw configuration option exposed from Engine.io.  It reflects the number of miliseconds to wait between "ping packets" (i.e. this is what "heartbeats" has become, more or less)  |
| `pingTimeout` | ((number)) | `60000` | This is a raw configuration option exposed from Engine.io.  It reflects how many ms without a pong packet to wait before considering a socket.io connection closed |
| `sendResponseHeaders`|((boolean))  | `true`     | Whether to include response headers in the JWR (JSON WebSocket Response) originated for each socket request (e.g. `io.socket.get()` in the browser) This doesn't affect direct socket.io usage-- only if you're communicating with Sails via the request interpreter (e.g. making normal calls with the sails.io.js browser SDK).  This can be useful for squeezing out more performance when tuning high-traffic apps, since it reduces total bandwidth usage.  However, since Sails v0.10, response headers are trimmed whenever possible, so this option should almost never need to be used, even in extremely high-scale applications. |
| `serveClient`|((boolean))  | `false`     | Whether to serve the default Socket.io client at `/socket.io/socket.io.js`.  Occasionally useful for advanced debugging. |
| `transports`|((array))  | `['polling', 'websocket']`     | An array of allowed transport methods which the clients will try to use. |



<docmeta name="displayName" value="sails.config.sockets">
<docmeta name="pageType" value="property">

