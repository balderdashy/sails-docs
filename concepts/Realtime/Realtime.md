# Realtime communication (aka Sockets)

### Overview

Sails apps support full-duplex realtime communication between the client and server.  This means that a client (e.g. a web browser page or tab) can maintain a persistent connection to a Sails app, and messages can be sent from client to server or from server to client at any time.  Two common uses of realtime communication are live chat implementations and multiplayer games.  Sails implements realtime using the [socket.io](http://socket.io) library.  Throughout the Sails documentation, the terms `socket` and `websocket` are commonly used to refer to a two-way, persistent communication channel between a Sails app and a client.

### Realtime communication between the client and the server

The easiest to send a realtime message from a client to the Sails app it&rsquo;s connected to is by using the [sails.io.js](http://sailsjs.org/documentation/reference/web-sockets/socket-client) library.  This library allows a connected socket to make a virtual request to a [Sails route](http://sailsjs.org/documentation/concepts/routes) and have Sails handle the request in the same manner as a "regular" HTTP request.  The main difference between this type of request and (for example) an AJAX request is that the [controller action](http://sailsjs.org/documentation/concepts/controllers#?actions) in your Sails app will have access to the socket which made the request, allowing it to _subscribe_ that socket to realtime notifications (see [sending realtime messages from the server](http://sailsjs.org/documentation/concepts/realtime#?sending-realtime-messages-from-the-server-to-one-or-more-clients) below).

The sails.io.js library is automatically loaded by all Sails apps generated with [`sails new`](http://sailsjs.org/documentation/reference/command-line-interface/sails-new).  See the [Socket Client reference](http://sailsjs.org/documentation/reference/web-sockets/socket-client) for full documentation on this library.

### Sending realtime messages from the server to one or more clients

Sails exposes several methods for communicating with connected clients as [sails.sockets.*](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets).  The main methods you will use are [`sails.sockets.join()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-join) (subscribe a socket to all messages sent to a particular "room"), [`sails.sockets.leave()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-leave) (unsubscribe a socket from a room), and [`sails.sockets.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast) (broadcast a message to all subscribers in one or more rooms).  The power of these messages is that they do not have to be triggered by any particular action of a client (as opposed to an HTTP response, which can only be made in response to an HTTP request).  For example, Sails' default [blueprints](http://sailsjs.org/documentation/reference/blueprint-api) use realtime messages (via the [resourceful pub-sub API](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub)) to notify interested clients whenever a Sails model is created, updated or deleted.

### Realtime communication in a multi-server (aka "clustered") environment

With the default configuration, Sails allows realtime communication between a single server and all of its connected clients.  When [scaling your Sails app to multiple servers](http://sailsjs.org/documentation/concepts/deployment/scaling), some extra setup is necessary in order for realtime messages to be reliably delivered to clients regardless of which server they&rsquo;re connected to.  This setup typically involves:

1. Setting up a [hosted](https://www.google.com/search?q=hosted+redis) instance of [Redis](http://redis.io/).
2. Installing [socket.io-redis](https://github.com/socketio/socket.io-redis) as a dependency of your Sails app.
1. Updating your [sails.config.sockets.adapter](http://sailsjs.org/documentation/reference/configuration/sails-config-sockets#?commonlyused-options) setting to `socket.io-redis` and setting the appropriate `host`, `password`, etc. fields to point to your hosted Redis instance.

No special setup is necessary in your hosted Redis install; just plug the appropriate host address and credentials into your `/config/sockets.js` file and the `socket.io-redis` adapter will take care of everything for you.

### Reference

* [sails.io.js](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) - overview and method reference for the Sails Socket Client library
* [sails.sockets.*](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) - overview and method reference for the Sails low-level socket methods
* [Resourceful pub-sub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub) - overview and method reference for the Sails resourceful pub-sub API, used for sending realtime messages about Sails models
* [Socket.io](http://socket.io) - The underlying library Sails uses for realtime communicaiton

