# sails.sockets.subscribers()

Get the IDs of all sockets subscribed to a room.

```javascript
sails.sockets.subscribers(roomName);
```

### Usage

|   |          Argument           | Type                | Details
| - | --------------------------- | ------------------- | -----------
| 1 |        roomName             | ((string))          | The name of the room whose socket ids should be retrieved. <br/> e.g. `'supportchat'`

### Example

```javascript
sails.sockets.subscribers('supportchat');
// => ['BetX2G-2889Bg22xi-jy', 'BTA4G-8126Kr32bi-za']
```

<!--

  Wrote this, then took this out because it's needlessly complex.
  See sails101/low-level-sockets for more like it.
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

