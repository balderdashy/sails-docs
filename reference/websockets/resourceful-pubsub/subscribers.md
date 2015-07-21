# .subscribers(`record`,[`contexts`])

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
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".subscribers()">
