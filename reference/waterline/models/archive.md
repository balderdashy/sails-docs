# .archive()

Archive ("soft-delete") records that match the specified criteria, saving them as new records in the built-in Archive model, then destroying the originals.

```javascript
Something.archive(criteria).exec(function (err) {

});
```

#### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |    criteria         | ((dictionary))                               | Records which match this [Waterline criteria](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md) will be archived.  Be warned, if you specify an empty dictionary (`{}`) as your criteria, _all records will be destroyed!_ |

##### Callback

|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:-----------------------------------------------------------------------------|
| 1 |    err              | ((Error?))          | The error that occurred, or `null` if there were no errors.
| 2 |  _archivedRecords_  | ((array?)) of ((dictionary))  |  For improved performance, the archived records are not provided to this callback by default.  But if you chain `.fetch()`, then the recently-archived records will be sent back. (Be aware that this requires an extra database query in some adapters.)


### Example

To archive a user in the the database:
```javascript

await User.archive({ id: 1 });
```

To archive multiple records in the the database:
```javascript

await Pet.archive({ lastActiveAt: { '<': Date.now()-1000*60*60*24*365 } });
```

### Accessing archived records
If you need to access archived records in the future, you can do so by searching the Archive model.  For example, you might pass in the original record's primary key and [model identity](https://sailsjs.com/documentation/reference/waterline-orm/models#?sailsmodels) as constraints in a query.

For example, to retrieve the archive record describing the user we got rid of above:

```
var archive = await Archive.findOne({
  fromModel: 'user',
  originalRecordId: 1
});

// The original record is now available as `archive.originalRecord`.
```

### Notes
> This method is best used in situations where you would otherwise use [`.destroy()`](https://sailsjs.com/documentation/reference/waterline-orm/models/destroy), but you still need to keep the deleted data somewhere. If you anticipate needing to access the data again in your app (e.g. if to allow un-deleting), you may want to consider using an `isDeleted` flag on your records instead of archiving them, since the records become more difficult to work with once they are archived.


<docmeta name="displayName" value=".archive()">
<docmeta name="pageType" value="method">
