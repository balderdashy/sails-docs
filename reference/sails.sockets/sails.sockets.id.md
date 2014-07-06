# sails.sockets.id( `socket` )
### Purpose
Get the ID of a socket object.

### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Socket            | ((Socket))          | Yes        |

A socket object's ID can be used to send direct messages to that socket (see `sails.sockets.emit`) or get information about the rooms that the socket is subscribed to (see `sails.sockets.socketRooms`).


### Example Usage
```javascript
// Controller action

socketId: function(req, res) {
    res.json({
      message: 'My socket ID is: '+sails.sockets.id(req.socket)
    });
}
```

<docmeta name="uniqueID" value="sailssocketsid240053">
<docmeta name="displayName" value="sails.sockets.id()">

