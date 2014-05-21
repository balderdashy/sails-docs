# sails.sockets.broadcast( `roomName`, [`event`], `data`, [`socketToOmit`] )
### Purpose
Broadcast a message to a room.

### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Room Name        | `string`            | Yes         |
| 2 |           Event Name        | `string`            | No         |
| 3 |           Message Data        | `object`            | Yes         |
| 4 |           Socket to skip        | `object`            | No         |

 If the event name is omitted, `"message"` will be used by default.  Thus, `sails.sockets.broadcast(roomName, data)` is also a valid usage.
 
 If `socketToOmit` is provided, that socket will *not* receive the message.  This is useful if you trigger the broadcast from a client, but don't want that client to receive the message itself (for example, sending a message to everybody else in a chat room).

### Example Usage
```javascript
// Controller action

sayHiToFunRoom: function(req, res) {
    var room = req.param('roomName');
    sails.sockets.broadcast(room, 'chat', {msg: 'Hi there!', from: req.session.userId, room: room}, req.socket);
    res.json({
      message: 'Message sent!'
    });
}
```

```javascript
// Client-side -- subscribe to all "chat" events
socket.on('chat', function(data) {console.log("Chat from user #", data.from, " in room ", data.room, ": ", data.msg)});
```

<docmeta name="uniqueID" value="sailssocketsbroadcast253997">
<docmeta name="displayName" value="sails.sockets.broadcast( `roomName`, [`event`], `data`, [`socketToOmit`] )">

