# * .add( `primary key` )
### Purpose
Used to add records to the join table that is automatically generated during a Many-to-Many association.  It accepts either the primary key of the model instance (defaults to record ID) or a new record (object) that you want created and to be associated with.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Records    | `{}`, `string`, `int`  | Yes |


### Example Usage

```javascript
User.find({name:'Mike'}).populate('pets').exec(function(e,r){
  r[0].pets.add(7);
  r[0].save(console.log)
});

/*

{ pets:
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
  updatedAt: Wed Feb 12 2014 19:30:54 GMT-0600 (CST),
  id: 7 }

*/

```



### Notes
> + .add() does not accept arrays of any kind.  Don't try it.
> + Any string arguments passed must be the primary key of the record.
> + `.add()` alone won't actually persist the change in associations to the databse.  You should call `.save()` after using `.add()` or `.remove()`.


<docmeta name="uniqueID" value="add574043">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".add()">

