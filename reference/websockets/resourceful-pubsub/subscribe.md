# .subscribe()

Subscribes the requesting client socket to one or more database records (i.e. model instances).  

```js
SomeModel.subscribe(req, ids);
```

_Or:_
- `SomeModel.subscribe(req, ids, contexts);`


### Usage

|   | Argument   | Type         | Details |
|---|:-----------|:------------:|---------|
| 1 | `req`      | ((req))      | The request object (`req`).
| 2 | `ids`      | ((array))    | An array of record ids (primary keys).
| 3 | `contexts` | ((array))    | An optional array of change-type strings ("contexts").  If provided, the subscribing client socket will only receive messages involving the specified types of changes (e.g. if a "destroy" context is specified, the socket will receive notifications from `publishDestroy()` calls involving this record).  Otherwise, if left unspecified, the socket will hear about any published events involving this record.



By default (if no "contexts" are provided), the client socket will receive relevant messages emitted by `.publishUpdate()`, `.publishDestroy()`, `.publishAdd()` and `.publishRemove()`.

> **Important**:
>
> This function does _not actually talk to the database_!  In fact, none of the resourceful pubsub methods do.  These are just a simplified abstraction layer built on top of the lower-level `sails.sockets` methods, designed to make your app cleaner and easier to debug by using conventional names for events/rooms/namespaces etc.



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


### Blueprints and .subscribe()

By default, the blueprint `find` and `findOne` actions will call `.subscribe()` to subscribe a requesting socket to all returned records.  However, the blueprint `update` and `delete` actions will *not* cause a message to be sent to the requesting socket by default--only to the *other* connected sockets.  This is intended to allow the caller of `io.socket.update()` (for example) to use the client-side SDK's callback to handle the server response separately.  To force the blueprint actions to send messages to all sockets, *including the requesting socket*, set `sails.config.blueprints.mirror` to `true`.

<!-- todo pull above stuff out to a concepts page, doesnt belong here -->

### What is `context`?

If you specify a specific *context* (or array of contexts) to subscribe to, you will only get messages sent in that context.  For example, `User.subscribe(socket, user, 'update')` will cause the socket to receive messages only when `publishUpdate` is called for `user`.  Subsequent calls to `subscribe` are cumulative, so if you called `User.subscribe(socket, user, 'destroy')` later with the same socket, that socket would then be subscribed to messages from both `publishUpdate` and `publishDestroy`.  

You can omit `context` to subscribe a socket to the default contexts for that model class.  The default contexts are defined by the `autosubscribe` property of the model class.  If `autosubscribe` is not present, then the default contexts are `update`, `destroy`, `message` (for custom messages), `add:*` and `remove:*` (publishAdd and publishRemove messages for associated models).

<!-- todo pull above stuff out to a concepts page, doesnt belong here -->

### Notes

> -`subscribe` will only work with requests made over a socket.io connection (e.g. using `io.socket.get()`), *not* over an http connection (e.g. using `jQuery.get()`).  See the [sails.io.js socket client documentation](http://sailsjs.org/documentation/reference/web-sockets/socket-client) for information on using client sockets to send WebSockets/Socket.io messages with Sails.



<docmeta name="methodType" value="pubsub">
<docmeta name="displayName" value=".subscribe()">
