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

# Pubsub convenience hooks
Documentation to come, see https://github.com/balderdashy/sails/blob/master/lib/pubsub.js for now.


# Need more?
The root Socket.io object is available globally in Sails via `sails.io`.  You can also access the currently connected socket in the request object, via `req.socket` in your controllers.