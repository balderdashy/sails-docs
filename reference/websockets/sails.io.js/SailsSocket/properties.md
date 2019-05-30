# SailsSocket Properties

### Overview

This page describes the properties available on each [SailsSocket instance](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket).  These properties are set in the initial call to `io.sails.connect` which creates the SailsSocket, and cannot be changed while the socket is connected (with the exception of `headers`).

If the socket becomes disconnected (either involuntarily or as a result of a call to [`.disconnect`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/methods#?disconnect)), the properties can be changed until the socket connects again.  This allows you to connect the same SailsSocket instance (keeping its bound events and queued requests intact) to a different server if necessary.

### Common properties

  Property           | Type       | Default   | Details
 :-------------------|------------|:----------|:------------------------
 `url`               | ((string)) | Value of [`io.sails.url`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties#?iosails-defaults) | The URL that the socket is connected to, or will attempt to connect to.
 `transports`        | ((array))  | Value of [`io.sails.transports`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties#?iosails-defaults) | The transports that the socket will attempt to connect using.  Transports will be tried in order, with upgrades allowed: that is, if you list both "polling" and "websocket", then after establishing a long-polling connection the server will attempt to upgrade it to a websocket connection.  This setting should match the value of `sails.config.sockets.transports` in your Sails app.
`headers` | ((dictionary)) | Value of [`io.sails.headers`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties#?iosails-defaults) | Dictionary of headers to be sent by default with every request from this socket after it connects.  Can be overridden via the `headers` option in [`.request()`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/io-socket-request).  See `initialConnectionHeaders` below for info on setting headers for the initial socket handshake request.

### Advanced properties

  Property          | Type       | Default   | Details
 :------------------ |----------|:--------- |:-------
 `query`              | ((string)) | Value of [`io.sails.query`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties#?iosails-defaults)    | Query string to use with the initial connection to the server.  In server code, this can be accessed via `req.socket.handshake.query` in controller actions or `handshake._query` in [socket lifecycle callbacks](https://sailsjs.com/documentation/reference/configuration/sails-config-sockets).  Note that information about the sails.io.js SDK version will be tacked onto whatever query string you specify.  A common usage of `query` is to set `nosession=true`, indicating that the Sails app should _not_ associate the connecting socket with a browser session.
 `initialConnectionHeaders` | ((dictionary)) | Value of [`io.sails.initialConnectionHeaders`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties#?iosails-defaults) | _Node.js only--not available in browser._ Dictionary of headers to be sent with the _initial connection to the server_ (as opposed to the `headers` property above, which contains headers to be sent with every socket request made _after_ the initial connection).  In server code, the initial connection headers can be accessed via `req.socket.handshake.headers` in controller actions or `socket.handshake.headers` in [socket lifecycle callbacks](https://sailsjs.com/documentation/reference/configuration/sails-config-sockets).  This is useful for (for example) sending a `cookie` header with the initial handshake, allowing a socket to connect to a previously-established Sails session.
 `useCORSRouteToGetCookie` | ((boolean)) -or- ((string)) | Value of [`io.sails.useCORSRouteToGetCookie`](https://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties#?iosails-defaults) | Only relevant in browser environments, and if you are relying on the default Sails session + session cookies for authentication.  For cross-origin socket connections, use this property to choose a route to send an initial JSONP request in order to retrieve a cookie, so that the right session can be established.  The route should respond the string `_sailsIoJSConnect()`, which will allow the connection to continue.  If `useCORSRouteToGetCookie` is `true`, the default `/__getcookie` route on the Sails server will be used.  If it is `false`, no attempt will be made to contact the remote server before connecting the socket.  *Note: this strategy may fail on certain browsers (including certain versions of Safari) which block third-party cookies by default.*

### `io.sails.*` defaults

The `io.sails` object can be used to provide default values for new client sockets.  For example, setting `io.sails.url = "http://myapp.com:1234"` will cause every new client socket to connect to `http://myapp.com:1234`, unless a `url` value is provided in the call to `io.sails.connect()`.

The following are the default values for properties in `io.sails`.

  Property          | Default
 :------------------|:-------
 `url`              | In browser, the URL of the page that loaded the sails.io.js script.  In Node.js, no default.
 `transports`       | `['websocket']`
`headers` | `{}`
`query` | `''`
`initialConnectionHeaders` | `{}`
`useCORSRouteToGetCookie` | `true`

<docmeta name="displayName" value="Properties">

