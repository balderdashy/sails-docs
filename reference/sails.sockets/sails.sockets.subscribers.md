# sails.sockets.subscribers()

Get the IDs of all sockets subscribed to a room.



### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           Room name        | `string` | Yes         |

### Example Usage
```javascript
// Controller action

getRoomSubscribers: function(req, res) {
    var roomName = req.param('roomName');
    var subscribers = JSON.stringify(sails.sockets.subscribers());
    res.json({
      message: 'The subscribers are: '+subscribers
    });
}
```



<docmeta name="uniqueID" value="sailssocketssubscribers65666">
<docmeta name="displayName" value="sails.sockets.subscribers()">

