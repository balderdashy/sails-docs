# .message()

Broadcast a custom message about the record with the specified `id` to all sockets currently subscribed to it.

```js
Something.message( id, data, req )
```


### Purpose

|   |     Argument        | Type                | Details    |
|---|:--------------------|---------------------|------------|
| 1 | `id`                |  ((string))         |   The `id` of the record whose subscribers will receive this message.       
| 2 | `data`              |  ((dictionary))     |   Arbitrary data to send to the subscribed sockets; i.e. a dictionary containing any JSON-serializable data you would like to broadcast to all sockets subscribed to this record.      
| 3 | _`req`_               |  ((req))            |   If provided, then the requesting socket will *not* receive the notification.  


`message()` uses the model's identity as the event name, and the message is broadcast to all sockets subscribed to the record, e.g. via [`.subscribe()`](http://next.sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe).

The event data received by the  socket clients will be a dictionary with the following properties:

+ **id** - the `id` attribute of the record
+ **verb**  - will always be the string: `"messaged"`
+ **data** - the dictionary of custom data provided when calling `.message()`




### Example

In a controller+action...  Find a user by username and broadcast a message back to all of its subscribers:

```
User.findOne({username: 'bob'}).exec(function(err, foundUser){
  if (err) return res.serverError(err);
  if (!founduser) return res.notFound();
  
  // This message can contain anything you want!
  User.message(foundUser.id, {count: 12, hairColor: 'red'});
  
  return res.ok();
});
```



<docmeta name="displayName" value=".message()">
