# Sockets (sails.sockets)

### Overview

Sails exposes several low-level methods for realtime communication with the client via `sails.sockets`.  These methods are implemented using a [Socket.io](http://socket.io) connection which is available as `sails.io`; however, using the `sails.sockets` methods instead will future-proof your app against possible changes in underlying implementation.  If your app is mainly sending messages to the client regarding changes in your models, you should try and use the [model PubSub methods](https://github.com/balderdashy/sails-docs/blob/0.10/reference/ModelMethods.md#publishcreate-datasocket-) instead.

### Looking for `sails.io`?

For raw access to the underlying [socket.io](http://socket.io/) singleton, you can still access `sails.io`.  But starting with Sails v0.10, you should use `sails.sockets` for most low-level use-cases involving sockets, since `sails.io` may be deprecated in an upcoming release to allow for more flexibility/extensibility in the underlying socket implementation.


<docmeta name="uniqueID" value="Sockets505826">
<docmeta name="displayName" value="sails.sockets">
<docmeta name="stabilityIndex" value="3">
