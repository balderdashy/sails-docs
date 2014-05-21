# One-to-Many
### Overview

A one-to-many association states that a model can be associated with many other models. To build this
association a virtual attribute is added to a model using the `collection` property. In a one-to-many
association one side must have a `collection` attribute and the other side must contain a `model`
attribute. This allows the many side to know which records it needs to get when a `populate` is used.

Because you may want a model to have multiple one-to-many associations on another model a `via` key
is needed on the `collection` attribute. This states which `model` attribute on the one side of the
association is used to populate the records.

### One-to-Many Example

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

### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)


<docmeta name="uniqueID" value="OnetoMany478093">
<docmeta name="displayName" value="One-to-Many">

