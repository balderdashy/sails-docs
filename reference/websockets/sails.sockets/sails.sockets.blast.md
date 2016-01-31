# blast()

Broadcast a message to all sockets connected to the server.

```javascript
sails.sockets.blast(data);
```

_Or:_
+ `sails.sockets.blast(eventName, data);`
+ `sails.sockets.blast(data, socketToOmit);`
+ `sails.sockets.blast(eventName, data, socketToOmit);`



### Usage

|   |         Argument           | Type                | Details                                                           |
|---|:-------------------------- | ------------------- |:----------------------------------------------------------------- |
| 1 |        _eventName_         | ((string?))         | Optional. Defaults to `'message'`.
| 2 |        data                | ((json))            | The data to send in the message.
| 3 |       _socketToOmit_       | ((req?))            | Optional. If provided, the socket associated with this socket request will **not** receive the message blasted out to everyone else.  Useful when the broadcast-worthy event is triggered by a requesting user who doesn't need to hear about it again.




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
> + Be sure and check `req.isSocket === true` before passing in `req` to this method. For the socket to be omitted, the current `req`  must be from a socket request, not just any HTTP request.


<docmeta name="displayName" value="blast()">

