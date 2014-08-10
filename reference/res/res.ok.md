# res.ok()

Send a 200 ("OK") response back down to the client with the provided data.  Performs content-negotiation on the request and calls either [`res.json()`](/#/documentation/reference/res/res.json.html) or [`res.view()`](/#/documentation/reference/res/res.view.html).


### Usage

```js
return res.ok();
```

_Or:_
+ `return res.ok(data);`
+ `return res.ok(data, pathToView);`


### Details

Like the other built-in custom response modules, the behavior of this method is customizable.

By default, it works as follows:

+ If the request "[wants JSON](/#/documentation/reference/req/req.wantsJSON.html)" (e.g. the request originated from AJAX, WebSockets, or a REST client like cURL), Sails will send the provided `data` as JSON.  If no `data` is provided a default response body will be sent (the string `"OK"`).
+ If the request _does not_ "want JSON" (e.g. a URL typed into a web browser), Sails will attempt to serve one of your views.
  + If a specific `pathToView` was provided, Sails will attempt to use that view.
  + Alternatively if `pathToView` was _not_ provided, Sails will try to guess an appropriate view (see [`res.view()`](/#/documentation/reference/res/res.view.html) for details).  If Sails cannot guess a workable view, it will fall back and send JSON.
  + If Sails serves a view, the `data` argument will be accessible as a [view local](/#/documentation/concepts/Views/Locals.html): `data`.



### Example

```javascript
return res.ok({
  name: 'Loïc',
  occupation: 'developer'
});
```


If the request originated from a socket or AJAX request, the response sent from the usage above would contain the following JSON:

```json
{
  "name": "Loïc",
  "occupation": "developer"
}
```


Alternatively, if the code that calls `res.ok()` was located somewhere where a view file could be guessed, that view would be served, with with Loïc available as the `data` local.  For example if `res.ok()` was called in `UserController.update`, then we might create the following view as `views/user/update.ejs`:

```html
<input type="text" placeholder="Name" value="<%= data.name %>"/>
<input type="text" placeholder="Occupation" value="<%= data.occupation %>"/>
```


If the code that calls `res.ok()` is not in a controller action, a conventional view cannot be guessed, so Sails will just send back JSON instead.


Finally, if a custom `pathToView` is provided as the second argument, Sails will always use that view instead of guessing, e.g. the following usage will compile and respond with a view located in `views/user/detail.ejs`:

```javascript
return res.ok({
  name: 'Loïc',
  occupation: 'developer'
}, 'user/detail');
```



### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.ok()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in [`api/responses/ok.js`](/#/documentation/anatomy/myApp/api/responses/ok.js.html), which is bundled automatically in newly generated Sails apps.  If an `ok.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ This method is used by [blueprint actions](/#/documentation/reference/blueprint-api?q=blueprint-actions) to send a success response.  Therefore as you might expect, it is a great place to marshal response data for clients which expect data in a specific format, i.e. to convert data to XML, or it wrap in an additional object (for Ember clients).







<docmeta name="uniqueID" value="resok847363">
<docmeta name="displayName" value="res.ok()">



