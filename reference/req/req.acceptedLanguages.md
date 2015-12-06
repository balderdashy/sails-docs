# req.acceptedLanguages
リクエスト(`req`)の`Accept-Language` ヘッダー ([RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)をご覧下さい)にで指定された受け入れ可能な言語の配列を含みます。

### 使い方
```js
req.acceptedLanguages;
```

### 詳細

`req.acceptedLanguages`はリクエストの`Accept-Language` ヘッダー (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)をご覧下さい)で指定された全ての言語を含みます。

このメソッドはSailsの内部で国際化やローカライゼーションのために使われます。[i18n](http://sailsjs.org/documentation/concepts/Internationalization)フックはリクエストに応じて自動的に別々のロケールに対して別々のコンテンツを提供します。


### 例

```js
req.acceptedLanguages;
// -> ['en-US', 'en']
```

### 備考
> + Sails/Express/Koa/Connectでのヘッダーパースアルゴリズムの詳細に関しては[`accepts` module](https://github.com/expressjs/accepts)を御覧ください。
> + ブラウザはユーザの言語設定に基づいて自動的に"Accept-Language"ヘッダを送ります。
> + Webブラウザを出元とする多くのリクエストに関して"Accept-Language"ヘッダがあると期待できます。




<docmeta name="uniqueID" value="reqacceptedLanguages311952">
<docmeta name="displayName" value="req.acceptedLanguages">
