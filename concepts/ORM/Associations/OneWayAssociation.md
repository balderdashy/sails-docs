# 片方向のアソシエーション
### 概要

片方向のアソシエーションはモデルが別のモデルに関連付けられている状態を言います。この状態ではあるモデルを問い合わせることで関連するモデルを取得することができます。

### 片方向のアソシエーションの例

この例では`User`に`Pet`を関連付けますが`Pet`に`User`を関連付けることはしません。

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

Using `sails console`

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
### 備考
> このタイプのアソシエーションに関するさらに詳細な説明は[Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/models/associations/associations.md)をご覧ください。


> 片側のモデルだけにアソシエーションを設定したため、`Pet`がいくつの`User`に関連付けられるかの制約はありません。もしそれを行いたい場合は`Pet`を厳密に一人の`User`に関連付けたり`User`を厳密に一つの`Pet`に関連付けるようにアソシエーションを編集することができます。 

<docmeta name="uniqueID" value="OneWayAssociation708096">
<docmeta name="displayName" value="One Way Association">

