# .subscribers()

> _**This method is deprecated**._
>
> If you absolutely need to retrieve the list of socket IDs subscribed to a specific record, you may use the lower-level `app.io.sockets.in(roomName).clients(cb)` method (see https://github.com/socketio/socket.io/#namespaceclientsfnfunction). However, be aware that in multi-server scenarios, that method will _not_ return IDs of sockets on other servers (at the time of writing, the current documentation on Socket.io's GitHub is out of date on that point).
>
>For the most common use-case of "taking all members of room A and subscribing/unsubscribing them to room B", you can use the [`sails.sockets.addRoomMembersToRooms`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-add-room-members-to-rooms) and [`sails.sockets.removeRoomMembersFromRooms`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-remove-room-members-from-rooms) methods, which _do_ work cross-server.

```
Something.subscribers(`record`,[`contexts`])
```


### Purpose
Returns an array of sockets that are subscribed to `record`.  This can be used in conjunction with lower-level methods like [`sails.sockets.emit`](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.emit.html) to send custom messages to a collection of sockets, or with [`.subscribe`](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/subscribe.html) to subscribe one group of sockets to a new instance.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Record   | ((object)), ((integer)), ((string))  | Yes        |
| 2 | Contexts to subscribe to | ((string)), ((array)) |  No |

*Note*: `record` can be either an instance of a model, or a model&rsquo;s primary key.

#### `context`

If you specify a specific context (or array of contexts), you will only get sockets that are subscribed to the specified contexts for the record.

### Example Usage
Controller Code
```javascript
    // Find user #1
    User.findOne(1).exec(function(e,userOne){
        // Get all of the sockets that are subscribed to user #1
        var subscribers = User.subscribers(userOne);
        // Subscribe them all to userOne's best friend, too
        _.each(subscribers, function(subscriber) {
           User.subscribe(subscriber, userOne.bestFriendId);
        });
    });

```

<docmeta name="displayName" value=".subscribers()">
<docmeta name="pageType" value="method">

