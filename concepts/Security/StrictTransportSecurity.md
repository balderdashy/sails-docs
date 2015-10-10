# HTTP Strict Transport Security


### STSを有効化する

実はSTSを実装するにはとてもシンプルで[数行のコードを書くだけで](https://github.com/krakenjs/lusca/blob/master/lib/hsts.js)できます。しかし、更に良いことにSailsとExpressでこの機能を実現できる幾つかのオープンソースモジュールがあります。これらのモジュールを使うには以下の手順に従ってnpmからインストールしてアプリケーションの`config/http.js`の中で[カスタムのミドルウエアとして設定](http://beta.sailsjs.org/#/documentation/concepts/Middleware)してください。以下の例で簡単な使い方があります。詳しい説明や応用的な使い方は下記にあるリンクを参照してください。


##### [lusca](https://github.com/krakenjs/lusca#luscahstsoptions)を使う

> `lusca` は[Apache license](https://github.com/krakenjs/lusca/blob/master/LICENSE.txt)で使えるオープンソースです。


```sh
# In your sails app
npm install lusca --save
```

そして、`config/http.js`の`middleware`設定オブジェクトで:

```js
  // ...
  // maxAge ==> Number of seconds strict transport security will stay in effect.
  strictTransportSecurity: require('lusca').hsts({ maxAge: 31536000 })
  // ...
```



### 追加資料
+ [HTTP Strict Transport Security (OWasp)](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)


<docmeta name="uniqueID" value="HSTSecurity397141">
<docmeta name="displayName" value="Strict Transport Security">
