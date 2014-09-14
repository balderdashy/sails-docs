# One Way Association
### Overview

A one way association is where a model is associated with another model.  You could query that model and populate to get the associatED model.  You can't however query the associated model and populate to get the associatING model.

### One Way Example

In this example, we are associating a `User` with a `Pet` but not a `Pet` with a `User`.

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
### Notes
> For a more detailed description of this type of association, see the [Waterline Docs](https://github.com/balderdashy/waterline-docs/blob/master/associations.md)

> Because we have only formed an association on one of the models, a `Pet` has no restrictions on the number of `User` models it can belong to. If we wanted to, we could change this and associate the `Pet` with exactly one `User` and the `User` with exactly one `Pet`.

<docmeta name="uniqueID" value="OneWayAssociation708096">
<docmeta name="displayName" value="One Way Association">

