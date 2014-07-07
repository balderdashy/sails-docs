# sails.sockets.unsubscribeFromFirehose()

Unsubscribe from the firehose.

```javascript
sails.sockets.unsubscribeFromFirehose(socket);
```

### Usage

|   |          Argument           | Type                | Details
| - | --------------------------- | ------------------- | -----------
| 1 |           socket            | ((Socket))          | A request socket (WebSocket/Socket.io) object <br/> e.g. `req.socket`.

### Example
```javascript
// Controller action

disableDebugMode: function(req, res) {
  if (!req.isSocket) return res.badRequest();
  sails.sockets.unsubscribeFromFirehose(req.socket);
  return res.ok();
}
```


### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.


<docmeta name="uniqueID" value="sailssocketsunsubscribeFromFirehose999488">
<docmeta name="displayName" value="sails.sockets.unsubscribeFromFirehose()">
<docmeta name="advanced">
