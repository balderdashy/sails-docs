# leaveAll()

Unsubscribe all members of a room (e.g. `chatroom7`) from that room _and_ every other room they are currently subscribed to; except the automatic room associated with their socket ID.

### Usage

```js
sails.sockets.leaveAll(roomName, cb);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|:--------|
| 1 | `roomName`   | ((string)) | The room to retrieve members from.
| 2 | _`cb`_       | ((function?))| An optional callback which will be called when the operation is complete, or if fatal errors were encountered.  In the case of errors, it will be called with a single argument (`err`).


### Example

In a controller action:

```javascript
unsubscribeFunRoomMembersFromEverything: function(req, res) {
  sails.sockets.leaveAll('funRoom', function(err) {
    if (err) {return res.serverError(err);}
    return res.json({
      message: 'Unsubscribed all members of `funRoom` from everything!'
    });
  });
}
```

<docmeta name="displayName" value="leaveAll()">

