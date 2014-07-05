# res.ok()

Send a 200 ("OK") response back down to the client.


### Usage

```js
return res.ok(data);
```
-or-

```js
return res.ok(data, pathToView);
```

-or-

```js
return res.ok(data, url);
```

-or-

```js
return res.ok();
```

### Details

By default, `res.ok()` performs content-negotiation based its arguments, your app's environment, and the type of request.

If a view (`pathToView`) is provided, Sails serves that view.  If a url expression (`url`) is provided, Sails redirects to that URL.  If some data (`data`) is provided, Sails either uses it to form the JSON response or sends it to the specified view as [locals]().

If the request "wants JSON", Sails will always send JSON.  If no `data` is provided a default response body will be sent:

```json
{
  "status": 200
}
```

If the request "wants JSON" and the `data` is a string, `data` will be wrapped in an object and included under the "message" key:

```json
{
  "status": 200,
  "message": "..."
}
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.ok()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in `/responses/ok.js`, which is bundled automatically in newly generated Sails apps.  If an `ok.js` response method does not exist in your app, Sails will implicitly use the default behavior.
>+ This method is used by [blueprint actions]() to send a success response.  Therefore as you might expect, it is a great place to marshal response data for clients which expect data in a specific format, i.e. to convert data to XML, or it wrap in an additional object (for Ember clients).
>+ If `pathToView` refers to a missing view, this method will respond as if the request "wants JSON".










<docmeta name="uniqueID" value="resok847363">
<docmeta name="displayName" value="res.ok()">

