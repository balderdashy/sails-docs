# Sockets (sails.sockets)

### Overview

Sails exposes several methods (`sails.sockets.*`) which provide a simple interface for [realtime communication](https://sailsjs.com/documentation/concepts/realtime) with connected socket clients.  This is useful for pushing events and data to connected clients in realtime, rather than waiting for them to actively request it using HTTP.  This is true regardless of whether a client sockets was connected from a browser tab, from an iOS app, or even from your favorite household IoT appliance.

These methods are implemented using a built-in instance of [Socket.io](http://socket.io), which is available directly as [`sails.io`](https://sailsjs.com/documentation/reference/application/advanced-usage#?sailsio).  However, you should _almost never_ use `sails.io` directly.  Instead, you should call the methods available on `sails.sockets.*`.  In addition, for certain use cases, you might also want to take advantage of [resourceful pubsub methods](https://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub), a higher level abstraction which are used by Sails built-in [blueprint API](https://sailsjs.com/documentation/reference/blueprint-api).


### Methods

| Method                             | Description                                              |
|:-----------------------------------|:---------------------------------------------------------|
| [`.addRoomMembersToRooms()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/add-room-members-to-rooms)        | Subscribe all members of a room to one or more additional rooms.
| [`.blast()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/blast)        | Broadcast a message to all sockets connected to the server.
| [`.broadcast()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/broadcast)        | Broadcast a message to all sockets in a room.
| [`.getId()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/get-id)        | Parse the socket ID from an incoming socket request (`req`).
| [`.join()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/join)        | Subscribe a socket to a room.
| [`.leave()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/leave)        | Unsubscribe a socket from a room.
| [`.leaveAll()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/leave-all)        | Unsubscribe all members of one room from that room _and_ from every other room they are currently subscribed to; except the automatic room with the same name as each socket ID.
| [`.removeRoomMembersFromRooms()`](https://sailsjs.com/documentation/reference/web-sockets/sails-sockets/remove-room-members-from-rooms)        | Unsubscribe all members of a room from one or more other rooms.


> Don't see a method you're looking for above?  A number of `sails.sockets` methods were deprecated in Sails v0.12, either because a more performant alias was already available, or for performance and scalability reasons.  Please see the [v0.12 migration guide](https://sailsjs.com/documentation/concepts/upgrading/to-v-0-12) for more information.



<docmeta name="displayName" value="sails.sockets">
<docmeta name="pageType" value="property">
