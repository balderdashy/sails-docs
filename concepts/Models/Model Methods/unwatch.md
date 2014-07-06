# .unwatch(`request`)

### Purpose
This unsubscribes a client from publishCreate events for the model.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Request   | `request object`  | Yes        |

*Note*: `unwatch` will only work when the request is made over a socket connection (e.g. using `socket.get`), *not* over an http connection (e.g. using `jquery.get`).


<docmeta name="uniqueID" value="unwatch872661">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".unwatch()">

