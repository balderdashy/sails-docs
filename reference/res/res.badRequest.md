# res.badRequest()

This method is used to send a [400](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error) ("Bad Request") response back down to the client indicating that the request is invalid.  This usually means it contained invalid parameters or headers, or tried to do something impossible based on your app logic.



### Usage

```js
return res.badRequest();
```

_Or:_
+ `return res.badRequest(data);`
+ `return res.badRequest(data, pathToView);`



### Details

Like the other built-in custom response modules, the behavior of this method is customizable.

By default, it works as follows:

+ If the request "[wants JSON](/#/documentation/reference/req/req.wantsJSON.html)" (e.g. the request originated from AJAX, WebSockets, or a REST client like cURL), Sails will send the provided error `data` as JSON.  If no `data` is provided a default response body will be sent (the string `"Bad Request"`).
+ If the request _does not_ "want JSON" (e.g. a URL typed into a web browser), Sails will attempt to serve one of your views.
  + If a specific `pathToView` was provided, Sails will attempt to use that view.
  + Alternatively if `pathToView` was _not_ provided, Sails will try to guess an appropriate view (see [`res.view()`](/#/documentation/reference/res/res.view.html) for details).  If Sails cannot guess a workable view, it will just send JSON.
  + If Sails serves a view, the `data` argument will be accessible as a [view local](/#/documentation/concepts/Views/Locals.html): `data`.



### Example

Using the default view:

```javascript
if ( req.param('amount') < 500 )
  return res.badRequest(
    'Transaction limit exceeded. Please try again with an amount less than $500.'
  );
}
```

With a custom view:

```javascript
if ( req.param('amount') < 500 )
  return res.badRequest(
    'Transaction limit exceeded. Please try again with an amount less than $500.',
    'salesforce/leads/edit'
  );
}
```



### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.badRequest()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/badRequest.js`, which is bundled automatically in newly generated Sails apps.  If a `badRequest.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ This method is called automatically if a call to [`req.validate()`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) fails any of its validation checks.
>+ By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).












<docmeta name="uniqueID" value="resbadRequest631019">
<docmeta name="displayName" value="res.badRequest()">

