# .publishAdd()

Broadcast a conventional message indicating that a record has been newly added to one of this parent record's collections.

```javascript
Something.publishAdd(id, association, added);
```

_Or:_
+ `Something.publishAdd(id, association, added, req);`


### Usage

|   |          Argument           | Type                       | Details
|---|:--------------------------- | -------------------------- |:-----------
| 1 |        `id`                   | ((number)),((string))  | The id (primary key) of the parent record.
| 2 |        `association`          | ((string))                | The name of the association that the child record was added to (e.g. `"comments"`)
| 3 |        `added`                | ((number)),((string)),((dictionary))    | Either a number or string to represent the id (primary key) of the child record being added, **or a dictionary** of properties describing it (must contain an `id` key!).  Either way, this information will be bundled in the socket message which is broadcasted.
| 4 | _`req`_             |  ((req?))              | If provided, then the requesting socket _will be excluded_ from the broadcast. 


When your app calls `publishAdd()`, a socket message is broadcasted to all sockets subscribed to the record's room (i.e. via the `subscribe()` resourceful pubsub method) and the model identity is used as the event name.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the parent record
+ **verb**  - always provided as the string: `"addedTo"`
+ **attribute** - the name of the model attribute (collection association) that was added to
+ **addedId** - the id of the newly added child record
+ **added** -  Not guaranteed.  Will only be present if a dictionary of properties for the newly added child record was provided, rather than just its id. 




### Example



```javascript
// Broadcast a message to all client-side sockets subscribed to the tutorial record w/ id=3
// letting them know that a new child record with id=17 has been associated and is now one of the 
// tutorial's "comments".
Tutorial.publishAdd(3, 'comments', 17);
```

```javascript
// Broadcast a message to all client-side sockets subscribed to the tutorial record w/ id=3
// letting them know that a new child record with the specified properties has been associated
// and is now one of the tutorial's "comments".
// (Note that we also pass in `req` to prevent the requesting socket from receiving the broadcast.)
Tutorial.publishAdd(3, 'comments', { 
  id: 17,
  message: 'I love this show!'
}, req);
```




In this case, the logged message would look like:

```js
{
  verb: 'addedTo',
  id: 3,
  attribute: 'comments',
  addedId: 17,
  added: {
    id: 17,
    message: 'I love this show!'
  }
}
```


### Notes

