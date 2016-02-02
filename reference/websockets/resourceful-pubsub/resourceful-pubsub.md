# Resourceful PubSub

### Overview

For apps that rely heavily on real-time client-server communication--for example, peer-to-peer chat and social networking apps--sending and listening for socket events can quickly become overwhelming.  Sails helps smooth away some of this complexity by introducing the concept of **resourceful pubsub** ([Publish / Subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)).  Every model (AKA *resource*) in your app is automatically equipped with class methods which provide a conventional, data-centric interface for both _broadcasting notifications_ and _subscribing sockets to notifications_ about individual database records being created, updated, or destroyed.

If you&rsquo;re app is currently using the [Blueprint API](http://sailsjs.org/documentation/reference/blueprint-api), you are already using resourceful pubsub methods!  They are embedded in the default blueprint actions bundled with Sails, and called automatically when those actions run; causing requesting sockets to be subscribed when data is fetched and messages to be broadcasted to already-subscribed sockets when data is changed.

But even when writing custom code, you can call the methods described in this section manually in lieu of using `sails.sockets.*` methods directly.  Think of resourceful pubsub methods as a way of standardizing the interface for socket communication across your application: things like the names for rooms, the schema for data transmitted as socket messages, and the names of socket events.  These methods are designed _exclusively_ for scenarios where one or more user interfaces are listening to socket events as a way of keeping in sync with the backend.  If that does not fit your use case or if you are having trouble deciding, don't worry; just call `sails.sockets.broadcast()`, `sails.sockets.join()`, or `sails.sockets.leave()` directly instead.  It is perfectly acceptable to use either approach, or even _both_ approaches in the same app.


### Listening for events on the client

While you are free to use any Javascript library to listen for socket events on the client, Sails provides its own socket client called [sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js) as a convenient way to communicate with the Sails server from any web browser or Node.js process that supports Socket.io.  Using the Sails socket client makes listening for resourceful pubsub events as easy as:

```
io.socket.on('<model identity>', function (event) {
});
```

> The _[model identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity)_ is typically the lowercased version of the model name, unless it has been manually configured in the model file.


### Example

Let&rsquo;s say you have a model named `User` in your app, with a single &ldquo;name&rdquo; attribute.  First, we&rsquo;ll add a listener for &ldquo;user&rdquo; events:

```
io.socket.on('user', function(event){console.log(event);})
```

This will log any notifications about `User` models to the console.  However, we won&rsquo;t receive any such messages until we *subscribe* to the existing `User` records (aka model instances).  If your app currently has the blueprint API enabled, you can use the sails.io.js client to watch the User model for new records, as well as subscribing to the returned set of records by making a socket `GET` request from the client to `/user`:

```js
io.socket.get('/user', function(resData, jwres) {console.log(resData);})
```

This requests the current list of users from the Sails server, and subscribes the client to events about each user.  Additionally, if the [`autoWatch` setting](http://sailsjs.org/documentation/reference/sails.config/sails.config.blueprints.html?q=properties) is on (the default), the client will also be notified whenever a new `User` is created, and will automatically be subscribed to the new user.  The callback in this example simply logs the user list to the console.  See the [socket.get](http://sailsjs.org/documentation/reference/websockets/sails.io.js/socket.get.html) reference for more info about this method.

It&rsquo;s important to note that in order for the subscription to take place, the `/user` request must be made via a websocket call, *not* a regular HTTP request.  That is, using an AJAX request (e.g. `jQuery.get("/user")`) will *not* result in the client being subscribed to resourceful pubsub messages about `User`.  However, once the subscription is made, *any* changes to models--whether they be the result of a socket call, an AJAX request, even a cURL request from the command line--will cause the client to receive a notification.  Continuing with the above example, if you were to open up a new browser window and go to the following URL:

    /user/create?name=joe

You would see something like the following in the console of the first window:

```js
{
	verb: 'created',
  id: 1,
  data: {
    id: 1,
    name: 'joe',
    createdAt: '2014-08-01T05:50:19.855Z'
    updatedAt: '2014-08-01T05:50:19.855Z'
  }
}
```

The `verb` indicates the kind of action that occurred.  The `id` refers to the record that the alleged action occurred on, and `data` contains new/modified information about the `User` that was acted upon.  Each event type sends back slightly different information; see the individual resourceful pubsub method reference documents for more info.


<docmeta name="displayName" value="Resourceful PubSub">
