# .removeFromCollection()

Remove one or more members (e.g. a comment) from the specified collection (e.g. the `comments` of BlogPost #4).

```usage
Something.removeFromCollection(parentId, association)
.members(childIds)
.exec(function (err) {

});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  parentId    | ((number)) _or_ ((string))                   | The primary key value(s) (i.e. ids) for the parent record(s). <br/>Must be a number or string (e.g. `'507f191e810c19729de860ea'` or `49`).  <br/>Alternatively, an array of numbers or strings may be specified (e.g. `['507f191e810c19729de860ea', '14832ace0c179de897']` or `[49, 32, 37]`).  In this case, _all_ of the child records will be removed from the appropriate collection of each parent record.
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


### Edge cases

+ If the parent id (or any _one_ of the parent ids, if specified as an array) does not actually correspond with an existing, persisted record, then this will modify the existing records and ignore the non-existent ones.
+ If one of the child ids does not actually correspond with an existing, persisted record, then that child id will be ignored, and only those records that correspond with the other provided child ids will be removed.
+ If a parent record _does not have_ one or more of these child ids as members of its collection, then only the records corresponding to provided child ids that _are_ in the collection will be removed.
+ If an empty array of child ids is provided, then this is a [no-op](https://en.wikipedia.org/wiki/NOP#Code).
+ If an empty array of parent ids is provided, then this is a [no-op](https://en.wikipedia.org/wiki/NOP#Code).

### Notes
> + If the association is "2-way" (meaning it has `via`) then the child records will be modified accordingly.  If the attribute on the other (e.g. "Pet") side is singular, the each child record's foreign key ("owner") will be set to `null`.  If it's plural, then each child record's collection will be modified accordingly.




<docmeta name="displayName" value=".removeFromCollection()">
<docmeta name="pageType" value="method">
