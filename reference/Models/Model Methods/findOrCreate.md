# .findOrCreate( `criteria` , `record` , [`callback`] )
### Purpose
Checks for the existence of the record in the first parameter.  If it can't be found, the record in the second parameter is created.

### Overview
#### Parameters

|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |    Find Criteria    | `{}`,`[{}]`, `string`, `int`  | Yes |
| 2 |  Records to Create  | `{}`,`[{}]`          |  Yes  |
| 2 |     Callback        | `function`           | No        |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |

### Example Usage

```javascript 
User.findOrCreate({name:'Walter'},{name:'Jessie'}).exec(function createFindCB(err,record){
  console.log('What\'s cookin\' '+record.name+'?');
  });
  
// What's cookin' Jessie?
// Don't forget to handle your errors and abide by the rules you defined in your model

```
### Notes
> Any string arguments passed must be the ID of the record.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.


<docmeta name="uniqueID" value="findOrCreate760631">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".findOrCreate()">

