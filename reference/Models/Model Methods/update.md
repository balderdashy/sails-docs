# .update( `criteria` , `criteria` , [`callback`] )
### Purpose
Updates existing record in the database that match the given criteria.

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
> + Currently, any value passed to `.update()` for a collection attribute will be ignored.  This will be supported in future versions of Waterline/Sails.
> + Although you may pass .update() an object or an array of objects, it will always return an array of objects.
> + If you specify a primary key (e.g. `7` or `"50c9b254b07e040200000028"`) instead of a criteria object, any `.where()` filters will be ignored.
> + Currently, calling `.populate()` on an `.update()` query has no effect.  To populate attributes on the results, you should follow up your update with a `find().populate()` query.


<docmeta name="uniqueID" value="update727440">
<docmeta name="displayName" value=".update( `criteria` , `criteria` , [`callback`] )">

