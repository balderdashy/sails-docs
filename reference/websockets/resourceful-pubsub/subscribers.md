# .subscribers(`record`,[`contexts`])

### 目的
`record`を購読しているソケットの配列を返します。これは[`sails.sockets.emit`](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html)のような低レベルのメソッドと一緒に使ってカスタムメッセージを特定のソケット群に送信したり、 [`.subscribe`](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/subscribe.html)と一緒に使ってソケット群に新しいインスタンスをサブスクライブさせることができます。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | レコード   | ((object)), ((integer)), ((string))  | はい        |
| 2 | サブスクライブしているコンテキスト | ((string)), ((array)) |  いいえ |

*備考*: `record`にはモデルのインスタンスか主キーが利用できます。

#### `context`

特定のコンテキスト（あるいはコンテキストの配列）を指定した場合、レコードに関してそのコンテキストをサブスクライブしているソケットのみを取得できます。

### 利用例
コントローラのコード
```javascript
    // ユーザ#1を探す
    User.findOne(1).exec(function(e,userOne){
        // ユーザ#1をサブスクライブしている全てのソケットを取得する
        var subscribers = User.subscribers(userOne);
        // ユーザ#1の親友も同様にサブスクライブする。
        _.each(subscribers, function(subscriber) {
           User.subscribe(subscriber, userOne.bestFriendId);
        });
    });

```
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".subscribers()">
