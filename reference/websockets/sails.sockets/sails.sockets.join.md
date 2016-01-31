# join()

Subscribe a socket to a room.

```js
sails.sockets.join(socket, roomName);
```

_Or:_
+ `sails.sockets.join(socket, roomName, cb);`


### Usage

|   | Argument   | Type        | Details |
|---|------------|:-----------:|:--------|
| 1 | `socket`   | ((string)), ((req)) | The socket to be subscribed.  May be specified by the socket's id or an incoming socket request (`req`).
| 2 | `roomName` | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.
| 3 | _`cb`_       | ((function?))| An optional callback which will be called when the operation is complete on the current server (see notes below for more information), or if fatal errors were encountered.  In the case of errors, it will be called with a single argument (`err`).


### Example

In a controller action:

```javascript
subscribeToFunRoom: function(req, res) {
  if (!req.isSocket) {
    return res.badRequest();
  }

  var roomName = req.param('roomName');
  sails.sockets.join(req, roomName, function(err) {
    if (err) {
      return res.serverError(err);
    }
    
    return res.json({
      message: 'Subscribed to a fun room called '+roomName+'!'
    });
  });
}
```

### Notes
> + Every socket is automatically subscribed to a room with its ID as the name, allowing direct messaging to a socket via [`sails.sockets.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast)
> + In a multi-server environment, when calling `.join()` with a socket ID argument, the callback function (`cb`) will be executed when the `.join()` call completes _on the current server_.  This does not guarantee that other servers in the cluster have already finished running the operation.
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.


<docmeta name="displayName" value="join()">

