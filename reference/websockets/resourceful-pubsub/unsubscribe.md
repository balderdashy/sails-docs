# .unsubscribe()

Unsubscribe the requesting client socket from one or more database records.

```js
Something.unsubscribe(req, ids);
```

### Usage

|   | Argument   | Type         | Details |
|---|:-----------|:------------:|:--------|
| 1 | `req`      | ((req))      | The incoming socket request (`req`) containing the socket to unsubscribe.
| 2 | `ids`      | ((array))    | An array of record ids (primary key values).



### Example

```javascript
User.find({name: 'Lenny'}).exec(function(err, lennies) {
  if (err) return res.serverError(err);
  if (req.isSocket) {
    User.unsubscribe( req, _.pluck(lennies, 'id') );
  }
  return res.ok();
});
```


### Notes
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.
> + `unsubscribe` will only work when the request is made over a socket connection (e.g. using `io.socket.get()`), *not* over HTTP (e.g. using `jQuery.get()`).


<docmeta name="displayName" value=".unsubscribe()">

