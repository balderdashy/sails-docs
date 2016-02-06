# sails.sockets.blast()

サーバに接続された全てのソケットにメッセージを送信します。

```javascript
sails.sockets.blast(data);
```

_あるいは:_
+ `sails.sockets.blast(eventName, data);`
+ `sails.sockets.blast(data, socketToOmit);`
+ `sails.sockets.blast(eventName, data, socketToOmit);`



### 使い方

|   |          引数           | 型                | 詳細
| - | --------------------------- | ------------------- | -----------
| 1 |        eventName            | ((string))          | オプション、デフォルトでは`'message'`
| 2 |        data                 | ((*))               | メッセージとして送信されるデータ。
| 3 |        socketToOmit         | ((Socket))          | オプション。存在する場合、リクエストメソッドは他からblastされたメッセージを受信 **しません**。ブロードキャストに値するデータが、それらを再び受信する必要のないユーザによってトリガーされた時に便利です。 




### 使用例

コントローラアクションで。。。

```javascript
sails.sockets.blast('user_logged_in', {
  msg: 'User #' + req.session.userId + ' just logged in.',
  user: {
    id: req.session.userId,
    username: req.session.username
  }
}, req.socket);
```

### 備考
> + ここでの"request socket"はアプリケーションレイヤーのWebSocket/Socket.ioコネクションを意味します。`req.socket`はHTTPリクエストにも存在しますが、これはその下のトランスポートレイヤーに存在するTCPソケットを表すものでこれとは違います。この方法で`req.socket`を使う前に`req.isSocket == true`であることを確認して下さい。

<docmeta name="uniqueID" value="sailssocketsblast345475">
<docmeta name="displayName" value="sails.sockets.blast()">

