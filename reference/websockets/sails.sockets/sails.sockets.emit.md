# sails.sockets.emit( `socketIds`, [`event`], `data`)
### Purpose
Send a message to one or more sockets by id.

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
> + If the event name is not specified then the "message" event will be used by default. That means that target sockets listening for the `message` event in client-side code (e.g. `io.socket.on('message', function (data){ /* ... */ })`) will have that event handler triggered.
> + If _any_ of the target socket ids are unknown, an error is thrown (this error has a `code` property equal to `SAILS:HOOK:SOCKETS:NO_SUCH_SOCKET`).


<docmeta name="uniqueID" value="sailssocketsemit963182">
<docmeta name="displayName" value="sails.sockets.emit()">

