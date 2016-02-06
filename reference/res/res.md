# Response (`res`)


### 概要

Sailsは[Node's HTTP server](http://nodejs.org/api/http.html) 慣習のもと[Express](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)上で構築されています。そのため、`req`がアクセス出来る場所からなら全て（すなわちコントローラやポリシー、カスタムレスポンス上から）その上にあるNodeとExpressのメソッドにアクセスすることが出来ます。

この互換性の良い副作用としては多くのケースで既存のNode.jsをSailsアプリケーションにペーストするだけで動作させることが出来ます。また、Sailsはトランスポートを気にしないリクエストインタプリタを実装していますのでSailsアプリケーションのコードはWeb Sockets対応なのです。

Sailsでは`res`オブジェクトに[`res.view()`](http://sailsjs.org/documentation/reference/res/res.view.html)のような幾つかのプロパティとメソッドを追加しています。これらの機能は基礎となる実装の上の糖衣構文であり、同様にHTTP と WebSocketsをサポートします。


### プロトコルのサポート

以下の表は複数のプロトコルにおいてSailsの[Request](http://sailsjs.org/documentation/reference/req)オブジェクト(`req`)でサポートされているメソッドとパラメータを示しています:


以下の表は複数のプロトコルにおいてSailsの[Response](http://sailsjs.org/documentation/reference/res)オブジェクト(`res`)でサポートされているメソッドとパラメータを示しています:


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

  - :white_check_mark: - 完全対応
  - :white_large_square: - 実装未完
  - :heavy_multiplication_x: - プロトコルの制約により未サポート


<docmeta name="uniqueID" value="res550242">
<docmeta name="displayName" value="Response (`res`)">
<docmeta name="stabilityIndex" value="3">
