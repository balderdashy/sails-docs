# One-to-One
### Overview

A one-to-one association states that a model may only be associated with one other model. In order
for the model to know which other model it is associated with, a foreign key must be included in the
record.

### One-to-One Example

In this example, we are associating a `Pet` with a `User`. The `User` may only have one `Pet` in
this case but a `Pet` is not limited to a single `User`.


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

Using `sails console`

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
### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)


<docmeta name="uniqueID" value="OnetoOne169258">
<docmeta name="displayName" value="One-to-One">