> + If you are looking for information about the `noReverse` flag, see the documentation for `publishUpdate`.  In general, you should not have to set this argument unless you are writing your own implementation of `publishAdd` for a model.
> + Under the covers, resourceful pubsub methods use `sails.sockets.*` methods.  When/if you encounter a need for customization beyond what is supported out of the box in a resourceful pubsub method, you should use the methods exposed in [`sails.sockets.*`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) directly.
> + If you are using [Sails' blueprint API](http://sailsjs.org/documentation/reference/blueprint-api), this resourceful pubsub method is called automatically by built-in code within the blueprints hook in Sails core.  The cleanest way to customize this, or any other behavior bundled in a blueprint API, is to override it with a custom action.


<docmeta name="displayName" value=".publishAdd()">





```js
Something.publishAdd( id, association, fk )
```


_Or:_
- `Something.publishAdd(id, association, fk, req)`
- `Something.publishAdd(id, association, fk, req, options)`


By convention, this message indicates that a new child record has been added to the specified collection association of this parent record (and that client-side sockets receiving the message should update their user interface to match).  In other words, if a `Tutorial` model has an associated collection of "comments" (referring to records of the `Comment` model), then you might call `Tutorial.publishAdd()` to notify connected clients that a new comment has been added to the tutorial.


### Usage

|   |     Argument        | Type                   | Details    |
|---|:--------------------|------------------------|:-----------|
| 1 | `id`                |  ((string)),((number)) | The `id` of the parent record whose subscribers will receive this broadcast. <br/><br/> e.g. `4`
| 2 | `association`       |  ((string))            | The name of the collection association.<br/><br/>e.g. `'pets'`
| 3 | `fk`       |  ((string))            | The foreign key value (e.g. `id`) of the associated record being removed.<br/><br/>e.g. `9`
| 4 | _`req`_             |  ((req?))              | If provided, then the requesting socket _will be excluded_ from the broadcast.
| 5 | _`options`_         |  ((dictionary?))       | A dictionary of additional options.  See below.

##### Additional Options

If the `options` dictionary is provided, and it contains a `noReverse` property, then that property is expected to be a representation of the record's values *before* they were updated.  This may be used to determine whether or not to broadcast additional messages.

By default, when `publishRemove()` is called, it checks whether any associated records were also affected by the removal, and possibly sends out additional notifications (if a reflexive association was changed).

For example, let's say a `User` model has a `pets` association (a _plural_, or "collection" association) which connects each User record with none, one, or several distinct Pet records.  On the other side, let's say each Pet record has an `owner` association (a _singular_ or "model" association), which means it can have exactly zero or one owners.  If `User.publishRemove(4, 'pets', 9)` is called under these circumstances, then not only will it broadcast the normal "removedFrom" message to user 4, it will also broadcast a "updated" message to pet 9 (indicating that its `owner` has changed).

To suppress automatic broadcasts for reflexive associations, set the `options.noReverse` flag to `true`.  In general, you should not have to set the `options.noReverse` flag unless you are writing your own implementation of `publishRemove` for a model.


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




### Notes

> + This method works much in the same way as [`.message()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/message)-- it just represents a more specific use case and has a few special features as described above.  For more conceptual background, see the overview on [resourceful pubsub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  If used, the provided `req` must be from a socket request, not just any old HTTP request.
> + It is important to understand that this method **does not actually do anything to your database**-- it is purely a conventional way of _announcing_ that changes have occurred.  Underneath the covers, the resourceful pubsub methods are just using combinations of `sails.sockets` methods.



<docmeta name="displayName" value=".publishAdd()">











# .publishAdd()

Broadcast a message to all client sockets who have subscribed to the specified record of this model.

By convention, this message indicates that a new child record has been added to the specified collection association of this parent record (and that client-side sockets receiving the message should update their user interface to match).  In other words, if a `Tutorial` model has an associated collection of "comments" (referring to records of the `Comment` model), then you might call `Tutorial.publishAdd()` to notify connected clients that a new comment has been added to the tutorial.

```javascript
Something.publishAdd(id, association, added);
```

_Or:_
+ `Something.publishAdd(id, association, added, socketToOmit);`


### Usage

|   |          Argument           | Type                       | Details
|---| --------------------------- | -------------------------- | -----------
| 1 |        id                   | ((number)) or ((string))   | The id (primary key) of the parent record.
| 2 |        association          | ((string))          | The name of the association that the child record was added to (e.g. `"comments"`)
| 3 |        added                | ((json))            | Either a number or string to represent the id (primary key) of the child record being added, or a dictionary of properties describing it (must contain an `id` key!).  Either way, this information will be bundled in the socket message which is broadcasted.
| 4 |        socketToOmit         | ((req))             | Optional. If provided, the client-side socket indicated by `req` will **not** receive the message blasted out to everyone else.  Useful when the broadcast-worthy event is triggered by a requesting user who doesn't need to hear about it again.



When your app calls `publishAdd()`, a socket message is broadcasted to all sockets subscribed to the record's room (i.e. via the `subscribe()` resourceful pubsub method) and the model identity is used as the event name.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the parent record
+ **verb**  - always provided as the string: `"addedTo"`
+ **attribute** - the name of the model attribute (collection association) that was added to
+ **addedId** - the id of the newly added child record
+ **added** -  Not guaranteed.  Will only be present if a dictionary of properties for the newly added child record was provided, rather than just its id. 




### Examples

```javascript
// Broadcast a message to all client-side sockets subscribed to the tutorial record w/ id=3
// letting them know that a new child record with id=17 has been associated and is now one of the 
// tutorial's "comments".
Tutorial.publishAdd(3, 'comments', 17);
```

```javascript
// Broadcast a message to all client-side sockets subscribed to the tutorial record w/ id=3
// letting them know that a new child record with the specified properties has been associated
// and is now one of the tutorial's "comments".
// (Note that we also pass in `req` to prevent the requesting socket from receiving the broadcast.)
Tutorial.publishAdd(3, 'comments', { 
  id: 17,
  message: 'I love this show!'
}, req);
```

### Notes

> + If you are using [Sails' blueprint API](http://sailsjs.org/documentation/reference/blueprint-api), this resourceful pubsub method is called automatically by built-in code within the blueprints hook in Sails core.  The cleanest way to customize this, or any other behavior bundled in a blueprint API, is to override it with a custom action.
> + If you are looking for information about `noReverse`, see the documentation for `publishUpdate`.  In general, you should not have to set this argument unless you are writing your own implementation of `publishAdd` for a model.
> + Under the covers, resourceful pubsub methods use `sails.sockets.*` methods.  When/if you encounter a need for customization beyond what is supported out of the box in a resourceful pubsub method, you should use the methods exposed in [`sails.sockets.*`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) directly.


<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishAdd()">

