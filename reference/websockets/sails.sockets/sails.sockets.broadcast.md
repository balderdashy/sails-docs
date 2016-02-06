# sails.sockets.broadcast( `roomName`, [`event`], `data`, [`socketToOmit`] )

roomに対してメッセージをブロードキャストします。

```javascript
sails.sockets.broadcast(roomName, data);
```

_あるいは:_
+ `sails.sockets.broadcast(roomName, eventName, data);`
+ `sails.sockets.broadcast(roomName, data, socketToOmit);`
+ `sails.sockets.broadcast(roomName, eventName, data, socketToOmit);`


### 使い方

|   |          引数           | 型                | 詳細
| - | --------------------------- | ------------------- | -----------
| 1 |        roomName             | ((string))          | メッセージをブロードキャストするroom([sails.sockets.join](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.join.html)を御覧ください)
| 2 |        eventName            | ((string))          | オプション。デフォルトでは`'message'`。
| 3 |        data                 | ((object))          | メッセージとして送信されるデータ。
| 4 |        socketToOmit         | ((Socket))          | オプション。存在する場合、そのソケットはメッセージを受信*しません*。ブロードキャストがクライアントから発信されるものの、そのクライアント自身はそのメッセージを受信したくない時に便利です。（例えば、チャットルームの自分以外に対してメッセージを送信する場合など）


### 使用例

```javascript
sails.sockets.broadcast('artsAndEntertainment', { msg: 'Hi there!' });
```

### 備考
> + ここでの"request socket"はアプリケーションレイヤーのWebSocket/Socket.ioコネクションを意味します。`req.socket`はHTTPリクエストにも存在しますが、これはその下のトランスポートレイヤーに存在するTCPソケットを表すものでこれとは違います。この方法で`req.socket`を使う前に`req.isSocket == true`であることを確認して下さい。

<docmeta name="uniqueID" value="sailssocketsbroadcast253997">
<docmeta name="displayName" value="sails.sockets.broadcast()">
