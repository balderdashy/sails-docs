# .broadcast()

Broadcast a message to all sockets in a room.

```javascript
sails.sockets.broadcast(roomNames, data);
```

_Or:_
+ `sails.sockets.broadcast(roomNames, eventName, data);`
+ `sails.sockets.broadcast(roomNames, data, socketToOmit);`
+ `sails.sockets.broadcast(roomNames, eventName, data, socketToOmit);`


### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |        roomNames              | ((string)), ((Array))          | The name of one or more rooms to broadcast a message in (see [sails.sockets.join](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.join.html)).  To broadcast to individual sockets, use their IDs as room names.
| 2 |        _eventName_            | ((string?))          | Optional. Defaults to `'message'`.
| 3 |        data                   | ((json))          | The data to send in the message.
| 4 |        _socketToOmit_         | ((req?))          | Optional. If provided, the socket belonging to the specified socket request will *not* receive the message.  This is useful if you trigger the broadcast from a client, but don't want that client to receive the message itself (for example, sending a message to everybody else in a chat room).


### Example

```javascript
sails.sockets.broadcast('artsAndEntertainment', { msg: 'Hi there!' });
sails.sockets.broadcast(['artsAndEntertainment', 'currentEvents'], { msg: 'Hola!' });
```

### Notes
> + Be sure and check `req.isSocket === true` before passing in `req` as `socketToOmit`. For the socket to be omitted, the provided `req` must be from a socket request, not just any HTTP request.


<docmeta name="displayName" value=".broadcast()">
<docmeta name="pageType" value="method">

