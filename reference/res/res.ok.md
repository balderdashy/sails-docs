# res.ok()

Send a 200 ("OK") response back down to the client with the provided data.  Performs content-negotiation on the request and calls either [`res.json()`]() or [`res.view()`]().


### Usage

```js
return res.ok(data);
```

_Or:_
+ `res.ok(data, pathToView);`
+ `res.ok();`


### Details

Like the other built-in custom response modules, the behavior of this method is completely customizable/overridable on an app-by-app basis.

By default, it works as follows:

+ If the request "[wants JSON]()" (e.g. the request originated from AJAX, WebSockets, or a REST client like cURL), Sails will send the provided `data` as JSON.  If no `data` is provided a default response body will be sent (the string `"OK"`).
+ If the request _does not_ "want JSON" (e.g. a URL typed into a web browser), Sails will attempt to serve one of your views.
  + If a specific `pathToView` was provided, Sails will attempt to use that view.
  + Alternatively if `pathToView` was _not_ provided, Sails will try to guess an appropriate view (see [`res.view()`]() for details).  If Sails cannot guess a workable view, it will fall back to JSON.
  + If Sails serves a view, the `data` argument will be accessible as a [view local](): `data`.



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


Alternatively, if the code that calls `res.ok()` was located somewhere where a view file could be guessed, that view would be served, with with Loïc available as the `data` local, e.g.:

```html
<input type="text" placeholder="Name" value="<%= data.name %>"/>
<input type="text" placeholder="Occupation" value="<%= data.occupation %>"/>
```


If the code that calls `res.ok()` is in a policy, or somewhere an appropriate view cannot be guessed, Sails will just send back JSON instead.


Finally, if a custom view file can be provided as the second argument, Sails will use that view instead of guessing:

```javascript
return res.ok({
  name: 'Loïc',
  occupation: 'developer'
}, 'user/detail');
```



### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.ok()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in [`api/responses/ok.js`](), which is bundled automatically in newly generated Sails apps.  If an `ok.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ This method is used by [blueprint actions]() to send a success response.  Therefore as you might expect, it is a great place to marshal response data for clients which expect data in a specific format, i.e. to convert data to XML, or it wrap in an additional object (for Ember clients).
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".




<!-- legacy: -->
<!--If a url expression (`url`) is provided, Sails redirects to that URL.-->
<!--
If no `data` is provided a default response body will be sent:

```json
{
  "status": 200
}
```
-->
<!--

If the request "wants JSON" and the `data` is a string, `data` will be wrapped in an object and included under the "message" key:

```json
{
  "status": 200,
  "message": "..."
}
```

-->




<docmeta name="uniqueID" value="resok847363">
<docmeta name="displayName" value="res.ok()">



