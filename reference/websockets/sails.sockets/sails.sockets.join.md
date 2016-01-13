# sails.sockets.join()

Subscribes a socket to a generic room.

### Usage

```js
sails.sockets.join(socket, roomName);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|---------|
| 1 | `socket`   | ((string)) -or- ((req)) -or- ((socket)) | The socket to be subscribed.  May be specified by the socket's id, a request socket object (`req.socket`), or a request containing such a socket (`req`).
| 2 | `roomName` | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.
| 3 | `cb`       | ((function))| An optional callback which will be called with a single argument `err`.

### Example

In a controller action:

```javascript
subscribeToFunRoom: function(req, res) {
  var roomName = req.param('roomName');
  sails.sockets.join(req.socket, roomName, function(err) {
    if (err) {return res.serverError(err);}
    res.json({
      message: 'Subscribed to a fun room called '+roomName+'!'
    });
  });
}
```

### Notes
> + Every socket is automatically subscribed to a room with its ID as the name, allowing direct messaging to a socket via [`sails.sockets.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast)
+ The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.


<docmeta name="displayName" value="sails.sockets.join()">

