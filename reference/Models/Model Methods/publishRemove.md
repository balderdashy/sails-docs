# .publishRemove( `{id}`,`attribute`, `idRemoved`, [`request`], [`options`] )
### Purpose
Publishes a notification when an associated record is removed to a model's collection.  For example, if a `User` model has an association with the `Pet` model so that a user can have one or more pets available in its `pets` attribute, then any time a pet is removed from a user's `pets` collection, `publishRemove` may be called.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Updated Record|   `int`, `string`    |   Yes      |
| 2 | Attribute of associated collection       |   `string`              |   Yes      |
| 3 | ID of associated record that was removed      |   `int`, `string` |   Yes       |
| 4 | Request      |   `request object` |   No       |
| 5 | Additional Options |   `object` | No |

`publishRemove()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the model instance via the `.subscribe` model method.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the model instance
+ **verb**  - `"removedFrom"` (a string)
+ **attribute** - the name of the model attribute that was removed from
+ **removedId** - the ID of the record that was removed

#### `request`
If this argument is included then the socket attached to that request will *not* receive the notification.

#### `options.noReverse`
See the documentation for `publishUpdate` for information about `options.noReverse`.  In general, you should not have to set this argument unless you are writing your own implementation of `publishRemove` for a model.


<docmeta name="uniqueID" value="publishRemove468150">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishRemove()">

