# .subscribe(`request`,`records`,[`contexts`])

### Purpose
This subscribes clients to one or more existing model instances (records).  It allows clients to see message emitted by .publishUpdate(), .publishDestroy(), .publishAdd() and .publishRemove().

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Request   | `Request object`  | Yes        |
| 2 | Records          | `[]`, `object` | Yes        |
| 3 | Contexts to subscribe to | `string`, `array` |  No |

*Note*: `subscribe` will only work when the request is made over a socket connection (e.g. using `socket.get`), *not* over an http connection (e.g. using `jquery.get`).

#### `context`

If you specify a specific context (or array of contexts) to subscribe to, you will only get messages sent in that context.  For example, `User.subscribe(socket, user, 'update')` will cause the socket to receive messages only when `publishUpdate` is called for `user`.  Subsequent calls to `subscribe` are cumulative, so if you called `User.subscribe(socket, user, 'destroy')` later with the same socket, that socket would then be subscribed to messages from both `publishUpdate` and `publishDestroy`.  

You can omit `context` to subscribe a socket to the default contexts for that model class.  The default contexts are defined by the `autosubscribe` property of the model class.  If `autosubscribe` is not present, then the default contexts are `update`, `destroy`, `message` (for custom messages), `add:*` and `remove:*` (publishAdd and publishRemove messages for associated models).

### Example Usage
Controller Code
```javascript

    // Subscribes client to ONLY the create and destroy events for every `User` record.

    User.find({}).exec(function(e,listOfUsers){
        User.subscribe(req.socket,listOfUsers,['create','destroy']);
    });
    
    // Don't forget to handle your errors
    
```

### Blueprints and .subscribe()
> By default, the blueprint `find` and `findOne` actions will call `.subscribe()` to subscribe a requesting socket to all returned records.  However, the blueprint `update` and `delete` actions will *not* cause a message to be sent to the requesting socket by default--only to the *other* connected sockets.  This is intended to allow the caller of `io.socket.update()` (for example) to use the client-side SDK's callback to handle the server response separately.  To force the blueprint actions to send messages to all sockets, *including the requesting socket*, set `sails.config.blueprints.mirror` to `true`.

<docmeta name="uniqueID" value="subscribe342218">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".subscribe()">

