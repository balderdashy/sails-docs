# Populated Values

Eメールアドレスや電話番号、誕生日などの基本的な促成に加えてWaterlineではアソシエーションを使ってリンクされたデータのセットを動的に取得し、保存する必要があります。クエリーが[`.populate()`](http://sailsjs.org/documentation/reference/waterline/queries/populate.html)が呼びだされた時にはそれぞれの結果は一つまたは複数の **populated values** を持ちます。それら、それぞれの**populated values**クエリされた時点での特定のアソシエーションへのリンクを含むスナップショットです。

populated valueは2種類あります:

+ `null`または単なるJavaScriptオブジェクト(POJO)(合致するアソシエーションが"model"であれば)_
+ 空の配列、または単なるJavaScriptオブジェクトの配列(合致するアソシエーションが"collection"であれば)_



たとえは、可愛い狼の子供のオーダーを扱っているとすると:

```js
Order.find()
.populate('buyers')  // a "collection" association
.populate('seller')  // a "model" association
.exec(function (err, orders){

  // this array is a snapshot of the Customers who are associated with the first Order as "buyers"
  orders[0].buyers;
  // => [ {id: 1, name: 'Rob Stark'}, {id: 6, name: 'Arya Stark'} ]

  // this object is a snapshot of the Company that is associated with the first Order as the "seller"
  orders[0].seller;
  // => { id: 42941, corporateName: 'WolvesRUs Inc.' }

  // this array is empty because the second Order doesn't have any "buyers"
  orders[1].buyers;
  // => []

  // this is `null` because there is no "seller" associated with the second Order
  orders[1].seller;
  // => null
});
```



### populated valuesを編集する

変更はアタッチされたレコードで`.save()`をコールすることによって永続化（すなわちデータベースにセーブ）されます。populated valueに直接`.save()`する事はできません。

"model"アソシエーションでリンクされたレコードの変更または削除は単に元のレコードにプロパティを設定することによって行えます:

```js
orders[1].seller = { corporateName: 'Wolf Orphanage' };
```

一方"model"アソシエーションに関しては、リンクされたレコードを接続または切断するための幾つかの(数えきれない)特殊なメソッドがあります。しかしながら、変更がデータベースで永続化されるためには`.save()`メソッドは依然としてもとのレコードで呼び出す必要があります。

```js
orders[1].buyers.add({ name: 'Jon Snow' });
orders[1].save(function (err) { ... });
```


### 例

最後にこれらをまとめて:

```js
Order.find()
.populate('buyers')
.exec(function (err, orders){

  orders[1].buyers.add({ name: 'Jon Snow' });
  orders[1].seller = { corporateName: 'Wolf Orphanage' };
  orders[1].save(function (err) {
    // We successfully created a new Customer named Jon and added
    // him to `order[1]` as one of its "buyers".
    // We also created a new company and set it as `order[1]`'s "seller".
    //
    // If we had provided only a primary key value instead of an object,
    // in both cases Waterline would have tried to associate existing
    // Customer and Company records rather than creating new ones.
  });

});
```





<docmeta name="uniqueID" value="populatedvalues790682">
<docmeta name="displayName" value="Populated Values">
