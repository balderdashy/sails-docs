# .populateAll( [`query`] )
### Purpose
This chainable method is used between .find()/.update() and .exec() in order to retrieve records associated with the model being queried.  All known associations of your model will be populated and the query will be applied to each of them.  

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |     Query           |      `object`       |     No     |

### Example Usage

```javascript 

User.find({name:'Mike'}).exec(function(e,r){
  console.log(r[0].toJSON())
})

/* 
{ name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
*/

User.find({name:'Mike'}).populateAll().exec(function(e,r){
  console.log(r[0].toJSON())
});

/*
{ poneys:
   [ { name: 'Twinky',
       color: 'brown',
       id: 1,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) } ],
  pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) },
     { name: 'Rainbow Dash',
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
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
*/

User.find({name:'Mike'}).populateAll({color:'pink'}).exec(function(e,r){
  console.log(r[0].toJSON())
});

/*
{ pets: 
   [ { name: 'Pinkie Pie',
       color: 'pink',
       id: 7,
       createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
       updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST) }],
  name: 'Mike',
  age: 16,
  createdAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  updatedAt: Wed Feb 12 2014 18:06:50 GMT-0600 (CST),
  id: 7 }
*/

```

### Notes
> Any string arguments passed must be the primary key of the record.


<docmeta name="uniqueID" value="populate245634">
<docmeta name="methodType" value="association">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".populateAll()">

