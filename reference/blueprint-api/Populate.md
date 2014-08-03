# Populate Where...

If the specified association is plural ("collection"), this action returns the list of associated records as a JSON array of objects.  If the specified association is singular ("model"), this action returns the associated record as a JSON object.

```
GET /:model/:record/:association
```

### Example

Populate the `cashier` who conducted purchase #47.

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

**Using [sails.io.js](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.io.js):**

```javascript
io.socket.get('/purchase/47/cashier', function (purchase) {
  console.log(purchase);
});
```

**Using [cURL](http://en.wikipedia.org/wiki/CURL):**

```bash
curl http://localhost:1337/purchase/47/cashier
```


Should return

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


### Notes

> + The example above assumes "rest" blueprints are enabled, and that your project contains at least an empty 'Employee' model as well as a `Purchase` model with an association attribute: `cashier: {model: 'Employee'}`.  You'll also need at least an empty `PurchaseController` and `EmployeeController`.  You can quickly achieve this by running:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails generate api employee
>   ```
>
> ...then editing `api/models/Purchase.js`.

<docmeta name="uniqueID" value="Populate838372">
<docmeta name="displayName" value="populate where">
