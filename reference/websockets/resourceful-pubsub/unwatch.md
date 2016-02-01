# .unwatch()

Unenroll the requesting client socket from this model's "class room" for this model, meaning it will no longer receive broadcasts every time [`publishCreate()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/publish-create) is called on this model, and also no longer be subscribed to those new records.


```js
Something.unwatch(req);
```


### Usage

|   | Argument   | Type         | Details                                             |
|---|:-----------|:------------:|:----------------------------------------------------|
| 1 | `req`      | ((req))      | The incoming socket request (`req`).


> See [`.watch()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/watch) for more information.



### Notes
> + Be sure and check `req.isSocket === true` before passing in `req` to refer to the requesting socket.  The provided `req` must be from a socket request, not just any old HTTP request.
> + `unwatch()` will only work when the request is made over a socket connection (e.g. using [`io.socket.get()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-get)), *not* over HTTP (e.g. using [`jQuery.get()`](https://api.jquery.com/jquery.get/)).


<docmeta name="displayName" value=".unwatch()">

