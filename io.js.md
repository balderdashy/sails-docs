<span id="io.js"></span>
## io.js

The io.js file holds all the configuration options that pertain to how Sails uses Socket.IO.

```javascript
module.exports.io = {

  transports: [
		'websocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling'
	],

	adapter: undefined,
	/*
	adapter: {
		host: 'foo.com',
		port: 8888
	},
	*/

	origins: '*:*',

	heartbeats: true,

	'close timeout': 60,

	'heartbeat timeout': 60,

	'heartbeat interval': 25,

	'polling duration': 20,

	'flash policy server': true,

	'flash policy port': 10843,

	'destroy buffer size': '10E7',

	'destroy upgrade': true,

	'browser client': true,

	'browser client cache': true,

	'browser client minification': false,

	'browser client etag': false,

	'browser client expires': 315360000,

	'browser client gzip': false,

	'browser client handler': false,

	'match origin protocol' : false,

	authorization: true,

	store: undefined,

	logger: undefined,

	'log level': undefined,

	'log colors': undefined,

	'static': undefined,

	resource: '/socket.io'

};
```

_**transports**_ \<ARRAY\>  An array of allowed transport methods which the clients will try to use.  The flashsocket transport is disabled by default.  You can enable flashsockets by adding 'flashsocket' to this list.

<!-- Maybe origins should be an array of strings? -->
_**origins**_ \<STRING\>  Represents the origins that are allowed to connect to the Socket.IO server

_**heartbeats**_ \<BOOL\>  Set to false to disable heartbeat check for Socket.IO connections.

_**'close timeout'**_ \<INT\>  Integer representing the number of seconds to wait before attempting a reconnect.  This value is sent to the client after a successful handshake.

_**'heartbeat timeout'**_ \<INT\>  Integer representing the number of seconds between heartbeats sent from the client to the server.  This value is sent to the client after a successful handshake.

_**'heartbear interval'**_ \<INT\>  Integer representing the maximum number of seconds to wait for an expected heartbeat before declaring the connection lost.  This number should be less than the heartbeat timeout.

_**'polling duration'**_ \<INT\>  Integer representing the maximum number of seconts that an HTTP request is allowed to poll.  If this limit is exceeded, the request will be closed.

_**'flash policy server'**_ \<BOOL\>  Boolean to enable the flash policy server if the flashsocket transport is enabled.

_**'flash policy port'**_ \<INT\>  Integer representing the port number to use for flash policy server.  If your hosting provider doesn't allow you to start servers on ports other than 80 or the provided port, you can set this to -1 to support flashsockets still.

<!-- TODO:
_**'destroy buffer size'**_ \<\>
-->

_**'destroy upgrade'**_ \<BOOL\>  Boolean to destroy non-socket.io upgrade requests.  <!--If this is set to false, you can use regular socket clients with socket.io.-->

_**'browser client'**_ \<BOOL\>  Boolean to serve the statuc resources like socket.io.js to the client.

_**'browser client cache'**_ \<BOOL\>  Boolean to turn on the caching of static files to memory.

