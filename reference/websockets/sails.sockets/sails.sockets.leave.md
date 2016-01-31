# leave()

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
  if (!req.isSocket) {
    return res.badRequest();
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

### Notes
> + In a multi-server environment, when calling `.leave()` with a socket ID argument, the callback function (`cb`) will be executed when the `.leave()` call completes _on the current server_.  This does not guarantee that other servers in the cluster have already finished running the operation.
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.



<docmeta name="displayName" value="leave()">

