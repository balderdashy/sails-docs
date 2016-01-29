# Realtime communication between the client and the server

The easiest way to send a realtime message from a client to a Sails app is by using the [sails.io.js](http://sailsjs.org/documentation/reference/web-sockets/sails-io-js) library.  This library allows you to easily connect sockets to a running Sails app, and provides methods for making requests to [Sails routes](http://sailsjs.org/documentation/concepts/routes) that are handled in the same manner as a "regular" HTTP request.

The sails.io.js library is automatically added to the default [layout template](http://sailsjs.org/documentation/concepts/views/layouts) of new Sails apps using a `<script>` tag.  When a web page loads the `sails.io.js` script, it attempts to create a new [client socket](http://sailsjs.org/documentation/reference/web-sockets/socket-client/sails-socket) and connect it to the Sails app, exposing it as the global variable `io.socket`.

### Examples

Include the sails.io.js library, and make a request to the `/hello` route of a Sails app using the automatically-connected socket:

```html
<script type"text/javascript" src="/js/dependencies/sails.io.js"></script>
<script type"text/javascript">
io.socket.get('/hello', function responseFromServer (body, response) {
  console.log("The server responded with status " + response.statusCode + " and said: ", body);
});
</script>
```

Create a new client socket manually and log a message when it connects to the server:
```html
<script type"text/javascript" src="/js/dependencies/sails.io.js"></script>
<script type"text/javascript">
var mySocket = io.sails.connect();
io.socket.on('connect', function onConnect () {
  console.log("Socket connected!");
});
</script>
```

### Socket requests vs AJAX requests

You may have noticed that a client socket `.get()` is very similar to making an AJAX request, for example by using jQuery's `$.get()` method.  This is intentional&mdash;the goal is for you to be able to get the same response from Sails no matter where the request originated from.  The benefit to making the request using a client socket is that the [controller action](http://sailsjs.org/documentation/concepts/controllers#?actions) in your Sails app will have access to the socket which made the request, allowing it to _subscribe_ that socket to realtime notifications (see [sending realtime messages from the server](http://sailsjs.org/documentation/concepts/realtime/sending-realtime-messages-from-the-server-to-one-or-more-clients)).

### Reference

* View the full [sails.io.js library](http://sailsjs.org/documentation/reference/web-sockets/socket-client) reference.
* See the [sails.sockets](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) reference to learn how to send messages from the server to connected sockets
* See the [resourceful pub-sub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub) reference to learn how to use Sails blueprints to automatically send realtime messages about changes to your [models](http://sailsjs.org/documentation/concepts/models-and-orm/models).
* Visit the [Socket.io](http://socket.io) website to learn more about the underlying library Sails uses for realtime communication

<docmeta name="displayName" value="On the client">
