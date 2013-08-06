# Sockets / Pubsub
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

## Contents

Sails makes HTTP and Socket.io interoperable, making it easier than ever to add realtime/pubsub/comet functionality to your app.

1) Using standard controllers
2) Using the CRUD blueprints
3) Using the built-in pubsub methods (e.g. `User.publishCreate()`)
4) Using the low-level pubsub methods (`req.listen` and `req.broadcast`)
5) Accessing raw socket.io via `req.socket` and `sails.io`


## Using standard controllers

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
// socket is globalized by sails
socket.get('/echo',{
  message: 'hi there!'
}, function (response) {
  // response === {success: true, message: 'hi there!'}
});
```


## Using CRUD Blueprints
The default API blueprint supports pubsub for socket requests out of the box.  So for instance if you create a model called User, then send a socket.io message to the server from the client requesting a list of users, the client will be automatically subscribed to changes to the users collection for the remainder of the connection:

```javascript
socket.get('/user', function (response) {
  // response contains a list of all users
});
socket.post('/user',{name: 'foo'}, function (response) {
  // create a new user
});
socket.put('/user/1',{name: 'foobar'}, function (response) {
  // update the user
});
socket.delete('/user/1', function (response) {
  // delete the user
});
```

These calls will subscribe you to changes to the model, see your `assets/js/app.js` file to see default socket setup.



## Using built-in pubsub methods

Sails exposes some convenient accessor methods for performing common publish/subscribe operations.  The following methods may be used in your custom controllers to give you lower-level access to the same kind of realtime functionality you've seen in the blueprints.

Under the covers, Sails blueprints work their realtime magic by automatically furnishing models with a collection-wide "class room" and an "instance room" for each instance.  

##### The "class room"
If you have a visitor whose socket is subscribed to the "class room" (e.g. `User.subscribe( req.socket )`), she'll receive messages _any time_ `User.publishCreate()` is called.  

##### The "instance rooms"
If the visitor is subscribed to one or more "instance rooms" (e.g. `User.subscribe( req.socket, listOfUserInstances )` ), she'll receive messages when `User.publishUpdate()` or `User.publishDestroy()` is called involving one of the instances she cares about.

<!-- TODO -->
<!-- 

### req.socket.subscribeToUpdate( model[s] )
Subscribe the request object's socket (`req`) to the specified array of `models` or single model.
Your socket on the client will receive a message every time the specified user(s) are updated or destroyed.
e.g. `req.socket.subscribeToUpdate( [ {id: 7} ] )`

### req.socket.subscribeToDestroy( model[s] )
Subscribe the request object's socket (`req`) to the specified array of `models` or single model.
Your socket on the client will receive a message if the specified user(s) are destroyed.
They will be unsubscribed automatically afterwards.
e.g. `req.socket.subscribeToUpdate( [ {id: 7} ] )`

### req.socket.subscribeToCreate( Model )
Subscribe the request object's socket (`req`) to the collection
In the example below, our user's socket will receive a message in their browser every time a new user is **created**.
If a socket is subscribed to creates, it will also be automatically subscribed to update and destroy events for any new instances.
e.g. `req.socket.subscribeToCreate( User );

-->



> IMPORTANT NOTE: `Model.subscribe( req.socket, [])` is not the same as `Model.subscribe( req.socket )`.  The latter usage will subscribe to the "class room."  The former will subscribe to nothing!  This is because the presence of the second argument (in this case the empty list `[]`) signals to Sails that you're subscribing to instances, but in this case you've specified none!


### Model.subscribe( req.socket, model[s] )

Subscribe the request object's socket (`req`) to the specified array of `models` or single model.
Your socket on the client will receive a message every time the specified user(s) are updated or destroyed.
e.g. `User.subscribe(req.socket , [ {id: 7} ] )`

### Model.subscribe( req.socket )

> IMPORTANT NOTE: 
Subscribe the request object's socket (`req`) to the collection
Your socket on the client will receive a message every time a new user is created.
e.g. `User.subscribe(req.socket , [ {id: 7} ] )`



