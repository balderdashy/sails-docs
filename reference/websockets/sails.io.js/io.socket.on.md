# io.socket.on()

Starts listening for server-sent events from Sails with the specified `eventIdentity`.  Will trigger the provided callback function when a matching event is received.


### Usage

```js
io.socket.on(eventIdentity, function (msg) {
  // ...
});
```

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `eventIdentity`      | ((string))   | The unique identity of a server-sent event, e.g. "recipe"
| 2 | `callback` | ((function)) | Will be called when the server emits a message to this socket.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `msg`     | ((object))        | Message sent from the Sails server


Note that the callback will NEVER trigger until one of your back-end controllers, models, services, etc. sends a message to this socket.  Typically that is achieved one of the following ways:

###### Resourceful Pubsub Methods
+ server publishes a message about a record to which this socket is subscribed (see [Model.publishUpdate()](/#/documentation/reference/websockets/resourceful-pubsub/publishUpdate.html), [Model.publishDestroy()](/#/documentation/reference/websockets/resourceful-pubsub/publishDestroy.html), and [Model.subscribe()](/#/documentation/reference/websockets/resourceful-pubsub/subscribe.html))
+ server publishes a message informing all permitted watcher sockets that a new record has been created in the model with the same identity as `eventIdentity` (see [Model.publishCreate(/#/documentation/reference/websockets/resourceful-pubsub/publishCreate.html)](/#/documentation/reference/websockets/resourceful-pubsub/publishCreate.html) and [Model.watch()](/#/documentation/reference/websockets/resourceful-pubsub/watch.html))

###### Low-Level Socket Methods
+ server emits a message to all known sockets (see [sails.sockets.blast()](/#/documentation/reference/websockets/sails.sockets/sails.sockets.blast.html))
+ server emits a message directly to this socket (`io.socket`) using its unique id (see [sails.sockets.emit()](/#/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html))
+ server [broadcasts](/#/documentation/reference/websockets/sails.sockets/sails.sockets.broadcast.html) to a room in which this socket (`io.socket`) has been allowed to [join](/#/documentation/reference/websockets/sails.sockets/sails.sockets.join.html) (remember that a socket only stays subscribed as long as it is connected-- i.e. as long as the browser tab is open)



### Example

Listen for new orders and updates to existing orders:

```javascript
io.socket.on('order', function onServerSentEvent (msg) {
  // msg => {...whatever the server published/emitted...}
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

### Notes
>+ When listening for resourceful pubsub calls, the `eventIdentity` is the same as the identity of the calling model (e.g. if you have a model "UserComment", the identity is "usercomment".)
>+ For context-- these types of server-sent events are sometimes referred to as ["comet"](http://en.wikipedia.org/wiki/Comet_(programming)) messages.



<docmeta name="uniqueID" value="socketon682488">
<docmeta name="displayName" value="io.socket.on()">


