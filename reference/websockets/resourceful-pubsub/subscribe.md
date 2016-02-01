# .subscribe()

Subscribe the requesting client socket to changes/deletions of one or more database records.

```js
SomeModel.subscribe(req, ids);
```

_Or:_
- `SomeModel.subscribe(req, ids, contexts);`




### Usage

|   | Argument   | Type         | Details |
|---|:-----------|:------------:|---------|
| 1 | `req`      | ((req))      | The incoming socket request (`req`) containing the socket to subscribe.
| 2 | `ids`      | ((array))    | An array of record ids (primary keys).

When a client socket is subscribed to a record, it will receive all messages about it which are broadcasted by `.publishUpdate()`, `.publishDestroy()`, `.publishAdd()` and `.publishRemove()`.


### Example

```javascript
  subscribeToLouies: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest('Only a client socket can subscribe to Louies.  You, sir, appear to be something... _else_.');
    }
    
    // Let's say our client socket has a problem with people named "louie".
    
    // First we'll find all users named "louie" (or "louis" even-- we should be thorough)
    User.find({ or: [{name: 'louie'},{name: 'louis'}] }).exec(function(err, usersNamedLouie){
      if (err) {
        return res.negotiate(err);
      }
      
      // Now we'll use the ids we found to subscribe our client socket to each of these records'
      // "destroy" context.
      User.subscribe(req, _.pluck(usersNamedLouie, 'id'), ['destroy']);
      
      // Now any time a user named "louie" or "louis" is destroyed, our client socket will receive
      // a notification (as long as it stays connected anyways).
      
      // All done!  We could send down some data, but instead we send an empty response.
      // (although we're ok telling this vengeful client socket when our users get
      //  destroyed, it seems ill-advised to send him our Louies' sensitive user data.
      //  We don't want to help this guy to hunt them down irl.)
      return res.ok();
    });
  }
```




### Notes

> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.
> + `.subscribe()` will only work with requests made over a socket.io connection (e.g. using `io.socket.get()`), *not* over an http connection (e.g. using `jQuery.get()`).  See the [sails.io.js socket client documentation](http://sailsjs.org/documentation/reference/web-sockets/socket-client) for information on using client sockets to send WebSockets/Socket.io messages with Sails.
> + This function does _not actually talk to the database_!  In fact, none of the resourceful pubsub methods do.  Remember: these are just a simplified abstraction layer built on top of the lower-level `sails.sockets` methods, designed to make your app cleaner and easier to debug by using conventional names for events/rooms/namespaces etc.




<docmeta name="displayName" value=".subscribe()">
