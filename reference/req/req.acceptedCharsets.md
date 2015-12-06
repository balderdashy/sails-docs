# req.acceptedCharsets
このプロパティはリクエスト中でユーザエージェントから指定された受け入れ可能な文字コードの配列を持ちます。



### 使い方

```js
req.acceptedCharsets;
```

### 詳細

これはユニコード(utf-8)のような特定の文字コードをクライアントがサポートしているかいないかわからない時に高度なコンテンツネゴシエーションを行うのに便利です。これはリクエストの`Accept-Charset` ヘッダー ([RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2)をご覧ください)に含まれる全ての受け入れ可能な文字コードを返します。



### 例

```js
req.acceptedCharsets;
// -> ['utf-8', 'utf-16']
```

### 備考
> + Sails/Express/Koa/Connectでのヘッダーパースアルゴリズムの詳細に関しては[`accepts` module](https://github.com/expressjs/accepts)を御覧ください。












<docmeta name="uniqueID" value="reqacceptedCharsets230309">
<docmeta name="displayName" value="req.acceptedCharsets">

