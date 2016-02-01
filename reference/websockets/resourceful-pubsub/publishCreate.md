# .publishCreate()

Broadcast a conventional message indicating that a new record has been created in this model.


```js
Something.publishCreate( data )
```

_Or:_
- `Something.publishCreate(data, req);`



### Usage

|   |     Argument        | Type                | Details    |
|---|:--------------------|---------------------|:-----------|
| 1 | `data`           |  ((dictionary))     |   A dictionary of the new record's attributes and their values to announce.  This may consist of any JSON-serializable data you like, but must _at-minimum_ contain the primary key of the record (usually `id`).
| 2 | _`req`_             |  ((req?))           | If provided, then the requesting socket _will be excluded_ from the broadcast.


`publishCreate()` broadcasts to all sockets "watching" this model-- that is, those client sockets which have joined the model's "class room" via [`.watch()`](http://next.sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/watch))-- and uses the model's [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) as the event name.  `publishCreate()` also subscribes these "watching" client sockets to the new record using `.subscribe()` in order to be notified of future broadcasts from `publishUpdate()`, `publishDestroy()`, etc.

The broadcasted event data received on the client is a dictionary with the following properties:

+ **verb**  - a ((string)) constant: `'created'`
+ **id** - the new record's `id` which is a ((string)) or ((number))
+ **data** - a ((dictionary)) containing the values provided as `data` when `publishCreate()` was called from your Sails backend.




### Example

In a controller action which processes signups:

```javascript
var Passwords = require('machinepack-passwords');

// Encrypt a string using the BCrypt algorithm.
Passwords.encryptPassword({
  password: req.param('password'),
}).exec({
  error: function (err){ return res.serverError(err); },
  success: function (encryptedPassword){
    User.create({
      username: req.param('username'),
      passsword: encryptedPassword,
      securityQuestion: {
        whichQuestion: req.param('securityQuestionId'),
        answer: req.param('securityAnswer')
      }
    }).exec(function (err, newUser){
      if (err) return res.negotiate(err);
      
      // Inform logged-in administrators (if there are any) that a new user has signed up.
      // (note that we deliberately exclude the security question and encrypted password,
      //  but send everything else through.  We know this will only be received by client
      //  sockets which were allowed to `.watch()`.)
      User.publishCreate(_.omit(newUser, 'password'), req );
      
      // Log in.
      req.session.me = newUser.id;
      
      // Signup completed successfully!
      return res.ok();
    });//</User.create()>
  }
});//</Passwords.encryptPassword()>
```

The endpoint will respond with a simple 200 (because of `res.ok()`), but all "watching" client sockets (in this scenario, open browser tabs of admin users) will receive a `user` event:

```js
// e.g. in the browser...
io.socket.on('user', function (event){
  switch (event.verb) {
    'created':
      // This is where code that handles this socket event should go.
      // (e.g. to update the user interface)
      console.log(event);
      // => see below for the contents of `event`
      break;
    default: 
      console.warn('Unrecognized socket event (`%s`) from server:',event.verb, event);
  }
});
```

In this case, the logged message would look something like this:

```js
{
  verb: 'created',
  id: 4,
  data: {
    username: 'lizzy',
    createdAt: '1808-01-19T13:00:00.000Z',
    updatedAt: '1808-01-19T13:00:00.000Z'
  }
}
```



### Notes

> + This method works much in the same way as [`.message()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/message)-- it just represents a more specific use case and has a few special features as described above.  For more conceptual background, see the overview on [resourceful pubsub](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub).
> + It is important to understand that this method **does not actually do anything to your database**-- it is purely a conventional way of _announcing_ that changes have occurred.  Underneath the covers, the resourceful pubsub methods are just using combinations of `sails.sockets` methods.
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  If used, the provided `req` must be from a socket request, not just any old HTTP request.
> + See also [`.watch()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/watch) for some important security considerations.




<docmeta name="displayName" value=".publishCreate()">


