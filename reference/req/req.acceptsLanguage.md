# req.acceptsLanguage()

リクエスト(`req`)が特定の`language`を扱えるかを返します。


### 使い方

```js
req.acceptsLanguage(language);
```

### 詳細

`req.acceptsLanguage()`はリクエストの`Accept-Language` ヘッダー (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)をご覧下さい)で与えられた`language`がサポートされていた場合Trueを返します。

このメソッドはSailsの内部で国際化やローカライゼーションのために使われます。[i18n](http://sailsjs.org/documentation/concepts/Internationalization)フックはリクエストに応じて自動的に別々のロケールに対して別々のコンテンツを提供します。


### Example

リクエストが`"Accept-Charset: utf-8"`ヘッダーともに送信されていた場合:

```js
req.acceptsCharset('utf-8');
// -> true
```

### 備考
> + Sails/Express/Koa/Connectでのヘッダーパースアルゴリズムの詳細に関しては[`accepts` module](https://github.com/expressjs/accepts)を御覧ください。
> + ブラウザはユーザの言語設定に基づいて自動的に"Accept-Language"ヘッダを送ります。
> + Webブラウザを出元とする多くのリクエストに関して"Accept-Language"ヘッダがあると期待できます。














<docmeta name="uniqueID" value="reqacceptsLanguage170988">
<docmeta name="displayName" value="req.acceptsLanguage()">
