# 1対多
### 概要

1対他のアソシエーションはあるモデルが複数の別のモデルに属する状態を言います。
このアソシエーションを構築するためには`collection`を使っ仮想的なアトリビュートを作ります。
1対他のアソシエーションにおいては片方が`collection`アトリビュートを持ち、もう一方では`model`アトリビュートをもつ必要があります。
これにとって「多」側で`populate`が利用された際にどのレコードを取得すべきかわかることが出来ます。

モデルが別のモデルと複数の多対多のアソシエーションを持つこともあるため`collection`アトリビュートには
`via`キーが必要です。
これでアソシエーションの一方のどの`model`アトリビュートがレコードを埋めるために使われるかが示されます。

### 1対多の例

`myApp/api/models/Pet.js`

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

`myApp/api/models/User.js`

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

Using `sails console`

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

### 備考
> このタイプのアソシエーションに関するさらに詳細な説明は[Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)をご覧ください。


<docmeta name="uniqueID" value="OnetoMany478093">
<docmeta name="displayName" value="One-to-Many">

