# sails.sockets.leave( `socket`, `roomName` )
### 目的
一般的なroomからのサブスクライブ解除をします。

### 概要
#### パタメータ
|   |          説明        | 受け入れ可能なデータ型 | 必須か |
|---|-----------------------------|---------------------|------------|
| 1 | ソケットオブジェクト |      `object`       | はい        |
| 2 |           room名        | `string`            | はい         |

### 使用例
```javascript
// Controller action

leaveFunRoom: function(req, res) {
    var roomName = req.param('roomName');
    sails.sockets.leave(req.socket, roomName);
    res.json({
      message: 'Left a fun room called '+roomName+'!'
    });
}
```

*備考:`req.socket`はアクションがソケットリクエストによってトリガーされた時にのみ有効です。例：`socket.get('/subscribeToFunRoom/someRoomName')`*

### 備考
> + ここでの"request socket"はアプリケーションレイヤーのWebSocket/Socket.ioコネクションを意味します。`req.socket`はHTTPリクエストにも存在しますが、これはその下のトランスポートレイヤーに存在するTCPソケットを表すものでこれとは違います。この方法で`req.socket`を使う前に`req.isSocket == true`であることを確認して下さい。

<docmeta name="uniqueID" value="sailssocketsleave425459">
<docmeta name="displayName" value="sails.sockets.leave()">

