# コレクションから取り除く

2つのレコードの間のアソシエーションをコレクションから取り除きます。

```
DELETE /:model/:record/:association/:record_to_remove
```

このアクションは何らかのレコードを("外部"レコード)を自分のレコード("プライマリ"レコード)のアトリビュートコレクションから取り除きます。

+ 外部レコードが実在しない場合、まず作成します。
+ すでにプライマリレコードのコレクションにすでに外部レコードが含まれない場合、そのアクションは無視されます。
+ アソシエーションが2方向（例:両サイドにviaが含まれる反射的な関係の場合）反対側となる外部レコードのアソシエーションも更新されます。


### 例

Dolly (従業員 #7)をストア#16の`employeesOfTheMonth`リストから取り除きます。

**[jQuery](http://jquery.com/)を使う:**

```javascript
$.delete('/store/16/employeesOfTheMonth/7', function (purchases) {
  console.log(purchases);
});
```

**[Angular](https://angularjs.org/)を使う:**

```javascript
$http.delete('/store/16/employeesOfTheMonth/7')
.then(function (purchases) {
  console.log(purchases);
});
```

**[sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js)を使う:**

```javascript
io.socket.delete('/store/16/employeesOfTheMonth/7', function (purchases) {
  console.log(purchases);
});
```

**[cURL](http://en.wikipedia.org/wiki/CURL)を使う:**

```bash
curl http://localhost:1337/store/16/employeesOfTheMonth/7 -X "DELETE"
```


プライマリレコードであるストア#16を返します。:

```json
{
  "employeesOfTheMonth": [],
  "name": "Dolly",
  "createdAt": "2014-08-03T01:16:35.440Z",
  "updatedAt": "2014-08-03T01:51:41.567Z",
  "id": 16
}
```



### 備考

> + このアクションは _複数の_ (コレクションの)アソシエーションを扱います。_単一の_ （モデルの）アソシエーションを追加・削除したい場合単に[update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html)を使ってください。
> + 上記の例では"rest"blueprintが有効であると仮定します。それに加えてあなたのプロジェクトが少なくともアソシエーション`employeesOfTheMonth: {collection: 'Employee'}`を持った`Store`モデルと空の'Employee'モデルを持っているべきです。 同様に空の`PurchaseController`と`EmployeeController`も必要です。これを簡単に行うには以下を実行します:
>
>   ```shell
>   $ sails new foo
>   $ cd foo
>   $ sails generate api store
>   $ sails generate api employee
>   ```
>
> ...そして。`api/models/Store.js`を編集します。

<docmeta name="uniqueID" value="Remove2294521">
<docmeta name="displayName" value="remove from">
