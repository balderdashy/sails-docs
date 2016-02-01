# sails.sockets.id()

リクエストのソケットオブジェクトのIDを取得します。

```javascript
sails.sockets.id(socket);
```

### 使い方

|   |          引数           | 型                | 詳細
| - | --------------------------- | ------------------- | -----------
| 1 |           socket            | ((Socket))          | リクエストのソケット(WebSocket/Socket.io)オブジェクト<br/> 例: `req.socket`.


ソケットオブジェクトのIDを一旦取得すると、それを使ってそのソケットへのダイレクトメッセージを送信（[sails.sockets.emit](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html)を御覧ください）したり、そのソケットがサブスクライブしているルームの情報を取得（(see [sails.sockets.socketRooms](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.rooms.html)を御覧ください）できます。


### 使用例
```javascript
// Controller action

getSocketID: function(req, res) {
  if (!req.isSocket) return res.badRequest();

  var socketId = sails.sockets.id(req.socket);
  // => "BetX2G-2889Bg22xi-jy"

  return res.ok('My socket ID is: ' + socketId);
}
```


### 備考
> + ここでの"request socket"はアプリケーションレイヤーのWebSocket/Socket.ioコネクションを意味します。`req.socket`はHTTPリクエストにも存在しますが、これはその下のトランスポートレイヤーに存在するTCPソケットを表すものでこれとは違います。この方法で`req.socket`を使う前に`req.isSocket == true`であることを確認して下さい。

<docmeta name="uniqueID" value="sailssocketsid240053">
<docmeta name="displayName" value="sails.sockets.id()">
