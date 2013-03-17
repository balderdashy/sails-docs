# Automatic socket support
Out of the box, Sails handles Socket.io requests the same way it handles HTTP requests-- through the Express interface.  It does this by creating a fake Express request and automatically routing the socket requests to the proper controller and action.  For instance, here is a simple controller:

```javascript
// api/controllers/EchoController.js

module.exports = {
  index: function (req,res) {
    // Get the value of a parameter
    var param = req.param('message');

    // Send a JSON response
    res.json({
      success: true,
      message: param
    });
  }
};
```

From an HTML page, we can access our controller like so:

```javascript
var socket = io.connect('http://localhost:1337');
socket.request('/echo',{
  message: 'hi there!'
}, function (response) {
  // response === {success: true, message: 'hi there!'}
});
```


# Blueprints
The default API blueprint supports pubsub for socket requests out of the box.  So for instance if you create a model called User, then send a socket.io message to the server from the client requesting a list of users, the client will be automatically subscribed to changes to the users collection for the remainder of the connection:

```javascript
var socket = io.connect('http://localhost:1337');
socket.request('/user',{}, function (response) {
  // response contains a list of all users
});
```

Similarly, creating, updating, and destroying models using the blueprint can be accessed just like they are via HTTP, and events will be automatically broadcasted to the other subscribed sockets.  All without writing any code!  

# Built-in socket methods
In controllers, when handling a socket request, req and res are automatically set up to take the appropriate actions using Socket.io instead of Express.  `req.socket` contains a raw reference to the underlying socket.io socket.  The following extra socket.io specific methods are also appended to the req and res objects:


### req.listen(room)
Subscribe the current socket to broadcasts from the specified room
e.g. `req.listen('off the wall chats')`

### res.broadcast(room, uri, data)
Broadcast a JSON message to all connected sockets in the specified room.
e.g. `req.broadcast('off the wall chats', 'chat/create', {message: 'who is going out tonight?', user: {id: 3, username: 'Roscoe'}, id: 283})`

The broadcasted JSON looks like this:
```json
{
  "uri": uri,
  "data": data
}
```

# Pubsub convenience hooks
Since models are automatically furnished with a collection-wide "class room" and an "instance room" for each instance, it gives us some interesting opportunities to offer convient accessor methods for performing common publish/subscribe operations.  Check out some of the socket-oriented convenience methods you can use.


### Model.subscribe(req, models)
Subscribe the request object's socket (`req`) to the specified `models`
e.g. `User.subscribe(req,[{id: 7}])`

### Model.unsubscribe(req, models)
Unsubscribe the request object's socket (`req`) from the specified `models`
e.g. `User.unsubscribe(req,[{id: 7}, {id: 2}])`

### Model.introduce(req,id)
Take all of the class room models and 'introduce' them to a new instance room
(good for when a new instance is created-- connecting sockets must subscribe to it)
e.g. `User.introduce(req,3)`

### Model.publish(req,models,message)
Broadcast a `message` to sockets connected to the specified `models` using the request object (`req`).
e.g. `User.publish(req,[{id: 7},{id: 2}], {latitude: 31.2325, longitude: 22.1135})`

### Model.room(id)
Return the room name for the instance in this collection with the given id
e.g. `User.room(3)`

### Model.subscribers(id)
Return the set of sockets subscribed to this instance (if id specified) or class room (if it's not)
e.g. `User.subscribers(7)`

See https://github.com/balderdashy/sails/blob/master/lib/pubsub.js for implementation details.


# Need more?
The root Socket.io object is available globally in Sails via `sails.io`.  You can also access the currently connected socket in the request object, via `req.socket` in your controllers.