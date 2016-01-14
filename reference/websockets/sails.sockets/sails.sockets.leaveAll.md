# sails.sockets.leaveAll()

Unsubscribes all members of a room from every room they are currently subscribed to

### Usage

```js
sails.sockets.leaveAll(sourceRoom, options, cb);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|---------|
| 1 | `sourceRoom`   | ((string)) | The room to retrieve members from.
| 2 | `options` | ((boolean))  | Optional options object (see below for available options).
| 3 | `cb`       | ((function))| An optional callback which will be called with a single argument `err` if any errors occur.

### `options` object

The `options` object can contain the following keys:

* `includeSocketRooms` indicates whether sockets should be unsubscribed from their own private rooms (defaults to `false`).
* `includeSourceRooms` indicates whether sockets should be unsubscribed from `sourceRoom` (defaults to `true`).

### Example

In a controller action:

```javascript
unsubscribeFunRoomMembersFromEverything: function(req, res) {
  sails.sockets.leaveAll('funRoom', function(err) {
    if (err) {return res.serverError(err);}
    res.json({
      message: 'Unsubscribed all members of `funRoom` from everything!'
    });
  });
}
```

<docmeta name="displayName" value="sails.sockets.leaveAll()">

