# sails.sockets.blast()

Broadcast a message to all sockets connected to the server.

```javascript
sails.sockets.blast(data);
```

_Or:_
+ `sails.sockets.blast(eventName, data);`
+ `sails.sockets.blast(data, socketToOmit);`
+ `sails.sockets.blast(eventName, data, socketToOmit);`



### Usage

|   |          Argument           | Type                | Details                                                           |
|---| --------------------------- | ------------------- | ----------------------------------------------------------------- |
| 1 |        eventName            | ((string))          | Optional. Defaults to `'message'`.
| 2 |        data                 | ((*))               | The data to send in the message.
| 3 |        socketToOmit         | ((req))             | Optional. If provided, that requesting socket will **not** receive the message blasted out to everyone else.  Useful when the broadcast-worthy event is triggered by a requesting user who doesn't need to hear about it again.




### Example

In a controller action...

```javascript
sails.sockets.blast('user_logged_in', {
  msg: 'User #' + req.session.userId + ' just logged in.',
  user: {
    id: req.session.userId,
    username: req.session.username
  }
}, req);
```

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req` also exists for HTTP requests of course, so be sure and ensure `req.isSocket === true` before passing `req` into this method.
> + For backwards compatibility, this method accepts both `req` and `req.socket`, but `req` is preferred.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.


<docmeta name="displayName" value="sails.sockets.blast()">

