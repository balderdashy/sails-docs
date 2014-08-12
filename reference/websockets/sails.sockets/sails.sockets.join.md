# sails.sockets.join()

Subscribes a socket to a generic room.

### Usage

```js
sails.sockets.join(socket, roomName);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|---------|
| 1 | `socket`   | ((string)) -or- ((socket)) | The socket to be subscribed.  May be specified by the socket's id or a raw socket object.
| 2 | `roomName` | ((string))  | The name of the room to which the socket will be subscribed.  If the room does not exist yet, it will be created.

### Example

In a controller action:

```javascript
subscribeToFunRoom: function(req, res) {
  var roomName = req.param('roomName');
  sails.sockets.join(req.socket, roomName);
  res.json({
    message: 'Subscribed to a fun room called '+roomName+'!'
  });
}
```

*Note: `req.socket` is only valid if the action is triggered via a socket request, e.g. `socket.get('/subscribeToFunRoom/someRoomName')`*

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.

<docmeta name="uniqueID" value="sailssocketsjoin958690">
<docmeta name="displayName" value="sails.sockets.join()">

