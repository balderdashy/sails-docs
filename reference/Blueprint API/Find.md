# Find Records

Returns a list of records from the model as a JSON array of objects.

```http
GET /:modelIdentity
```

Results may be filtered, paginated, and sorted based on the blueprint configuration and/or parameters sent in the request.

If the action was triggered via a socket request, the requesting socket will be "subscribed" to all records returned.  If any of the returned records are subsequently updated or deleted, a message will be sent to that socket's client informing them of the change.  See the [docs for Model.subscribe()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts) for details.


### Parameters

_All parameters are optional._

 Parameter      | Type         | Details
 -------------- | ------------ |:---------------------------------
 *              | ((string))   | To filter results based on a particular attribute, specify a query parameter with the same name as the attribute defined on your model. <br/> <br/> For instance, if our `Purchase` model has an **amount** attribute, we could send `GET /purchase?amount=99.99` to return a list of $99.99 purchases.
 where          | ((string))   | Instead of filtering based on a specific attribute, you may instead choose to provide a `where` parameter with a Waterline WHERE criteria object, _encoded as a JSON string_.  This allows you to take advantage of `contains`, `startsWith`, and other sub-attribute criteria modifiers for more powerful `find()` queries. <br/> <br/> e.g. `?where={"name":{"contains":"theodore"}}`
 limit          | ((integer))  | The maximum number of records to send back (useful for pagination). Defaults to 30. <br/> <br/> e.g. `?limit=100`
 skip           | ((integer))  | The number of records to skip (useful for pagination). <br/> <br/> e.g. `?skip=30`
 sort           | ((string))   | The sort order. By default, returned records are sorted by primary key value in ascending order. <br/> <br/> e.g. `?sort=lastName%20ASC`
 callback       | ((integer))  | If specified, a JSONP response will be sent (instead of JSON).  This is the name of a client-side javascript function to call, to which results will be passed as the first (and only) argument <br/> <br/> e.g. ?callback=my_JSONP_data_receiver_fn



### Example

Find the 30 newest purchases in our database.

```json
[
 {
   "amount": 49.99,
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 },
 {
   "amount": 99.99,
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }
]
```

**Using [jQuery]():**

```javascript
$.get('/purchase?sort=createdAt DESC', function (purchases) {
  console.log(purchases);
});
```

**Using [cURL]():**

```bash
# todo
```


**Using [sails.io.js]()**

```javascript
io.socket.get('/purchase?sort=createdAt DESC', function (purchases) {
  console.log(purchases);
});
```

**Using [Angular]()**

```javascript
$http.get('/purchase?sort=createdAt DESC').then(function (purchases) {
  console.log(purchases);
});
```



### Notes

> + The example above assumes "rest" blueprints are enabled, and that your project contains a `Purchase` model and an empty `PurchaseController`.  You can quickly achieve this by running:
>
>   ```bash
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   ```

<!--

  Actually it is now
  ~mike

> Unlike earlier versions of Sails, a socket is *not* automatically subscribed to the "class room" for a model as a result of running the "find" blueprint.  Therefore, it will not be alerted when a new instance of that model is created.  This behavior can be changed by setting the `autoWatch` property to `true` in `/config/blueprints.js`.
-->

<docmeta name="uniqueID" value="Find290807">
<docmeta name="displayName" value="Find Records">

