# Replace (Blueprint)

Replace the foreign records in one of this record's collection associations (e.g. "comments").

```
PUT /:model/:id/:association
```

This action adds one or more reference to some other record (the "foreign", or "child" record) onto a particular collection attribute of this record (the "primary", or "parent" record), replacing any existing references in the collection.

+ If the specified `:id` does not correspond with a primary record that exists in the database, this responds using `res.notFound()`.
+ Note that, if the association is "shared" -- a plural ("collection") association with "via", or a singular ("model") association that has a "via" on the _other side_ -- then the association on the foreign records will also be updated.


### Parameters

 Parameter                          | Type                                    | Details
:-----------------------------------| --------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model for the parent record.<br/><br/>e.g. `'employee'` (in `/employee/7/involvedinPurchases/47`)
 id                | ((string))    | The desired target record's primary key value<br/><br/>e.g. `'7'` (in `/employee/7/involvedInPurchases/47`)
 association       | ((string))                             | The name of the collection association<br/><br/>e.g. `'involvedInPurchases'`
 fks | ((array))    | The primary keys (e.g. `id`) of the foreign records to use in this collection association.<br/><br/>e.g. [`47`,`65`]


### Example

Add purchases #47 and #65 to the list of purchases that Dolly (employee #7) has been involved in:

`PUT /employee/7/involvedInPurchases`

```json
[47, 65]
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected response

This returns "Dolly", the parent record.  Notice she is now involved in purchases #47 and #65:

```json
{
  "id": 7,
  "name": "Dolly",
  "createdAt": 1485462079725,
  "updatedAt": 1485476060873,
  "involvedInPurchases": [
    {
      "amount": 10000,
      "createdAt": 1485551132315,
      "updatedAt": 1485551132315
      "id": 47,
      "cashier": 7
    },
    {
      "amount": 5667,
      "createdAt": 1485551158349,
      "updatedAt": 1485551158349
      "id": 65,
      "cashier": 7
    }
  ]
}
```

### Socket notifications

If you have WebSockets enabled for your app, then every client [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) will receive one notification for each child record, where the notification event name is that of the parent model identity (e.g. `employee`), and the &ldquo;message&rdquo; has the following format:

```
id: <the parent record primary key>,
verb: 'addedTo',
attribute: <the parent record collection attribute name>,
addedId: <the child record primary key>
```

For instance, continuing the example above, all clients subscribed to employee #7 (_except_ for the client making the request) would receive the following two messages:

```
id: 7,
verb: 'addedTo',
attribute: 'involvedInPurchases',
addedId: 47
```

and

```
id: 7,
verb: 'addedTo',
attribute: 'involvedInPurchases',
addedId: 65
```

Similarly, any clients subscribed to the _child_ records would receive either an `addedTo` notification like the ones above (if the assocatiation is [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many)) or an `updated` notification (see the [update blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/update) for more info about that notification).

### Notes

> + If you have [shortcut routes](http://sailsjs.com/documentation/concepts/blueprints/blueprint-routes) turned on, you can replace the existing collection by using the collection attribute name as a query string parameter, and setting the value to an array, e.g. `http://localhost:1337/user/3/pets/replace?pets=[3,4]`
> + Remember, this blueprint replaces the _entire_ set of associated records for the given attribute.  To add or remove a single associated record from the collection, leaving the rest of the collection unchanged, use the [&ldquo;add&rdquo;](http://sailsjs.com/documentation/reference/blueprint-api/add-to) or [&ldquo;remove&rdquo;](http://sailsjs.com/documentation/reference/blueprint-api/remove-from) actions.


<docmeta name="displayName" value="replace">
<docmeta name="pageType" value="endpoint">
