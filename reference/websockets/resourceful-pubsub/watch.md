# .watch()

Enroll the requesting client socket in the "class room" for this model, causing it to receive broadcasts every time [`publishCreate()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/publish-create) is called on this model.  In addition, this client socket will be subscribed _every new record_ it hears about automatically.

```js
Something.watch(req);
```


### Usage

|   | Argument   | Type         | Details                                             |
|---|:-----------|:------------:|:----------------------------------------------------|
| 1 | `req`      | ((req))      | The incoming socket request (`req`).


> Also see **Notes** below for an important reminder about security.


### Example

```javascript
User.find({
  limit: req.param('limit'),
  skip: req.param('skip'),
  sort: 'name ASC'
}).exec(function(err, users) {
  if (err) return res.serverError(err);
  
  if (req.isSocket) {
    // If this code is running, it's made it past the `isAdmin` policy, so we can safely
    // watch for `.publishCreate()` calls about this model and inform this socket, since we're
    // confident it belongs to a logged-in administrator.
    User.watch( req );
  }
  
  // If this is request wants JSON (i.e. AJAX), then send a JSON response.
  if (req.wantsJSON) {
    return res.json(users);
  }
  
  // Otherwise serve an HTML page.
  return res.view('admin/user-dashboard', {
    users: users
  });
  
});
```



### Notes
> + Much like the default blueprint API, `.watch()` should be used with care.  Client sockets allowed to `.watch()` will receive broadcasted messages _every time `publishCreate()` is called_, and then be subscribed to future notifications (like [`publishUpdate()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/publish-update)) about those new records.  This method is a great fit for use cases where access control is "all or nothing"-- e.g. something like an admin dashboard, or a publicly-available endpoint.
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.
> + `watch()` will only work when the request is made over a socket connection (e.g. using [`io.socket.get()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-get)), *not* over HTTP (e.g. using [`jQuery.get()`](https://api.jquery.com/jquery.get/)).



<docmeta name="displayName" value=".watch()">

