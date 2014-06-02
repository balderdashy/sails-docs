# .unsubscribe(`request`,`records`,[`contexts`])
### Purpose
This method will unsubscribe a socket from one or more model instances.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | Request             | `Request object`    | Yes        |
| 2 | Records             | `[]`, `object`      | Yes        |
| 3 | Contexts to unsubscribe from | `string`, `array` |  No |

*Note*: `unsubscribe` will only work when the request is made over a socket connection (e.g. using `socket.get`), *not* over an http connection (e.g. using `jquery.get`).

#### `context`

See `.subscribe()` for a discussion of pubsub contexts.  Omit this argument to unsubscribe a socket from all contexts.

### Example Usage
Controller Code
```javascript
User.findOne({id: 123}).exec(function(err, userInstance) {
    User.unsubscribe(req.socket, userInstance);
});
```

<docmeta name="uniqueID" value="unsubscribe354769">
<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".unsubscribe()">

