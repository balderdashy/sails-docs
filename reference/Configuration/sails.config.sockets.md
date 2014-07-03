# sails.config.sockets
### What is this?
These configuration options provide transparent access to Sails’ encapsulated pubsub/socket server for complete customizability.

### Description



These configuration options provide transparent access to Sails&rsquo; encapsulated pubsub/socket server for complete customizability.

#### transports
Here is an array of allowed transport methods which the clients will try to use. The flashsocket transport is disabled by default; you can enable flashsockets by adding &lsquo;flashsocket&rsquo; to this list:
```javascript   
    transports: [
    'websocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling'
   ],
```

#### adapter
`adapter: 'memory'`

The data store where socket.io will store its message queue and answer pubsub logic


#### MQ Support for Redis
Node.js (and consequently Sails.js) apps scale horizontally. It&rsquo;s a powerful, efficient approach, but it involves a tiny bit of planning. At scale, you&rsquo;ll want to be able to copy your app onto multiple Sails.js servers and throw them behind a load balancer.

One of the big challenges of scaling an application is that these sorts of clustered deployments cannot share memory, since they are on physically different machines. On top of that, there is no guarantee that a user will &ldquo;stick&rdquo; with the same server between requests, since the load balancer will route each request to the server with the least impact on load. All pubsub processing and shared memory has to be offloaded to a shared, remote messaging queue (usually Redis).

Luckily, Sails provides production MQ support for Redis by default!

To enable a remote redis pubsub server:
```javascript
adapter: 'redis',

// The IP address and configuration of your redis host:
// (if left unset, Sails will try to connect to a redis via port 6379 on localhost)

host: '127.0.0.1',
port: 6379,
db: 'sails',
pass: '<redis auth password>'
```

#### origins
`origins: '*:*'`

Match string representing the origins that are allowed to connect to the Socket.IO server

#### heartbeats
`heartbeats: true`

Sets whether we should use heartbeats to check the health of Socket.IO connections

#### close timeout
`'close timeout': 60`

When client closes connection, the number of seconds to wait before attempting a reconnect. This value is sent to the client after a successful handshake.

#### heartbeat timeout
`'heartbeat timeout': 60`

The max number of seconds between heartbeats sent from the client to the server. This value is sent to the client after a successful handshake.

#### heartbeat interval
`'heartbeat interval': 25`

The max number of seconds to wait for an expcted heartbeat before declaring the pipe broken. This number should be less than the `heartbeat timeout`

#### polling duration
`'polling duration': 20`

The maximum duration of one HTTP poll; if it exceeds this limit it will be closed.

#### flash policy server
`'flash policy server': true`

Enables the flash policy server if the flashsocket transport is enabled. 

#### flash policy port
`'flash policy port': 10843`

By default the Socket.io client will check port 10843 on your server to see if flashsocket connections are allowed. The Adobe Flash Player normally uses 843 as default port but Socket.io defaults to a non root port (10843) by default.

If you are using a hosting provider that doesn&rsquo;t allow you to start servers other than on port 80 or the provided port, and you still want to support flashsockets  you can set the `flash policy port` to -1

#### destroy buffer size
`'destroy buffer size': '10E7'`

Used by the HTTP transports. The Socket.io server buffers HTTP request bodies up to this limit. This limit is not applied to websocket or flashsockets.

#### destroy upgrade
`'destroy upgrade': true`

Do we need to destroy non-socket.io upgrade requests?

#### browser client
`'browser client': true`

Should Sails/Socket.io serve the `socket.io.js` client? (as well as WebSocketMain.swf for Flash sockets, etc.)

#### browser client cache
`'browser client cache': true`

Cache the Socket.io file generation in the memory of the process to speed up the serving of the static files.

#### browser client minification
`'browser client minification': false`

Does Socket.io need to send a minified build of the static client script?

#### browser client etag
`'browser client etag': false`

Does Socket.io need to send an ETag header for the static requests?

#### browser client expires
`'browser client expires': 315360000`

Adds a Cache-Control: private, x-gzip-ok=&ldquo;&rdquo;, max-age=31536000 header to static requests, but only if the file is requested with a version number like /socket.io/socket.io.v0.9.9.js.

#### browser client gzip
`'browser client gzip': false`

Does Socket.io need to GZIP the static files? This process is only done once and the computed output is stored in memory so we don&rsquo;t have to spawn a gzip process for each request.

#### browser client handler
`'browser client handler': false`

Optional override function to serve all static files, including socket.io.js et al. Of the form :: `function (req, res) { /* serve files */ }`

#### match origin protocol
`'match origin protocol': false`

Meant to be used when running socket.io behind a proxy. Should be set to true when you want the location handshake to match the protocol of the origin. This fixes issues with terminating the SSL in front of Node and forcing location to think it&rsquo;s wss instead of ws.


#### authorization
`authorization: true`

Global authorization for Socket.io access. This is called when the initial handshake is performed with the server. By default, Sails verifies that a valid cookie was sent with the upgrade request However, in the case of cross-domain requests, no cookies are sent for some transports, so sockets will fail to connect.  You might also just want to allow anyone to connect w/o a cookie!
 
To bypass this cookie check, you can set `authorization: false`, which will silently create an anonymous cookie+session for the user.

`authorization: true` indicates that Sails should use the built-in logic

You can also use your own custom logic with: `authorization: function (data, accept) { ... }`

#### store
`store: undefined`

Direct access to the Socket.io MQ store config. The &lsquo;adapter&rsquo; property is the preferred method (`undefined` indicates that Sails should defer to the &lsquo;adapter&rsquo; config)

#### logger
`logger: undefined`

A logger instance that is used to output log information. (`undefined` indicates deferment to the main Sails log config)

#### log level
`'log level': undefined`

The amount of detail that the server should output to the logger. (`undefined` indicates deferment to the main Sails log config)

#### log colors
`'log colors': undefined`

Whether to color the log type when output to the logger. (`undefined` indicates deferment to the main Sails log config)

#### static
`'static': undefined`

A Static instance that is used to serve the Socket.io client and its dependencies.

#### resource
`resource: '/socket.io'`

The entry point where Socket.io starts looking for incoming connections. This should be the same between the client and the server.



<docmeta name="uniqueID" value="sailsconfigsockets959426">
<docmeta name="displayName" value="sails.config.sockets">

