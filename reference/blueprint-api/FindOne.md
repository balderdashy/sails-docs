# 1件取り出す

モデルからレコードを1件、JSONオブジェクトとして取り出す。

```
GET /:model/:id
```

<!--
<table>
  <thead>
    <tr>
      <th colspan="2">Blueprint Routes</th>
    </tr>
    <tr>
      <th>Type</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>REST</td>
      <td>
        <code>GET /:modelIdentity/:id</code>
      </td>
    </tr>
    <tr>
      <td>Shortcut</td>
      <td>
        <code>GET /:modelIdentity/findOne/:id</code>
      </td>
    </tr>
  </tbody>
</table>
-->

**findOne()** blueprintアクションは(`:modelIdentity`として与えられた)モデルからレコードを1件JSONオブジェクトで取り出します。指定された`id`は欲しいレコードの[主キー](http://en.wikipedia.org/wiki/Unique_key)です。

アクションがリクエストを通じて呼びされた場合、リクエストを行ったソケットは返されたレコードをサブスクライブします。レコードが付加的に編集、削除された場合その旨を伝えるメッセージがソケットのクライアントに送られます。詳しくは[.subscribe()のドキュメント](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/subscribe.html)を御覧ください。


### パラメータ

 パラメータ                           | 型                                      | 詳細
 ---------------------------------- | --------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((number))<br/>*-or-*<br/>((string))    | レコードの主キー値 <br/><br/>例: `/product/7`
 callback                           | ((string))                              | 指定されていればJSONPレスポンスが（JSONの代わりに）送信されます。この名前のJavascript関数を、結果を一つ目の（そして唯一の）引数として実行します。<br/> <br/> 例:`?callback=myJSONPHandlerFn`

### 例
IDが1の購入を検索する。例:`http://localhost:1337/purchase/1`

#### ルート
`GET /purchase/1`


#### 想定されるレスポンス

 ```json
 {
   "amount": 49.99,
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 }
 ```

<docmeta name="uniqueID" value="FindOne259267">
<docmeta name="displayName" value="find one">
