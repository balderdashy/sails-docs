# sails.sockets.subscribers()

roomをサブスクライブしている全てのソケットのIDを取得します。

```javascript
sails.sockets.subscribers(roomName);
```

### 使い方

|   |          引数           | 型                | 詳細
| - | --------------------------- | ------------------- | -----------
| 1 |        roomName             | ((string))          | ソケットのIDを取得したいroomの名前。<br/>例: `'supportchat'`

### 使用例

```javascript
sails.sockets.subscribers('supportchat');
// => ['BetX2G-2889Bg22xi-jy', 'BTA4G-8126Kr32bi-za']
```

<!--

　書いてはみたものの取り除くことにしました。なぜならこれは不必要に複雑なので。
  これに関して詳しくはsails101/low-level-socketsを見てください。
  ~mike

```javascript
// Controller action

getRoomSubscribers: function(req, res) {
  if (!req.isSocket) return res.badRequest();
  if (!req.param('room')) return res.badRequest('No `room` specified- please specify the name of the room whose subscribers you want to look up.');

  var subscribers = sails.sockets.subscribers(room);
  return res.ok(require('util').format(
    'The "%s" room currently has %d subscribers: ',
    req.param('room'),
    subscribers.length,
    subscribers
  ));
}
```
-->



<docmeta name="uniqueID" value="sailssocketssubscribers65666">
<docmeta name="displayName" value="sails.sockets.subscribers()">

