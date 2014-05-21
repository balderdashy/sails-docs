# req.isSocket

A flag indicating whether or not this request (`req`) originated from a Socket.io connection.


### Usage
```js
req.isSocket;
```

### Example
```javascript
if (req.isSocket){
  // You're a socket.  Do cool socket stuff.
}
else {
  // Just another HTTP request.
}
```

### Notes

> + Useful for allowing HTTP requests to skip calls to pubsub or WebSocket-centric methods like `subscribe()` or `watch()`  that depend on an actual Socket.io request.  This allows you to reuse backend code, using it for both WebSocket and HTTP clients.
> + As you might expect, `req.isSocket` doesn't need to be checked before running methods which **publish to other** connected sockets.  Those methods don't depend on the request, so they work either way.










<docmeta name="uniqueID" value="reqisSocket87074">
<docmeta name="displayName" value="req.isSocket">

