# .publishRemove( `{id}`,`attribute`, `idRemoved`, [`request`], [`options`] )
### 目的
関連付けられたレコードにモデルコレクションが削除された時に通知を発行します。例えば、`User`モデルが`Pet`モデルへの関連付けを持っていて、ユーザが１つまたは複数のペットを`pets`属性に持てるような場合で、ユーザとペットの関連付けが削除された時に`publishRemove`がコールされます。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | 更新されたレコードのID|   `int`, `string`    |   はい      |
| 2 | 関連付けられたレコードの属性       |   `string`              |   はい      |
| 3 | 関連付けを削除された関連レコードのID      |   `int`, `string` |   はい       |
| 4 | リクエスト      |   `request object` |   いいえ       |
| 5 | 追加のオプション |   `object` | いいえ |

`publishRemove()`はモデル識別子をイベント名として利用し、ソケットメッセージを送信します。メッセージは`.subscribe`モデルメソッドにを経由してサブスクライブをした全てのソケットに送信されます。

ソケットメッセージは以下のプロパティを含むオブジェクトです。:

+ **id** - モデルインスタンスの`id`属性
+ **verb**  - `"removedFrom"` (文字列)
+ **attribute** - 削除されたモデルあ属性の名前
+ **removedId** - 削除されたレコードのID

#### `request`
この引数が含まれていればそのリクエストに結びついているソケットは通知を*受け取りません*。

#### `options.noReverse`
`options.noReverse`に関しては`publishUpdate`のドキュメントをご覧ください。一般的にモデルに対してど記事の`publishRemove`実装を行っていないかぎりはこの引数を使うべきではありません。


<docmeta name="uniqueID" value="publishRemove468150">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishRemove()">

