# sails.config.sockets

### What is this?
These configuration options provide transparent access to Socket.io, the WebSocket/pubsub server encapsulated by Sails.

### Commonly-Used Options

| Property      | Type       | Default  | Details |
|:--------------|------------|:---------|:--------|
| `adapter`      |((string))  |`'memory'`| The queue socket.io will use to deliver messages.  Can be set to either `'memory'` or `'socket.io-redis'`. If `'socket.io-redis'` is specified, you should run `npm install socket.io-redis@^1.0.0 --save --save-exact`. |
| `transports`  |((array))  | `['websocket']`     | An array of allowed transport strategies that Sails/Socket.io will use when connecting clients.  This should _always_ match the [configuration in your socket client (i.e. `sails.io.js`)](http://sailsjs.org/documentation/reference/web-sockets/socket-client#?configuring-the-sailsiojs-library) -- if you change transports here, you need to configure them there, and vice versa.<br/><br/> <em>Note that if you opt to modify the default transports, then you may need to do additional configuration in production.  (For example, if you add the `polling` transport, and your app is running on multiple servers behind a load balancer like nginx, then you will need to configure that load balancer to support TCP sticky sessions.  However, that _should not_ be necessary out of the box with only the `websocket` transport enabled.)  See [Deployment > Scaling](http://sailsjs.com/documentation/concepts/deployment/scaling) for more tips and best practices.</em> |
| `onlyAllowOrigins` | ((array)) | `undefined` | Array of hosts (beginning with http:// or https://) from which sockets will be allowed to connect.  Leaving this undefined will allow sockets from _any_ origin to connect, which is useful for testing but is not allowed in production mode (so you should at least set this in [config/env/production.js](http://sailsjs.com/documentation/anatomy/config/env/production-js)).  Note that as the name implies (and in contrast to the similar [CORS setting](http://ailsjs.com/documentation/reference/configuration/sails-config-security-cors)), _only_ the origins listed will be allowed to connect.  For testing locally, you&rsquo;ll probably want to add `http://localhost:1337` to the list.

### Redis Configuration

 If you are configuring your Sails app for production and plan to [scale to more than one server](http://sailsjs.org/documentation/concepts/deployment/scaling), then you should set `sails.config.sockets.adapter` to `'socket.io-redis'`, set up your Redis instance, and then use the following config to point at it from your app:

| Property      | Type       | Default  | Details |
|:--------------|------------|:---------|:--------|
| `url`          | ((string)) | `undefined` | The URL of the Redis instance to connect to.  This may include one or more of the other settings below, e.g. `redis://:mypass@myredishost.com:1234/5` would indicate a `host` of `myredishost.com`, a `port` of `1234`, a `pass` of `mypass` and a `db` of `5`.  In general, you should use either `url` _or_ a combination of the settings below, to avoid confusion (the `url` setting will override all of the settings below).
| `db`           | ((number))  |`undefined`   | The index of the database to use within your redis instance.  If specified, must be an integer.  _(On most Redis setups, this will be a number between 0 and 15.)_
| `host`         |((string))  |`'127.0.0.1'` | Hostname of your Redis instance.
| `pass`         | ((string)) | `undefined` | Password for your Redis instance.
| `port`         |((number)) |`6379`   | Port of your Redis instance.


### Advanced Configuration

These configuration options provide lower-level access to the underlying Socket.io server settings for complete customizability.

| Property   | Type      | Default  | Details |
|:-----------|:---------:|:---------|:--------|
| `beforeConnect`|((boolean)), ((function)) | `undefined` | A function to run every time a new client-side socket attempts to connect to the server which can be used to reject or allow the incoming connection.  Useful for tweaking your production environment to prevent [DoS](http://sailsjs.com/docs/concepts/security/ddos) attacks, or reject socket.io connections based on business-specific heuristics. See [beforeConnect](http://sailsjs.com/documentation/reference/configuration/sails-config-sockets#?beforeconnect) below for more info. |
| `afterDisconnect`| ((function)) | `undefined` | A function to run when a client-side socket disconnects from the server.  To define your own custom logic, specify a function like `afterDisconnect: function (session, socket, cb) {}`.
| `allowUpgrades` | ((boolean)) | `true` | This is a raw configuration option exposed from Engine.io.  It indicates whether to allow Socket.io clients to upgrade the transport that they are using (e.g. start with polling, then upgrade to a true WebSocket connection).  |
| `cookie` | ((string)), ((boolean)) | `false` | This is a raw configuration option exposed from Engine.io.  It indicates the name of the HTTP cookie that contains the connecting socket.io client's socket id.  The cookie will be set when responding to the initial Socket.io "handshake".  Alternatively, may be set to `false` to disable the cookie altogether.  Note that the `sails.io.js` client does not rely on this cookie, so it is disabled (set to `false`) by default for enhanced security.  If you are using socket.io directly and need to re-enable this cookie, keep in mind that the conventional setting is `"io"`.  |
| `grant3rdPartyCookie` | ((boolean)) | `true` | Whether to expose a `GET /__getcookie` route that sets an HTTP-only session cookie.  By default, if it detects that it is about to connect to a cross-origin server, the Sails socket client (`sails.io.js`) sends a JSONP request to this endpoint before it begins connecting.  For user agents where 3rd party cookies are possible, this allows `sails.io.js` to connect the socket to the cross-origin Sails server using a user's existing session cookie, if they have one (for example, if they were already logged in.) Without this, virtual requests you make from the socket will not be able to access the same session, and will need to reauthenticate using some other mechanism.   |
| `maxHttpBufferSize` | ((number)) | `10E7` | This is a raw configuration option exposed from Engine.io.  It reflects the maximum number of bytes or characters in a message when polling before automatically closing the socket (to avoid [DoS]((http://sailsjs.com/docs/concepts/security/ddos)). |
| `path`        | ((string)) | `/socket.io` | Path that client-side sockets should connect to on the server.  See http://socket.io/docs/server-api/#server(opts:object).
| `pingInterval` | ((number)) | `25000` | This is a raw configuration option exposed from Engine.io.  It reflects the number of miliseconds to wait between "ping packets" (i.e. this is what "heartbeats" has become, more or less)  |
| `pingTimeout` | ((number)) | `60000` | This is a raw configuration option exposed from Engine.io.  It reflects how many ms without a pong packet to wait before considering a socket.io connection closed |
| `sendResponseHeaders`|((boolean))  | `true`     | Whether to include response headers in the JWR (JSON WebSocket Response) originated for each socket request (e.g. `io.socket.get()` in the browser) This doesn't affect direct socket.io usage-- only if you're communicating with Sails via the request interpreter (e.g. making normal calls with the sails.io.js browser SDK).  This can be useful for squeezing out more performance when tuning high-traffic apps, since it reduces total bandwidth usage.  However, since Sails v0.10, response headers are trimmed whenever possible, so this option should almost never need to be used, even in extremely high-scale applications. |
| `serveClient`|((boolean))  | `false`     | Whether to serve the default Socket.io client at `/socket.io/socket.io.js`.  Occasionally useful for advanced debugging. |
| `onRedisDisconnect` | ((function)) | `undefined` | An optional function for Sails to call if the Redis connection is dropped.  Useful for placing your site in a temporary maintenance mode or "panic mode" (see [sails-hook-panic-mode](https://www.npmjs.com/package/sails-hook-panic-mode) for an example).
| `onRedisReconnect` | ((function)) | `undefined` | An optional function for Sails to call if a previously-dropped Redis connection is restored (see `onDisconnect` above).

> Note: `onRedisDisconnect` and `onRedisReconnect` will only be called for Redis clients that are created by Sails for you; if you provide your own Redis clients (see below), these functions will _not_ be called automatically in the case of a disconnect or reconnect.

##### beforeConnect

To define your own custom logic, specify a function like: 
```
beforeConnect: function (handshake, cb) { 
  /* pass back true to allow, false to deny */ 
  return cb(null, true); 
}
```
By default, when a socket tries to connect, Sails allows it, every time. (much in the same way any HTTP request is allowed to reach your routes.  If no valid cookie was sent, a temporary session will be created for the connecting socket.

If the cookie sent as part of the socket connection request doesn't match any known user session, a new user session is created for it. In most cases, the user would already have a cookie since they loaded the socket.io client and the initial HTML page you're building.   

However, in the case of cross-domain requests, it is possible to receive a connection upgrade request WITHOUT A COOKIE (for certain transports). In this case, there is no way to keep track of the requesting user between requests, since there is no identifying information to link him/her with a session. The sails.io.js client solves this by sending an HTTP request to a CORS+JSONP endpoint first, in order to get a 3rd party cookie. This cookie is then used when opening the socket connection.                                 

You can also pass along a ?cookie query parameter in the url when connecting the socket (either by hand or when configuring sails.io.js), which Sails will use instead of the cookie that was sent in the HTTP request header. e.g.: io.sails.connect('http://localhost:1337?cookie=smokeybear')                                                                             

> A note for browser clients: The user's session cookie is NOT (and will never be) accessible from client-side javascript. Using HTTP-only cookies is crucial for your app's security. 


### Providing Your Own Redis Clients

By default, Sails will create new Redis clients in the background when using the `socket.io-redis` adapter.  In some cases, you may instead need to create your own Redis clients for PubSub (typically using the <a href="https://www.npmjs.com/package/node-redis" target="_blank">node-redis</a> or <a href="https://www.npmjs.com/package/ioredis">ioredis</a> modules), and provide them to Sails for use in PubSub.  This often comes up when using a <a href="https://redis.io/topics/sentinel" target="_blank">Redis Sentinel</a> setup, which requires that clients connect using a module like <a href="https://www.npmjs.com/package/ioredis" target="_blank">ioredis</a>.  The following advanced configuration options allow you to pass already-connected Redis clients and related config info to Sails.

| Property   | Type      | Default  | Details |
|:-----------|:---------:|:---------|:--------|
| `pubClient` | ((ref))  | `undefined` | A custom Redis client used for _publishing_ on channels used by Socket.io.  If unspecified, Sails will create a client for you. |
| `subClient` | ((ref)) | `undefined` | A custom Redis client used for _subscribing_ to channels used by Socket.io.  If unspecified, Sails will create a client for you. |
| `adminPubClient`| ((ref)) | `undefined` | A custom Redis client for _publishing_ on the internal Sails admin bus, which allows for inter-server communication.  If you provide a client for `pubClient`, you'll likely need to provide a client for this setting as well.
| `adminSubClient`| ((ref)) | `undefined` | A custom Redis client for _subscribing_ to the internal Sails admin bus, which allows for inter-server communication.  If you provide a client for `subClient`, you'll likely need to provide a client for this setting as well.
| `subEvent` | ((string)) | `message` | The Redis client event name to subscribe to.  When using clients created with `ioredis`, you&rsquo;ll likely need to set this to `messageBuffer` |


### Notes
> + In older versions of Sails (&lt;v0.11) and Socket.io (&lt;v1.0), the `beforeConnect` setting was called `authorization`.


<docmeta name="displayName" value="sails.config.sockets">
<docmeta name="pageType" value="property">

