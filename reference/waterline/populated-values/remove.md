# *.remove( `primary key` )
### 目的
多対多のアソシエーションにおいて自動的に生成されたジョインテーブルからレコードを削除するのに使います。.add()とは違い、これはモデルインスタンスの主キー（デフォルトではレコードID）のみを受け入れます。



### 概要
#### パラメータ

| # | 説明          | 受け入れられるデータ型           | 必須か |
|---|---------------------|---------------------|------------|
| 1 |    主キー   | `string`, `int` | はい |

### 使用例

```javascript

User.find({name:'Mike'}).populate('pets').exec(function(e,r){
  r[0].pets.remove(7);
  r[0].save(console.log)
});

  /*

{ pets:
   [ { name: 'Rainbow Dash',
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
> + 全ての文字列引数はレコードのIDである必要があります。
> + `.remove()`だけではアソシエーションに対する変更のデータベースへの永続化をしません。`.add()`や`.remove()`のあとに`.save()`を行って下さい。

<docmeta name="uniqueID" value="remove790682">
<docmeta name="methodType" value="association">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".remove()">

