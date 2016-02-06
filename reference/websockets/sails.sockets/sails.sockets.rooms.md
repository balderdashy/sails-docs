# sails.sockets.rooms()
### 目的
現在の全てのソケットroomの一覧を取得します。

### 概要
#### パラメータ
なし。
### 使用例
```javascript
// コントローラアクション

getRoomsList: function(req, res) {
    var roomNames = JSON.stringify(sails.sockets.rooms());
    res.json({
      message: 'A list of all the rooms: '+roomNames
    });
}
```

*備考：Socket.ioでは全てのソケットが自動的に空白の名前('')と名付けられたグローバルなroomをサブスクライブします。このroomは`sails.sockets.rooms`で返される配列には含まれません* 


<docmeta name="uniqueID" value="sailssocketsrooms183984">
<docmeta name="displayName" value="sails.sockets.rooms()">

