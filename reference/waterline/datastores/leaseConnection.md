# .leaseConnection()

Lease a new connection from the datastore for use in running multiple queries on the same connection (i.e. so that the logic provided in `during` can reuse the db connection).


### Parameters
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during             | ((function))        | See parameters in the table below. |
| 2 | explicitCallback    | ((function?))       | If not provided, `.leaseConnection()` will return a deferred object. |

##### `during` function
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 |  db                 | ((ref))             | The leased database connection |
| 2 | proceed             | ((function))        | Called when `during` is finished, or if a fatal error occurs, at which time `.leaseConnection()` will take care of releasing the db connection back to the manager (i.e. pool).|


<docmeta name="displayName" value=".leaseConnection()">
<docmeta name="pageType" value="method">
