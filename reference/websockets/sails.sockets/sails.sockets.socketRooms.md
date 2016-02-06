# sails.sockets.socketRooms( `socket` )
### 目的
ソケットがサブスクライブしているroomのリストを取得します。

### 概要
#### パラメータ
|   |          説明        | 受け入れ可能なデータ型 | 必須か |
|---|-----------------------------|---------------------|------------|
| 1 |           ソケット        | `object` | はい         |

### 利用例
```javascript
// コントローラアクション

getMyRooms: function(req, res) {
    var roomNames = JSON.stringify(sails.sockets.socketRooms(req.socket));
    res.json({
      message: 'I am subscribed to: '+roomNames
    });
}
```

### 備考
> + ここでの"request socket"はアプリケーションレイヤーのWebSocket/Socket.ioコネクションを意味します。`req.socket`はHTTPリクエストにも存在しますが、これはその下のトランスポートレイヤーに存在するTCPソケットを表すものでこれとは違います。この方法で`req.socket`を使う前に`req.isSocket == true`であることを確認して下さい。

<docmeta name="uniqueID" value="sailssocketssocketRooms270469">
<docmeta name="displayName" value="sails.sockets.socketRooms()">

