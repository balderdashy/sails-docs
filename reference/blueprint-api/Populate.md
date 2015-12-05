# Populate Where...

指定されたアソシエーションが複数("collection")の時、このアクションは関連付けられたレコードのリストをJSONオブジェクトの配列として返します。指定されたアソシエーションが一つ("model")の時、このアクションは関連付けられたレコードのJSONオブジェクトを返します。

```
GET /:model/:record/:association
```

### 例

購入#47に関わった`cashier`を取得する。

**[jQuery](http://jquery.com/)を使う:**

```javascript
$.get('/purchase/47/cashier', function (purchase) {
  console.log(purchase);
});
```

**[Angular](https://angularjs.org/)を使う:**

```javascript
$http.get('/purchase/47/cashier')
.then(function (purchase) {
  console.log(purchase);
});
```

**[sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js)を使う:**

```javascript
io.socket.get('/purchase/47/cashier', function (purchase) {
  console.log(purchase);
});
```

**[cURL](http://en.wikipedia.org/wiki/CURL)を使う:**

```bash
curl http://localhost:1337/purchase/47/cashier
```


以下のように返ってくるはずです:

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


### 備考

> + 上記の例では"rest"blueprintが有効であると仮定します。それに加えてあなたのプロジェクトが少なくともアソシエーション`involvedInPurchases: {collection: 'Purchase', via: 'cashier'}`を持った'Employee'モデルとアソシエーション`cashier: {model: 'Employee'}`を持った`Purchase`モデルを持っているべきです。 同様に空の`PurchaseController`と`EmployeeController`も必要です。これを簡単に行うには以下を実行します:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails generate api employee
>   ```
> ...then editing `api/models/Purchase.js`.

<docmeta name="uniqueID" value="Populate838372">
<docmeta name="displayName" value="populate where">
