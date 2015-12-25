# sails.sockets.emit( `socketIds`, [`event`], `data`)
### Purpose
Send a message to one or more sockets by ID.

### Overview
#### Parameters
|   |          Description        | Accepted Data Types | Required ? |
|---|-----------------------------|---------------------|------------|
| 1 |           IDs of sockets to receive message        | `string`, `array`            | Yes         |
| 2 |           Event name        | `string`            | No         |
| 3 |           Message data        | `object`            | Yes         |

### Example Usage
```javascript
// Controller action

sayHiToFriend: function(req, res) {
    var friendId = req.param('friendId');
    sails.sockets.emit(friendId, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
    res.json({
      message: 'Message sent!'
    });
}
```

### Notes
> + If the event name is not specified then the "message" event will be used by default. This would allow the target sockets to listen on the "message" event in order to react to the emit.




<docmeta name="displayName" value="sails.sockets.emit()">

