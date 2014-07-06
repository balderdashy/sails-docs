# .message( `models`,`data`, [`request`] )
### Purpose
Publishes a custom message to a model&rsquo;s subscribers.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Record (or ID of record) to send message to |   `int`, `string`, `object`    |   Yes      |
| 2 | Message payload       |   `object`              |   Yes      |
| 3 | Request      |   `request object` |   No       |

`message()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the model instance via the `.subscribe` model method.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the model instance
+ **verb**  - `"messaged"` (a string)
+ **data** - the message payload

#### `data`
Arbitrary data to send to the subscribed sockets.

#### `request`
If this argument is included then the socket attached to that request will *not* receive the notification.

<docmeta name="uniqueID" value="message373731">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".message()">

