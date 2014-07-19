# .publishAdd( `{id}`,`attribute`, `idAdded`, [`request`], [`options`] )
### Purpose
Publishes a notification when an associated record is added to a model's collection.  For example, if a `User` model has an association with the `Pet` model so that a user can have one or more pets available in its `pets` attribute, then any time a new pet is associated with a user `publishAdd` may be called.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Updated Record|   `int`, `string`    |   Yes      |
| 2 | Attribute of associated collection       |   `string`              |   Yes      |
| 3 | ID of associated record that was added      |   `int`, `string` |   Yes       |
| 4 | Request      |   `request object` |   No       |
| 5 | Additional Options |   `object` | No |

`publishAdd()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the model instance via the `.subscribe` model method.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the model instance
+ **verb**  - `"addedTo"` (a string)
+ **attribute** - the name of the model attribute that was added to
+ **addedId** - the ID of the record that was added

#### `request`
If this argument is included then the socket attached to that request will *not* receive the notification.

#### `options.noReverse`
See the documentation for `publishUpdate` for information about `options.noReverse`.  In general, you should not have to set this argument unless you are writing your own implementation of `publishAdd` for a model.

<docmeta name="uniqueID" value="publishAdd129964">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishAdd()">

