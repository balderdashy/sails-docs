# .publishUpdate()

Broadcast a conventional message indicating that the record with the specified `id` has been updated.


```js
Something.publishUpdate( id, changes )
```


_Or:_
- `SomeModel.publishUpdate(id, changes, req);`
- `SomeModel.publishUpdate(id, changes, req, options);`




### Usage

|   |     Argument        | Type                | Details    |
|---|:--------------------|---------------------|:-----------|
| 1 | `id`                |  ((string))         |   The `id` of the record whose subscribers will receive this message.       
| 2 | `changes`           |  ((dictionary))     |   The dictionary of changed attributes and their new values to announce.  This may consist of any JSON--serializable data you like, but must _at-minimum_ contain the `id` (primary key) of the record.
| 3 | _`req`_             |  ((req?))            |   If provided, then the requesting socket _will be excluded_ from the broadcast.
| 4 | _`options`_         |  ((dictionary?))     | A dictionary of additional options.  See below.

##### Additional Options

If the `options` dictionary is provided, and it contains a `previous` property, then that property is expected to be a representation of the record's values *before* they were updated.  This may be used to determine whether or not to broadcast additional messages.  See, by default if `options.previous` is provided, `publishUpdate()` will check whether any associated records were affected by the update, and possibly send out additional notifications (if a reflexive association was changed).

For example, let's say a `Pet` model has an `owner` association (a _singular_, or "model" association) which connects each Pet record with up to one distinct User record.  Conversely, this means any User record could own several pets (or none).  So if the data sent with the call to `publishUpdate` indicates that the value of a pet's `owner` association changed (e.g. from `4` to `7`), then an additional `publishRemove` call would be made to inform client sockets subscribed to user `4` that this user has lost one of its pets.  Similarly, a `publishAdd` call would be made to inform client sockets subscribed to user `7` that this user has gained a new pet.

To suppress automatic broadcasts for reflexive associations, set the `options.noReverse` flag to `true`.  In general, you should not have to set the `options.noReverse` flag unless you are writing your own implementation of `publishUpdate` for a model.


##### Behavior

`publishUpdate()` broadcasts to all sockets subscribed to the record (e.g. via [`.subscribe()`](http://next.sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe)) and uses the model's [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) as the event name.  The broadcasted event data received by the subscribed sockets will be a dictionary with the following properties:

+ **verb**  - a ((string)) constant: `'updated'`
+ **id** - the record's `id` which is a ((string)) or ((number))
+ **data** - the ((dictionary)) of changed properties that was provided as `changes` when calling `.publishUpdate()` on the backend
+ **previous** - if present, this ((dictionary)) contains the previous values of the now-updated attributes for convenience



### Example

In a controller+action...  Find a user by username and broadcast a message back to all of its subscribers:

```js
// Dye Bob's hair red.
User.update({username: 'bob'}).set({
  hairColor: 'red'
}).exec(function(err, bobs){
  if (err) return res.serverError(err);
  if (bobs.length > 1) return res.serverError('Consistency violation: somehow multiple users exist with the same username? There must be a bug elsewhere in the code base.');
  if (bobs.length < 1) return res.notFound();
  
  // Broadcast a message telling anyone subscribed to Bob that his hair is now red.
  // (note that we exclude the requesting socket from the broadcast, and also include Bob's previous hair color)
  User.publishUpdate(bobs[0].id, {
    hairColor: 'red'
  }, req, {
    previous: {
      hairColor: bobs[0].hairColor
    }
  });
  
  return res.ok();
});
```

The endpoint will respond with a simple 200 (because of `res.ok()`), but all subscribed client sockets will receive a `user` event:

```js
// e.g. in the browser...
io.socket.on('user', function (event){
  switch (event.verb) {
    'updated':
      console.log(event);
      // => see below
      break;
    default: 
      console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
  }
});
```

In this case, the logged message would look something like this:

```js
{
  verb: 'updated',
  id: 49,
  data: {
    hairColor: 'red'
  },
  previous: {
    hairColor: 'pink'
  }
}
```



### Notes

> + This method works much in the same way as [`.message()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/message)-- it just represents a more specific use case and has a few special features as described above.  For more conceptual background, see the overview on [resourceful pubsub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).
> + It is important to understand that this method **does not actually do anything to your database**-- it is purely a conventional way of _announcing_ that changes have occurred.  Underneath the covers, the resourceful pubsub methods are just using combinations of `sails.sockets` methods.



<docmeta name="displayName" value=".publishUpdate()">

