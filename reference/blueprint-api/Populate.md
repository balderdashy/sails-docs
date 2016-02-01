# Populate (Blueprint)

Populate and return foreign record(s) for the given association of this record.


```
GET /:model/:id/:association
```

If the specified association is plural ("collection"), this action returns the list of associated records as a JSON array of dictionaries.  If the specified association is singular ("model"), this action returns the associated record as a JSON dictionaries.


  Parameter      | Type         | Details
 :-------------- | ------------ |:---------------------------------
 model           | ((string))   | The [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model.<br/><br/>e.g. `'purchase'` (in `GET /purchase/47/cashier`)
 id              | ((string))   | The primary key of the parent record.<br/><br/>e.g. `'47'` (in `GET /purchase/47/cashier`)
 association     | ((string))   | The name of the association.<br/><br/>e.g. `'cashier'` (in `GET /purchase/47/cashier`) or `'products'` (in `GET /purchase/47/products`)


### Example

Populate the `cashier` who conducted purchase #47:

`GET /purchase/47/cashier`

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected response

```json
{
  "amount": 99.99,
  "id": 47,
  "cashier": {
    "name": "Dolly",
    "id": 7,
    "createdAt": "2012-05-14T01:21:05.000Z",
    "updatedAt": "2013-01-15T01:18:40.000Z"
  },
  "createdAt": "2013-10-14T01:22:00.000Z",
  "updatedAt": "2013-10-15T01:20:54.000Z"
}
```

**Using [jQuery](http://jquery.com/):**

```javascript
$.get('/purchase/47/cashier', function (purchase) {
  console.log(purchase);
});
```

**Using [Angular](https://angularjs.org/):**

```javascript
$http.get('/purchase/47/cashier')
.then(function (purchase) {
  console.log(purchase);
});
```

**Using [sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js):**

```javascript
io.socket.get('/purchase/47/cashier', function (purchase) {
  console.log(purchase);
});
```

**Using [cURL](http://en.wikipedia.org/wiki/CURL):**

```bash
curl http://localhost:1337/purchase/47/cashier
```




### Notes

> + The example above assumes "rest" blueprints are enabled, and that your project contains at least an empty 'Employee' model as well as a `Purchase` model with an association attribute: `cashier: {model: 'Employee'}`.  You'll also need at least an empty `PurchaseController` and `EmployeeController`.  You can quickly achieve this by running:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails generate api employee
>   ```
> ...then editing `api/models/Purchase.js`.


<docmeta name="displayName" value="populate where">
