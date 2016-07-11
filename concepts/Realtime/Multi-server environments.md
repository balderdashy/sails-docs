# Realtime communication in a multi-server (aka "clustered") environment

With the default configuration, Sails allows realtime communication between a single server and all of its connected clients.  When [scaling your Sails app to multiple servers](http://sailsjs.org/documentation/concepts/deployment/scaling), some extra setup is necessary in order for realtime messages to be reliably delivered to clients regardless of which server they&rsquo;re connected to.  This setup typically involves:

1. Setting up a [hosted](https://www.google.com/search?q=hosted+redis) instance of [Redis](http://redis.io/).
2. Installing [socket.io-redis](https://github.com/socketio/socket.io-redis) as a dependency of your Sails app.
1. Updating your [sails.config.sockets.adapter](http://sailsjs.org/documentation/reference/configuration/sails-config-sockets#?commonlyused-options) setting to `socket.io-redis` and setting the appropriate `host`, `password`, etc. fields to point to your hosted Redis instance.

No special setup is necessary in your hosted Redis install; just plug the appropriate host address and credentials into your `/config/sockets.js` file and the `socket.io-redis` adapter will take care of everything for you.

> Note: When operating in a multi-server environment, certain operations may take an indeterminate amount of time to complete, even if the code appears to execute immediately.  It's good to keep this in mind when considering code that would, for example, follow a call to [`.addRoomMembersToRoom()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/add-room-members-to-room) immediately with a call to [`.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast).  In such cases, you may want to employ methods such as delaying the broadcast call by wrapping it in a `setTimeout()` to give every server in the cluster time to respond.

### Reference

* See the full reference for the [sails.io.js library](http://sailsjs.org/documentation/reference/web-sockets/socket-client) to learn how to use sockets on the client side to communicate with your Sails app.
* See the [sails.sockets](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) reference to learn how to send messages from the server to connected sockets
* See the [resourceful pub-sub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub) reference to learn how to use Sails blueprints to automatically send realtime messages about changes to your [models](http://sailsjs.org/documentation/concepts/models-and-orm/models).
* Visit the [Socket.io](http://socket.io) website to learn more about the underlying library Sails uses for realtime communication

<docmeta name="displayName" value="Multi-server environments">
