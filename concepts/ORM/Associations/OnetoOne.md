# 1対1
### 概要

1対1アソシエーションはあるモデルが一つの別のモデルにのみ関連付けられている状態を言います。
一方のモデルが度の一方のモデルに関連付けられているかを知るためにレコードには外部キーが含まれている
必要があります。

### 1対1の例

この例では`Pet`と`User`を関連付けます。このケースでは`User`は一つだけの`Pet`を持つことできますが、`Pet`は一つだけの`User`によって所有されているわけではありません。しかしながら両側からアソシエーションの問い合わせを行う必要があるので両方のモデルをcreate/updateしなければいけません。


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

`sails console`を利用します。

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
### 備考
> このタイプのアソシエーションに関するさらに詳細な説明は[Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/models/associations/one-to-one.md)をご覧ください。


<docmeta name="uniqueID" value="OnetoOne169258">
<docmeta name="displayName" value="One-to-One">

