# Add (Blueprint)

Add a foreign record (e.g. a comment) to one of this record's collection associations (e.g. "comments").

```
POST /:model/:id/:association/:fk
```

This action pushes a reference to some other record (the "foreign" record) onto a collection attribute of this record (the "primary" record).

+ If `:fk` of an existing foreign record is supplied, it will be associated with the primary record.
+ If no `:fk` is supplied, and the body of the **POST** contains values for a new record, that record will be created and associated with the primary record.
+ If the collection association within the primary record already contains a reference to the foreign record, this action will be ignored.
+ If the association is 2-way (i.e. reflexive, with "via" on both sides) the association on the foreign record will also be updated.


### Parameters

 Parameter                          | Type                                    | Details
|:--------------------------------- | --------------------------------------- |:---------------------------------
 `model`          | ((string))   | The [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model for the parent record.<br/><br/>e.g. `'employee'` (in `/employee/7/involvedinPurchases/47`)
 `id`                | ((string))    | The desired target record's primary key value<br/><br/>e.g. `'7'` (in `/employee/7/involvedInPurchases/47`)
 `association`       | ((string))                             | The name of the collection association<br/><br/>e.g. `'involvedInPurchases'`
 `fk` | ((string))    | The primary key (e.g. `id`) of the foreign record to add to this collection association.<br/><br/>e.g. `47`
 _callback_                         | ((string?))                              | If specified, a JSONP response will be sent (instead of JSON). This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`


### Example

Add purchase #47 to the list of purchases that Dolly (employee #7) has been involved in:

```
POST /employee/7/involvedInPurchases/47
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected response

This returns "Dolly", the parent record.  Notice she is now involved in purchase #47:

```json
{
  "id": 7,
  "createdAt": "2014-08-03T01:16:35.440Z",
  "name": "Dolly",
  "updatedAt": "2014-08-03T01:51:41.567Z",
  "involvedInPurchases": [
    {
      "amount": 10000,
      "createdAt": "2014-08-03T01:50:33.898Z",
      "updatedAt": "2014-08-03T01:51:08.227Z",
      "id": 47,
      "cashier": 7
    }
  ]
}
```


##### Using jQuery

```javascript
$.post('/employee/7/involvedInPurchases/47', function (purchases) {
  console.log(purchases);
});
```

##### Using Angular

```javascript
$http.post('/employee/7/involvedInPurchases/47')
.then(function (purchases) {
  console.log(purchases);
});
```

##### Using sails.io.js

```javascript
io.socket.post('/employee/7/involvedInPurchases/47', function (purchases) {
  console.log(purchases);
});
```

##### Using [cURL](http://en.wikipedia.org/wiki/CURL)

```bash
curl http://localhost:1337/employee/7/involvedInPurchases/47 -X "POST"
```




### Notes

> + If you'd like to spend some more time with Dolly, a more detailed walkthrough related to the example above is available [here](https://gist.github.com/mikermcneil/e5a20b03be5aa4e0459b).
> + This action is for dealing with _plural_ ("collection") associations.  If you want to set or unset a _singular_ ("model") association, just use [update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html) and set the model association to the id of the new foreign record (or `null` to clear the association).
> + The example above assumes "rest" blueprints are enabled, and that your project contains at least an 'Employee' model with association: `involvedInPurchases: {collection: 'Purchase', via: 'cashier'}` as well as a `Purchase` model with association: `cashier: {model: 'Employee'}`.  You'll also need at least an empty `PurchaseController` and `EmployeeController`.  You can quickly achieve this by running:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails generate api employee
>   ```
>
> ...then editing `api/models/Purchase.js` and `api/models/Employee.js`.


<docmeta name="displayName" value="add to">
