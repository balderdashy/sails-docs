# sails.sockets.broadcast( `roomName`, [`event`], `data`, [`socketToOmit`] )

Broadcast a message to a room.

```javascript
sails.sockets.broadcast(roomName, data);
```

_Or:_
+ `sails.sockets.broadcast(roomName, eventName, data);`
+ `sails.sockets.broadcast(roomName, data, socketToOmit);`
+ `sails.sockets.broadcast(roomName, eventName, data, socketToOmit);`


### Usage

|   |          Argument           | Type                | Details
| - | --------------------------- | ------------------- | -----------
| 1 |        roomName            | ((string))          | The room to broadcast a message in (see [sails.sockets.join](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.sockets/sails.sockets.join.html))
| 2 |        eventName            | ((string))          | Optional. Defaults to `'message'`.
| 3 |        data                 | ((*))               | The data to send in the message.
| 4 |        socketToOmit         | ((Socket))          | Optional. If provided, that socket will *not* receive the message.  This is useful if you trigger the broadcast from a client, but don't want that client to receive the message itself (for example, sending a message to everybody else in a chat room).


### Example

```javascript
sails.sockets.broadcast('artsAndEntertainment', { msg: 'Hi there!' });
```

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.

<docmeta name="uniqueID" value="sailssocketsbroadcast253997">
<docmeta name="displayName" value="sails.sockets.broadcast()">

