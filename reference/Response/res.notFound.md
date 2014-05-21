# res.notFound()

This method is used to send a [404]() ("Not Found") response back down to the client.  This is normally used to indicate that the user-agent tried to get, update, or delete something that doesn't exist.


### Usage

```js
return res.notFound(err, pathToView);
```

-or-


```js
return res.notFound(err, url);
```

-or-

```js
return res.notFound(err);
```

-or-

```js
return res.notFound();
```

### Details


By default, `res.notFound()` performs content-negotiation based on its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will send a JSON response.  Otherwise it calls `res.redirect()` using the specified `url`.  If a view (`pathToView`) is specified, Sails will serve the view.  In any case, a 404 ("Not Found") status code will be sent.

`res.notFound()` includes the specified error (`err`) in its JSON response unless the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`.

If a request "wants JSON", but no `err` argument is provided, a default response body will be sent:

```json
{
  "status": 403
}
```

If a request "wants JSON" and a string `err` argument is provided, the error message will be wrapped in an object under the "error" key:

```json
{
  "status": 403,
  "error": "..."
}
```

### Example

```javascript
if ( !req.session.authorized ) {
  return res.notFound('YOU SHALL NOT PASS!');
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.notFound()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/notFound.js`, which is bundled automatically in newly generated Sails apps.  If a `notFound.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).











<docmeta name="uniqueID" value="resnotFound130366">
<docmeta name="displayName" value="res.notFound()">

