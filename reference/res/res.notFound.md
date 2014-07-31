# res.notFound()

Sends a [404](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error) ("Not Found") response using either [res.json()](/#/documentation/reference/res/res.json.html) or [res.view()](/#/documentation/reference/res/res.view.html). Called automatically when Sails receives a request which doesn't match any of its explicit routes or route blueprints (i.e. serves the 404 page).

When called manually from your app code, this method is normally used to indicate that the user-agent tried to find, update, or delete something that doesn't exist.


### Usage

```js
return res.notFound();
```

_Or:_
+ `return res.notFound(data);`
+ `return res.notFound(data, pathToView);`




### Details

Like the other built-in custom response modules, the behavior of this method is customizable.

By default, it works as follows:

+ If the request "[wants JSON](/#/documentation/reference/req/req.wantsJSON.html)" (e.g. the request originated from AJAX, WebSockets, or a REST client like cURL), Sails will send the provided error `data` as JSON.  If no `data` is provided a default response body will be sent (the string `"Not Found"`).
+ If the request _does not_ "want JSON" (e.g. a URL typed into a web browser), Sails will attempt to serve one of your views.
  + If a specific `pathToView` was provided, Sails will attempt to use that view.
  + Alternatively if `pathToView` was _not_ provided, Sails will try to guess an appropriate view (see [`res.view()`](/#/documentation/reference/res/res.view.html) for details).  If Sails cannot guess a workable view, it will just send JSON.
  + If Sails serves a view, the `data` argument will be accessible as a [view local](/#/documentation/concepts/Views/Locals.html): `data`.



### Example

Using the default view:

```javascript
return res.notFound();
```

With a custom view:

```javascript
Pet.findOne()
.where(name: 'fido')
.exec(function(err, fido) {
  if (err) return res.serverError(err);
  if (!fido) return res.notFound(undefined,'pet/sorry-that-pet-has-moved');
  // ...
})
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.notFound()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/notFound.js`, which is bundled automatically in newly generated Sails apps.  If a `notFound.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).











<docmeta name="uniqueID" value="resnotFound130366">
<docmeta name="displayName" value="res.notFound()">

