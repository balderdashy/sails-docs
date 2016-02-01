# sails.sockets.emit( `socketIds`, [`event`], `data`)
### 目的
IDを使って、一つもしくは複数のソケットにメッセージを送信します。

### 概要
#### パラメータ
|   |          記述        | 入力できるデータ型 | 必須か |
|---|-----------------------------|---------------------|------------|
| 1 |          メッセージを受け取るソケットのID       | `string`, `array`            | はい         |
| 2 |           イベント名        | `string`            | いいえ         |
| 3 |           メッセージのデータ        | `object`            | はい         |

### 使用例
```javascript
// コントローラアクション

sayHiToFriend: function(req, res) {
    var friendId = req.param('friendId');
    sails.sockets.emit(friendId, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
    res.json({
      message: 'Message sent!'
    });
}
```

### 備考
> + イベント名が指定されていない時、"message"イベントがデフォルトで使われます。これによって対象のソケットが"message"イベントをリッスンすることで送信されたメッセージに反応することができます。



<docmeta name="uniqueID" value="sailssocketsemit963182">
<docmeta name="displayName" value="sails.sockets.emit()">

