#クロスオリジンでのリソース共有(CORS)

<!--
デフォルトのSailはすでに同じドメインからのAJAXリクエストを処理するように設定されています。でも他のドメインからのリクエストに対応したい場合はどうでしょう。ブラウザのJSONPをセットアップアップすることができます。これこそが [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)がっ必要な場面なんです。
-->

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)は別のドメイン(例：myothersite.com)から提供されたブラウザスクリプトがあなたのサーバ(例：api.mysite.com)にアクセスできるようになる仕組みです。JSONPと同じく、CORSのゴールは [same-origin policy](http://en.wikipedia.org/wiki/Same-origin_policy)を回避し、他のドメインで動作しているjavascriptコードからのリクエストに応対するための安全な方法です。しかし、JSONPと違ってこれはGETリクエスト以外に対しても動作してしまいます。

Sailsは全てのドメインや特定のドメインリストからのアクセスを許可するように設定が可能です。これはルートベースで指定することもアプリケーションの全てのルートに関して指定することも可能です。


### CORSを有効化する

セキュリティ―上の理由からSailsではCORSはデフォルトで無効になっています。しかし、とても簡単に有効化することができます。

_全ての_ ドメインからの _全ての_ ルートへのクロスオリジンアクセスを許可するためには単純に[`config/cors.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.cors.html)で`allRoutes`を有効化するだけです。:

```javascript
allRoutes: true
```

全てのオプションの利用方法は[`sails.config.cors`](http://sailsjs.org/documentation/reference/sails.config/sails.config.cors.html) をご覧下さい。


### それぞれのルートに対してCORSを設定する
CORS設定のゴールは`config/routes.js`にあるそれぞれのルートに対してクロスオリジンアクセスを許可（あるいは拒否）することです。それぞれのルートへのCORSを許可することを示すには`config/cors.js`の中で`cors`プロパティを`true`にすることで行えます。:

```javascript
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: true
}
```

もし`config.cors.js`で`allRoutes`を`true`にセットし特定のルートを除外したい場合、`cors`に対して`false`を明示することで行えます。:

```javascript
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: false
}
```

ルートに対しての特定のCORSパラメータを上書きするには`cors`プロパティオブジェクトを追加します。:

```javascript
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: {
     origin: "http://sailsjs.org, http://sailsjs.com",
     credentials: false
  }
}
```

### セキュリティレベル

デフォルトではたとえCORSが有効でも、Sailはどのドメインからくるアクセスに対しても処理を行います:つまり、単にレスポンスに適切なヘッダーを付加し、*クライアントが* 情報を表示させるかどうかを判断するのです。例えばCORSのホワイトリストに入っていないドメインから`/foo/bar`に対して`GET`リクエストを行った場合でも`FooController.js`コントローラにある`bar`アクションは依然として実行されますが、ブラウザがその結果を捨てるのです。これは直感に反するような気がしますが、[Same-Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy)が想定している種類の攻撃から保護した上で、ブラウザではないクライアント([Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en) や [curl](http://curl.haxx.se/)のような) がアクセス可能にすることは重要な事なのです。

もし許可していないドメインからのアクセスを完全に防ぎたい場合は`securityLevel`設定が利用可能です:

```javascript
module.exports.cors = {
  allRoutes: true,
  origin: "http://sailsjs.org",
  securityLevel: 1
}
```

セキュリティレベル１（高）は許可されていない全てのドメインからの`http` あるいは `https`のリクエストに対して403ステータスを返します。セキュリティレベル２（特に高い）でも同じようにしますが今度は *全ての* プロトコルを対象にします。（そのためPostmanやcurlのようなものは動作しません）

<docmeta name="uniqueID" value="cors198259">
<docmeta name="displayName" value="CORS">
