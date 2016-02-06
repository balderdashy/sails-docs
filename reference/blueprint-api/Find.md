# レコードを検索する

モデル上のレコードのリストをオブジェクトのJSON配列として返します。

```
GET /:model
```

結果に対してはリクエストとして送られたパラメータとblueprintの設定（のずれかまたは両方）によってフィルター、ページ分け、並び替えが行われます。

アクションがリクエストを通じて呼びされた場合、リクエストを行ったソケットは返された全てのレコードをサブスクライブします。レコードが付加的に編集、削除された場合その旨を伝えるメッセージがソケットのクライアントに送られます。詳しくは[Model.subscribe()のドキュメント](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts)を御覧ください。


### パラメータ

_ 全てのパラメータはオプショナルです。 _

 パラメータ       | 型           | 詳細
 -------------- | ------------ |:---------------------------------
 *              | ((string))   | モデルで定義されたものと同名の属性を指定することで属性に応じて結果をフィルターします。<br/> <br/> 例えば`Purchase`モデルが **amount** 属性を持っていた場合、`GET /purchase?amount=99.99` と送信することで$99.99の購入のリストが取得できます。
 where          | ((string))   | 特定の属性でフィルタする代わりに`where`パラメータを _JSON文字列にエンコードされた_ Waterline WHERE条件オブジェクトで与えることが出来ます。 これによって`contains`、`startsWith`などのサブ属性の強みを活かして更に強力な`find()`を実現することが出来ます。 <br/> <br/> 例: `?where={"name":{"contains":"theodore"}}`
 limit          | ((number))   | 返すレコード数の最大値(ページ分けに便利です)。デフォルトは30です。<br/> <br/> 例:`?limit=100`
 skip           | ((number))   | スキップしたいページ数(ページ分けに便利です)。 <br/> <br/> 例: `?skip=30`
 sort           | ((string))   | 並べ替えをします。デフォルトでは返されたレコードは主キーの昇順で並べられます。<br/> <br/> 例:`?sort=lastName%20ASC`
 populate       | ((string))   | 指定されていればデフォルトの自動ポピュレーションプロセスを上書きします。ポピュレートしたいレコード値をコンマ区切りの属性名で受け付けます。返されたレコードのリストに対してモデルに設定されたアソシエーションに応じてどのように値を満たしていくのかに関して更に詳しくは[こちら](http://sailsjs.org/documentation/reference/waterline-orm/populated-values)をご覧ください。
 callback       | ((string))   | 指定されていればJSONPレスポンスが（JSONの代わりに）送信されます。この名前のJavascript関数を、結果を一つ目の（そして唯一の）引数として実行します。<br/> <br/> 例:`?callback=myJSONPHandlerFn`



### `find` の例

データベースの中から最新30件の購入を検索する。

```json
[
 {
   "amount": 49.99,
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 },
 {
   "amount": 99.99,
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }
]
```

**[jQuery](http://jquery.com/)を使う:**

```javascript
$.get('/purchase?sort=createdAt DESC', function (purchases) {
  console.log(purchases);
});
```

**[Angular](https://angularjs.org/)を使う:**

```javascript
$http.get('/purchase?sort=createdAt DESC')
.then(function (res) {
  var purchases = res.data;
  console.log(purchases);
});
```

**[sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js)を使う:**

```javascript
io.socket.get('/purchase?sort=createdAt DESC', function (purchases) {
  console.log(purchases);
});
```

**[cURL](http://en.wikipedia.org/wiki/CURL)を使う:**

```bash
curl http://localhost:1337/purchase?sort=createdAt%20DESC
```

### 備考

> + 上記の例では"rest"blueprintが有効であると仮定します。それに加えてあなたのプロジェクトが`PurchaseController`と`Purchase`モデルを持っているべきです。これを簡単に行うには以下を実行します:
>
>   ```bash
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   ```

<docmeta name="uniqueID" value="Find290807">
<docmeta name="displayName" value="find where">
