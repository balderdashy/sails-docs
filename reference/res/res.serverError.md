# res.serverError()

This method is used to send a [500](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_Error) ("Server Error") response back down to the client indicating that some kind of server error occurred.


### Usage

```js
return res.serverError();
```

_Or:_
+ `return res.serverError(data);`
+ `return res.serverError(data, pathToView);`


### Details

Like the other built-in custom response modules, the behavior of this method is customizable.

By default, it works as follows:

+ If the request "[wants JSON](/#/documentation/reference/req/req.wantsJSON.html)" (e.g. the request originated from AJAX, WebSockets, or a REST client like cURL), Sails will send the provided error `data` as JSON.  If no `data` is provided a default response body will be sent (the string `"Server Error"`).
+ If the request _does not_ "want JSON" (e.g. a URL typed into a web browser), Sails will attempt to serve one of your views.
  + If a specific `pathToView` was provided, Sails will attempt to use that view.
  + Alternatively if `pathToView` was _not_ provided, Sails will serve a default error page (the view located at [`views/500.ejs`](/#/documentation/anatomy/myApp/views/500.ejs.html)).  If that view does not exist, Sails will just send JSON.
  + If Sails serves a view, the `data` argument will be accessible as a [view local](/#/documentation/concepts/Views/Locals.html): `data`.



### Example

Using the default error view:

```javascript
return res.serverError('Salesforce could not be reached');
```

With a custom view:

```javascript
return res.serverError(
  'Salesforce could not be reached',
  'salesforce/leads/edit'
);
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.serverError()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/serverError.js`, which is bundled automatically in newly generated Sails apps.  If a `serverError.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".
>+By default, the specified error (`err`) will be excluded if the app is running in the "production" environment (i.e. `process.env.NODE_ENV === 'production'`).



<docmeta name="uniqueID" value="resserverError551750">
<docmeta name="displayName" value="res.serverError()">

