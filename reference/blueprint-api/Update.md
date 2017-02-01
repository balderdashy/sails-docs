# Update (Blueprint)

Update an existing record in the database and notify subscribed sockets that it has changed.

```
PATCH /:model/:id
```

This updates the record in the model which matches the **id** parameter and responds with the newly updated record as a JSON dictionary.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.


### Parameters

_Attributes to change should be sent in the HTTP body as form-encoded values or JSON._

 Parameter                          | Type                                                    | Details
 ---------------------------------- | ------------------------------------------------------- |:---------------------------------
 model                              | ((string))                                              | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model.<br/><br/>e.g. `'product'` (in `PATCH /product/5`)
 id                                 | ((string))                                              | The primary key value of the record to update.<br/><br/>e.g. `'5'` (in `PATCH /product/5`)
 *                                 | ((json))                                                 | For `PATCH` (RESTful) requests, pass in body parameters with the same name as the attributes defined on your model to set those values on the desired record. For `GET` (shortcut) requests, add the parameters to the query string.

### Example

Change Applejack's hobby to "kickin":

`PATCH /pony/47`

```json
{
  "hobby": "kickin"
}
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected Response
```json
{
  "hobby": "kickin",
  "id": 47,
  "name": "AppleJack",
  "createdAt": 1485462079725,
  "updatedAt": 1485476060873
}
```

### Socket notifications

If you have WebSockets enabled for your app, then every client [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to the updated record will receive a notification where the event name is that of the model identity (e.g. `pony`), and the data &ldquo;payload&rdquo; has the following format:

```
verb: 'updated',
id: <the record primary key>,
data: <a dictionary of changes made to the record>,
previous: <the record prior to the update>
```

For instance, continuing the example above, all clients subscribed to `Pony` #47 (_except_ for the client making the request) would receive the following message:

```js
{
  id: 47,
  verb: 'updated',
  data: {
    id: 47,
    hobby: 'kickin'
    updatedAt: 1485476060873
  },
  previous: {
    hobby: 'pickin',
    id: 47,
    name: 'AppleJack',
    createdAt: 1485462079725,
    updatedAt: 1485462079725
  }
}
```

Similarly, if the update included changes to an attribute representing the &ldquo;one&rdquo; side of a [one-to-many association](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many), then `addedTo` and `removedFrom` notifications will be sent to any clients subscribed to the new (if any) and former (if any) _parent_ record.  See the [add blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/add-to) and the [remove blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/remove-from) for more info about those notifications.


### Notes

> + This action can be used to update any attribute in a record _except_ for attributes representing a plural ("collection") association.  To update a plural association of a record, use the [add](http://sailsjs.com/documentation/reference/blueprint-api/add-to), [remove](http://sailsjs.com/documentation/reference/blueprint-api/remove-from) or [replace](http://sailsjs.com/documentation/reference/blueprint-api/replace) actions.
> + This action was bound to the `PUT /:model/:id` route in previous Sails versions.


<docmeta name="displayName" value="update">
<docmeta name="pageType" value="endpoint">

