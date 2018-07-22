# .updateOne()

Update the record that matches the given criteria, if one exists.

```usage
var updatedRecord = await Something.updateOne(criteria)
.set(valuesToSet);
```

> Before attempting to modify the database, Waterline will check to see if the given criteria would match more than one record and, if so, it will throw an error instead of proceeding.


### Usage

|   |     Argument        | Type              | Details                            |
|---|:--------------------|-------------------|:-----------------------------------|
| 1 | criteria            | ((dictionary))    | The [Waterline criteria](https://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching the record in the database.
| 2 | valuesToSet         | ((dictionary))    | A dictionary (plain JavaScript object) of values to that all matching records should be updated to have.  _(Note that, if this model is in ["schemaful" mode](https://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?schema), then any extraneous keys will be silently omitted.)_

##### Result

| Type                | Description      |
|:--------------------|:-----------------|
| ((dictionary?))     | Since this method never updates more than one record, if a record is updated then it is always provided as a result.  Otherwise, this returns `undefined`.


##### Errors

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.


### Example

```javascript
var updatedUser = await User.updateOne({ firstName:'Pen' })
.set({
  firstName:'Finn'
});

if (updatedUser) {
  sails.log('Updated the user named "Pen" so that their new name is "Finn".');
}
else {
  sails.log('The database does not contain a user named "Pen".');
}
```


### Notes
> + This method can be used with [`await`](https://github.com/mikermcneil/parley/tree/49c06ee9ed32d9c55c24e8a0e767666a6b60b7e8#usage), promise chaining, or [traditional Node callbacks](https://sailsjs.com/documentation/reference/waterline-orm/queries/exec).
> + This method can be used to replace an entire collection association (for example, to replace a user&rsquo;s list of friends), achieving the same result as the [`replaceCollection` method](https://sailsjs.com/documentation/reference/waterline-orm/models/replace-collection).  To modify items in a collection individually, use the [`addToCollection`](https://sailsjs.com/documentation/reference/waterline-orm/models/add-to-collection) or [removeFromCollection](https://sailsjs.com/documentation/reference/waterline-orm/models/remove-from-collection) methods.


<docmeta name="displayName" value=".updateOne()">
<docmeta name="pageType" value="method">
