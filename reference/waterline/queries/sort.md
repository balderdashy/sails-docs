# .sort(`string`)

Set the order in which retrieved records should be returned when executing a [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries).

The &ldquo;sort clause&ldquo; can be specified as either a string or an array of dictionaries.

If the clause is a _string_, it should contain an attribute name followed by a space, followed by either `ASC` or `DESC` (to indicate an _ascending_ or _descending_ sort), for example `name ASC`.

If the clause is an _array_, then each item in the array should be a dictionary with a single key representing the attribute to sort by, whose value is either `ASC` or `DESC`.  The array syntax allows for sorting by multiple attributes, using the array order to establish precedence.  For example:

```
// Sort by name, and for records with the same name, sort by age in descending order.
[
  { name: 'ASC' },
  { age:  'DESC'}
]
```


### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Sort Clause        |      ((string)), ((array))       | Yes        |

### Example Usage

```javascript
var myQuery = User.find();

myQuery.sort('name ASC');

myQuery.exec(function callBack(err,results){
  console.log(results)
});

```
### Notes
> The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.

<docmeta name="displayName" value=".sort()">
<docmeta name="pageType" value="method">