### Model.publishCreate( values, [socketToOmit] )
Inform all sockets who are members of the "class room" for `Model` that a new instance has been created.  Those sockets will also be automatically subscribed to the new instance's room.

Optionally, if `socket` argument is specified, it will be omitted from the broadcast.

````javascript
// For example
User.publishCreate(newUser)
````


### Model.publishUpdate( id, values, [socketToOmit] )
Inform all sockets who are subscribed to the specified `id`'s instance room for `Model` that the instance has been updated. 

Optionally, if `socket` argument is specified, it will be omitted from the broadcast.

````javascript
// For example
User.publishUpdate( 7, {
  name: req.param('name')
});
````


### Model.publishDestroy( id, [socketToOmit] )
Inform all sockets who are subscribed to the specified `id`'s instance room for `Model` that the instance has been destroyed. 

Optionally, if `socket` argument is specified, it will be omitted from the broadcast.

````javascript
// For example
User.publishDestroy(7);
````





## Using low-level pubsub methods


### Model.unsubscribe( req.socket, model[s] )
Unsubscribe the request object's socket (`req`) from the specified `models`
e.g. `User.unsubscribe(req.socket,[{id: 7}, {id: 2}])`

### Model.introduce( req.socket, id )
Take all of the class room models and 'introduce' them to a new instance room
(good for when a new instance is created-- connecting sockets must subscribe to it)
e.g. `User.introduce(req.socket,3)`

### Model.publish( req.socket, models, message )
Broadcast a `message` to sockets connected to the specified `models` using the request object (`req`).
e.g. `User.publish(req,[{id: 7},{id: 2}], {latitude: 31.2325, longitude: 22.1135})`

### Model.room( id )
Return the room name for the instance in this collection with the given id
If id is null, return the name of the "class" or collection-wide room (for listening to `create`s)
e.g. `User.room(3)`

### Model.subscribers( id )
Return the set of sockets subscribed to this instance (if id specified) or class room (if it's not)
e.g. `User.subscribers(7)`

See https://github.com/balderdashy/sails/blob/master/lib/pubsub.js for implementation details.

## Lower level socket methods
In controllers, when handling a socket request, req and res are automatically set up to take the appropriate actions using Socket.io instead of Express.  `req.socket` contains a raw reference to the underlying socket.io socket.  The following extra socket.io specific methods are also appended to the req and res objects:


### req.listen(room)
*alias in 0.8.9: `req.subscribe()`*

Subscribe the current socket to broadcasts from the specified room
e.g. `req.listen('off the wall chats')`

### res.broadcast(room, uri, data)
*alias in 0.8.9: `res.publish()`*

Broadcast a JSON message to all connected sockets in the specified room.
e.g. `res.broadcast('off the wall chats', '/chat/create', {message: 'who is going out tonight?', user: {id: 3, username: 'Roscoe'}, id: 283})`

The broadcasted JSON would look like this:
```json
{
  "uri": "/chat/create",
  "data": {
    "id": 283,
    "message": "who is going out tonight?",
    "user": {
      "id": 3,
      "username": "Roscoe"
    }
  }
}
```


## Still need more control?
If you need more precise functionality, the raw Socket.io API is pretty straightforward to figure out; they did a good job making it pretty straightforward. You can read more here: http://socket.io/#how-to-use

The root Socket.io object is available globally in Sails via `sails.io`.  You can also access the currently connected socket in the request object, via `req.socket` in your controllers.



## FAQ
### 500 error: "handshake error" returned from socket.io request
This is most likely because you don't have any express cookies yet in your current session and are requesting from a domain other than your server. To alleviate this and prevent the error from cropping back up, you should build in some kind of request to your server BEFORE you initialize your socket.io connection. So, if you're using Mast, something like this on your client side:

```javascript
// location of your server
url = "http://localhost:1337/"
// dummy request to the server, retrieves cookie. using jQuery, you can use whatever
$.get(url, function() {})
// NOW setup socket.io
Mast.raise({ baseurl : url })
```
