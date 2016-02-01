# io.socket.on()

Start listening for server-sent events from Sails with the specified `eventIdentity`.  Will trigger the provided callback function when a matching event is received.

```js
io.socket.on(eventIdentity, function (msg) {
  // ...
});
```


### Usage

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `eventIdentity`      | ((string))   | The unique identity of a server-sent event, e.g. "recipe"
| 2 | _`callback`_ | ((function?)) | Will be called when the server emits a message to this socket.


##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `msg`     | ((json))        | The message broadcasted from the Sails server.


Note that the callback will NEVER trigger until one of your back-end controllers, models, services, etc. sends a message to this socket.  Typically that is achieved one of the following ways:

###### Resourceful Pubsub Methods
+ server publishes a message about a record to which this socket is subscribed (see [Model.publishUpdate()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishUpdate.html), [Model.publishDestroy()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishDestroy.html), and [Model.subscribe()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/subscribe.html))
+ server publishes a message informing all permitted watcher sockets that a new record has been created in the model with the same identity as `eventIdentity` (see [Model.publishCreate(http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishCreate.html)](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/publishCreate.html) and [Model.watch()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/watch.html))

###### Low-Level Socket Methods (`sails.sockets`)
+ server emits a message to all known sockets (see [sails.sockets.blast()](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.blast.html))
+ server emits a message directly to this socket (`io.socket`) using its unique id (see [sails.sockets.emit()](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html))
+ server [broadcasts](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.broadcast.html) to a room in which this socket (`io.socket`) has been allowed to [join](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.join.html) (remember that a socket only stays subscribed as long as it is connected-- i.e. as long as the browser tab is open)



### Example

Listen for new orders and updates to existing orders:

```javascript
io.socket.on('order', function onServerSentEvent (msg) {
  // msg => {...whatever the server broadcasted...}
});
```

##### Another example, this time using Angular:

> Note that this Angular example assumes the backend calls `publishCreate()` at some point.

```javascript
angular.module('cafeteria').controller('CheckoutCtrl', function ($scope) {

  $scope.orders = $scope.orders || [];

  if (!io.socket.alreadyListeningToOrders) {
    io.socket.alreadyListeningToOrders = true;
    io.socket.on('order', function onServerSentEvent (msg) {

      // Let's see what the server has to say...
      switch(msg.verb) {

        case 'created':
          $scope.orders.push(msg.data); // (add the new order to the DOM)
          $scope.$apply();              // (re-render)
          break;

        default: return; // ignore any unrecognized messages
      }
    });
  }
});
```

### Handle Socket 'Connect' and 'Disconnect' events
If a socket's connection to the server was interrupted-- perhaps because the server was restarted, or the client had some kind of network issue-- it is possible to handle `connect` and `disconnect` events and manually reconnect the socket again.  `sails.io.js` does this for you automatically, but you can also bind your own handlers.  While **this is not recommended for 99% of apps**, usage is documented below for completeness:

```javascript
  io.socket.on('connect', function(){
      io.socket.get('/messages');
      io.socket.get('/notifications/subscribe/statusUpdates');
  });

  io.socket.on('disconnect', function(){
      console.log('Lost connection to server');
  });
```



### Notes
>+ When listening for resourceful pubsub calls, the `eventIdentity` is the same as the identity of the calling model (e.g. if you have a model "UserComment", the identity is "usercomment".)
>+ For context-- these types of server-sent events are sometimes referred to as ["comet"](http://en.wikipedia.org/wiki/Comet_(programming)) messages.



<docmeta name="displayName" value="io.socket.on()">
