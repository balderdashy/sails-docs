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

> ## TODO
> fix this chart to look like the one in `sails.sockets.blast()`
>

|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Room Name        | `string`            | Yes         |
| 2 |           Event Name        | `string`            | No         |
| 3 |           Message Data        | `object`            | Yes         |
| 4 |           Socket to skip        | `object`            | No         |

 If the event name is omitted, `"message"` will be used by default.  Thus, `sails.sockets.broadcast(roomName, data)` is also a valid usage.

 If `socketToOmit` is provided, that socket will *not* receive the message.  This is useful if you trigger the broadcast from a client, but don't want that client to receive the message itself (for example, sending a message to everybody else in a chat room).




### Example

```javascript
sails.sockets.broadcast('artsAndEntertainment', { msg: 'Hi there!' });
```

Meanwhile, on the client...

```javascript
// Subscribe to all "chat" events
io.socket.on('chat', function (data) {
  // => { msg: 'Hi there!' }
})
```

<!--
```javascript
// Client-side -- subscribe to all "chat" events
socket.on('chat', function(data) {console.log("Chat from user #", data.from, " in room ", data.room, ": ", data.msg)});
```
-->

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.

<docmeta name="uniqueID" value="sailssocketsbroadcast253997">
<docmeta name="displayName" value="sails.sockets.broadcast()">

