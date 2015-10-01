#クロスオリジンでのリソース共有(CORS)

<!--
デフォルトのSailはすでに同じドメインからのAJAXリクエストを処理するように設定されています。でも他のドメインからのリクエストに対応したい場合はどうでしょう。ブラウザのJSONPをセットアップアップすることができます。これこそが [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)がっ必要な場面なんです。
-->

[CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)は別のドメイン(例：myothersite.com)から提供されたブラウザスクリプトがあなたのサーバ(例：api.mysite.com)にアクセスできるようになる仕組みです。JSONPと同じく、CORSのゴールは [same-origin policy](http://en.wikipedia.org/wiki/Same-origin_policy)を回避し、他のドメインで動作しているjavascriptコードからのリクエストに応対するための安全な方法です。しかし、JSONPと違ってこれはGETリクエスト以外に対しても動作してしまいます。

Sailsは全てのドメインや特定のドメインリストからのアクセスを許可するように設定が可能です。これはルートベースで指定することもアプリケーションの全てのルートに関して指定することも可能です。


### CORSを有効化する

セキュリティ―上の理由からSailsではCORSはデフォルトで無効になっています。しかし、とても簡単に有効化することができます。

_全ての_ ドメインからの _全ての_ ルートへのクロスオリジンアクセスを許可するためには単純に[`config/cors.js`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.cors.html)で`allRoutes`を有効化するだけです。:

```js
allRoutes: true
```

全てのオプションの利用方法は[`sails.config.cors`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.cors.html) をご覧下さい。


### それぞれのルートに対してCORSを設定する
CORS設定のゴールは`config/routes.js`にあるそれぞれのルートに対してクロスオリジンアクセスを許可（あるいは拒否）することです。それぞれのルートへのCORSを許可することを示すには`config/cors.js`の中で`cors`プロパティを`true`にすることで行えます。:

```
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: true
}
```

もし`config.cors.js`で`allRoutes`を`true`にセットし特定のルートを除外したい場合、`cors`に対して`false`を明示することで行えます。:

```
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: false
}
```

ルートに対しての特定のCORSパラメータを上書きするには`cors`プロパティオブジェクトを追加します。:

```
"get /foo": {
   controller: "FooController",
   action: "index",
   cors: {
     origin: "http://sailsjs.org, http://sailsjs.com",
     credentials: false
}
```


<docmeta name="uniqueID" value="cors198259">
<docmeta name="displayName" value="CORS">

