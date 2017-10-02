# .avg()

Get the aggregate mean of the specified attribute across all matching records.

```usage
var average = await Something.avg(numericAttrName, criteria);
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  numericAttrName    | ((string))                                   | The name of the numeric attribute whose mean will be calculated.
| 2 |  _criteria_         | ((dictionary?))                                | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database. If no criteria is specified, the average will be computed across _all_ of this model's records. `avg` queries do not support pagination using `skip` and `limit` or projections using `select`.


##### Result
 
| Type                | Description      |
|---------------------|:-----------------|
| ((number))          | The aggregate mean of the specified attribute across all matching records.
 
##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter.
| Error				| ((error))           | Thrown if anything else unexpected happens.

### Example

Get the average balance of bank accounts owned by people between the ages of 35 and 45.

```javascript
try {
	var avg = BankAccount
			.avg('balance')
			.where({
				ownerAge: { '>=': 35, '<=': 45 }
			});
	
	return avg;
} catch (err) {
	return res.serverError(err);
}
```


<docmeta name="displayName" value=".avg()">
<docmeta name="pageType" value="method">
