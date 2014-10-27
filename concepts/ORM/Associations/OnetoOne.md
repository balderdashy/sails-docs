# 一對一（One-to-One）
### 概觀

一對一關聯表示一個模型可能只與另一個模型關聯。為了使模型知道它與其他哪些模型關聯，外鍵必需包含在記錄中。

### 一對一範例

在這個範例中，我們關聯了一個 `Pet` 到 `User`。在這種情況下 `User` 可能只有一個 `Pet`，但是 `Pet` 並不侷限於單一 `User`。


`myApp/api/models/pet.js`

```javascript

module.exports = {

  attributes: {
    name:'STRING',
    color:'STRING',
    owner:{
      model:'user'
    }
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

sails> User.create({ name: 'Mike', age: 21}).exec(console.log);
null { name: 'Mike',
  age: 21,
  createdAt: Thu Feb 20 2014 17:12:18 GMT-0600 (CST),
  updatedAt: Thu Feb 20 2014 17:12:18 GMT-0600 (CST),
  id: 1 }
  
sails> Pet.create({ name: 'Pinkie Pie', color: 'pink', owner: 1}).exec(console.log)
null { name: 'Pinkie Pie',
    color: 'pink',
    owner: 1,
    createdAt: Thu Feb 20 2014 17:26:16 GMT-0600 (CST),
    updatedAt: Thu Feb 20 2014 17:26:16 GMT-0600 (CST),
    id: 2 }
    
sails> Pet.find().populate('owner').exec(console.log)
null [ { name: 'Pinkie Pie',
    color: 'pink',
    owner: 
     { name: 'Mike',
       age: 21,
       id: 1,
       createdAt: Thu Feb 20 2014 17:12:18 GMT-0600 (CST),
       updatedAt: Thu Feb 20 2014 17:12:18 GMT-0600 (CST) },
    createdAt: Thu Feb 20 2014 17:26:16 GMT-0600 (CST),
    updatedAt: Thu Feb 20 2014 17:26:16 GMT-0600 (CST),
    id: 2 } ]

sails> User.find().populate('pony').exec(console.log)
null [ { name: 'Mike',
    age: 21,
    createdAt: Thu Feb 20 2014 18:11:15 GMT-0600 (CST),
    updatedAt: Thu Feb 20 2014 18:11:15 GMT-0600 (CST),
    id: 2,
    pony: undefined } ]

sails> User.update({name:'Mike'},{pony:2}).exec(console.log)
null [ { name: 'Mike',
    age: 21,
    createdAt: Thu Feb 20 2014 17:12:18 GMT-0600 (CST),
    updatedAt: Thu Feb 20 2014 17:30:58 GMT-0600 (CST),
    id: 1,
    pony: 2 } ]

sails> User.findOne(1).populate('pony').exec(console.log)
null { name: 'Mike',
  age: 21,
  createdAt: Thu Feb 20 2014 17:12:18 GMT-0600 (CST),
  updatedAt: Thu Feb 20 2014 17:30:58 GMT-0600 (CST),
  id: 1,
  pony: 
   { name: 'Pinkie Pie',
     color: 'pink',
     id: 2,
     createdAt: Thu Feb 20 2014 17:26:16 GMT-0600 (CST),
     updatedAt: Thu Feb 20 2014 17:26:16 GMT-0600 (CST),
     owner: 1 } }

```
### 注意事項
> 請查看 [Waterline 文件](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)取得這種類型的關聯的更多資訊


<docmeta name="uniqueID" value="OnetoOne169258">
<docmeta name="displayName" value="One-to-One">

