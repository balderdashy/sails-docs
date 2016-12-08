# io.socket.on()

Start listening for socket events from Sails with the specified `eventName`.  Will trigger the provided callback function when a matching event is received.

```js
io.socket.on(eventName, function (msg) {
  // ...
});
```


### Usage

|   | Argument    | Type         | Details |
|---|-------------|:------------:|:--------|
| 1 | `eventName` | ((string))   | The name of the socket event, e.g. `'recipe'` or `'welcome'`
| 2 | `handlerFn` | ((function)) | An event handler that will be called when the server broadcasts a notification to this socket.  Will only be called if the incoming socket notification matches `eventName`.


##### Event handler

|   | Argument  | Type            | Details |
|---|:----------|:---------------:|:--------|
| 1 | `msg`     | ((json))        | The data from the socket notification.



### When is the event handler called?

This event handler is called when the client receives an incoming socket notification that matches the specified event name (e.g. `'welcome'`).  This happens when the server broadcasts a message to this socket directly, or to a room of which it is a member.  To broadcast a socket notification, you either need to use the [blueprint API](http://sailsjs.com/documentation/concepts/blueprints) or write some server-side code (e.g. in an action, helper, or even in a command-line script).  This is typically achieved in one of the following ways:


###### Low-Level Socket Methods (`sails.sockets`)
+ server blasts out a message to all connected sockets (see [sails.sockets.blast()](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/blast))
+ server broadcasts a message directly to a particular socket using its unique id, or to an entire room full of sockets (see [sails.sockets.broadcast()](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/broadcast))


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


##### Realtime cafeteria

Imagine you're building an ordering system for a chain of restaurants:
  
```javascript
// In your front-end code...

var ORDER_IN_LIST = _.template('<li data-id="<%- order.id %>"><p><%- order.summary %></p></li>');

$(function whenDomIsReady(){
  
  io.socket.on('order', function (msg) {

      // Let's see what the server has to say...
      switch(msg.verb) {

        case 'created':
          // Render the new order in the DOM.
          // (we make this idempotent by removing any existing order w/ the same id)
          var $preExistingOrder = $('#orders').find('[data-id="'+msg.data.id+'"]');
          $preExistingOrder.remove();
          $('#orders').append(ORDER_IN_LIST);
          return;

        default: return; // ignore any unrecognized messages
        
      }//< / switch >
        
  });//< / io.socket.on() >

});//< / when DOM is ready >
```

> Note that this example assumes the backend calls [`.publish()`](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/publish) or [`.broadcast()`](http://sailsjs.com/documentation/reference/web-sockets/sails-sockets/broadcast) at some point.  That might be through custom code, or via the [blueprint API](http://sailsjs.com/documentation/concepts/blueprints).


### The 'connect' event
The Sails socket client connects a socket for you automatically, so direct usage like this **is not recommended for 99% of apps**.  But in the spirit of completeness, it is worth mentioning that you can also bind your own "connect" handler:

```javascript
io.socket.on('connect', function onConnect(){
  console.log('This socket is now connected to the Sails server.');
});
```

### The 'disconnect' event

If a socket's connection to the server was interrupted-- perhaps because the server was restarted, or the client had some kind of network issue-- it is possible to handle `disconnect` events in order to display an error message, or even to manually reconnect the socket again.

```javascript
io.socket.on('disconnect', function onDisconnect(){
  console.log('This socket lost connection to the Sails server');
});
```

> Sockets can be configured to reconnect automatically.  But, as of Sails v1, the Sails socket client disables this behavior by default.  In practice, since your user interface might have missed socket notifications while disconnected, you'll almost always want to handle any related custom logic by hand.  (For example, a "Check your internet connection" error message).



### Notes
>+ Remember that a socket only stays subscribed to a room for as long as it is connected-- e.g. as long as the browser tab is open.
>+ When listening for socket messages from resourceful pubsub calls, the event name is always the same as the identity of the calling model.  For example, if you have a model named "UserComment", the model's identity (and therefore the socket event name used by [`UserComment.publish()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub)) is "usercomment".
>+ For context-- socket notifications are also sometimes referred to as "server-sent events" or "[comet](http://en.wikipedia.org/wiki/Comet_(programming)) messages".



<docmeta name="displayName" value="io.socket.on()">
<docmeta name="pageType" value="method">

