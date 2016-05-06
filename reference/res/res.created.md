# res.created()

This method is used to send a [201](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success) ("Created") response back down to the client indicating that one or more resources have been successfully created.


### Usage

```js
return res.created();
```

_Or:_
+ `return res.created(data);`
+ `return res.created(data, pathToView);`


### Details

Like the other built-in custom response modules, the behavior of this method is customizable.

By default, it works as follows:

+ If the request "[wants JSON](http://sailsjs.org/documentation/reference/req/req.wantsJSON.html)" (e.g. the request originated from AJAX, WebSockets, or a REST client like cURL), Sails will send the provided response `data` as JSON.  If no `data` is provided a default response body will be sent (the string `"Created"`).
+ If the request _does not_ "want JSON" (e.g. a URL typed into a web browser), Sails will attempt to serve one of your views.
  + If a specific `pathToView` was provided, Sails will attempt to use that view.
  + Alternatively if `pathToView` was _not_ provided, Sails will attempt to guess the appropriate response view. If that view does not exist, Sails will just send JSON.
  + If Sails serves a view, the `data` argument will be accessible as a [view local](http://sailsjs.org/documentation/concepts/Views/Locals.html): `data`.



### Example

Using the default view:

```javascript
return res.created('New widget created.');
```

With a custom view:

```javascript
return res.forbidden(
    'New widget created.',
    'widgets/created'
  );
```



### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.created()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/created.js`, which is bundled automatically in newly generated Sails apps.  If a `created.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".






<docmeta name="displayName" value="res.created()">
<docmeta name="pageType" value="method">
