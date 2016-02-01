# .message( `models`,`data`, [`request`] )
### 目的
モデルのサブスクライバに対してカスタムのメッセージを送信します。

|   |     説明     | 受け入れ可能なデータ型 | 必須か |
|---|---------------------|---------------------|------------|
| 1 | メッセージを送るレコード（またはレコードのID）|   `int`, `string`, `object`    |   はい      |
| 2 | メッセージ内容      |   `object`              |    はい     |
| 3 | リクエスト      |   `request object` |   いいえ       |

`message()`はモデル識別子をイベント名として利用し、ソケットメッセージを送信します。メッセージは`.subscribe`モデルメソッドにを経由してサブ浮くライブをした全てのソケットに送信されます。

ソケットメッセージは以下のプロパティを含むオブジェクトです。:

+ **id** - モデルインスタンスの`id`属性
+ **verb**  - `"messaged"` (文字列)
+ **data** - メッセージの内容

#### `data`
サブスクライブしているソケットに送信する任意のデータ

#### `request`
この引数が含まれていればそのリクエストに結びついているソケットは通知を*受け取りません*。

<docmeta name="uniqueID" value="message373731">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".message()">

