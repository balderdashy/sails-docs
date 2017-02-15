# .addToCollection()

Add one or more existing child records to the specified collection (e.g. the `comments` of BlogPost #4).

```usage
Something.addToCollection(parentId, association)
.members(childIds)
.exec(function (err) {

});
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  parentId           | ((number)) _or_ ((string))                   | The primary key value(s) (i.e. ids) for the parent record(s). <br/>Must be a number or string (e.g. `'507f191e810c19729de860ea'` or `49`).  <br/>Alternatively, an array of numbers or strings may be specified (e.g. `['507f191e810c19729de860ea', '14832ace0c179de897']` or `[49, 32, 37]`).  In this case, _all_ of the child records will be added to the appropriate collection of each parent record.
| 2 |  association        | ((string))                                   | The name of the plural ("collection") association (e.g. "pets")
| 3 |  childIds           | ((array))                                    | The primary key values (i.e. ids) of the child records to add. _Note that this does not [create](http://sailsjs.com/documentation/reference/waterline-orm/models/create) these child records, it just links them to the specified parent(s)._


##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or `undefined` if there were no errors.


### Example

For user 3, add pets 99 and 98 to the "pets" collection:

```javascript
User.addToCollection(3, 'pets')
.members([99,98])
.exec(function (err){
  if (err) { return res.serverError(err); }

  return res.ok();
});
```

> If either user record already has one of those pets in its "pets", then we just silently skip over it.


### Edge cases

+ If the parent id (or any _one_ of the parent ids, if specified as an array) does not actually correspond with an existing, persisted record, then ((TODO: verify this behavior)).
+ If one of the child ids does not actually correspond with an existing, persisted record, then ((TODO: verify this behavior)).
+ If a parent record _already has_ one or more of these child ids as members of its collection, then ((TODO: verify this behavior)).
+ If an empty array of child ids is provided, then this is a [no-op](https://en.wikipedia.org/wiki/NOP#Code).
+ If an empty array of parent ids is provided, then this is a [no-op](https://en.wikipedia.org/wiki/NOP#Code).

### Notes
> + If the association is "2-way" (meaning it has `via`) then the child records will be modified accordingly.  If the attribute on the other (e.g. "Purchase") side is singular, the each child record's foreign key ("cashier") will be changed.  If it's plural, then each child record's collection will be modified accordingly.
> + In addition, if the `via` points at a singular ("model") attribute on the other side, then `.addToCollection()` will "steal" these child records if necessary.  For example, imagine you have an Employee model with this plural ("collection") attribute: `involvedInPurchases: { collection: 'Purchase', via: 'cashier' }`.  If you executed `Employee.addToCollection(7, 'involvedInPurchases', [47])` to assign this purchase to employee #7 (Dolly), but purchase #47 was already associated with a different employee (e.g. #12, Motoki), then this would "steal" the purchase from Motoki and give it to Dolly.  In other words, if you executed `Employee.find([7, 12]).populate('involvedInPurchases')`, Dolly's `involvedInPurchases` array would contain purchase #47 and Motoki's would not.

<docmeta name="displayName" value=".addToCollection()">
<docmeta name="pageType" value="method">
