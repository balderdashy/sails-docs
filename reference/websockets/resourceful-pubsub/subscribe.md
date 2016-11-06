# .subscribe()

Subscribe the requesting client socket to changes/deletions of one or more database records.

```js
Something.subscribe(req, ids);
```


### Usage

|   | Argument   | Type         | Details |
|---|:-----------|:------------:|---------|
| 1 | `req`      | ((req))      | The incoming socket request (`req`) containing the socket to subscribe.
| 2 | `ids`  | ((array))    | An array of record ids (primary key values).


When a client socket is subscribed to a record, it is a member of its dynamic "record room".  That means it will receive all messages broadcasted to that room by [`.publish()`](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pubsub/publish).

### Example


On the server, in a controller action:

```javascript
  // On the server:

  subscribeToLouies: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest('Only a client socket can subscribe to Louies.  But you look like an HTTP request to me.');
    }

    // Let's say our client socket has a problem with people named "louie".

    // First we'll find all users named "louie" (or "louis" even-- we should be thorough)
    User.find({ or: [{name: 'louie'},{name: 'louis'}] }).exec(function(err, usersNamedLouie){
      if (err) {
        return res.serverError(err);
      }

      // Now we'll subscribe our client socket to each of these records.
      User.subscribe(req, _.pluck(usersNamedLouie, 'id'));

      // All done!  We could send down some data, but instead, we just send an empty 200 (OK) response.
      // 
      // > Although we're ok telling this vengeful client socket when our users get
      // > destroyed, it seems ill-advised to send him our Louies' sensitive user data.
      // > (We don't want to help this guy to hunt them down in real life!)
      return res.ok();
      
    });//</ User.find() >
  }
```




Then, back in our client-side code:

```javascript
// On the client:

// Send a request to the "subscribeToLouies" action, subscribing this client socket
// to all future events that the server publishes about Louies.
io.socket.get('/foo/bar/subscribeToLouies', function (data, jwr){
  if (jwr.error) {
    console.error('Could not subscribe to Louie-related notifications: '+jwr.error);
    return;
  }

  console.log('Successfully subscribed.');

});
```


From now on, as long as our requesting client socket stays connected, it will receive a notification any time our server-side code (e.g. other actions or helpers) calls `User.publish()` for one of the Louies we subscribed to above.

In order for our client-side code to handle these future notifications, it must _listen_ for the relevant event with `.on()`.  For example:

```js
// Whenever a `user` event is received, say something.
io.socket.on('user', function(msg) {
  console.log('Got a message about a Louie: ', msg);
});
```

See [Concepts > Realtime](http://sailsjs.com/documentation/concepts/realtime) for more background on the difference between rooms and events in Sails/Socket.io.





### Notes

> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.
> + `.subscribe()` will only work with requests made over a socket.io connection (e.g. using `io.socket.get()`), *not* over an http connection (e.g. using `jQuery.get()`).  See the [sails.io.js socket client documentation](http://sailsjs.org/documentation/reference/web-sockets/socket-client) for information on using client sockets to send WebSockets/Socket.io messages with Sails.
> + This function does _not actually talk to the database_!  In fact, none of the resourceful pubsub methods do.  Remember: these are just a simplified abstraction layer built on top of the lower-level `sails.sockets` methods, designed to make your app cleaner and easier to debug by using conventional names for events/rooms/namespaces etc.




<docmeta name="displayName" value=".subscribe()">
<docmeta name="pageType" value="method">

