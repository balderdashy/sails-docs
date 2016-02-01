# sails.sockets.join()

一般的なroomをsocketでサブスクライブします。

### 使い方

```js
sails.sockets.join(socket, roomName);
```


|   | 引数   | 型        | 詳細 |
|---|------------|:-----------:|---------|
| 1 | `socket`   | ((string)) あるいは ((socket)) | サブスクライブするソケットソケットのIDまたはソケットオブジェクトで特定可能。
| 2 | `roomName` | ((string))  | ソケットがサブスクライブするroomの名前。roomが存在しなければ新規作成されます。

### 使用例

コントローラアクションで:

```javascript
subscribeToFunRoom: function(req, res) {
  var roomName = req.param('roomName');
  sails.sockets.join(req.socket, roomName);
  res.json({
    message: 'Subscribed to a fun room called '+roomName+'!'
  });
}
```

*備考:`req.socket`はアクションがソケットリクエストによってトリガーされた時にのみ有効です。例：`socket.get('/subscribeToFunRoom/someRoomName')`*

### 備考
> + ここでの"request socket"はアプリケーションレイヤーのWebSocket/Socket.ioコネクションを意味します。`req.socket`はHTTPリクエストにも存在しますが、これはその下のトランスポートレイヤーに存在するTCPソケットを表すものでこれとは違います。この方法で`req.socket`を使う前に`req.isSocket == true`であることを確認して下さい。

<docmeta name="uniqueID" value="sailssocketsjoin958690">
<docmeta name="displayName" value="sails.sockets.join()">

