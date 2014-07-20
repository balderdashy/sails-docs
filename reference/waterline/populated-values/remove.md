# *.remove( `primary key` )
### Purpose
Used to remove records from the join table that is automatically generated during a many-to-many association. Unlike .add(), it only accepts the primary key of the model instance (defaults to record ID).



### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Primary Key      | `string`, `int`     |     Yes    |

### Example Usage

```javascript

User.find({name:'Mike'}).populate('pets').exec(function(e,r){
  r[0].pets.remove(7);
  r[0].save(console.log)
});

  /*

{ pets:
   [ { name: 'Rainbow Dash',
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
> + Any string arguments passed must be the primary key of the record.
> + `.remove()` alone won't actually persist the change in associations to the databse.  You should call `.save()` after using `.add()` or `.remove()`.

<docmeta name="uniqueID" value="remove790682">
<docmeta name="methodType" value="association">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".remove()">

