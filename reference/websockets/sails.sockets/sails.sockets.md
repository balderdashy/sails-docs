# Sockets (sails.sockets)

### Overview

Sails exposes several methods (`sails.sockets.*`) which provide a simple interface for realtime communication with connected socket clients.  This is useful for pushing events and data to connected clients in realtime, rather than waiting for them to actively request it using HTTP.  This is true regardless of whether a client sockets was connected from a browser tab, from an iOS app, or even from your favorite household IoT appliance.

These methods are implemented using a built-in instance of [Socket.io](http://socket.io), which is available directly as `sails.io` (see below).  However, in almost every case, you should call the `sails.sockets.*` methods (either directly, or via a higher level abstraction such as resourceful pubsub methods).

### `sails.io`

The API exposed by the `sails.sockets.*` methods is flexible enough out of the box to cover the requirements of most applications, and using them will future-proof your app against possible changes in the underlying implementation.  However, if you are working on bringing some legacy code from a vanilla Socket.io app into your Sails app, it can be useful to talk to Socket.io directly.  To accomplish this, Sails provides raw access to the underlying [socket.io](http://socket.io/) server instance (`io`) as `sails.io`. See the [Socket.io docs](http://socket.io/docs/) for more information.  If you decide to use Socket.io directly, please proceed with care.

> As of v0.11.4, Sails bundles `socket.io@v1.4.3` as a dependency of [sails-hook-sockets](github.com/balderdashy/sails-hook-sockets), a core hook.

<docmeta name="displayName" value="sails.sockets">
<docmeta name="stabilityIndex" value="3">
