# sails.sockets.leave()

Unsubscribe a socket from a generic room.

### Usage

```js
sails.sockets.leave(socket, roomName);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|---------|
| 1 | `socket`   | ((string)) -or- ((req)) -or- ((socket)) | The socket to be unsubscribed.  May be specified by the socket's id, a request socket object (`req.socket`), or a request containing such a socket (`req`).
| 2 | `roomName` | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.
| 3 | `cb`       | ((function))| An optional callback which will be called with a single argument `err`.

### Example

In a controller action:

```javascript
leaveFunRoom: function(req, res) {
    var roomName = req.param('roomName');
    sails.sockets.leave(req.socket, roomName, function(err) {
      if (err) {return res.serverError(err);}
      res.json({
        message: 'Left a fun room called '+roomName+'!'
      });
    });
}
```

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.




<docmeta name="displayName" value="sails.sockets.leave()">

