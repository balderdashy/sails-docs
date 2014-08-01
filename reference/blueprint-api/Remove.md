# Remove Model Association

Removes an association between two model instances using the blueprint actions

```http
delete /:model/:modelId/:attributeId/:associatedModelId
```

### Example

Remove association between `purchase` 47 and 'cashier' 7 (Dolly).

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
   "cashier":  {
      "name": "Dolly",
      "id": 7,
      "createdAt": "2012-05-14T01:21:05.000Z",
      "updatedAt": "2013-01-15T01:18:40.000Z"
    },
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }
]
```

**Using [jQuery](http://jquery.com/):**

```javascript
$.delete('/purchase/47/cashier/7', function (purchases) {
  console.log(purchases);
});
```

**Using [Angular](https://angularjs.org/):**

```javascript
$http.delete('/purchase/47/cashier/7')
.then(function (purchases) {
  console.log(purchases);
});
```

**Using [sails.io.js](http://beta.sailsjs.org/#/documentation/reference/websockets/sails.io.js):**

```javascript
io.socket.delete('/purchase/47/cashier/7', function (purchases) {
  console.log(purchases);
});
```

**Using [cURL](http://en.wikipedia.org/wiki/CURL):**

```bash
curl http://localhost:1337/purchase/47/cashier/7 -X "DELETE"
```


Should return 

```json
[
 {
   "amount": 99.99,
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }
]

```


### Notes

> + The example above assumes "rest" blueprints are enabled, and that your project contains `Purchase` and 'Cashier' models and empty `PurchaseController` and `CashierController`.  You can quickly achieve this by running:
>
>   ```bash
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails generate api cashier
>   ```

<docmeta name="uniqueID" value="Remove2294521">
<docmeta name="displayName" value="Remove Association">
