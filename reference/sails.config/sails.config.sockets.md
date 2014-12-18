# sails.config.sockets
### What is this?
These configuration options provide transparent access to Socket.io, the WebSocket/pubsub server encapsulated by Sails.

### Commonly-Used Options

  Property      | Type       | Default  | Details |
 ---------------|------------|----------|---------|
 `onConnect`    |((function))| see [config/sockets.js](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/sockets.js.html)  | A function to run every time a new client-side socket connects to the server.
 `onDisconnect` |((function))| see [config/sockets.js](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/sockets.js.html)  | A function to run every time a new client-side socket disconnects from the server.
 `adapter`      |((string))  |`'memory'`| The database where socket.io will store its message queue and answer pubsub logic.  Can be set to either `'memory'` or `'redis'`

### Redis Configuration

These configuration options are only relevant if you are using Redis to manage your socket connections (i.e. [socket.io adapter](https://github.com/automattic/socket.io-redis) / socket store adapter / socket MQ adapter).  In other words, only worry about the settings in this section if you've also set `adapter: 'redis'` in your sockets configuration.

  Property      | Type       | Default  | Details |
 ---------------|------------|----------|---------|
 `host`         |((string))  |`'127.0.0.1'` | Hostname of your redis instance (only applicable if using the redis socket store adapter)
 `port`         |((integer)) |`6379`   | Port of your redis instance (only applicable if using the redis socket store adapter)
 `db`           |((string))  |`'sails'`   | The name of the database to use within your redis instance (only applicable if using the redis socket store adapter)
 `pass`         | ((string)) | ((undefined)) | The password for your redis instance (only applicable if using the redis socket store adapter)

### Advanced Configuration

These configuration options provide lower-level access to the underlying Engine.io/Socket.io server settings for complete customizability.

| Property   | Type      | Default  | Details |
|------------|-----------|----------|---------|
|`sendResponseHeaders`|((boolean))  | `true`     | Whether to include response headers in the JWR (JSON WebSocket Response) originated for each socket request (e.g. `io.socket.get()` in the browser) This doesn't affect direct socket.io usage-- only if you're communicating with Sails via the request interpreter (e.g. making normal calls with the sails.io.js browser SDK) |
|`sendStatusCode`|((boolean))  | `true`     | Whether to include response headers in the JWR (JSON WebSocket Response) originated for each socket request (e.g. `io.socket.get()` in the browser) This doesn't affect direct socket.io usage-- only if you're communicating with Sails via the request interpreter (e.g. making normal calls with the sails.io.js browser SDK) |
|`grant3rdPartyCookie`|((boolean))  | `true`     | Whether to expose the implicit, CORS-enabled `get /__getcookie` "shadow route" that sets the "sails.sid" as a 3rd party cookie (this is used by the sails.io.js socket client when you attempt a cross-origin socket connection, or if you're using client library as an npm install-ed depenency in a Node.js socket client).  This enables the use of sessions in virtual requests made from the sails.io.js socket client. |
|`transports`|((array))  | `['polling', 'websocket']`     | A array of allowed transport methods which the clients will try to use. The flashsocket transport is disabled by default You can enable flashsockets by adding 'flashsocket' to this list. |
| `pingTimeout` | ((number)) | `60000` | This is a raw configuration option exposed from Engine.io.  It reflects how many ms without a pong packet to wait before considering a socket.io connection closed |
| `pingInterval` | ((number)) | `25000` | This is a raw configuration option exposed from Engine.io.  It reflects the number of miliseconds to wait between "ping packets" (i.e. this is what "heartbeats" has become, more or less) |miliseconds to wait between "ping packets" (i.e. this is what "heartbeats" has become, more or less) |
| `maxBufferSize` | ((number)) | `10E7` | This is a raw configuration option exposed from Engine.io.  It reflects the maximum number of bytes or characters in a message when polling before automatically closing the socket (to avoid [DoS](http://sailsjs.org/#/documentation/concepts/Security/DDOS.html)). |
| `allowUpgrades` | ((boolean)) | `true` | This is a raw configuration option exposed from Engine.io.  It indicates whether to allow Socket.io clients to upgrade the transport that they are using (e.g. start with polling, then upgrade to a true WebSocket connection).  |
| `cookie` | ((string)), ((boolean)) | false | This is a raw configuration option exposed from Engine.io.  It indicates the name of the HTTP cookie that contains the connecting socket.io client's socket id.  The cookie will be set when responding to the initial Socket.io "handshake".  Alternatively, may be set to `false` to disable the cookie altogether.  Note that the `sails.io.js` client does not rely on this cookie, so it is disabled (set to `false`) by default for enhanced security.  If you are using socket.io directly and need to re-enable this cookie, keep in mind that the conventional setting is `"io"`.  |





    // • allowRequest (Function)
    //
    // A function that receives a given handshake or upgrade request as its first parameter, and can decide whether to continue or not.
    // The second argument is a function that needs to be called with the decided information: fn(err, success), where success is a boolean value where false means that the request is rejected, and err is an error code.
    allowRequest: function (handshakeOrUpgradeRequest, cb){
      cb(null, true);
    },
|`allowRequest`|((boolean)), ((function)) | `false` | An optional function that will be run before allowing sockets to connect.  (In Sails v0.9 and v0.10, this was called `authorization`-- it has changed due to the upgrade to socket.io v1)  Useful for tweaking your production environment to prevent [DoS]((http://sailsjs.org/#/documentation/concepts/Security/DDOS.html) attacks, or reject socket.io connections based on business-specific heuristics (e.g. if stooges from a competing business create bots to post spam links about their commercial product in your public, open-source chat room) To define your own custom logic, specify a function like: `allowRequest: function (handshake, cb) { /* pass back true to allow, false to deny */ return cb(null, true); }`  As of Sails v0.11, Sails no longer blocks incoming socket connections without cookies-- instead, cookies (and by corollary- sessions) are granted automatically.  If a requesting socket.io client cannot receive a cookie (i.e. making a cross-origin socket.io connection) the `sails.io.js` socket client will automatically send a CORS+JSONP request to try and obtain one **BEFORE CONNECTING** (refer to the `grant3rdPartyCookie` option above for details).  In the antagonistic scenario where even this fails, Sails will still grant a new cookie upon connection, which allows for a one-time session.`|

<!--
### Deprecated config

The following configuration was deprecated w/ the release of Socket.io v1.0:

|`origins  ` |((string)) |`'*:*'`   |Match string representing the origins that are allowed to connect to the Socket.IO server|
|`heartbeats`         |((boolean))|`true`    |Sets whether we should use heartbeats to check the health of Socket.IO connections|
|`close timeout`      |((integer))|`60`   |When client closes connection, the number of seconds to wait before attempting a reconnect. This value is sent to the client after a successful handshake.|
|`heartbeat timeout`  |((integer))|`60`|The max number of seconds between heartbeats sent from the client to the server. This value is sent to the client after a successful handshake.|
|`heartbeat interval` |((integer))|`25`|The max number of seconds to wait for an expcted heartbeat before declaring the pipe broken. This number should be less than the `heartbeat timeout`|
|`polling duration`   |((integer))|`20`|The maximum duration of one HTTP poll; if it exceeds this limit it will be closed.|
|`flash policy server`|((boolean))|`true`|Enables the flash policy server if the flashsocket transport is enabled.|
|`flash policy port`  |((integer))|`10843`| TODO |
|`destroy buffer size`|((integer))|`10E7`| Used by the HTTP transports. The Socket.io server buffers HTTP request bodies up to this limit. This limit is not applied to websocket or flashsockets.|
|`destroy upgrade`    |((boolean))|`true`|Whether we need to destroy non-socket.io upgrade requests|
|`browser client`     |((boolean))|`true`|Whether Sails/Socket.io should serve the `socket.io.js` client (as well as WebSocketMain.swf for Flash sockets, etc.)|
|`browser client cache `|((boolean))|`true `|Whether to cache the Socket.io file generation in the memory of the process to speed up the serving of the static files.|
|`browser client minification`|((boolean))|`false`|Whether Socket.io needs to send a minified build of the static client script|
|`browser client etag`|((boolean))|`false`|Whether Socket.io needs to send an ETag header for the static requests|
|`browser client expires`|((integer))|`315360000`|TODO|
|`browser client gzip`|((boolean))|`false`|Whether Socket.io needs to GZIP the static files. This process is only done once and the computed output is stored in memory so we don&rsquo;t have to spawn a gzip process for each request.|
|`browser client handler`|((boolean))|`false`| Optional override function to serve all static files, including socket.io.js et al. Of the form :: `function (req, res) { /* serve files */ }`|
|`match origin protocol`|((boolean))|`false`|Meant to be used when running socket.io behind a proxy. Should be set to true when you want the location handshake to match the protocol of the origin. This fixes issues with terminating the SSL in front of Node and forcing location to think it&rsquo;s wss instead of ws.
|`authorization`|((boolean))|`true`|Global authorization for Socket.io access. This is called when the initial handshake is performed with the server. By default, Sails verifies that a valid cookie was sent with the upgrade request However, in the case of cross-domain requests, no cookies are sent for some transports, so sockets will fail to connect.  You might also just want to allow anyone to connect w/o a cookie! To bypass this cookie check, you can set `authorization: false`, which will silently create an anonymous cookie+session for the user. `authorization: true` indicates that Sails should use the built-in logic. You can also use your own custom logic with: `authorization: function (data, accept) { ... }`|
|`resource`|((string))|`'/socket.io'`|The entry point where Socket.io starts looking for incoming connections. This should be the same between the client and the server.|
-->

<docmeta name="uniqueID" value="sailsconfigsockets959426">
<docmeta name="displayName" value="sails.config.sockets">

