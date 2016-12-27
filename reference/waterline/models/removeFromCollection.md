# .removeFromCollection()

Remove one or more members (e.g. a comment) from the specified collection (e.g. the `comments` of BlogPost #4).

```javascript
Something.removeFromCollection(parentId, association)
.members(childIds)
.exec(function (err) {

});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  parentId    | ((number)) _or_ ((string))                   | The primary key value(s) (i.e. ids) for the parent record(s). Must be a number or string (e.g. `'507f191e810c19729de860ea'` or `49`).  Alternatively, an array of numbers or strings may be specified (e.g. `['507f191e810c19729de860ea', '14832ace0c179de897']` or `[49, 32, 37]`).  In this case, _all_ of the child records will be removed from the appropriate collection of each parent record.
| 2 |  association | ((string))                                   | The name of the plural ("collection") association (e.g. "pets")
| 3 |  childIds      | ((array))                                    | The primary key values (i.e. ids) of the child records to remove.  _Note that this does not [destroy](http://sailsjs.com/documentation/reference/waterline-orm/models/destroy) these records, it just detaches them from the specified parent(s)._


##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.


### Example

For user 3, remove pets 99 and 98 from the "pets" collection:

```javascript
User.removeFromCollection(3, 'pets')
.members([99,98])
.exec(function (err){
  if (err) { return res.serverError(err); }

  return res.ok();
});
```





<docmeta name="displayName" value="removeFromCollection()">
<docmeta name="pageType" value="method">
