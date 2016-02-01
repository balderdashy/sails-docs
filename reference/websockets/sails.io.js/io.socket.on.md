# io.socket.on()

指定された`eventIdentity`でSailsから発信されたサーバー側送信のイベントをリッスンし始めます。これは対応するイベントがトリガーされた時にコールバック関数をトリガーします。


### 使い方

```js
io.socket.on(eventIdentity, function (msg) {
  // ...
});
```

|   | 引数   | 型         | 詳細 |
|---|------------|:------------:|---------|
| 1 | `eventIdentity`      | ((string))   | サーバ側送信イベントのユニークな識別子。（例："recipe"）
| 2 | `callback` | ((function)) | このソケットにサーバがメッセージを送った時に呼び出されるコールバック

##### コールバック

|   | 引数  | 型         | 詳細 |
|---|-----------|:------------:|---------|
| 1 | `msg`     | ((object))        | Sailsサーバから送られたメッセージ


バックエンドのコントローラやモデル、サービスなどがメッセージをソケットに送信しないかぎりこのコールバックは呼び出されないということにご注意下さい。一般的にこれは以下の方法によって実現します。:

###### リソースフルなPubsubメソッド
+ サーバはSubscribeしているソケットにレコードに関してのメッセージをPublishします。([Model.publishUpdate()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishUpdate.html)と[Model.publishDestroy()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishDestroy.html)、[Model.subscribe()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/subscribe.html)を御覧ください)
+ サーバは許可されている全てのウォッチャーに対してモデルに`eventIdentity`と同じ識別子のレコードがツッカされた旨を通知します。([Model.publishCreate(http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishCreate.html)](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishCreate.html) と [Model.watch()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/watch.html)を御覧ください)

###### 低レベルでのソケットメソッド
+ サーバは既知のすべてのソケットに対してメッセージを送信します。([sails.sockets.blast()](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.blast.html)を御覧ください。)
+ サーバはソケットのユニーク識別子を使って特定のソケット(`io.socket`)にメッセージを送信します([sails.sockets.emit()](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html)を御覧ください。)
+ サーバはソケット(`io.socket`)が[join](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.join.html) することを許可されているroomに対してメッセージを[ブロードキャスト](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.broadcast.html)します。（ソケットは接続中に限り、つまりブラウザのタブが開いている間に限りサブスクライブするということを覚えておいて下さい）



### 例

既存のorderへの変更と新規のorderをListenする。:

```javascript
io.socket.on('order', function onServerSentEvent (msg) {
  // msg => {...whatever the server published/emitted...}
});
```

##### 別の例。今回はAngularを使って。:

> 備考:このAngularの例は同じポイントの`publishCreate()`をコールすることを想定しています。

```javascript
angular.module('cafeteria').controller('CheckoutCtrl', function ($scope) {

  $scope.orders = $scope.orders || [];

  if (!io.socket.alreadyListeningToOrders) {
    io.socket.alreadyListeningToOrders = true;
    io.socket.on('order', function onServerSentEvent (msg) {

      // Let's see what the server has to say...
      switch(msg.verb) {

        case 'created':
          $scope.orders.push(msg.data); // (add the new order to the DOM)
          $scope.$apply();              // (re-render)
          break;

        default: return; // ignore any unrecognized messages
      }
    });
  }
});
```

### 備考
>+ リソースフルなPubsubコースをListenしている時、`eventIdentity`はコールされているモデルのIdentityと一緒です。（例："UserComment"というモデルが有る場合、識別子は"usercomment"です。）
>+ コンテキストに関して。このようなサーバ側送信のイベントは["comet"](http://en.wikipedia.org/wiki/Comet_(programming))を参考にしていることがあります。

### ソケットの'Connect'と'Disconnect'イベントをハンドルする
サーバへのコネクションが阻害された時、つまりはサーバがリスタートしたりネットワークに問題が生じた時、これらのイベントをハンドルしてソケットをサブスクライブし直すことができます。
```javascript
  io.socket.on('connect', function(){
      io.socket.get('/messages');
      io.socket.get('/notifications/subscribe/statusUpdates');
  });

  io.socket.on('disconnect', function(){
      console.log('Lost connection to server');
  });
```


<docmeta name="uniqueID" value="socketon682488">
<docmeta name="displayName" value="io.socket.on()">
