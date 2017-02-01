# .skip(`integer`)

Indicate a number of records to skip before returning the results from executing a [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries).


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
> If the &ldquo;skip&rdquo; value is greater than the number of records matching the query criteria, the query will return an empty array.
> The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.


<docmeta name="displayName" value=".skip()">
<docmeta name="pageType" value="method">
