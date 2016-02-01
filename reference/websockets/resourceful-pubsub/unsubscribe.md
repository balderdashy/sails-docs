# .unsubscribe(`request`,`records`,[`contexts`])
### 目的
そのメソッド一つまたは複数のモデルインスタンスに対するソケットのサブスクライブを解除します。

|   |     説明     | 受け入れ可能なデータ型 | 必須か  |
|---|---------------------|---------------------|------------|
| 1 | リクエスト             | `Request object`    | はい        |
| 2 | レコード             | `[]`, `object`      | はい        |
| 3 | 寒サブスクライブ解除をするコンテキスト | `string`, `array` |  いいえ |

*備考*:`unsubscribe`はsocket.ioでの接続 (例：`io.socket.get()`など)のみで有効であり、HTTPでの接続(例：`jQuery.get()`)では*無効*です。

#### `context`

Pubsubのコンテキストに関しての議論は`.subscribe()`を御覧ください。この引数を省略すると全てのコンテキストに関してサブスクライブを解除します。

### 使用例
コントローラコード
```javascript
User.findOne({id: 123}).exec(function(err, userInstance) {
    User.unsubscribe(req.socket, userInstance);
});
```

<docmeta name="uniqueID" value="unsubscribe354769">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".unsubscribe()">

