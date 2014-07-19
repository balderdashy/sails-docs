# .sort(`string`)
### Purpose

### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Sort String        |      `string`       | Yes        |

### Example Usage

```javascript 
var myQuery = User.find();

var sortString= 'name ASC';

// Sort strings look like this

// '<Model Attribute> <sort type>' 

myQuery.sort('name ASC');

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
> The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.

> Other Sort Types include
  - ASC
  - DESC

<docmeta name="uniqueID" value="sort822396">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".sort()">

