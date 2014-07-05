# res.badRequest()

This method is used to send a [400]() ("Bad Request") response back down to the client indicating that the request is invalid.  This usually means it contained invalid parameters or headers, or tried to do something impossible based on your app logic.


### Usage

```js
return res.badRequest(err, url);
```

-or-

```js
return res.badRequest(err);
```

-or-

```js
return res.badRequest();
```

### Details

By default, `res.badRequest()` performs content-negotiation based on its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will send a JSON response.  Otherwise it calls `res.redirect()` using the specified `url`.  If a view (`pathToView`) is specified, Sails will serve the view.  In any case, a 400 ("Bad Request") status code will be sent.

If a request "wants JSON", but no `err` argument is provided, a default response body will be sent:

```json
{
  "status": 400
}
```

If a request "wants JSON" and a string `err` argument is provided, the error message will be wrapped in an object under the "error" key:

```json
{
  "status": 400,
  "error": "..."
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.badRequest()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/badRequest.js`, which is bundled automatically in newly generated Sails apps.  If a `badRequest.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+ By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).












<docmeta name="uniqueID" value="resbadRequest631019">
<docmeta name="displayName" value="res.badRequest()">

