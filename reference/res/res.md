# Response (`res`)


### Overview

Sails is built on [Express](https://github.com/expressjs/), and uses [Node's HTTP server](http://nodejs.org/api/http.html#http_http_createserver_requestlistener) conventions.  Because of this, you can access all of the Node and Express methods and properties on the `res` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods of its own to the `res` object, like [`res.view()`](/#/documentation/reference/res/res.view.html).  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.


### Protocol Support

The chart below describes support for the methods and properties on the Sails [Request](/#/documentation/reference/req) object (`req`) across multiple transports:


The chart below describes support for the methods and properties on the Sails [Response](/#/documentation/reference/res) object (`res`) across multiple transports:


|                |  HTTP   | WebSockets |
|----------------|---------|------------|
| res.status() | :white_check_mark: | :white_check_mark: |
| res.set()    | :white_check_mark: | :white_large_square: |
| res.get()    | :white_check_mark: | :white_large_square: |
| res.cookie() | :white_check_mark: | :white_large_square: |
| res.clearCookie() | :white_check_mark: | :white_large_square: |
| res.redirect() | :white_check_mark: | :white_check_mark: |
| res.location() | :white_check_mark: | :white_large_square: |
| res.charset  | :white_check_mark: | :white_check_mark: |
| res.send()   | :white_check_mark: | :white_check_mark: |
| res.json()   | :white_check_mark: | :white_check_mark: |
| res.jsonp()  | :white_check_mark: | :white_check_mark: |
| res.type()   | :white_check_mark: | :white_large_square: |
| res.format() | :white_check_mark: | :white_large_square: |
| res.attachment() | :white_check_mark: | :white_large_square: |
| res.sendfile() | :white_check_mark: | :white_large_square: |
| res.download() | :white_check_mark: | :white_large_square: |
| res.links()  | :white_check_mark: | :white_large_square: |
| res.locals    | :white_check_mark: | :white_check_mark: |
| res.render() | :white_check_mark: | :white_large_square: |
| res.view()   | :white_check_mark: | :white_large_square: |


### Legend

  - :white_check_mark: - fully supported
  - :white_large_square: - feature not yet implemented
  - :heavy_multiplication_x: - unsupported due to protocol restrictions


<docmeta name="uniqueID" value="res550242">
<docmeta name="displayName" value="Response (`res`)">
<docmeta name="stabilityIndex" value="3">

