# .limit(`integer`)
### Purpose

### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Number to Return   |      `int`         | Yes         |

### Example Usage

```javascript
var myQuery = User.find();
myQuery.limit(12);

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
> * If you set the limit to 0, the query will always return an empty array.
> * The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.


<docmeta name="displayName" value=".limit()">
<docmeta name="pageType" value="method">
