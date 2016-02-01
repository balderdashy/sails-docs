# .watch(`request`)

### 目的
モデルに対するpublishCreateイベントをサブスクライブさせます。モデルクラスを「ウオッチ」している全てのソケットはblueprintの`create`メソッドを利用して作成された新しいモデルインスタンスを自動的にサブスクライブします。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | リクエスト   | `request object`  | はい        |

*備考*:`watch`はsocket.ioでの接続 (例：`io.socket.get()`など)のみで有効であり、HTTPでの接続(例：`jQuery.get()`)では*無効*です。

### Blueprintsと.watch()
> デフォルトではblueprintの`find`と`findOne`アクションがモデルクラスの`.watch()`をコールします。この振る舞いはモデル設定で`sails.config.blueprints.autoWatch`を`false`にすることや、特定のモデルのモデルクラスファイルの`autoWatch`を`false`にすることで変更ができます。 


<docmeta name="uniqueID" value="watch67265">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".watch()">

