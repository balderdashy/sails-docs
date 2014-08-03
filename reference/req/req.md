# Request (`req`)

Sails is built on [Express](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md), and uses [Node's HTTP server](http://nodejs.org/api/http.html) conventions.  Because of this, you can access all of the Node and Express methods and properties on the `req` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods and properties of its own to the `req` object, like [`req.wantsJSON`](http://beta.sailsjs.org/#/documentation/reference/req/req.wantsJSON.html) and [`req.params.all()`](http://beta.sailsjs.org/#/documentation/reference/req/req.allParams.html).  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.

### Protocol Support

The chart below describes support for the methods and properties on the Sails [Request](/#/documentation/reference/req) object (`req`) across multiple transports:

<!-- TODO: add SPDY -->


|    | HTTP    | WebSockets |
|----|---------|------------|
| req.file() | :white_check_mark: | :white_large_square: |
| req.param() | :white_check_mark: | :white_check_mark: |
| req.route | :white_check_mark: | :white_check_mark: |
| req.cookies | :white_check_mark: | :white_large_square: |
| req.signedCookies | :white_check_mark: | :white_large_square: |
| req.get() | :white_check_mark: | :white_large_square: |
| req.accepts() | :white_check_mark: | :white_large_square: |
| req.accepted | :white_check_mark: | :white_large_square: |
| req.is() | :white_check_mark: | :white_large_square: |
| req.ip | :white_check_mark: | :white_check_mark: |
| req.ips | :white_check_mark: | :white_large_square: |
| req.path | :white_check_mark: | :white_large_square: |
| req.host | :white_check_mark: | :white_large_square: |
| req.fresh | :white_check_mark: | :white_large_square: |
| req.stale | :white_check_mark: | :white_large_square: |
| req.xhr | :white_check_mark: | :white_large_square: |
| req.protocol | :white_check_mark: | :white_check_mark: |
| req.secure | :white_check_mark: | :white_large_square: |
| req.session | :white_check_mark: | :white_check_mark: |
| req.subdomains | :white_check_mark: | :white_large_square: |
| req.method | :white_check_mark: | :white_check_mark: |
| req.originalUrl | :white_check_mark: | :white_large_square: |
| req.acceptedLanguages | :white_check_mark: | :white_large_square: |
| req.acceptedCharsets | :white_check_mark: | :white_large_square: |
| req.acceptsCharset() | :white_check_mark: | :white_large_square: |
| req.acceptsLanguage() | :white_check_mark: | :white_large_square: |
| req.isSocket | :white_check_mark: | :white_check_mark: |
| req.params.all() | :white_check_mark: | :white_check_mark: |
| req.socket.id | :heavy_multiplication_x: | :white_check_mark: |
| req.socket.join | :heavy_multiplication_x: | :white_check_mark: |
| req.socket.leave | :heavy_multiplication_x: | :white_check_mark: |
| req.socket.broadcast  | :heavy_multiplication_x: | :white_check_mark: |
| req.transport  | :white_large_square: | :white_check_mark: |
| req.url | :white_check_mark: | :white_check_mark: |
| req.wantsJSON | :white_check_mark: | :white_check_mark: |


### Legend

  - :white_check_mark: - fully supported
  - :white_large_square: - feature not yet implemented
  - :heavy_multiplication_x: - unsupported due to protocol restrictions


<docmeta name="uniqueID" value="req35837">
<docmeta name="displayName" value="Request (`req`)">
<docmeta name="stabilityIndex" value="3">

