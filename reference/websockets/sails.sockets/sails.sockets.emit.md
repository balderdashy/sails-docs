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

###### In a controller
```javascript
User.findOne({ id: req.session.userId }).exec(function (err, user) {
  if (err) {
    return res.negotiate(err);
  }
  
  try {
    sails.sockets.emit(req.param('friendSocketId'), 'privateMessage', {
      from: req.session.userId,
      msg: 'Hi!'
    });
    return res.ok();
  }
  // Notice that we use a `try/catch` here since we are inside an asynchronous
  // callback (and not using promises).  This is because the provided socket id
  // is coming in as a request parameter, and so cannot be trusted to necessarily exist.
  // If the socket id is unrecognized, `sails.sockets.emit()` throws an error-- and so
  // using a `catch` here allows us to handle that error.
  catch (e) {
    return res.negotiate(e);
  }
});
```

> **Warning:** If _any_ of the target socket ids are unknown, an error is thrown.  If you are calling `sails.sockets.emit()` in an asynchronous callback, but are not sure that the socket ids you are using still exist, _be sure_ to wrap the call in a try/catch to prevent crashing the server.


### Notes
> + If the event name is not specified then the "message" event will be used by default. That means that target sockets listening for the `message` event in client-side code (e.g. `io.socket.on('message', function (data){ /* ... */ })`) will have that event handler triggered.
> + If _any_ of the target socket ids are unknown, an error is thrown.


<docmeta name="uniqueID" value="sailssocketsemit963182">
<docmeta name="displayName" value="sails.sockets.emit()">

