# Realtime communication (aka Sockets)

### Overview

Sails apps support full-duplex realtime communication between the client and server.  This means that a client (e.g. a web browser page or tab) can maintain a persistent connection to a Sails app, and messages can be sent from client to server or from server to client at any time.  Two common uses of realtime communication are live chat implementations and multiplayer games.  Sails implements realtime on the server using the [socket.io](http://socket.io) library, and on the client using the [sails.io.js]() library.  Throughout the Sails documentation, the terms **socket** and **websocket** are commonly used to refer to a two-way, persistent communication channel between a Sails app and a client.

Communicating with a Sails app via sockets is similar to using AJAX, in that both methods allow a web page to interact with the server without refreshing.  However, sockets differ from AJAX in two important ways: first, a socket can stay connected to the server for as long as the web page is open, allowing it to maintain _state_ (AJAX requests, like all HTTP requests, are _stateless_).  Second, because of the always-on nature of the connection, a Sails app can send data down to a socket at any time (hence the "realtime" moniker), whereas AJAX only allows the server to respond when a request is made.

### Realtime model updates with resourceful pub-sub

Sockets making requests to Sails [blueprints](http://sailsjs.org/documentation/reference/blueprint-api) are automatically subscribed to realtime messages about the models they retrieve via the [resourceful pub-sub API](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).  You can also use this API in your custom controller actions to send out messages to clients interested in certain models.

##### Example

Connect a client-side socket to the server, subscribe to the `user` event, and request `/user` to subscribe to current and future User model instances.

```html
<!-- Simply include the sails.io.js script, and a client socket will be created for you -->
<script type"text/javascript" src="/js/dependencies/sails.io.js"></script>
<script type"text/javascript">
// The automatically-created socket is exposed as io.socket.
// Use .on() to subscribe to the 'user' event on the client.
// This event is sent by the Sails "create", "update",
// "delete", "add" and "remove" blueprints to any socket that
// is subscribed to one or more User model instances.
io.socket.on('user', function gotHelloMessage (data) {
  console.log("User alert!", data);
});
// Using .get('/user') will retrieve a list of current User models,
// subscribe this socket to those models, AND subscribe this socket
// to notifications about new User models when they are created.
io.socket.get('/user', function gotResponse(body, response) {
  console.log("Current users: ", body);
})
</script>
```

### Realtime communication using low-level methods

Sails exposes a rich API on both the client and the server for sending custom realtime messages.

##### Example

Connect a client-side socket to the server, subscribe to the `hello` event, and contact the server.

```html
<!-- Simply include the sails.io.js script, and a client socket will be created for you -->
<script type"text/javascript" src="/js/dependencies/sails.io.js"></script>
<script type"text/javascript">
// The automatically-created socket is exposed as io.socket.
// Use .on() to subscribe to the 'hello' event on the client
io.socket.on('hello', function gotHelloMessage (data) {
  console.log("Socket " + data.id + "joined the party!");
});
// Use .get() to contact the server
io.socket.get('/say/hello', function gotResponse(body, response) {
  console.log("Server responded with status code " + response.statusCode + " and data: ", body);
})
</script>
```

Respond to a `/say/hello` request on the server by subscribing the requesting socket to the "funSockets" room, then broadcast a "hello" message to all sockets in that room (including the new one)

```javascript
// In /api/controllers/SayController.js
module.exports = {
  hello: function(req, res) {
    // Make sure this is a socket request
    if (!req.isSocket) {return res.badRequest();}
    // Have the socket join the "funSockets" room
    sails.sockets.join(req.socket, "funSockets");
    // Broadcast a "hello" message to all the fun sockets.
    // This message will be sent to all sockets in the "funSockets" room,
    // but will be ignored by any clients that have not done `.on('hello', ...)`
    sails.sockets.broadcast("funSockets", "hello", {id: req.socket.id});
    // Respond to the request with an a-ok message
    res.send("a-ok!");
  }
}
```

### Reference

* See the full reference for the [sails.io.js library]() to learn how to use sockets on the client side to communicate with your Sails app.
* See the [sails.sockets](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) reference to learn how to send messages from the server to connected sockets
* See the [resourceful pub-sub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub) reference to learn how to use Sails blueprints to automatically send realtime messages about changes to your [models](http://sailsjs.org/documentation/concepts/models-and-orm/models).
* Visit the [Socket.io](http://socket.io) website to learn more about the underlying library Sails uses for realtime communication
