# io.socket.on()

Start listening for server-sent events from Sails with the specified `eventName`.  Will trigger the provided callback function when a matching event is received.

```js
io.socket.on(eventName, function (msg) {
  // ...
});
```


### Usage

|   | Argument    | Type         | Details |
|---|-------------|:------------:|:--------|
| 1 | `eventName` | ((string))   | The name of the socket event, e.g. `'recipe'` or `'welcome'`
| 2 | `handlerFn` | ((function)) | An event handler that will be called when the server emits a message to this socket.


##### Event handler

|   | Argument  | Type            | Details |
|---|:----------|:---------------:|:--------|
| 1 | `msg`     | ((json))        | The socket message broadcasted from the Sails server.



### When is the event handler called?

This event handler is called when the client receives an incoming socket notification that matches the specified event name (e.g. `'welcome'`).  This happens when the server broadcasts a message to this socket directly, or to a room of which it is a member.  To broadcast a socket notification, you either need to use the [blueprint API]() or write some server-side code (e.g. in an action, helper, or even in a command-line script).  This is typically achieved in one of the following ways:


###### Low-Level Socket Methods (`sails.sockets`)
+ server blasts out a message to all connected sockets (see [sails.sockets.blast()](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/blast))
+ server broadcasts a message directly to a particular socket using its unique id (see [sails.sockets.broadcast()](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/broadcast))
+ server broadcasts a message to an entire room full of sockets (see [sails.sockets.broadcast()](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/broadcast)


###### Resourceful Pubsub Methods
+ server broadcasts a message about a record, which multiple sockets might be subscribed to (see [Model.publish()](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/publish)
+ server broadcasts a message as part of the "Create" blueprint action _(only relevant if using [blueprints](http://sailsjs.org/documentation/concepts/blueprints))_



### Example

Listen for the "order" event:

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
    
    io.socket.on('order', function (msg) {

      // Let's see what the server has to say...
      switch(msg.verb) {

        case 'created':
          $scope.orders.push(msg.data); // (add the new order to the DOM)
          $scope.$apply();              // (re-render)
          break;

        default: return; // ignore any unrecognized messages
        
      }//< / switch >
      
    });//< / io.socket.on() >
    
  }//< / if not already listening to orders >-
  
});
```

### Handle Socket 'Connect' and 'Disconnect' events
If a socket's connection to the server was interrupted-- perhaps because the server was restarted, or the client had some kind of network issue-- it is possible to handle `connect` and `disconnect` events and manually reconnect the socket again.

`sails.io.js` connects a socket for you automatically, so direct usage like this **is not recommended for 99% of apps**.  But in the spirit of completeness, it is worth mentioning that you can also bind your own handlers:

```javascript
io.socket.on('connect', function onConnect(){
  console.log('This socket is now connected to the Sails server.');
});

io.socket.on('disconnect', function onDisconnect(){
  console.log('This socket lost connection to the Sails server');
});
```



### Notes
>+ Remember that a socket only stays subscribed to a room for as long as it is connected-- e.g. as long as the browser tab is open.
>+ When listening for socket messages from resourceful pubsub calls, the event name is always the same as the identity of the calling model.  For example, if you have a model named "UserComment", the model's identity (and therefore the socket event name used by [`UserComment.publish()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub)) is "usercomment".
>+ For context-- socket notifications are also sometimes referred to as "server-sent events" or "[comet](http://en.wikipedia.org/wiki/Comet_(programming)) messages".



<docmeta name="displayName" value="io.socket.on()">
<docmeta name="pageType" value="method">

