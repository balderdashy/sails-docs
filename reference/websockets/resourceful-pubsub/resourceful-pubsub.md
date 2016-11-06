# Resourceful PubSub

### Overview

For apps that rely heavily on [realtime](http://sailsjs.org/documentation/concepts/realtime) client-server communication--for example, peer-to-peer chat and social networking apps--sending and listening for socket events can quickly become overwhelming.  Sails helps smooth away some of this complexity by introducing the concept of **resourceful pubsub** ([Publish / Subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)).  Every model in your app is automatically equipped with resourceful pubsub methods which provide a conventional, data-centric interface for both _broadcasting notifications_ and _subscribing sockets to notifications_ about individual database records.

If your app is currently using the [Blueprint API](http://sailsjs.org/documentation/reference/blueprint-api), you are already using resourceful pubsub methods!  They are embedded in the default blueprint actions bundled with Sails, and called automatically when those actions run; causing requesting sockets to be subscribed when data is fetched and messages to be broadcasted to already-subscribed sockets when data is changed.

But even when writing custom code, you can call the methods described in this section manually in lieu of using `sails.sockets.*` methods directly.  Think of resourceful pubsub methods as a way of standardizing the interface for socket communication across your application: things like the names for rooms, the schema for data transmitted as socket messages, and the names of socket events.  These methods are designed _exclusively_ for scenarios where one or more user interfaces are listening to socket events as a way of keeping in sync with the backend.  If that does not fit your use case or if you are having trouble deciding, don't worry; just call [`sails.sockets.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/broadcast), [`sails.sockets.join()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/join), or [`sails.sockets.leave()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/leave) directly instead.  It is perfectly acceptable to use either approach, or even _both_ approaches in the same app.


### Methods

Sails exposes 3 different resourceful pubsub (RPS) methods: `.publish()`, `.subscribe()`, and `.unsubscribe()`.

To get a deeper understanding of resourceful pubsub methods, you may find it useful to familiarize yourself with the underlying [`sails.sockets.*`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) methods first.  That's because each RPS method is more or less just a contextualized wrapper around one of the simpler `sails.sockets.*` methods:

+ [`.publish()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/publish) is like _[`sails.sockets.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/broadcast)_
+ [`.subscribe()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) is like _[`sails.sockets.join()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/join)_
+ [`.unsubscribe()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/unsubscribe)  is like _[`sails.sockets.leave()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/leave)_

The biggest difference between these methods and their counterparts in `sails.sockets.*` is that RPS methods expose a higher-level interface.  For example, RPS methods choose room names for you behind the scenes, and they infer a conventional event name based on your model's identity.


### Listening for events on the client

While you are free to use any Javascript library to listen for socket events on the client, Sails provides its own socket client called [sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js) as a convenient way to communicate with the Sails server from any web browser or Node.js process that supports Socket.io.  Using the Sails socket client makes listening for resourceful pubsub events as easy as:

```
io.socket.on('<model identity>', function (data) {

});
```

> The _[model identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity)_ is typically the lowercased version of the model name, unless it has been manually configured in the model file.


### Example

Let&rsquo;s say you have a model named `User` in your app, with a single &ldquo;name&rdquo; attribute.  First, we&rsquo;ll add a listener for &ldquo;user&rdquo; events:

```
io.socket.on('user', function(data){
  console.log(data);
})
```

This will log any notifications about `User` models to the console.  However, we won&rsquo;t receive any such messages until we *subscribe* to one or more existing `User` records.


If your app has the blueprint API enabled, then this is really easy.  In addition to fetching data, if the ["Find" blueprint action](http://sailsjs.org/documentation/reference/blueprint-api/find-where) is accessed via a [socket request](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-get), then it calls [`User.subscribe()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) (a resourceful pubsub method) automatically.

For example, imagine you write some client-side code that sends a socket `GET` request to `http://localhost:1337/user`:

```js
io.socket.get('/user', function(resData) {
  console.log(resData);
});
```

When that runs, it will hit the "Find" blueprint action, which returns the current list of users from the Sails server.  And if we'd sent a normal HTTP request (like `jQuery.get('/user')`), then that's all that would happen.  But because we sent a _socket request_, the server _also_ subscribed our client socket to future notifications (calls to [`.publish()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/publish))) about the user records that were returned.  

> See [io.socket.get()](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-get) for more info about using the sails.io.js client to send virtual requests.

Unlike `.subscribe()`, the RPS `.publish()` method can run from anywhere--it could be in a controller action triggered as the result of a socket request, an AJAX request, or even a cURL request from the command line.  Or `.publish()` could be called from a custom helper, or in a command-line script.


Continuing with the above example, if you were to open up a new (2nd) browser window and go to the following URL:

```
/user/create?name=joe
```

You would see something like the following in the console of the original (1st) window:

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

What you're seeing here is a dictionary (aka plain JavaScript object) that was broadcasted by the ["Create" blueprint action](http://sailsjs.org/documentation/reference/blueprint-api/create).  In the case of the blueprint API, the format of this data is standardized, but in your app, you can use `.publish()` to broadcast any data you like.


<docmeta name="displayName" value="Resourceful PubSub">
