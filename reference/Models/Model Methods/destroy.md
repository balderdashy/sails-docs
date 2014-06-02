# .destroy( `criteria` , [`callback`] )
### Purpose
Destroys all records in your database that match the given criteria.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |     Callback        | `function`          | No        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Deleted Records    | `[{}]`              |

### Example Usage

```javascript 
User.destroy({name:'Flynn'}).exec(function deleteCB(err){
  console.log('The record has been deleted');
  });
  
// If the record existed, then it has been deleted
// Don't forget to handle your errors

```
### Notes
> If you want to confirm the record exists before you delete it, you must first perform a find()
> Any string arguments passed must be the ID of the record.


<docmeta name="uniqueID" value="destroy398816">
<docmeta name="methodType" value="instance">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".destroy()">

