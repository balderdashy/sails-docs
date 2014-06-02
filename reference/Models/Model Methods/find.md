# .find(`criteria` , [`callback`])
### Purpose
Finds and returns all records that meet the criteria object(s) that you pass it.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`| Yes |
| 2 |     Callback        | `function`          | Yes        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Found Records      | `[{}]`              |

### Example Usage

```javascript 
User.find({}).exec(function findCB(err,found){
  while (found.length)
    console.log('Found User with name '+found.pop().name)
  });

// Found User with name Flynn
// Found User with name Jessie

// Don't forget to handle your errors

```
### Notes
> Any string arguments passed must be the ID of the record.
> This method will ALWAYS return records in an array.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.




<docmeta name="uniqueID" value="find816978">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="10">
<docmeta name="displayName" value=".find()">

