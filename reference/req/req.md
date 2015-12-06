# Request (`req`)

Sailsは[Node's HTTP server](http://nodejs.org/api/http.html) 慣習のもと[Express](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)上で構築されています。そのため、`req`がアクセス出来る場所からなら全て（すなわちコントローラやポリシー、カスタムレスポンス上から）その上にあるNodeとExpressのメソッドにアクセスすることが出来ます。

この互換性の良い副作用としては多くのケースで既存のNode.jsをSailsアプリケーションにペーストするだけで動作させることが出来ます。また、Sailsはトランスポートを気にしないリクエストインタプリタを実装していますのでSailsアプリケーションのコードはWeb Sockets対応なのです。

Sailsでは`req`オブジェクトに [`req.wantsJSON`](http://sailsjs.org/documentation/reference/req/req.wantsJSON.html) や [`req.params.all()`](http://sailsjs.org/documentation/reference/req/req.allParams.html) のような幾つかのプロパティとメソッドを追加しています。これらの機能は基礎となる実装の上の糖衣構文であり、同様にHTTP と WebSocketsをサポートします。

### プロトコルのサポート

下記のチャートはSailsの[Request](http://sailsjs.org/documentation/reference/req)オブジェクトである (`req`)の各トランスポートメソッド間でのメソッドとプロパティの対応状況を表しています:

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

  - :white_check_mark: - 完全対応
  - :white_large_square: - 実装未完
  - :heavy_multiplication_x: - プロトコルの制約により未サポート


<docmeta name="uniqueID" value="req35837">
<docmeta name="displayName" value="Request (`req`)">
<docmeta name="stabilityIndex" value="3">
