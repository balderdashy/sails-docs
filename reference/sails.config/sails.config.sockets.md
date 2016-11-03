# sails.config.sockets

### What is this?
These configuration options provide transparent access to Socket.io, the WebSocket/pubsub server encapsulated by Sails.

### Commonly-Used Options

| Property      | Type       | Default  | Details |
|:--------------|------------|:---------|:--------|
| `adapter`      |((string))  |`'memory'`| The queue socket.io will use to deliver messages.  Can be set to either `'memory'` or `'socket.io-redis'`. If `'socket.io-redis'` is specified, you should run `npm install socket.io-redis@^1.0.0 --save --save-exact`. |
| `transports`  |((array))  | `['websocket']`     | An array of allowed transport strategies that Sails/Socket.io will use when connecting clients.  This should _always_ match the [configuration in your socket client (i.e. `sails.io.js`)](http://sailsjs.org/documentation/reference/web-sockets/socket-client#?configuring-the-sailsiojs-library) -- if you change transports here, you need to configure them there, and vice versa.<br/><br/> <em>Note that if you opt to modify the default transports, then you may need to do additional configuration in production.  (For example, if you add the `polling` transport, and your app is running on multiple servers behind a load balancer like nginx, then you will need to configure that load balancer to support TCP sticky sessions.  However, that _should not_ be necessary out of the box with only the `websocket` transport enabled.)  See [Deployment > Scaling](http://sailsjs.com/documentation/concepts/deployment/scaling) for more tips and best practices.</em> |


### Redis Configuration

 If you are configuring your Sails app for production and plan to [scale to more than one server](http://sailsjs.org/documentation/concepts/deployment/scaling), then you should set `sails.config.sockets.adapter` to `'socket.io-redis'`, set up your redis instance, and then use the following config to point at it from your app:

| Property      | Type       | Default  | Details |
|:--------------|------------|:---------|:--------|
| `db`           |((string))  |`'sails'`   | The name of the database to use within your redis instance.
| `host`         |((string))  |`'127.0.0.1'` | Hostname of your redis instance.
| `pass`         | ((string)) | `undefined` | The password for your redis instance.
| `port`         |((number)) |`6379`   | Port of your redis instance.


### Advanced Configuration

These configuration options provide lower-level access to the underlying Socket.io server settings for complete customizability.

| Property   | Type      | Default  | Details |
|:-----------|:---------:|:---------|:--------|
| `afterDisconnect`| ((function)) | `undefined` | A function to run when a client-side socket disconnects from the server.  To define your own custom logic, specify a function like `afterDisconnect: function (session, socket, cb) {}`.
| `allowUpgrades` | ((boolean)) | `true` | This is a raw configuration option exposed from Engine.io.  It indicates whether to allow Socket.io clients to upgrade the transport that they are using (e.g. start with polling, then upgrade to a true WebSocket connection).  |
| `beforeConnect`|((boolean)), ((function)) | `undefined` | A function to run every time a new client-side socket attempts to connect to the server which can be used to reject or allow the incoming connection.  Useful for tweaking your production environment to prevent [DoS](http://sailsjs.com/docs/concepts/security/ddos) attacks, or reject socket.io connections based on business-specific heuristics (e.g. if stooges from a competing business create bots to post spam links about their commercial product in your chat room).  To define your own custom logic, specify a function like: `beforeConnect: function (handshake, cb) { /* pass back true to allow, false to deny */ return cb(null, true); }`  As of Sails v0.11, Sails no longer blocks incoming socket connections without cookies-- instead, cookies (and by corollary- sessions) are granted automatically.  If a requesting socket.io client cannot receive a cookie (i.e. making a cross-origin socket.io connection) the `sails.io.js` socket client will automatically send a CORS+JSONP request to try and obtain one **BEFORE CONNECTING** (refer to the `grant3rdPartyCookie` option for details).  In the antagonistic scenario where even this fails, Sails will still grant a new cookie upon connection, which allows for a one-time session. |
| `cookie` | ((string)), ((boolean)) | `false` | This is a raw configuration option exposed from Engine.io.  It indicates the name of the HTTP cookie that contains the connecting socket.io client's socket id.  The cookie will be set when responding to the initial Socket.io "handshake".  Alternatively, may be set to `false` to disable the cookie altogether.  Note that the `sails.io.js` client does not rely on this cookie, so it is disabled (set to `false`) by default for enhanced security.  If you are using socket.io directly and need to re-enable this cookie, keep in mind that the conventional setting is `"io"`.  |
| `grant3rdPartyCookie` | ((boolean)) | `false` | Whether to expose a `GET /__getcookie` route that sets an HTTP-only session cookie.  By default, if it detects that it is about to connect to a cross-origin server, the Sails socket client (`sails.io.js`) sends a JSONP request to this endpoint before it begins connecting.  For user agents where 3rd party cookies are possible, this allows `sails.io.js` to connect the socket to the cross-origin Sails server using a user's existing session cookie, if they have one (for example, if they were already logged in.) |
| `maxHttpBufferSize` | ((number)) | `10E7` | This is a raw configuration option exposed from Engine.io.  It reflects the maximum number of bytes or characters in a message when polling before automatically closing the socket (to avoid [DoS]((http://sailsjs.com/docs/concepts/security/ddos)). |
| `path`        | ((string)) | `/socket.io` | Path that client-side sockets should connect to on the server.  See http://socket.io/docs/server-api/#server(opts:object).
| `pingInterval` | ((number)) | `25000` | This is a raw configuration option exposed from Engine.io.  It reflects the number of miliseconds to wait between "ping packets" (i.e. this is what "heartbeats" has become, more or less)  |
| `pingTimeout` | ((number)) | `60000` | This is a raw configuration option exposed from Engine.io.  It reflects how many ms without a pong packet to wait before considering a socket.io connection closed |
| `pubClient` | ((object)) | `undefined` | When using the socket.io-redis adapter, this option allows you to specify a custom Redis client (typically created with `Redis.createClient`) used for _publishing_ on channels used by Socket.io.  If unspecified, Sails will create a client for you. |
| `sendResponseHeaders`|((boolean))  | `true`     | Whether to include response headers in the JWR (JSON WebSocket Response) originated for each socket request (e.g. `io.socket.get()` in the browser) This doesn't affect direct socket.io usage-- only if you're communicating with Sails via the request interpreter (e.g. making normal calls with the sails.io.js browser SDK).  This can be useful for squeezing out more performance when tuning high-traffic apps, since it reduces total bandwidth usage.  However, since Sails v0.10, response headers are trimmed whenever possible, so this option should almost never need to be used, even in extremely high-scale applications. |
| `serveClient`|((boolean))  | `false`     | Whether to serve the default Socket.io client at `/socket.io/socket.io.js`.  Occasionally useful for advanced debugging. |
| `subClient` | ((ref)) | `undefined` | When using the socket.io-redis adapter, this option allows you to specify a custom Redis client (typically created with `Redis.createClient`) used for _subscribing_ to channels used by Socket.io.  If unspecified, Sails will create a client for you. |



### Notes
> + In older versions of Sails (<v0.11) and Socket.io (<v1.0), the `beforeConnect` setting was called `authorization`.


<docmeta name="displayName" value="sails.config.sockets">
<docmeta name="pageType" value="property">

