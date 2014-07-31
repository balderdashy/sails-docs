# Resourceful PubSub

### Overview

For apps that rely heavily on real-time client-server communication--for example, peer-to-peer chat and social networking apps--sending and listening for socket events can quickly become overwhelming.  Sails helps smooth away some of this complexity by introducing the concept of Resourceful PubSub ([Publish / Subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)).  Every model (AKA *resource*) in your app is automatically equipped with class methods for subscribing sockets to notifications about instance creations, updates and deletions.  If you&rsquo;re using the [Blueprint API](/#/documentation/reference/blueprint-api), socket messages are automatically broadcast to subscribed sockets when a model event occurs.  If not, you can use the methods described in this section to manually communicate model events to clients.

### Listening for events on the client

While you are free to use any Javascript library to listen for socket events on the client, Sails does provide its own [Socket Client](/#/documentation/reference/websockets/sails.io.js) as a convenient way to communicate with the server.  Using the Sails socket client makes listening for resourceful pubsub events as easy as:

```
io.socket.on("<model name>", listenerFunction)
```

### Example

Let&rsquo;s say you have a model named `User` in your app, with a single &ldquo;name&rdquo; attribute.  First, we&rsquo;ll add a listener for &ldquo;user&rdquo; events:

```
io.socket.on("user", function(event){console.log(event);})
```

This will log any notifications about `User` models to the console.  However, we won&rsquo;t receive any such messages until we *subscribe* to the existing `User` model instances.  If you&rsquo;re using the default blueprints, you can subscribe by making a socket request from the client to `/user`:

```
io.socket.get("/user", function(resData, jwres) {console.log(resData);})
```

This requests the current list of users from the Sails server, and subscribes the client to events about each user.  Additionally, if the [`autoWatch` setting](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.blueprints.html?q=properties) is on (the default), the client will also be notified whenever a new `User` is created, and will automatically be subscribed to the new user.  The callback in this example simply logs the user list to the console.  See the [socket.get](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.io.js/socket.get.html) reference for more info about this method.

It&rsquo;s important to note that in order for the subscription to take place, the `/user` request must be made via a websocket call, *not* a regular HTTP request.  That is, using an AJAX request (e.g. `jQuery.get("/user")`) will *not* result in the client being subscribed to resourceful pubsub messages about `User`.  However, once the subscription is made, *any* changes to models--whether they be the result of a socket call, an AJAX request, even a cURL request from the command line--will cause the client to receive a notification.  Continuing with the above example, if you were to open up a new browser window and go to the following URL:

    /user/create?name=joe

You would see something like the following in the console of the first window:

```
{
	data: {
		createdAt: "2014-08-01T05:50:19.855Z"
		id: 1
		name: "joe"
		updatedAt: "2014-08-01T05:50:19.855Z"
	},
	id: 1,
	verb: "created"
}
```	

The `verb` indicates the kind of action that occurred.  The `id` refers to the instance that the action occurred on, and `data` contains more information about the `User` that was acted upon.  Each event type sends back slightly different information; see the individual resourceful pubsub method reference documents for more info.

<docmeta name="uniqueID" value="resourcefulpubsub293545">
<docmeta name="displayName" value="Resourceful PubSub">

