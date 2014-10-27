# 單向關聯（One Way Association）
### 概觀

單向關聯就是一個模型關聯到另一個模型。你可以查詢該模型並提供所關聯的模型。但是，你不能查詢被關聯的模型並提供關聯它的模型。

### 單向關聯範例

在這個範例中，我們關聯了一個 `User` 到 `Pet`，而不是 `Pet` 到 `User`。

`myApp/api/models/pet.js`

```javascript

module.exports = {

  attributes: {
    name:'STRING',
    color:'STRING'
  }

}

```

`myApp/api/models/user.js`

```javascript

module.exports = {

  attributes: {
    name:'STRING',
    age:'INTEGER',
    pony:{
      model: 'pet'
    }
  }

}

```

使用 `sails console`

```sh

sails> Pet.create({name:'Pinkie Pie',color:'pink'}).exec(console.log)
null { name: 'Pinkie Pie',
  color: 'pink',
  createdAt: Tue Feb 11 2014 15:45:33 GMT-0600 (CST),
  updatedAt: Tue Feb 11 2014 15:45:33 GMT-0600 (CST),
  id: 5 }

sails> User.create({name:'Mike',age:21,pony:5}).exec(console.log);
null { name: 'Mike',
  age: 21,
  pony: 5,
  createdAt: Tue Feb 11 2014 15:48:53 GMT-0600 (CST),
  updatedAt: Tue Feb 11 2014 15:48:53 GMT-0600 (CST),
  id: 1 }

sails> User.find({name:'Mike'}).populate('pony').exec(console.log);
null [ { name: 'Mike',
    age: 21,
    pony: 
     { name: 'Pinkie Pie',
       color: 'pink',
       id: 5,
       createdAt: Tue Feb 11 2014 15:45:33 GMT-0600 (CST),
       updatedAt: Tue Feb 11 2014 15:45:33 GMT-0600 (CST) },
    createdAt: Tue Feb 11 2014 15:48:53 GMT-0600 (CST),
    updatedAt: Tue Feb 11 2014 15:48:53 GMT-0600 (CST),
    id: 1 } ]


```
### 注意事項
> 請查看 [Waterline 文件](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)取得這種類型的關聯的更多資訊

> 因為我們只形成一個關聯於一個模型，`Pet` 沒有歸屬於 `User` 模型的數量限制。如果我們想要，我們可以改變這一點，讓 `Pet` 正好關聯到一個 `User` ，且 `User` 正好關聯到一個 `Pet`。

<docmeta name="uniqueID" value="OneWayAssociation708096">
<docmeta name="displayName" value="One Way Association">

