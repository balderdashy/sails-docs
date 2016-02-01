# .message()

Broadcast a custom message about the record with the specified `id` to all sockets currently subscribed to it.

```js
Something.message( id, data )
```


_Or:_
- `SomeModel.message(id, data, req);`


### Usage

|   |     Argument        | Type                | Details    |
|---|:--------------------|---------------------|------------|
| 1 | `id`                |  ((string))         |   The `id` of the record whose subscribers will receive this message.       
| 2 | `data`              |  ((dictionary))     |   Arbitrary data to send to the subscribed sockets; i.e. a dictionary containing any JSON-serializable data you would like to broadcast to all sockets subscribed to this record.  Must be JSON-serializable.
| 3 | _`req`_               |  ((req?))            |   If provided, then the requesting socket will *not* receive the broadcast.


`message()` broadcasts to all sockets subscribed to the record (e.g. via [`.subscribe()`](http://next.sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe)) and uses the model's [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) as the event name.  The broadcasted event data received by the subscribed sockets will be a dictionary with the following properties:

+ **verb**  - a ((string)) constant: `'messaged'`
+ **id** - the record's `id` which is a ((string)) or ((number))
+ **data** - the ((dictionary)) of custom data that was provided when calling `.message()` on the backend



### Example

In a controller+action...  Find a user by username and broadcast a message back to all of its subscribers:

```js
User.findOne({username: 'bob'}).exec(function(err, foundUser){
  if (err) return res.serverError(err);
  if (!founduser) return res.notFound();
  
  // This message can contain anything you want!
  User.message(foundUser.id, {count: 12, hairColor: 'red'});
  
  return res.ok();
});
```

The endpoint will respond with a simple 200 (because of `res.ok()`), but all subscribed client sockets will receive a `user` event:

```js
// e.g. in the browser...
io.socket.on('user', function (event){
  console.log(event);
  // => see below
});
```

In this case, the `event` dictionary would look the same for every client socket which received the message:

```js
{
  verb: 'messaged',
  id: 83,
  data: {
    count: 12,
    hairColor: 'red'
  }
}
```



### Notes
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  If used, the provided `req` must be from a socket request, not just any old HTTP request.



<docmeta name="displayName" value=".message()">
