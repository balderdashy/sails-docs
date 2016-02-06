# * .add( `primary key` )
### 目的
多対多のアソシエーションにおいて自動的に生成されたジョインテーブルに対してレコードを追加するのに使います。これはモデルインスタンスの主キー（デフォルトではレコードのID）と作成し、アソシエートしたい新規レコード（オブジェクト）でも受け入れることが出来ます。

### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    レコード   | `{}`, `string`, `int`| はい |


### 使用例

```javascript
User.find({name:'Mike'}).populate('pets').exec(function(e,r){
  r[0].pets.add(7);
  r[0].save(function(err,res){
    console.log(res);
  }
});

/*

{ pets:
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
  updatedAt: Wed Feb 12 2014 19:30:54 GMT-0600 (CST),
  id: 7 }

*/

```



### 備考
> + .add()は配列を受け入れられません。試さないで下さい。
> + 全ての文字列引数はレコードのIDである必要があります。
> + `.add()`だけではアソシエーションに対する変更のデータベースへの永続化をしません。`.add()`や`.remove()`のあとに`.save()`を行って下さい。
> + すでに存在するアソシエーションの追加はエラーになります。[こちらの例を御覧ください](https://github.com/balderdashy/waterline/issues/352)


<docmeta name="uniqueID" value="add574043">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".add()">

