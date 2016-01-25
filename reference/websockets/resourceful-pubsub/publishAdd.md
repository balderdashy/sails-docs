# .publishAdd()

Broadcast a message to all sockets who have subscribed to the specified record of this model.

```javascript
Tutorial.publishAdd(3, 'comments', 17);
```

_Or:_
+ `Tutorial.publishAdd(3, 'comments', { id: 17, message: 'I love this show!' });`
+ `Tutorial.publishAdd(3, 'comments', 17, req);`


By convention, this message is used to indicate that a new child record has been added to the specified collection association of this parent record (and that client-side sockets receiving the message should update their UI to match).


### Usage

|   |          Argument           | Type                       | Details
|---| --------------------------- | -------------------------- | -----------
| 1 |        id                   | ((number)) or ((string))   | The id (primary key) of the parent record.
| 2 |        association          | ((string))          | The name of the association that the child record was added to (e.g. `"comments"`)
| 3 |        added                | ((json))            | The data to send in the message-- either a number or string to represent the id (primary key) of the child record being added, or a dictionary of properties describing it (must contain an `id` key!).
| 4 |        socketToOmit         | ((req))             | Optional. If provided, the client-side socket indicated by `req` will **not** receive the message blasted out to everyone else.  Useful when the broadcast-worthy event is triggered by a requesting user who doesn't need to hear about it again.


`publishAdd()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the record via the `.subscribe()` resourceful pubsub method.

The socket message is an object with the following properties:

+ **id** - the `id` attribute of the parent record
+ **verb**  - always provided as the string: `"addedTo"`
+ **attribute** - the name of the model attribute (collection association) that was added to
+ **addedId** - the id of the newly added child record
+ **added** -  Not guaranteed.  Will only be present if a dictionary of properties for the newly added child record was provided, rather than just its id. 



### Purpose
Publishes a notification when an associated record is added to a model's collection.  For example, if a `User` model has an association with the `Pet` model so that a user can have one or more pets available in its `pets` attribute, then any time a new pet is associated with a user `publishAdd`  be called.

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 | ID of Updated Record|   `int`, `string`    |   Yes      |
| 2 | Attribute of associated collection       |   `string`              |   Yes      |
| 3 | ID of associated record that was added      |   `int`, `string` |   Yes       |
| 4 | Request      |   `request object` |   No       |
| 5 | Additional Options |   `object` | No |

`publishAdd()` emits a socket message using the model identity as the event name.  The message is broadcast to all sockets subscribed to the record via the `.subscribe()` resourceful pubsub method.

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
Tutorial.publishAdd(3, 'comments', { 
  id: 17,
  message: 'I love this show!'
});`
```



### Notes

> + If you are using [Sails' blueprint API](http://sailsjs.org/documentation/reference/blueprint-api), this resourceful pubsub method is called automatically by built-in code within the blueprints hook in Sails core.  The cleanest way to customize this, or any other behavior bundled in a blueprint API, is to override it with a custom action.
> + If you are looking for information about `noReverse`, See the documentation for `publishUpdate`.  In general, you should not have to set this argument unless you are writing your own implementation of `publishAdd` for a model.


<docmeta name="methodType" value="pubsub">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".publishAdd()">

