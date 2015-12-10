# res.ok()

与えられたデータを使い、クライアントに200 ("OK")レスポンスを返します。リクエストに対するコンテンツネゴシエーションを行い、[`res.json()`](http://sailsjs.org/documentation/reference/res/res.json.html)または[`res.view()`](http://sailsjs.org/documentation/reference/res/res.view.html)を呼び出します。


### 使い方

```js
return res.ok();
```

_あるいは:_
+ `return res.ok(data);`
+ `return res.ok(data, pathToView);`


### 詳細

ほかのカスタムレスポンスモジュールと同じようにこのメソッドはカスタマイズ可能です。

デフォルトでこれは以下のように動作します:

+ リクエストが"[JSONを望んでいる](http://sailsjs.org/documentation/reference/req/req.wantsJSON.html)"場合（例えはリクエストがAJAXやWebSocketsその他cURLなどのRESTクライアントからのものである場合）、Sailsは与えられたエラーの`data`をJSONで返します。もし何の`data`も与えられていない時はデフォルトのレスポンスボディ（文字列の`"OK"`）が送信されます。
+ リクエストがJSONを望んで _いない場合_ （例:URLがブラウザに打ち込まれた場合）、Sailsはビューのうち1つを返そうとします。
  + 特定の`pathToView`が与えられているときはSailsはそのビューを返そうとします。
  + そうではなく`pathToView`が与えられて_いない時_Sailsは適切なviewを推測しようとします。（詳しくは [`res.view()`](http://sailsjs.org/documentation/reference/res/res.view.html)を御覧ください。）、もし適切なビューを見つけられない時Sailsは単にJSONを返します。
  + Sailsがビューを返すとき、`data`引数は[view local](http://sailsjs.org/documentation/concepts/Views/Locals.html): `data`としてアクセス可能です。



### 例

```javascript
return res.ok({
  name: 'Loïc',
  occupation: 'developer'
});
```


リクエストがAJAXから来ていた場合、上記の利用例に対しては以下のJSONを含んだレスポンスが送信されます:

```json
{
  "name": "Loïc",
  "occupation": "developer"
}
```


また、`res.ok()`がビューが予測可能な場所から呼び出された時はパラメータが`data`のローカルで利用可能な形でそのビューが提供されます。例えば`res.ok()`が`UserController.update`呼びだされた時には`views/user/update.ejs`を使って以下のビューが作成されます:

```html
<input type="text" placeholder="Name" value="<%= data.name %>"/>
<input type="text" placeholder="Occupation" value="<%= data.occupation %>"/>
```


`res.ok()`が呼び出された場所がコントローラアクションでない場合、慣習的なビューは予想されませんのでSailは代わりに単にJSONを返します:


最後に`pathToView`が2つ目の引数で指定された時にはSailsは推測をせずに常にそのビューを使います。例えば、以下の仕様例では`views/user/detail.ejs`にあるビューが利用されてコンパイルされ、レスポンスされます:

```javascript
return res.ok({
  name: 'Loïc',
  occupation: 'developer'
}, 'user/detail');
```



### 備考
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。
>+ `res.notFound()`は（ほかのユーザ側のレスポンスメソッドと同様に）編集や上書きが可能です。[`api/responses/ok.js`](http://sailsjs.org/documentation/anatomy/myApp/api/responses/ok.js.html),で定義されたレスポンスメソッドが実行されますが、これはSailsアプリケーションを生成する際に自動的に作成されます。`ok.js`が無いときはSailsは暗黙でデフォルトの振る舞いを利用します。
>+ このメソッドは[blueprint actions](http://sailsjs.org/documentation/reference/blueprint-api?q=blueprint-actions)が成功したリクエストに対するレスポンスを返す際に使われます。そのためそのため、この部分はレスポンスデータクライアントが望む特定の形式に整形する、すなわちデータをXMLにコンバートしたり、追加のオブジェクトにラップしたり（Ember向けに）するのに、最適な場所です。







<docmeta name="uniqueID" value="resok847363">
<docmeta name="displayName" value="res.ok()">
