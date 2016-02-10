# .broadcast()

Broadcast a message to all sockets in a room (or to a particular socket).

```javascript
sails.sockets.broadcast(roomNames, data);
```

_Or:_
+ `sails.sockets.broadcast(roomNames, eventName, data);`
+ `sails.sockets.broadcast(roomNames, data, socketToOmit);`
+ `sails.sockets.broadcast(roomNames, eventName, data, socketToOmit);`


### Usage

|   |          Argument           | Type                | Details
|---| --------------------------- | ------------------- | -----------
| 1 |        roomNames              | ((string)), ((Array))          | The name of one or more rooms to broadcast a message in (see [sails.sockets.join](http://sailsjs.org/documentation/reference/websockets/sails.sockets/sails.sockets.join.html)).  To broadcast to individual sockets, use their IDs as room names.
| 2 |        _eventName_            | ((string?))          | Optional. The unique name of the event used by the client to identify this message.  Defaults to `'message'`.
| 3 |        data                   | ((json))          | The data to send in the message.
| 4 |        _socketToOmit_         | ((req?))          | Optional. If provided, the socket belonging to the specified socket request will *not* receive the message.  This is useful if you trigger the broadcast from a client, but don't want that client to receive the message itself (for example, sending a message to everybody else in a chat room).


### Example

In an action, service, or arbitrary script on the server:

```javascript
sails.sockets.broadcast('artsAndEntertainment', { greeting: 'Hola!' });
```

On the client:

```javascript
io.socket.on('message', function (data){
  console.log(data.greeting);
});
```


##### With multiple rooms

In an action, service, or arbitrary script on the server:

```
sails.sockets.broadcast(['artsAndEntertainment', 'currentEvents'], { greeting: 'Hola!' });
```

_Client-side usage is exactly the same.  Remember that the **event name** is purely for identifying this message on the client; whereas **room names** are not visible on the client at all, and instead control which client sockets receive the message._


##### With a custom event name

In an action, service, or arbitrary script on the server:

```javascript
sails.sockets.broadcast('artsAndEntertainment', 'foo', { greeting: 'Hola!' });
```

On the client:

```javascript
io.socket.on('foo', function (data){
  console.log(data.greeting);
});
```


##### Omitting the requesting socket

If `req` is passed in as the last argument, the requesting socket will not receive the broadcasted message:

```javascript
if (req.isSocket) {
  sails.sockets.broadcast('artsAndEntertainment', {
    greeting: 'Hola!'
  }, req);
}
```



### Notes
> + This function is more or less equivalent to the functionality of `.emit()` and `.broadcast()` in Socket.io.
> + Every socket is automatically subscribed to a room with its ID as the name, allowing direct messaging to a socket via [`sails.sockets.broadcast()`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast)
> + Be sure and check `req.isSocket === true` before passing in `req` as `socketToOmit`. For the requesting socket to be omitted, the request (`req`) must be from a socket request, not just any old HTTP request.
> + `data` must be JSON-serializable; i.e. it's best to use plain dictionaries/arrays, and make sure your data does not contain any circular references. If you aren't sure, build your broadcast `data` manually, or call something like [`rttc.dehydrate(data,true,true)`](https://github.com/node-machine/rttc/blob/master/README.md#dehydratevalue-allownullfalse-dontstringifyfunctionsfalse) on it first.

<docmeta name="displayName" value=".broadcast()">
<docmeta name="pageType" value="method">

