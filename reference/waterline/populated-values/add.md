# .add()

Add one or more records to a collection in your database.

This adds record(s) to the join table that is automatically generated for a collection association (i.e. Many-to-Many).  It accepts either the primary key of the record (string or number) or the data for a new record (dictionary/object).  If a dictionary is specified, it will be used to create a new record and automatically associate it as a member of this collection association.

```javascript
.add(recordsToAdd);
// Don't forget to call `.save()`!
```

### Usage

|   |     Argument        | Type                                                  | Details                            |
|---|:--------------------|-------------------------------------------------------|:-----------------------------------|
| 1 | recordsToAdd        | ((number)), ((string)), ((dictionary)), ((array))     | The primary key of the record to add, an array of primary keys of records to add, or a dictionary of data representing a new record to create and then add.


### Example

To give a user named Finn in the database a pet named Jake:

```javascript
User.findOne({name:'Finn'}).populate('pets').exec(function(err, finn){
  if (err) { return res.serverError(err); }
  if (!finn) { return res.notFound('Could not find a user named Finn.'); }
  
  Pet.findOne({name:'Jake'}).exec(function (err, jake){
    if (err) { return res.serverError(err); }
    if (!jake) { return res.notFound('Could not find a pet named Jake.'); }
    
    finn.pets.add(jake.id);
    finn.save(function(err){
      if (err) { return res.serverError(err); }
      return res.ok();
    });//</save()>
  });//</Pet.findOne()>
});//</User.findOne()>
```


### Notes
> + `.add()` alone won't actually persist the change in associations to the database.  You should call `.save()` after using `.add()` or `.remove()`.
> + Attempting to add an association that already exists will throw an error. [See here for an example.](https://github.com/balderdashy/waterline/issues/352)


<docmeta name="displayName" value=".add()">
<docmeta name="pageType" value="method">
