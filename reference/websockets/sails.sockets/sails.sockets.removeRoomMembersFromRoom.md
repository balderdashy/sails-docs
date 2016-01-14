# sails.sockets.removeRoomMembersFromRooms()

Unsubscribes all members of a room from one or more other rooms

### Usage

```js
sails.sockets.removeRoomMembersFromRooms(sourceRoom, destRooms, cb);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|---------|
| 1 | `sourceRoom`   | ((string)) | The room to retrieve members from.
| 2 | `destRooms` | ((string)) -or- ((array))  | The room or rooms to unsubscribe the members of `sourceRoom` from.
| 3 | `cb`       | ((function))| An optional callback which will be called with a single argument `err` if any errors occur.

### Example

In a controller action:

```javascript
unsubscribeFunRoomMembersFromFunnerRooms: function(req, res) {
  sails.sockets.removeRoomMembersFromRooms('funRoom', ['greatRoom', 'awesomeRoom'], function(err) {
    if (err) {return res.serverError(err);}
    res.json({
      message: 'Unsubscribed all members of `funRoom` from `greatRoom` and `awesomeRoom`!'
    });
  });
}
```

<docmeta name="displayName" value="sails.sockets.removeRoomMembersFromRooms()">

