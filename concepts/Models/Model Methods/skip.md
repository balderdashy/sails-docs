# .skip(`integer`)
### Purpose

### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Number to Skip     |      `int`          | Yes        |

### Example Usage

```javascript 
var myQuery = User.find();
myQuery.skip(12);

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
> The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.

<docmeta name="uniqueID" value="skip128737">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".skip()">

