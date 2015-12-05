# コレクションに追加する

2つのレコードの間にアソシエーションを追加します

```
POST /:model/:record/:association/:record_to_add?
```

このアクションは何らかのレコードを("外部"レコード)を自分のレコード("プライマリ"レコード)のアトリビュートコレクションとして追加します。

+ 実在するレコードの`:record_to_add`が与えられた場合、それがプライマリレコードに関連付けられます。
+ `:record_to_add`が何も提供されない場合で**POST**のBodyに新しいレコードの値が入っている場合、そのレコードが作成されプライマリレコードと関連付けられます。
+ すでにプライマリレコードのコレクションにすでに外部レコードが含まれる場合、そのアクションは無視されます。
+ アソシエーションが2方向（例:両サイドにviaが含まれる反射的な関係の場合）反対側となる外部レコードのアソシエーションも更新されます。


### 例

購入#47をDolly (従業員 #7)が関わった購入に関連付ける場合。

**[jQuery](http://jquery.com/)を使う:**

```javascript
$.post('/employee/7/involvedInPurchases/47', function (purchases) {
  console.log(purchases);
});
```

**[Angular](https://angularjs.org/)を使う:**

```javascript
$http.post('/employee/7/involvedInPurchases/47')
.then(function (purchases) {
  console.log(purchases);
});
```

**[sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js)を使う:**

```javascript
io.socket.post('/employee/7/involvedInPurchases/47', function (purchases) {
  console.log(purchases);
});
```

**[cURL](http://en.wikipedia.org/wiki/CURL)を使う:**

```bash
curl http://localhost:1337/employee/7/involvedInPurchases/47 -X "POST"
```


プライマリレコードである"Dolly"を返すべきです。:

```json
{
  "involvedInPurchases": [
    {
      "amount": 10000,
      "createdAt": "2014-08-03T01:50:33.898Z",
      "updatedAt": "2014-08-03T01:51:08.227Z",
      "id": 47,
      "cashier": 7
    }
  ],
  "name": "Dolly",
  "createdAt": "2014-08-03T01:16:35.440Z",
  "updatedAt": "2014-08-03T01:51:41.567Z",
  "id": 7
}
```


### 備考

> + このアクションは _複数の_ (コレクションの)アソシエーションを扱います。_単一の_ （モデルの）アソシエーションを追加・削除したい場合単に[update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html)を使ってください。
> + 上記の例では"rest"blueprintが有効であると仮定します。それに加えてあなたのプロジェクトが少なくともアソシエーション`involvedInPurchases: {collection: 'Purchase', via: 'cashier'}`を持った'Employee'モデルとアソシエーション`cashier: {model: 'Employee'}`を持った`Purchase`モデルを持っているべきです。 同様に空の`PurchaseController`と`EmployeeController`も必要です。これを簡単に行うには以下を実行します:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate api purchase
>   $ sails generate api employee
>   ```
>
> ...そして。`api/models/Purchase.js`と`api/models/Employee.js`を編集します。

<docmeta name="uniqueID" value="Add262514">
<docmeta name="displayName" value="add to">
