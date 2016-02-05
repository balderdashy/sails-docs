# sails.sockets.subscribers()


> _**This method is deprecated**._
>
> If you absolutely need to retrieve the list of socket IDs in a room, you may use the lower-level `app.io.sockets.in(roomName).clients(cb)` method (see https://github.com/socketio/socket.io/#namespaceclientsfnfunction).
>
>However, be aware that in multi-server scenarios, that method will _not_ return IDs of sockets on other servers (at the time of writing, the current documentation on Socket.io's GitHub is out of date on that point).
>
>For the most common use-case of "taking all members of room A and subscribing/unsubscribing them to room B", you can use the [`sails.sockets.addRoomMembersToRooms`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/add-room-members-to-rooms) and [`sails.sockets.removeRoomMembersFromRooms`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/remove-room-members-from-rooms) methods, which _do_ work cross-server.


------------------------------

Get the IDs of all sockets subscribed to a room.

```javascript
sails.sockets.subscribers(roomName, cb);
```


### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |        roomName             | ((string))          | The name of the room whose socket IDs should be retrieved. <br/> e.g. `'supportchat'`.
| 2 |        cb             | ((function))          | Function to be called when the socket IDs have been retrieved.  The function should have two arguments: `err` and `socketIds`.


### Example

```javascript
sails.sockets.subscribers('supportchat', function(err, socketIds) {
  console.log(socketIds);
});
// => ['BetX2G-2889Bg22xi-jy', 'BTA4G-8126Kr32bi-za']
```

### Notes
> This method currently only operates on a _single server_.  If your Sails app is distributed over multiple servers (for example
  by using the [`socket.io-redis` adapter](https://github.com/socketio/socket.io-redis)), calling `.subscribers(roomName, cb)` will only
  retrieve the socket IDs of subscribers to `roomName` that are connected to the server making the call.

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




<docmeta name="displayName" value="sails.sockets.subscribers()">
<docmeta name="isDeprecated" value="true">
