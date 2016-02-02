# .getId()

Parse the socket ID from an incoming socket request (`req`).

```javascript
sails.sockets.getId(req);
```

### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |           `req`             | ((req))             | A socket request (`req`).


Once acquired, the socket object's ID can be used to send direct messages to that socket (see [sails.sockets.broadcast](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.broadcast.html)).


### Example

```javascript
// Controller action
getSocketID: function(req, res) {
  if (!req.isSocket) {
    return res.badRequest();
  }

  var socketId = sails.sockets.getId(req);
  // => "BetX2G-2889Bg22xi-jy"

  sails.log('My socket ID is: ' + socketId);

  return res.json(socketId);
}
```


### Notes
> + Be sure and check `req.isSocket === true` before passing in `req`. This method does not work for HTTP requests!


<docmeta name="displayName" value=".getId()">
<docmeta name="pageType" value="method">

