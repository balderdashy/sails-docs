# .unwatch(`request`)

### 目的
モデルのpublishCreateに対してクライアントをサブスクライブ解除します。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | リクエスト   | `request object`  | はい        |

*備考*:`unwatch`はsocket.ioでの接続 (例：`io.socket.get()`など)のみで有効であり、HTTPでの接続(例：`jQuery.get()`)では*無効*です。


<docmeta name="uniqueID" value="unwatch872661">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".unwatch()">

