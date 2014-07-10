# sails.sockets.subscribeToFirehose()

Subscribe to the "firehose", which (while running in the development environment) broadcasts messages about _all_ model events.

```javascript
sails.sockets.subscribeToFirehose(socket);
```


### Usage

|   |          Argument           | Type                | Details
| - | --------------------------- | ------------------- | -----------
| 1 |           socket            | ((Socket))          | A request socket (WebSocket/Socket.io) object <br/> e.g. `req.socket`.


The firehose publishes messages using the "firehose" event. By default, messages will be published when a model instance is created, destroyed, or updated, or when an associated collection is added to or removed from.  The message content is similar to that for the [PubSub methods](#!documentation/reference/ModelMethods/ModelMethods.html) like `publishUpdate`, `publishCreate`, etc.


### Example
```javascript
// Controller action

enableDebugMode: function(req, res) {
  if (!req.isSocket) return res.badRequest();
  sails.sockets.subscribeToFirehose(req.socket);
  return res.ok();
}
```

### Notes
> + You can also subscribe to the firehose using only client-side code by making a socket GET request to `/firehose` (only enabled when `process.env.NODE_ENV==='development'`)
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.

<docmeta name="uniqueID" value="sailssocketssubscribeToFirehose954078">
<docmeta name="displayName" value="sails.sockets.subscribeToFirehose()">
<docmeta name="advanced">
