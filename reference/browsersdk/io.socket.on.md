# io.socket.on()

Starts listening for server-sent events from Sails with the specified `eventIdentity`.  Will trigger the provided callback function when a matching event is received.

Note that the callback will NEVER trigger until one of your back-end controllers, models, services, etc. sends a message to this socket.  Typically that is achieved one of the following ways:

+ server emits a message to all known sockets (see [sails.sockets.blast()]())
+ server emits a message directly to this socket (`io.socket`) using its unique id (see [sails.sockets.emit()]())
+ server [broadcasts]() to a room in which this socket (`io.socket`) has been allowed to [join]() (remember that a socket only stays subscribed as long as it is connected-- i.e. as long as the browser tab is open)
+ server publishes a message about a record to which this socket is subscribed (see [publishUpdate()](), [publishDestroy()](), and [subscribe()]())
+ server publishes a message informing all permitted watcher sockets that a new record has been created in the model with the same identity as `eventIdentity` (see [publishCreate()]() and [watch()]())



### Usage

```js
io.socket.on(eventIdentity, function onServerSentEvent (msg) {
  // ...
});
```

### Example


Listen for new orders and updates to existing orders:

```javascript
io.socket.on('order', function onServerSentEvent (msg) {
  // msg => {...}
});


```

### Notes
>+ When listening for resourceful pubsub calls, the `eventIdentity` is the same as the identity of the calling model (e.g. if you have a model "UserComment", the identity is "usercomment".)
>+ For context-- these types of server-sent events are sometimes referred to as ["comet"](http://en.wikipedia.org/wiki/Comet_(programming)) messages.



<docmeta name="uniqueID" value="socketon682488">
<docmeta name="displayName" value="io.socket.on()">


