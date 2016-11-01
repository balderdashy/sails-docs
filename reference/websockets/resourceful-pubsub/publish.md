# .publish()

Publish an arbitrary message to clients subscribed to a particular event for one or more model instances.

```js
Something.publish(records, event, data, req);
```


### Usage

|   | Argument   | Type         | Details |
|---|:-----------|:------------:|---------|
| 1 | `records`  | ((array))    | An array of records or record ids (primary key values).
| 2 | `event`    | ((string))   | The event name to broadcast.
| 3 | `data`     | ((anything)) | The data to broadcast.
| 4 | `req`      | ((req))      | If provided, then the requesting socket will *not* receive the broadcast.



### Example

```javascript
  // On the server:

  tellSecretToBobs: function (req, res) {

    // Get the secret from the request.
    var secret = req.param('secret');

    // Look up all users named "Bob".
    User.find({name: 'bob'}, function(err, bobs) {
      if (err) {return res.serverError(err);}

      // Tell the secret to every client who is subscribed to the 'secret' event for these users,
      // except for the client that made this request in the first place.
      User.publish(bobs, 'secret', 'Pssst: ' + secret, req);

      return res.status(200).send();
    });

  }
```

```javascript
  // On the client:

  // Subscribe this client socket to Bob secrets (see the `.subscribe()` documentation for more info about subscribing to events:
  // http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/subscribe
  io.socket.get('/subscribeToBobSecrets');

  // Whenever a `secret` event is received, say something.
  io.socket.on('secret', function(msg) {console.log('Got a secret:', msg);});
```

### Notes
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  If used, the provided `req` must be from a socket request, not just any old HTTP request.


<docmeta name="displayName" value=".publish()">
<docmeta name="pageType" value="method">

