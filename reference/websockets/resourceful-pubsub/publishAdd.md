# .publishAdd()

Broadcast a conventional message indicating that a record has been newly added to one of this parent record's collections.

```javascript
Something.publishAdd(id, association, added);
```

_Or:_
+ `Something.publishAdd(id, association, added, req);`


By convention, this message indicates that a new child record has been added to the specified collection association of this parent record (and that client-side sockets receiving the message should update their user interface to match).  In other words, if a `Tutorial` model has an associated collection of "comments" (referring to records of the `Comment` model), then you might call `Tutorial.publishAdd()` to notify connected clients that a new comment has been added to the tutorial.


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


Meanwhile, on the front-end, you might do something like this:

```js
// e.g. in the browser...
io.socket.on('tutorial', function (event){
  switch (event.verb) {
    'addedTo':
      console.log(event);
      // => see below
      break;
    default: 
      console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
  }
});
```


In the case of the first example call to `publishAdd` above, the logged message would look like:

```js
{
  verb: 'addedTo',
  id: 3,
  attribute: 'comments',
  addedId: 17
}
```

Whereas in the latter case, note that `added` is also present thanks to the ((dictionary)) usage:

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

> + It is important to understand that this method **does not actually do anything to your database**-- it is purely a conventional way of _announcing_ that changes have occurred.  Underneath the covers, the resourceful pubsub methods are just using combinations of `sails.sockets` methods.
> + Under the covers, resourceful pubsub methods use `sails.sockets.*` methods.  When/if you encounter a need for customization beyond what is supported out of the box in a resourceful pubsub method, you should use the methods exposed in [`sails.sockets.*`](http://sailsjs.org/documentation/reference/web-sockets/sails-sockets) directly.
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  If used, the provided `req` must be from a socket request, not just any old HTTP request.
> + This method works much in the same way as [`.message()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/message)-- it just represents a more specific use case and has a few special features as described above.  For more conceptual background, see the overview on [resourceful pubsub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).
> + If you are using [Sails' blueprint API](http://sailsjs.org/documentation/reference/blueprint-api), this resourceful pubsub method is called automatically by built-in code within the blueprints hook in Sails core.  The cleanest way to customize this, or any other behavior bundled in a blueprint API, is to override it with a custom action.
> + If you are looking for information about the `noReverse` flag, see the documentation for `publishUpdate`.  In general, you should not have to set this argument unless you are writing your own implementation of `publishAdd` for a model.


<docmeta name="displayName" value=".publishAdd()">


