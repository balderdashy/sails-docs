# sails.sockets.blast()

Send a message to all sockets connected to the server.

```javascript
sails.sockets.blast(data);
```

Or:
+ `sails.sockets.blast(eventName, data);`
+ `sails.sockets.blast(eventName, data, socketToOmit);`

### Usage

|   |          Argument           | Type                | Details
| - | --------------------------- | ------------------- | -----------
| 1 |        eventName            | ((string))          | Optional. Defaults to `'message'`.
| 2 |        data                 | ((*))               | The data to send
| 3 |        socket to omit       | ((Socket))          | Optional. If provided, this socket will **not** receive the message blasted out to everyone else.




### Example
```javascript
// Controller action

sayHiToEverybody: function(req, res) {
    sails.sockets.blast({msg: "User #"+req.session.userId+" logged on."}, req.socket);
    res.json({
      message: 'Message sent!'
    });
}
```

```javascript
// Client-side -- subscribe to all "message" events
socket.on('message', function(data) {console.log("Global message: ", data.msg)});
```

### Notes
> + The phrase "request socket" here refers to an application-layer WebSocket/Socket.io connection.  `req.socket` also exists for HTTP requests, but it refers to the underlying TCP socket at the transport layer, which is different.  Be sure and ensure `req.isSocket == true` before using `req.socket` with this method.

<docmeta name="uniqueID" value="sailssocketsblast345475">
<docmeta name="displayName" value="sails.sockets.blast()">

