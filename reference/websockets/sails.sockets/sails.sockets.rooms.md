# sails.sockets.rooms()
### Purpose
Get the list of all current socket rooms

### Overview
#### Parameters
None.
### Example Usage
```javascript
// Controller action

getRoomsList: function(req, res) {
    var roomNames = JSON.stringify(sails.sockets.rooms());
    res.json({
      message: 'A list of all the rooms: '+roomNames
    });
}
```

*Note: In Socket.io, all sockets are automatically subscribed to a global room with an empty name ('').  This room is not returned as part of the array in `sails.sockets.rooms`* 


<docmeta name="uniqueID" value="sailssocketsrooms183984">
<docmeta name="displayName" value="sails.sockets.rooms()">

