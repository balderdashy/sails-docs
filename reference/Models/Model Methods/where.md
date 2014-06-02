# .where(`criteria`)
### Purpose


### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Criteria Object    |      `{}`           | Yes        |


### Example Usage

```javascript 
var myQuery = User.find();
myQuery.where({'name':{startsWith:'W'}});

myQuery.exec(function callBack(err,results){
    console.log(results)
    });

```
### Notes
> The .find() method returns a chainable object if you don't supply a callback.  This method can be chained to .find() to further filter your results.



<docmeta name="uniqueID" value="where700717">
<docmeta name="methodType" value="mcm">
<docmeta name="importance" value="undefined">
<docmeta name="displayName" value=".where()">

