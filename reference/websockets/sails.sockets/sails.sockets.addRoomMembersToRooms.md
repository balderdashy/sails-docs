addRoomMembersToRooms()

Subscribe all members of a room to one or more additional rooms.

### Usage

```js
sails.sockets.addRoomMembersToRooms(sourceRoom, destRooms, cb);
```


|   | Argument   | Type        | Details |
|---|------------|:-----------:|---------|
| 1 | `sourceRoom`   | ((string)) | The room to retrieve members from.
| 2 | `destRooms`    | ((string)) -or- ((array))  | The room or rooms to subscribe the members of `sourceRoom` to.
| 3 | _`cb`_         | ((function?))| An optional callback which will be called with a single argument (`err`) if any errors occur.


### Example

In a controller action:

```javascript
subscribeFunRoomMembersToFunnerRooms: function(req, res) {
  sails.sockets.addRoomMembersToRooms('funRoom', ['greatRoom', 'awesomeRoom'], function(err) {
    if (err) {return res.serverError(err);}
    res.json({
      message: 'Subscribed all members of `funRoom` to `greatRoom` and `awesomeRoom`!'
    });
  });
}
```

### Notes
> + In a multi-server environment, the callback function (`cb`) will be executed when the `.addRoomMembersToRooms()` call completes _on the current server_.  This does not guarantee that other servers in the cluster have already finished running the operation.

<docmeta name="displayName" value="addRoomMembersToRooms()">

