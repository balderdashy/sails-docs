# res.serverError()

This method is used to send a [500]() ("Server Error") response back down to the client indicating that some kind of server error occurred.


### Usage

```js
return res.serverError(err);
```

-or-

```js
return res.serverError();
```

### Details

By default, `res.serverError()` performs content-negotiation based its arguments, your app's environment, and the type of request.

If the request "wants JSON", Sails will serve a default error page ("views/500.js") or send a JSON error response.  In both cases, it sends the response with a 500 "Server Error" status code.

### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.serverError()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/serverError.js`, which is bundled automatically in newly generated Sails apps.  If a `serverError.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).



<docmeta name="uniqueID" value="resserverError551750">
<docmeta name="displayName" value="res.serverError()">

