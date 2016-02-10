# io.socket.off()

Unbind the specified event handler (opposite of [`.on()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-on)).

```js
io.socket.off(eventIdentity, handlerFn);
```


### Usage


|   | Argument   | Type         | Details |
|---|------------|:------------:|:--------|
| 1 | `eventIdentity`      | ((string))   | The unique event identity associated with a server-sent message, e.g. "recipe"
| 2 | `handlerFn` | ((function)) | The event handler function to unbind from the specified event.



### Notes

> + This does _not_ stop the this client-side socket from receiving this server-sent message-- it just prevents the specified event handler from firing.  To cause this socket to stop receiving broadcasted messages, send a request from this socket to an endpoint on the Sails server which calls `sails.sockets.leave()` (or `.unsubscribe()`/`.unwatch()` if you're using resourceful pubsub methods).
> + Consequently, most apps should not need to use `io.socket.off()` at all.  In most cases, it is a better idea to handle unsubscribing on the server, since that will prevent messages from being sent altogether.
> + In order to use `.off()`, you will need to store the `handlerFn` argument you passed in to [`.on()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-on) in a variable.


<docmeta name="displayName" value="io.socket.off()">
<docmeta name="pageType" value="method">
