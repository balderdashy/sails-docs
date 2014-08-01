# req

The chart below describes support for the methods and properties on the Sails [Request](/#/documentation/reference/req) object (`req`) across multiple transports:

<!-- TODO: add SPDY -->


|    | HTTP    | WebSockets |
|----|---------|------------|
| req.files | :white_check_mark: | :white_large_square: |
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

  - :white_check_mark: - supported feature
  - :white_large_square: - feature not yet implemented for this transport
  - :heavy_multiplication_x: - unsupported feature due to protocol restrictions
