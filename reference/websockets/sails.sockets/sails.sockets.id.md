# sails.sockets.id()

Gets the ID of a request socket object.

```javascript
sails.sockets.id(socket);
```

### Usage

|   |          Argument           | Type                | Details
| - | --------------------------- | ------------------- | -----------
| 1 |           socket            | ((Socket))          | A request socket (WebSocket/Socket.io) object <br/> e.g. `req.socket`.


Once acquired, the socket object's ID can be used to send direct messages to that socket (see [sails.sockets.emit](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html)) or get information about the rooms that the socket is subscribed to (see [sails.sockets.socketRooms](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.sockets/sails.sockets.rooms.html)).


### Example
```javascript
// Controller action

getSocketID: function(req, res) {
  if (!req.isSocket) return res.badRequest();

  var socketId = sails.sockets.id(req.socket);
  // => "BetX2G-2889Bg22xi-jy"

  return res.ok('My socket ID is: ' + socketId);
}
```


### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.

<docmeta name="uniqueID" value="sailssocketsid240053">
<docmeta name="displayName" value="sails.sockets.id()">

