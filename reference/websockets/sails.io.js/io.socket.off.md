# io.socket.off()

Unbind the specified event handler (opposite of [`.on()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-on)).

```js
io.socket.off(eventIdentity, handlerFn);
```

> This method is here for completeness, but most apps should not need to use it.  If you do decide to use this, be careful!  `io.socket.off()` **does not** stop the this client-side socket from receiving this server-sent message-- it just prevents the specified event handler from firing.  Usually, the desired effect is to prevent messages _from being sent altogether_, which is critical if your server-sent messages contain private data. This happens automatically when a socket disconnects, but there are rarer use case where it is necessary to unsubscribe sockets from rooms while they are still connected (for example, consider a scenario where an admin user is banned from your system while viewing a realtime dashboard, and your app needs to prevent them from receiving all subsequent realtime updates). To force a client socket to stop receiving broadcasted messages, call `sails.sockets.leave()` on the server (or `.unsubscribe()`/`.unwatch()` if you're using resourceful pubsub methods).


### Usage


|   | Argument   | Type         | Details |
|---|------------|:------------:|:--------|
| 1 | `eventIdentity`      | ((string))   | The unique event identity associated with a server-sent message, e.g. "recipe"
| 2 | `handlerFn` | ((function)) | The event handler function to unbind from the specified event.



### Notes

> + In order to use `.off()`, you will need to store the `handlerFn` argument you passed in to [`.on()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-on) in a variable.


<docmeta name="displayName" value="io.socket.off()">
<docmeta name="pageType" value="method">
