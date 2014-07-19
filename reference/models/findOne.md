# .findOne( `criteria` , [`callback`] )
### Purpose
This finds and returns a single record that meets the criteria.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`, `string`      | Yes        |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Record       | `{}`                |


### Example Usage

```javascript 
User.findOne({name:'Jessie'}).exec(function findOneCB(err,found){
  console.log('We found '+found.name);
  });
  
// We found Jessie
// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.

> If no matching record is found, the value of `found` will be `undefined`.  Not finding a record does *not* constitute an error for `findOne`.

<docmeta name="uniqueID" value="findOne423345">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="10">
<docmeta name="displayName" value=".findOne()">

