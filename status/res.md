# res

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

  - :white_check_mark: - supported feature
  - :white_large_square: - feature not yet implemented for this transport
  - :heavy_multiplication_x: - unsupported feature due to protocol restrictions
