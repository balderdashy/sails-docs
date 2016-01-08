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
User.find({}).exec(function findCB(err, found){
  // this array contains every user's complete user object
  found[0];
	// => { id: 1, name: 'Alice Smith', petID: 7 }
});

User.find({}, {name: true}).exec(function findCB(err, found){
  // this array contains every user's name and object ID only
	found[0];
	// => { id: 1, name: 'Alice Smith' }
});

```
### Notes
> This method will ALWAYS return records in an array.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.
> The find method supports projection.
> Any string arguments passed must be the ID of the record.




<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="10">
<docmeta name="displayName" value=".find()">

