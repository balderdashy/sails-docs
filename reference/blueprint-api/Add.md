# Add (Blueprint)

Add a foreign record (e.g. a comment) to one of this record's collection attributes (e.g. "comments").

```usage
PUT /:model/:id/:association/:fk
```

This action adds a reference to some other record (the "foreign", or "child" record) onto a particular collection attribute of this record (the "primary", or "parent" record).

+ If the specified `:id` does not correspond with a primary record that exists in the database, this responds using `res.notFound()`.
+ If the specified `:fk` does not correspond with a foreign record that exists in the database, this responds using `res.notFound()`.
+ If the primary record is already associated with this foreign record, this action will be ignored.  (In other words, this is [idempotent](http://www.restapitutorial.com/lessons/idempotency.html).)
+ Note that, if the collection is "shared" (meaning it has `via`) then the attribute it points to with that `via` will also be updated on the foreign record.


### Parameters

 Parameter                          | Type                                    | Details
:-----------------------------------| --------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model for the parent record.<br/><br/>e.g. `'employee'` (in `/employee/7/involvedinPurchases/47`)
 id                | ((string))    | The desired target record's primary key value.<br/><br/>e.g. `'7'` (in `/employee/7/involvedInPurchases/47`)
 association       | ((string))                             | The name of the collection attribute.<br/><br/>e.g. `'involvedInPurchases'`
 fk | ((string))    | The primary key (e.g. `id`) of the foreign record to add to this collection.<br/><br/>e.g. `47`


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

If you have WebSockets enabled for your app, then every client [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to the primary record will receive a notification, where the notification event name is the primary model identity (e.g. `'employee'`), and the message has the following format:

```usage
id: <the parent record primary key>,
verb: 'addedTo',
attribute: <the parent record collection attribute name>,
addedId: <the child record primary key>
```

For instance, continuing the example above, all clients subscribed to Dolly a.k.a. employee #7 (_except_ for the client making the request) would receive the following message:

```javascript
id: 7,
verb: 'addedTo',
attribute: 'involvedInPurchases',
addedId: 47
```

**Clients subscribed to the child record receive an additional notification:**

Assuming the collection attribute in our example had a `via`, then either `updated` or `addedTo` notifications will also be sent to any clients who are [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to affected child records on the other side of the relationship.  See [**Blueprints > update**](http://sailsjs.com/documentation/reference/blueprint-api/update), and [**Blueprints > add to**](http://sailsjs.com/documentation/reference/blueprint-api/add-to) for more info about the structure of those notifications.

> If the association pointed at by the `via` is also plural (e.g. `cashiers`), then the `addedTo` notification will be sent. Otherwise, if the `via` points at a singular association (e.g. `cashier`) then the `updated` notification will be sent.

** Finally, a third notification might be sent:**

If adding this purchase to Dolly's (employee #7's) collection would "steal" it from another collection, then any clients subscribed to the stolen-from employee record (e.g. employee #9) would receive a `removedFrom` notification. (See [**Blueprints > remove from**](http://sailsjs.com/documentation/reference/blueprint-api/remove-from)).


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
