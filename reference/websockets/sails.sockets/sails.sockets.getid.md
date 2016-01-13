# sails.sockets.getId()

Gets the ID of a request socket object.

```javascript
sails.sockets.getId(socket);
```

### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |           socket            | ((Socket))          | A request socket (WebSocket/Socket.io) object <br/> e.g. `req.socket`.


Once acquired, the socket object's ID can be used to send direct messages to that socket (see [sails.sockets.broadcast](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.broadcast.html))


### Example
```javascript
// Controller action

getSocketID: function(req, res) {
  if (!req.isSocket) return res.badRequest();

  var socketId = sails.sockets.getId(req.socket);
  // => "BetX2G-2889Bg22xi-jy"

  return res.ok('My socket ID is: ' + socketId);
}
```


### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.


<docmeta name="displayName" value="sails.sockets.getId()">
