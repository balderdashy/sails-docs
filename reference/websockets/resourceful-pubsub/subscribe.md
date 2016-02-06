# .subscribe()

リクエストしているソケットクライアントに一つまたは複数のデータベースレコード（すなわち、モデルインスタンス）をサブスクライブさせます。

### 使い方

```js
SomeModel.subscribe(req, ids);
```

_-あるいは-_

```js
SomeModel.subscribe(req, ids, contexts);
```

デフォルトでは（コンテキストが設定されていなければ）、クライアントは`.publishUpdate()`と`.publishDestroy()`、`.publishAdd()`、`.publishRemove()`で発信された全てのメッセージを受け取ります。

> **重要**:
>
> このファンクションは実際に_データベースとはやり取りしません_! 実際、リソースフルなPubSubのメソッドのうちどれもが行いません。これらは低レベルの`sails.sockets`の上に構築された簡易化された抽象化レイヤーであり、その目的はevents/rooms/namespacesを慣例的な名前で扱うことでアプリケーションを簡単でデバッグしやすくすることです。


|   | 引数   | 型         | 説明 |
|---|------------|:------------:|---------|
| 1 | `req`      | ((req))   | リクエストオブジェクト(`req`)です。このオブジェクトはアクションの中からのみ使えます。
| 2 | `ids`      | ((array))        | レコードのID（主キー）の配列
| 3 | `contexts` | ((array)) | オプションの変更タイプ（コンテキスト）の配列です。存在すれば、サブスクライブしているクライアントは与えられているタイプの変更に関係するメッセージのみを受け取ります。（例："destroy"コンテキストが指定されていればソケットは該当するレコードの `publishDestroy()`から発せられた通知のみを受け取ります。）一方、指定されていなければソケットはそのレコードに関連する全てのイベントを受け取ります。


*備考*:`subscribe`はsocket.ioでの接続 (例：`io.socket.get()`など)のみで有効であり、HTTPでの接続(例：`jQuery.get()`)では無効です。SailsでWebSocket/Socket.ioを使ってメッセージを送信するには[sails.io.jsソケットクライアントドキュメント](http://sailsjs.org/documentation/reference/web-sockets/socket-client)をご覧ください。 


### 使用例

```javascript
  subscribeToLouies: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest('Only a client socket can subscribe to Louies.  You, sir, appear to be something... _else_.');
    }
    
    // Let's say our client socket has a problem with people named "louie".
    
    // First we'll find all users named "louie" (or "louis" even-- we should be thorough)
    User.find({ or: [{name: 'louie'},{name: 'louis'}] }).exec(function(err, usersNamedLouie){
      if (err) {
        return res.negotiate(err);
      }
      
      // Now we'll use the ids we found to subscribe our client socket to each of these records'
      // "destroy" context.
      User.subscribe(req, _.pluck(usersNamedLouie, 'id'), ['destroy']);
      
      // Now any time a user named "louie" or "louis" is destroyed, our client socket will receive
      // a notification (as long as it stays connected anyways).
      
      // All done!  We could send down some data, but instead we send an empty response.
      // (although we're ok telling this vengeful client socket when our users get
      //  destroyed, it seems ill-advised to send him our Louies' sensitive user data.
      //  We don't want to help this guy to hunt them down irl.)
      return res.ok();
    });
  }
```


### Blueprintsと.subscribe()

デフォルトではblueprintの `find`と`findOne`のアクションは返ってきた全てのレコードをサブスクライブするよう`.subscribe()`をコールします。しかしながら、デフォルトでは`update`と`delete`のアクションはリクエストしているソケットにはメッセージを送信せず*その他の*接続されたソケットにのみ送信します。これは（例えば）`io.socket.update()`のコール元がサーバレスポンスを別々のクライアント再数度SDKのコールバックで扱えるようにするということを意図しています。*リクエストを送っているソケットを含めて*全てのソケットにメッセージを送るようにblueprintアクションに強制したい場合、`sails.config.blueprints.mirror`を`true`に設定して下さい。

### `context`とは何ですか?

サブスクライブする特定の*コンテキスト*（あるいはコンテキストの配列）を指定した場合、そのコンテキストとして受け取ったメッセージのみを受信します。例えば、`User.subscribe(socket, user, 'update')`は`publishUpdate`が`user`に関して呼びだされた時のみにメッセージを受信します。後に続くコールは累積されますので、`User.subscribe(socket, user, 'destroy')`を後で同じソケットに対して行った場合、ソケットは`publishUpdate`と`publishDestroy`の両方からのメッセージを受信します。

そのモデルのデフォルトのコンテキストをサブスクライブしたい場合、`context`は省略可能です。デフォルトのコンテキストはモデルクラスの`autosubscribe`プロパティで設定可能です。もし、`autosubscribe`が存在しなければコンテキストは`update`と`destroy`、`message` (カスタムのメッセージ用)、`add:*`、`remove:*`(関連付けられたモデルへのpublishAddとpublishRemoveメッセージ)となります。


<docmeta name="methodType" value="pubsub">
<docmeta name="displayName" value=".subscribe()">
