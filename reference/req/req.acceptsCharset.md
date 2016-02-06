# req.acceptsCharset()

リクエスト(`req`)が特定の`characterSet`を扱えるかを返します。


### 使い方

```js
req.acceptsCharset(characterSet);
```

### 詳細

これはユニコード(utf-8)のような特定の文字コードをクライアントがサポートしているかいないかわからない時に高度なコンテンツネゴシエーションを行うのに便利です。これは与えられた`characterSet`がリクエストの`Accept-Charset` ヘッダー ([RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2)をご覧ください)に受け入れ可能な文字コードとして含まれているかどうかを判断します。



### 例

リクエストが`"Accept-Charset: utf-8"`ヘッダーともに送信されていた場合:

```js
req.acceptsCharset('utf-8');
// -> true
```

### 備考
> + Sails/Express/Koa/Connectでのヘッダーパースアルゴリズムの詳細に関しては[`accepts` module](https://github.com/expressjs/accepts)を御覧ください。














<docmeta name="uniqueID" value="reqacceptsCharset303007">
<docmeta name="displayName" value="req.acceptsCharset()">

