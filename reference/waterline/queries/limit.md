# .limit(`integer`)

Set the maximum number of records to retrieve when executing a [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries).

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
> * If the limit is greater than the number of records matching the query criteria, all of the matching records will be returned.
> * The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.


<docmeta name="displayName" value=".limit()">
<docmeta name="pageType" value="method">
