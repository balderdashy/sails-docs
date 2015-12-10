# res.badRequest()

このメソッドは[400](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error) ("Bad Request")レスポンスを返し、クライアントにリクエストが不正であることを示します。通常これはヘッダーのパラメータに不正があるときやアプリケーションロジックで処理できないことを意味します。



### 使い方

```js
return res.badRequest();
```

_あるいは:_
+ `return res.badRequest(data);`
+ `return res.badRequest(data, pathToView);`



### 詳細

ほかのカスタムレスポンスモジュールと同じようにこのメソッドはカスタマイズ可能です。

デフォルトでこれは以下のように動作します:

+ リクエストが"[JSONを望んでいる](http://sailsjs.org/documentation/reference/req/req.wantsJSON.html)"場合（例えはリクエストがAJAXやWebSocketsその他cURLなどのRESTクライアントからのものである場合）、Sailsは与えられたエラーの`data`をJSONで返します。もし何の`data`も与えられていない時はデフォルトのレスポンスボディ（文字列の`"Bad Request"`）が送信されます。
+ リクエストがJSONを望んで _いない場合_ （例:URLがブラウザに打ち込まれた場合）、Sailsはビューのうち1つを返そうとします。
  + 特定の`pathToView`が与えられているときはSailsはそのビューを返そうとします。
  + そうではなく`pathToView`が与えられて_いない時_Sailsは適切なviewを推測しようとします。（詳しくは[`res.view()`](http://sailsjs.org/documentation/reference/res/res.view.html)を御覧ください。）、もし適切なビューを見つけられない時Sailsは単にJSONを返します。
  + Sailsがビューを返すとき、`data`引数は[view local](http://sailsjs.org/documentation/concepts/Views/Locals.html): `data`としてアクセス可能です。



### 例

デフォルトのビューを使う:

```javascript
if ( req.param('amount') < 500 )
  return res.badRequest(
    'Transaction limit exceeded. Please try again with an amount less than $500.'
  );
}
```

カスタムのビュー使う:

```javascript
if ( req.param('amount') < 500 )
  return res.badRequest(
    'Transaction limit exceeded. Please try again with an amount less than $500.',
    'salesforce/leads/edit'
  );
}
```



### 備考
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。
>+ `res.badRequest()`は（ほかのユーザ側のレスポンスメソッドと同様に）編集や上書きが可能です。`/responses/badRequest.js`で定義されたレスポンスメソッドが実行されますが、これはSailsアプリケーションを生成する際に自動的に作成されます。`badRequest.js`が無いときはSailsは暗黙でデフォルトの振る舞いを利用します。
>+ このメソッドはバリデーションチェックに失敗し、 [`req.validate()`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)が呼び出された時に自動で呼びだされます。
>+　デフォルトではアプリケーションが本番環境で実行されている時(すなわち`process.env.NODE_ENV === 'production'`)に於いては特定のエラー(`err`)は除外されます。












<docmeta name="uniqueID" value="resbadRequest631019">
<docmeta name="displayName" value="res.badRequest()">
