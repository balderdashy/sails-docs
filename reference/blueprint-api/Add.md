# Add (Blueprint)

Add a foreign record (e.g. a comment) to one of this record's collection associations (e.g. "comments").

```usage
PUT /:model/:id/:association/:fk
```

This action adds a reference to some other record (the "foreign", or "child" record) onto a particular collection attribute of this record (the "primary", or "parent" record).

+ If the specified `:id` does not correspond with a primary record that exists in the database, this responds using `res.notFound()`.
+ If the specified `:fk` does not correspond with a foreign record that exists in the database, this responds using `res.notFound()`.
+ If the collection association within the primary record _already_ contains a reference to the foreign record, this action will be ignored.  (In other words, this is [idempotent](http://www.restapitutorial.com/lessons/idempotency.html).)
+ Note that, if the association is "shared" -- a plural ("collection") association with "via", or a singular ("model") association that has a "via" on the _other side_ -- then the association on the foreign record will also be updated.


### Parameters

 Parameter                          | Type                                    | Details
:-----------------------------------| --------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model for the parent record.<br/><br/>e.g. `'employee'` (in `/employee/7/involvedinPurchases/47`)
 id                | ((string))    | The desired target record's primary key value<br/><br/>e.g. `'7'` (in `/employee/7/involvedInPurchases/47`)
 association       | ((string))                             | The name of the collection association<br/><br/>e.g. `'involvedInPurchases'`
 fk | ((string))    | The primary key (e.g. `id`) of the foreign record to add to this collection association.<br/><br/>e.g. `47`


### Example

Add purchase #47 to the list of purchases that Dolly (employee #7) has been involved in:

```
PUT /employee/7/involvedInPurchases/47
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected response

This returns "Dolly", the parent record.  Notice she is now involved in purchase #47:

```json
{
  "id": 7,
  "name": "Dolly",
  "createdAt": 1485462079725,
  "updatedAt": 1485476060873,
  "involvedInPurchases": [
    {
      "amount": 10000,
      "createdAt": 1485476060873,
      "updatedAt": 1485476060873,
      "id": 47,
      "cashier": 7
    }
  ]
}
```


##### Using jQuery

```javascript
$.put('/employee/7/involvedInPurchases/47', function (purchases) {
  console.log(purchases);
});
```

##### Using Angular

```javascript
$http.put('/employee/7/involvedInPurchases/47')
.then(function (purchases) {
  console.log(purchases);
});
```

##### Using sails.io.js

```javascript
io.socket.put('/employee/7/involvedInPurchases/47', function (purchases) {
  console.log(purchases);
});
```

##### Using [cURL](http://en.wikipedia.org/wiki/CURL)

```bash
curl http://localhost:1337/employee/7/involvedInPurchases/47 -X "PUT"
```


### Socket notifications

If you have WebSockets enabled for your app, then every client [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to the parent record will receive a notification, where the notification event name is that of the parent model identity (e.g. `'employee'`), and the &ldquo;message&rdquo; has the following format:

```
id: <the parent record primary key>,
verb: 'addedTo',
attribute: <the parent record collection attribute name>,
addedId: <the child record primary key>
```

For instance, continuing the example above, all clients subscribed to employee #7 (_except_ for the client making the request) would receive the following message:

```
id: 7,
verb: 'addedTo',
attribute: 'involvedInPurchases',
addedId: 47
```

Similarly, if the relationship between the parent and child models is [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many), then subscribers to the child record will receive `addedTo` notifications as well (with the `id` and `addedId` values reversed).  If the relationship is [one-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many), then subscribers to the child will receive an `updated` notification (see the [update blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/update) for more info about that notification).



### Notes

> + If you'd like to spend some more time with Dolly, a more detailed walkthrough related to the example above is available [here](https://gist.github.com/mikermcneil/e5a20b03be5aa4e0459b).
> + This action is for adding a foreign record to a _plural_ ("collection") association.  If you want to set or unset a _singular_ ("model") association, just use [update](http://sailsjs.com/documentation/reference/blueprint-api/update) and set the model association to the id of the new foreign record (or `null` to clear the association).  If you want to completely _replace_ the set of records in the collection with another set, use the [replace](http://sailsjs.com/documentation/reference/blueprint-api/replace) blueprint.
> + The example above assumes "rest" blueprints are enabled, and that your project contains at least an 'Employee' model with association: `involvedInPurchases: {collection: 'Purchase', via: 'cashier'}` as well as a `Purchase` model with association: `cashier: {model: 'Employee'}`.  You can quickly achieve this by running:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate model purchase
>   $ sails generate model employee
>   ```
>
> ...then editing `api/models/Purchase.js` and `api/models/Employee.js`.


<docmeta name="displayName" value="add to">
<docmeta name="pageType" value="endpoint">
