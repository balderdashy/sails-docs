# .publishRemove()

Broadcast a conventional message indicating that a record has been removed from one of this parent record's collections.


```js
Something.publishRemove( id, association, fk )
```


_Or:_
- `Something.publishRemove(id, association, fk, req)`
- `Something.publishRemove(id, association, fk, req, options)`




### Usage

|   |     Argument        | Type                   | Details    |
|---|:--------------------|------------------------|:-----------|
| 1 | `id`                |  ((string)),((number)) | The `id` of the parent record whose subscribers will receive this broadcast. <br/><br/> e.g. `4`
| 2 | `association`       |  ((string))            | The name of the collection association.<br/><br/>e.g. `'pets'`
| 3 | `fk`       |  ((string))            | The foreign key value (e.g. `id`) of the associated record being removed.<br/><br/>e.g. `9`
| 4 | _`req`_             |  ((req?))              | If provided, then the requesting socket _will be excluded_ from the broadcast.
| 5 | _`options`_         |  ((dictionary?))       | A dictionary of additional options.  See below.

##### Additional Options

By default, when `publishRemove()` is called, it checks whether any associated records were also affected by the removal, and possibly sends out additional notifications (if a reflexive association was changed).

For example, let's say a `User` model has a `pets` association (a _plural_, or "collection" association) which connects each User record with none, one, or several distinct Pet records.  On the other side, let's say each Pet record has an `owner` association (a _singular_ or "model" association), which means it can have exactly zero or one owners.  If `User.publishRemove(4, 'pets', 9)` is called under these circumstances, then not only will it broadcast the normal "removedFrom" message to user 4, it will also broadcast a "updated" message to pet 9 (indicating that its `owner` has changed).

To suppress automatic broadcasts for reflexive associations, provide an `options` dictionary and set the `options.noReverse` flag to `true`.  In general, you should not have to set the `options.noReverse` flag unless you are writing your own implementation of `publishRemove` for a model.


##### Behavior

`publishRemove()` broadcasts to all sockets subscribed to the record (e.g. via [`.subscribe()`](http://next.sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe)) and uses the model's [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) as the event name.  The broadcasted event data received by the subscribed sockets will be a dictionary with the following properties:

+ **verb**  - a ((string)) constant: `'removedFrom'`
+ **id** - the parent record's `id` which is a ((string)) or ((number))
+ **attribute** - the name of the collection association from whence the removed record was pulled (((string)))
+ **removedId** - the id of the record that was removed (i.e. `fk`) which is a ((string)) or ((number))


### Example

In a controller+action...  Find a user by username and broadcast a message back to all of its subscribers:

```js
User.findOne({username: 'elizabeth'})
.populate('pets')
.exec(function(err, liz){
  if (err) return res.serverError(err);
  if (!liz) return res.notFound();
  
  // The Pet with id=3 is Liz's favorite cat, Humphrey.
  liz.pets.remove(3);
  liz.pets.save(function (err){
    if (err) return res.serverError(err);
    
    // Broadcast a message telling anyone subscribed to Liz that Humphrey ran away.
    // Note that we exclude the requesting socket from the broadcast.
    // Also note that, since we set `noReverse`, no "pet" events will be broadcasted
    // to Humphrey's subscribers (Liz doesn't want to worry them).
    User.publishRemove(30, 'pets', 3, req, { noReverse: true });
    
    return res.ok();
  });
});
```

The endpoint will respond with a simple 200 (because of `res.ok()`), but all subscribed client sockets will receive a `user` event:

```js
// e.g. in the browser...
io.socket.on('user', function (event){
  switch (event.verb) {
    'removedFrom':
      console.log(event);
      // => see below
      break;
    default: 
      console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
  }
});
```

In this case, the logged message would look like this:

```js
{
  verb: 'removedFrom',
  id: 194,
  attribute: 'pets',
  removedId: 3
}
```



### Notes

> + This method works much in the same way as [`.message()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/message)-- it just represents a more specific use case and has a few special features as described above.  For more conceptual background, see the overview on [resourceful pubsub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  If used, the provided `req` must be from a socket request, not just any old HTTP request.
> + It is important to understand that this method **does not actually do anything to your database**-- it is purely a conventional way of _announcing_ that changes have occurred.  Underneath the covers, the resourceful pubsub methods are just using combinations of `sails.sockets` methods.



<docmeta name="displayName" value=".publishRemove()">

