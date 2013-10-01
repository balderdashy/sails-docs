# Sockets / Pubsub
> _**Note:** You are viewing the Sails.js v0.9.x documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

## Contents

Sails makes HTTP and Socket.io interoperable, making it easier than ever to add realtime/pubsub/comet functionality to your app.

1. Using standard controllers

2. Using the CRUD blueprints

3. Using the built-in realtime _sync_ methods (e.g. `User.publishCreate()`)

4. Using Sails built-in low-level pubsub/socket methods (e.g. `req.listen`, `User.subscribers`)

5. Obtaining raw access to socket.io via `req.socket` and `sails.io`


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

Start sails and open the Sails Welcome Page (e.g. localhost:1337) in a browser.  From within the browser conosle we can access our controller like so:

```javascript
// socket is globalized by sails
socket.get('/echo',{
  message: 'hi there!'
}, function (response) {
  // response === {success: true, message: 'hi there!'}
  console.log(response);
});
```

In controllers, when handling a socket request, req and res are automatically set up to take the appropriate actions using Socket.io instead of Express. If you need it, `req.socket` contains a raw reference to the underlying socket.io socket.  If you ever need to access it directly, you can do so.  But for the majority of use cases, using Sails' built-in behavior will keep your syntax simple and conventional.


## Using CRUD Blueprints
The default blueprint API supports pubsub for socket requests out of the box.  So for instance if you create a model called User, then send a socket.io message to the server from the client requesting a list of users, the client will be automatically subscribed to changes to the users collection for the remainder of the connection:

> IMPORTANT NOTE: in order to access `socket.get()`, `socket.post()`, etc., the page using the methods must have access to the client-side SDK `socket.io.js` which is included in new Sails projects.  In this example, we'll use them to talk to the backend via Socket.io.  Please be aware that you can use these methods whether or not you're using CRUD blueprints.

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


### `Model.subscribe( req.socket )`

##### The "class room"
If you have a visitor whose socket is subscribed to the "class room" (e.g. `User.subscribe( req.socket )`), she'll receive messages _any time_ `User.publishCreate()` is called.  

Subscribe the request object's socket (`req.socket`) to this model's class room.
Your subscribed socket on the client will receive a message every time a new instance of the specified model is created.  Any time `publishCreate` is called, sockets subscribed to the class room are automatically subscribed to newly created models' instance rooms (more on that below).

e.g. `User.subscribe( req.socket )`



### `Model.subscribe( req.socket, model[s] )`

##### "instance rooms"
If the visitor is subscribed to one or more "instance rooms" (e.g. `User.subscribe( req.socket, listOfUserInstances )` ), she'll receive messages when `User.publishUpdate()` or `User.publishDestroy()` is called involving one of the instances she cares about.

Subscribe the request object's socket (`req.socket`) to the specified model, id OR array of `models` or ids.  Subscribed sockets will receive a message every time the specified model(s) are updated or destroyed from here on out.

e.g. 
+ `User.subscribe(req.socket , [7, 3] )`
+ `Player.subscribe(req.socket , todaysLuckyGuests )`
+ `User.subscribe(req.socket , req.session.userId )`
+ `Product.subscribe(req.socket, saleItems )`

<!-- TODO -->
<!-- 

# Coming soon:

### req.socket.watch( model[s] )
Watch the specified array of `models` or single model with this socket (`req.socket`).  Your socket on the client will receive a message every time the specified user(s) are updated or destroyed.
e.g. `req.socket.watch( [ {id: 7} ] )`

### req.socket.subscribeTo( Model )
Subscribe the request object's socket (`req.socket`) to the collection's class room.  In the example below, our user's socket will receive a message in their browser every time a new user is **created**.

Note: If a socket is subscribed to creates, it will also be automatically subscribed to update and destroy events for any new instances.

e.g. `req.socket.subscribeTo( User );

-->


> IMPORTANT NOTE: `Model.subscribe( req.socket, [])` is not the same as `Model.subscribe( req.socket )`.  The latter usage will subscribe to the "class room."  The former will subscribe to nothing!  This is because the presence of the second argument (in this case the empty list `[]`) signals to Sails that you're subscribing to instances, but in this case you've specified none!





### `Model.publishCreate( values, [socketToOmit] )`
Inform all sockets who are members of the "class room" for `Model` that a new instance has been created.  Those sockets will also be automatically subscribed to the new instance's room.

Optionally, if `socket` argument is specified, it will be omitted from the broadcast.

```javascript
// For example
User.publishCreate({
  id: 3,
  name: 'Randy'
})
```

Client-side sockets who were subscribed to the class room and are listening to the `message` event would receive a JSON message like the following:
```javascript
{
  data: {
    id: 3,
    name: 'Randy'
  }
  id: 3
  model: 'user'
  verb: 'create'
}
```




### `Model.publishUpdate( id, values, [socketToOmit] )`
Inform all sockets who are subscribed to the specified `id`'s instance room for `Model` that the instance has been updated. 

Optionally, if `socket` argument is specified, it will be omitted from the broadcast.

```javascript
// For example
User.publishUpdate( 7, {
  name: 'Amanda'
});
```

Client-side sockets who were subscribed to the class room and are listening to the `message` event would receive a JSON message like the following:
```javascript
{
  data: {
    name: 'Amanda'
  }
  id: 7
  model: 'user'
  verb: 'update'
}
```



### `Model.publishDestroy( id, [socketToOmit] )`
Inform all sockets who are subscribed to the specified `id`'s instance room for `Model` that the instance has been destroyed. 

Optionally, if `socket` argument is specified, it will be omitted from the broadcast.

```javascript
// For example
User.publishDestroy(7);
```

Client-side sockets who were subscribed to the class room and are listening to the `message` event would receive a JSON message like the following:
```javascript
{
  id: 7
  model: 'user'
  verb: 'destroy'
}
```



## Using low-level pubsub/socket methods

### `Model.unsubscribe( req.socket, model[s] )`
Unsubscribe the request object's socket (`req`) from the specified `models`, which can be full model objects or model IDs.
e.g. `User.unsubscribe(req.socket,[{id: 7}, {id: 2}])`

### `Model.introduce( id, [socketToOmit] )`
Take all of the class room models and 'introduce' them to a new instance room
(good for when a new instance is created-- connecting sockets must subscribe to it)
e.g. `User.introduce(3)`

### `Model.publish( models, message, [socketToOmit] )`
Broadcast a `message` to sockets connected to the specified `models` using the request object (`req`).
e.g. `User.publish([{id: 7},{id: 2}], {latitude: 31.2325, longitude: 22.1135})`

### `Model.room( id )`
Return the room name for the instance in this collection with the given id
If id is null, return the name of the "class" or collection-wide room (for listening to `create`s)
e.g. `User.room(3)`

### `Model.subscribers( id )`
Return the set of sockets subscribed to this instance (if id specified) or class room (if it's not)
e.g. `User.subscribers(7)`

See https://github.com/balderdashy/sails/blob/master/lib/hooks/pubsub/index.js for implementation details.


### `req.listen(room)`
Subscribe the current socket to broadcasts from the specified room
e.g. `req.listen('off the wall chats')`

### `res.broadcast(room, data)`
Broadcast to a room
e.g. `res.broadcast('off the wall chats', {chatterer: 'Joe Blow', message: 'This chat is off the wall!})`


## Still need more control?
If you need more precise functionality, the raw Socket.io API is pretty straightforward to figure out. You can read more here: http://socket.io/#how-to-use

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
