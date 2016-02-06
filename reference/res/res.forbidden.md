# res.forbidden()

このメソッドは[403](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error)("Forbidden")レスポンスを返してクライアントにれクエストが許可されていないことを伝えます。これは通常ユーザエージェントが、例えば他人のパスワードを変えるような、なにか許可されていないことを行ったということを意味します。


### Usage

```js
return res.forbidden();
```

_あるいは:_
+ `return res.forbidden(data);`
+ `return res.forbidden(data, pathToView);`


### 詳細

ほかのカスタムレスポンスモジュールと同じようにこのメソッドはカスタマイズ可能です。

デフォルトでこれは以下のように動作します:

+ リクエストが"[JSONを望んでいる](http://sailsjs.org/documentation/reference/req/req.wantsJSON.html)"場合（例えはリクエストがAJAXやWebSocketsその他cURLなどのRESTクライアントからのものである場合）、Sailsは与えられたエラーの`data`をJSONで返します。もし何の`data`も与えられていない時はデフォルトのレスポンスボディ（文字列の`"Forbidden"`）が送信されます。
+ リクエストがJSONを望んで _いない場合_ （例:URLがブラウザに打ち込まれた場合）、Sailsはビューのうち1つを返そうとします。
  + 特定の`pathToView`が与えられているときはSailsはそのビューを返そうとします。
  + そうではなく`pathToView`が与えられて_いない時_Sailsは適切なviewを推測しようとします。（詳しくは[`views/403.ejs`](http://sailsjs.org/documentation/anatomy/myApp/views/403.ejs.html)を御覧ください。）、もし適切なビューを見つけられない時Sailsは単にJSONを返します。
  + Sailsがビューを返すとき、`data`引数は[view local](http://sailsjs.org/documentation/concepts/Views/Locals.html): `data`としてアクセス可能です。



### 例

デフォルトのビューを使って:

```javascript
if ( !req.session.canEditSalesforceLeads ) {
  return res.forbidden('Write access required');
}
```

カスタムビューで:

```javascript
if ( !req.session.canEditSalesforceLeads ) {
  return res.forbidden(
    ''Write access required'',
    'salesforce/leads/edit'
  );
}
```



### 備考
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。
>+ `res.forbidden()`は（ほかのユーザ側のレスポンスメソッドと同様に）編集や上書きが可能です。`/responses/forbidden.js`で定義されたレスポンスメソッドが実行されますが、これはSailsアプリケーションを生成する際に自動的に作成されます。`forbidden.js`が無いときはSailsは暗黙でデフォルトの振る舞いを利用します。
>+ `pathToView`がっ存在しないビューを示している場合、このメソッドはリクエストが「JSONを望んでいる」ように振る舞います。
>+　デフォルトではアプリケーションが本番環境で実行されている時(すなわち`process.env.NODE_ENV === 'production'`)に於いては特定のエラー(`err`)は除外されます。






<docmeta name="uniqueID" value="resforbidden97443">
<docmeta name="displayName" value="res.forbidden()">
