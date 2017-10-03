# .sum()

Get the aggregate sum of the specified attribute across all matching records.

```usage
var total = await Something.sum(numericAttrName, criteria);
```

### Usage

|   |     Argument        | Type                                         | Details                            |
|---|:--------------------|----------------------------------------------|:-----------------------------------|
| 1 |  numericAttrName    | ((string))                                   | The name of the numeric attribute that will be totaled up.
| 2 |  _criteria_         | ((dictionary?))                                | The [Waterline criteria](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to use for matching records in the database. If no criteria is specified, the sum will be computed across _all_ of this model's records. `sum` queries do not support pagination using `skip` and `limit` or projections using `select`.

##### Result
  		  
| Type                | Description      |
|---------------------|:-----------------|
| ((number))	| The aggregate sum of the specified attribute across all matching records.

##### Errors

|     Name        | Type                | When? |
|--------------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError			| ((error))           | Thrown if something in the provided criteria was invalid.
| Adapter Error		| ((error))           | Thrown if something went wrong in the database adapter.
| Error				| ((error))           | Thrown if anything else unexpected happens.


### Example

Get the cumulative account balance of all bank accounts that have less than $32,000, or that are flagged as "suspended".


```javascript
try {
	var total = await BankAccount
		.sum('balance')
		.where({
		  or: [
		    { balance: { '<': 32000 } },
		    { suspended: true }
		  ]
		});
		
	return total;
} catch (err) {
	return res.serverError(err);
}
```


<docmeta name="displayName" value=".sum()">
<docmeta name="pageType" value="method">
