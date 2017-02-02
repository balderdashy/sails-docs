# .meta()

Provide additional options to Waterline when executing a [query instance](http://sailsjs.com/documentation/reference/waterline-orm/queries).

### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Options        |      ((dictionary))       | Yes        |

### Supported options

Option                              | Default         | Purpose
:------------------------------------ | :---------------| :------------------------------
fetch                                 | false           | When performing [`.update()`](http://sailsjs.com/documentation/reference/waterline-orm/models/update), [`.create()`](http://sailsjs.com/documentation/reference/waterline-orm/models/create), [`.createEach()`](http://sailsjs.com/documentation/reference/waterline-orm/models/create-each) or [`.destroy()`](http://sailsjs.com/documentation/reference/waterline-orm/models/destroy) queries, set this to `true` to tell the database adapter to send back all records that were updated/destroyed.  Otherwise, the second argument to the `.exec()` callback is `undefined`.  Warning: Enabling this key may cause performance issues for update/destroy queries that affect large numbers of records.
cascade                               | false           | If set to `true`, then deleting a record with a _plural association_ ([one-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many) or [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many)) will also cleanly remove all links to other records (by removing join table rows or setting foreign key values to `null`).  This may be desirable if database size is a concern, or if primary keys may be re-used for records, but it can negatively impact performance on [`.destroy()`](http://sailsjs.com/documentation/reference/waterline-orm/models/destroy) calls since it involves executing more queries.
skipAllLifecycleCallbacks             | false           | Set to `true` to prevent [lifecycle callbacks](http://next.sailsjs.com/documentation/concepts/models-and-orm/lifecycle-callbacks) from running during the execution of the query.
skipRecordVerification                | false           | Set to `true` to skip Waterline's post-query verification pass of any records returned from the adapter(s).  Useful for tools like sails-hook-orm's automigrations.  **Warning: Enabling this flag causes Waterline to ignore `customToJSON`!**


### Example Usage

```javascript
var myQuery = User.create({name: 'alice'});

myQuery.meta({fetch: true});

myQuery.exec(function callBack(err,results){
  console.log(results)
});


```
### Notes
> In order for `cascade` to work when the `fetch` meta key is _not_ `true`, Waterline must do an extra `.find().select('id')` before actually performing the `.destroy()` in order to get the IDs of the records that would be destroyed.
> Each model method returns a chainable object if you don't supply a callback.  This method can be chained to that object to further modify the query.  It can also be provided as a third argument to the `.exec()` method.

<docmeta name="displayName" value=".meta()">
<docmeta name="pageType" value="method">
