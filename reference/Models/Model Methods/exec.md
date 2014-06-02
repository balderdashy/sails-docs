# .exec(`callback`)
### Purpose
This is run at the end of a chain of stringable methods.  It signals the adapter to run the query. 
#### Parameters
|     |     Description     | Accepted Data Types | Required ? |
|-----|---------------------|---------------------|------------|
| 1   |  Callback           |      `function`     | Yes        |
#### Callback Parameters
|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Data Returned      | `{}`, `[{}]`, `int` |
### Example Usage
```javascript 
// refer to any of the examples above
```
### Notes
> The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.

> If you don't run .exec(), your query will not execute.



<docmeta name="uniqueID" value="exec550068">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".exec()">

