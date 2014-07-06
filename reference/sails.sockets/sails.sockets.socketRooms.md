# sails.sockets.socketRooms( `socket` )
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



<docmeta name="uniqueID" value="sailssocketssocketRooms270469">
<docmeta name="displayName" value="sails.sockets.socketRooms( `socket` )">

