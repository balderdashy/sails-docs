# 一對多（One-to-Many）
### 概觀

一對多關聯表示一個模型可以關聯到許多其他模型。要建立這種關聯，要加入一個虛擬屬性 `collection` 到模型。在一對多關聯中，一邊必需有 `collection` 屬性，另一邊必需包含一個 `modal` 屬性。這讓「Many」那側知道當使用 `populate` 時，它需要取得哪些記錄。

因為你可能想要一個模型有多個一對多關聯到另一個模型，`collection` 屬性必需要有一個 `via` 鍵。這說明了哪一邊的關聯 `modal` 屬性會用來提供記錄。

### 一對多範例

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
    pets:{
      collection: 'pet',
      via: 'owner'
    }
  }

}

```

使用 `sails console`

```sh

sails> User.create({name:'Mike',age:'21'}).exec(console.log)
null { pets: [Getter/Setter],
  name: 'Mike',
  age: 21,
  createdAt: Tue Feb 11 2014 17:49:04 GMT-0600 (CST),
  updatedAt: Tue Feb 11 2014 17:49:04 GMT-0600 (CST),
  id: 1 }

sails> Pet.create({name:'Pinkie Pie',color:'pink',owner:1}).exec(console.log)
null { name: 'Pinkie Pie',
  color: 'pink',
  owner: 1,
  createdAt: Tue Feb 11 2014 17:58:04 GMT-0600 (CST),
  updatedAt: Tue Feb 11 2014 17:58:04 GMT-0600 (CST),
  id: 2 }

sails> Pet.create({name:'Applejack',color:'orange',owner:1}).exec(console.log)
null { name: 'Applejack',
  color: 'orange',
  owner: 1,
  createdAt: Tue Feb 11 2014 18:02:58 GMT-0600 (CST),
  updatedAt: Tue Feb 11 2014 18:02:58 GMT-0600 (CST),
  id: 4 }

sails> User.find().populate('pets').exec(function(err,r){console.log(r[0].toJSON())});
{ pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 2,
       createdAt: Tue Feb 11 2014 17:58:04 GMT-0600 (CST),
       updatedAt: Tue Feb 11 2014 17:58:04 GMT-0600 (CST),
       owner: 1 },
     { name: 'Applejack',
       color: 'orange',
       id: 4,
       createdAt: Tue Feb 11 2014 18:02:58 GMT-0600 (CST),
       updatedAt: Tue Feb 11 2014 18:02:58 GMT-0600 (CST),
       owner: 1 } ],
  name: 'Mike',
  age: 21,
  createdAt: Tue Feb 11 2014 17:49:04 GMT-0600 (CST),
  updatedAt: Tue Feb 11 2014 17:49:04 GMT-0600 (CST),
  id: 1 }

sails> Pet.find(4).populate('owner').exec(console.log)
null [ { name: 'Applejack',
    color: 'orange',
    owner: 
     { pets: [Getter/Setter],
       name: 'Mike',
       age: 21,
       id: 1,
       createdAt: Tue Feb 11 2014 17:49:04 GMT-0600 (CST),
       updatedAt: Tue Feb 11 2014 17:49:04 GMT-0600 (CST) },
    createdAt: Tue Feb 11 2014 18:02:58 GMT-0600 (CST),
    updatedAt: Tue Feb 11 2014 18:02:58 GMT-0600 (CST),
    id: 4 } ]

```

### 注意事項
> 請查看 [Waterline 文件](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)取得這種類型的關聯的更多資訊


<docmeta name="uniqueID" value="OnetoMany478093">
<docmeta name="displayName" value="One-to-Many">

