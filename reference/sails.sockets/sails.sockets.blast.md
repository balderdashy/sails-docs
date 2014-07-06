# sails.sockets.blast( [`event`], `data`, [`socketToOmit`] )
### Purpose
Broadcast a message to all connected sockets.

### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Event Name        | `string`            | No         |
| 2 |           Message Data        | `object`            | Yes         |
| 3 |           Socket to skip        | `object`            | No         |

 If the event name is omitted, `"message"` will be used by default.  Thus, `sails.sockets.broadcast(roomName, data)` is also a valid usage.
 
 If `socketToOmit` is provided, that socket will *not* receive the message.

### Example Usage
```javascript
// Controller action

sayHiToEverybody: function(req, res) {
    sails.sockets.blast({msg: "User #"+req.session.userId+" logged on."}, req.socket);
    res.json({
      message: 'Message sent!'
    });
}
```

```javascript
// Client-side -- subscribe to all "message" events
socket.on('message', function(data) {console.log("Global message: ", data.msg)});
```

<docmeta name="uniqueID" value="sailssocketsblast345475">
<docmeta name="displayName" value="sails.sockets.blast( [`event`], `data`, [`socketToOmit`] )">

