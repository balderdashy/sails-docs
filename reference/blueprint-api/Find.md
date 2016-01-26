# find

Find a list of records from the model as a JSON array of dictionaries.

```
GET /:model
```

Results may be filtered, paginated, and sorted based on the blueprint configuration and/or parameters sent in the request.

If the action was triggered via a socket request, the requesting socket will be "subscribed" to all records returned. If any of the returned records are subsequently updated or deleted, a message will be sent to that socket's client informing them of the change. See the [docs for Model.subscribe()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts) for details.


### Parameters

_All parameters are optional._

 Parameter      | Type         | Details
 -------------- | ------------ |:---------------------------------
 _*_              | ((string))   | To filter results based on a particular attribute, specify a query parameter with the same name as the attribute defined on your model. <br/> <br/> For instance, if our `Purchase` model has an **amount** attribute, we could send `GET /purchase?amount=99.99` to return a list of $99.99 purchases.
 _where_          | ((string))   | Instead of filtering based on a specific attribute, you may instead choose to provide a `where` parameter with the WHERE piece of a [Waterline criteria](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md), _encoded as a JSON string_.  This allows you to take advantage of `contains`, `startsWith`, and other sub-attribute criteria modifiers for more powerful `find()` queries. <br/> <br/> e.g. `?where={"name":{"contains":"theodore"}}`
 _limit_          | ((number))   | The maximum number of records to send back (useful for pagination). Defaults to 30. <br/> <br/> e.g. `?limit=100`
 _skip_           | ((number))   | The number of records to skip (useful for pagination). <br/> <br/> e.g. `?skip=30`
 _sort_           | ((string))   | The sort order. By default, returned records are sorted by primary key value in ascending order. <br/> <br/> e.g. `?sort=lastName%20ASC`
 _populate_       | ((string))   | If specified, overide the default automatic population process. Accepts a comma separated list of attributes names for which to populate record values. See [here](http://sailsjs.org/documentation/reference/waterline-orm/populated-values) for more information on how the population process fills out attributes in the returned list of records according to the model's defined associations.
 _callback_       | ((string))   | If specified, a JSONP response will be sent (instead of JSON).  This is the name of a client-side javascript function to call, to which results will be passed as the first (and only) argument <br/> <br/> e.g. ?callback=my_JSONP_data_receiver_fn



### Example

Find up to 30 of the newest purchases in our database:

```
GET /purchase?sort=createdAt DESC&limit=30
```

##### Expected Response

e.g. 
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

##### Using jQuery

> See [jquery.com](http://jquery.com/) for more documentation.

```javascript
$.get('/purchase?sort=createdAt DESC', function (purchases) {
  console.log(purchases);
});
```

##### Using Angular

> See [Angular](https://angularjs.org/) for more documentation.

```javascript
$http.get('/purchase?sort=createdAt DESC')
.then(function (res) {
  var purchases = res.data;
  console.log(purchases);
});
```

##### Using sails.io.js

> See [sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js) for more documentation.

```javascript
io.socket.get('/purchase?sort=createdAt DESC', function (purchases) {
  console.log(purchases);
});
```

##### Using cURL

> You can read more about [cURL on Wikipedia](http://en.wikipedia.org/wiki/CURL).

```bash
curl http://localhost:1337/purchase?sort=createdAt%20DESC
```


### Notes

> + The example above assumes "rest" blueprints are enabled, and that your project contains a `Purchase` model and an empty `PurchaseController`.  You can quickly achieve this by running:
>
>   ```bash
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails lift
>     # You will see a prompt about database auto-migration settings.
>     # Just choose 2 (alter) and press <ENTER>.
>   ```


<docmeta name="displayName" value="find where">
