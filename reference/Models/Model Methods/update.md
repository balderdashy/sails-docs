# .update()
### Purpose
Updates existing records in the database that match the specified criteria.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |   Find Criteria     |   `{}`,`[{}]`, `string`, `int`  |   Yes     |
| 2 |   Updated Records   |   `{}`,`[{}]`       |   Yes     |
| 3 |     Callback        | `function`          | No        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Sucessfully Updated Records    | `[{}]`        |

### Example Usage

```javascript 
User.update({name:'Walter Jr'},{name:'Flynn'}).exec(function afterwards(err,updated){
  
  if (err) {
    // handle error here- e.g. `res.serverError(err);`
    return;
  }
  
  console.log('Updated user to have name '+updated[0].name);
});

```
### Notes
> + An array of primary key values passed to `.update()` for a `collection` association will set the association to contain **only** the records with those primary key values provided.  That is- it **unlinks all other** records from the association.
> + Although you may pass .update() an object or an array of objects, it will always return an array of objects.
> + If you specify a primary key (e.g. `7` or `"50c9b254b07e040200000028"`) instead of a criteria object, any `.where()` filters will be ignored.
> + Currently, calling `.populate()` on an `.update()` query has no effect.  To populate attributes on the results, you should follow up your update with a `find().populate()` query.


<docmeta name="uniqueID" value="update727440">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".update()">

