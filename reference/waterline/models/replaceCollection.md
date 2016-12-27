# .replaceCollection()

Replace all members of the specified collection (e.g. the `comments` of BlogPost #4).

```javascript
Something.replaceCollection(parentId, association)
.members(childIds)
.exec(function (err) {

});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  parentId    | ((number)) _or_ ((string))                   | The primary key value(s) (i.e. ids) for the parent record(s). <br/>Must be a number or string (e.g. `'507f191e810c19729de860ea'` or `49`).  <br/>Alternatively, an array of numbers or strings may be specified (e.g. `['507f191e810c19729de860ea', '14832ace0c179de897']` or `[49, 32, 37]`). In this case, the child records will be replaced in each parent record.
| 2 |  association | ((string))                                   | The name of the plural ("collection") association (e.g. "pets")
| 3 |  childIds      | ((array))                                    | The primary key values (i.e. ids) for the child records that will be the new members of the association.  _Note that this does not [create](http://sailsjs.com/documentation/reference/waterline-orm/models/create) these records or [destroy](http://sailsjs.com/documentation/reference/waterline-orm/models/destroy) the old ones, it just attaches/detaches records to/from the specified parent(s)._


##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.


### Example

For user 3, replace all pets in the "pets" collection with pets 99 and 98:

```javascript
User.replaceCollection(3, 'pets')
.members([99,98])
.exec(function (err){
  if (err) { return res.serverError(err); }

  return res.ok();
});
```


<docmeta name="displayName" value=".replaceCollection()">
<docmeta name="pageType" value="method">
