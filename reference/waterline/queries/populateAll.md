# .populateAll( [`query`] )
### 目的
 このチェーン可能なメソッドは問い合わされているレコードに関連付けられているレコードを取得し、.find()、.update()や.exec()するために使われます。全ての既知のアソシエート済モデルがポピュレートされ、クエリはそれぞれに適用されます。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|     |
| 1 |     クエリ           |      `object`       |     いいえ     |

### 使用例

```javascript 

User.find({name:'Mike'}).exec(function(e,r){
  console.log(r[0].toJSON())
})

/* 
{ name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
*/

User.find({name:'Mike'}).populateAll().exec(function(e,r){
  console.log(r[0].toJSON())
});

/*
{ poneys:
   [ { name: 'Twinky',
       color: 'brown',
       id: 1,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Rainbow Dash',
       color: 'blue',
       id: 8,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Applejack',
       color: 'orange',
       id: 9,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
*/

User.find({name:'Mike'}).populateAll({color:'pink'}).exec(function(e,r){
  console.log(r[0].toJSON())
});

/*
{ pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) }],
  name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
*/

```

### 備考
> 全ての文字列引数はレコードのIDである必要があります。


<docmeta name="uniqueID" value="populate245634">
<docmeta name="methodType" value="association">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".populateAll()">

