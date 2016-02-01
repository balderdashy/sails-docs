# .leave()

Unsubscribe a socket from a room.


```js
sails.sockets.leave(socket, roomName);
```

_Or:_
+ `sails.sockets.leave(socket, roomName, cb);`


### Usage

|   | Argument   | Type        | Details |
|---|------------|:-----------:|:--------|
| 1 | `socket`   | ((string)), ((req)) | The socket to be unsubscribed.  May be specified by the socket's id or a socket request (`req`).
| 2 | `roomName` | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.
| 3 | _`cb`_       | ((function?))| An optional callback which will be called when the operation is complete on the current server (see notes below for more information), or if fatal errors were encountered.  In the case of errors, it will be called with a single argument (`err`).


### Example

In a controller action:

```javascript
leaveFunRoom: function(req, res) {
  if ( _.isUndefined(req.param('roomName')) ) {
    return res.badRequest('`roomName` is required.');
  }
  
  if (!req.isSocket) {
    return res.badRequest('This endpoints only supports socket requests.');
  }
  
  var roomName = req.param('roomName');
  sails.sockets.leave(req, roomName, function(err) {
    if (err) {return res.serverError(err);}
    return res.json({
      message: 'Left a fun room called '+roomName+'!'
    });
  });
}
```


```javascript
kickSocketFromRoom: function(req, res) {
  if ( _.isUndefined(req.param('socketId')) || _.isUndefined(req.param('roomName')) ) {
    return res.badRequest('`socketId` and `roomName` are required.');
  }
  
  // Since this is using a socket id explicitly, instead of inferring one from `req`,
  // we don't have to check `isSocket`.  Note that `req` is not passed in-- instead we use a string socket id.
  sails.sockets.leave(req.param('socketId'), req.param('roomName'), function(err) {
    if (err) {return res.serverError(err);}
    return res.json({
      message: 'Socket:`'+req.param('socketId')+'` was kicked from room: `'+req.param('roomName')+'`.  No more fun, ever!'
    });
  });
}
```

### Notes
> + In a multi-server environment, when calling `.leave()` with a socket ID argument, the callback function (`cb`) will be executed when the `.leave()` call completes _on the current server_.  This does not guarantee that other servers in the cluster have already finished running the operation.
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.



<docmeta name="displayName" value="leave()">

