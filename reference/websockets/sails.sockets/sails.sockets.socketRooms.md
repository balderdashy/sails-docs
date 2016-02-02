# sails.sockets.socketRooms()

> _**This method is deprecated**.  Please keep track of your rooms in app-level code._

### Purpose
Get the list of rooms a socket is subscribed to

### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Socket        | `object` | Yes         |

### Example Usage
```javascript
// Controller action

getMyRooms: function(req, res) {
    var roomNames = JSON.stringify(sails.sockets.socketRooms(req.socket));
    res.json({
      message: 'I am subscribed to: '+roomNames
    });
}
```

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.


<docmeta name="displayName" value="sails.sockets.socketRooms()">
<docmeta name="isDeprecated" value="true">
