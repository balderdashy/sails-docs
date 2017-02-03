# .leaseConnection()

Lease a new connection from the datastore for use in running multiple queries on the same connection (i.e. so that the logic provided in `during` can reuse the db connection).


```
someDatastore.leaseConnection(during).exec(afterDisconnecting);
```


### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | See parameters in the "`during` usage" table below. |

> ##### `during` usage
> |   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 |  db                 | ((ref))             | The leased database connection |
| 2 | proceed             | ((function))        | Called when `during` is finished, or if a fatal error occurs, at which time `.leaseConnection()` will take care of releasing the db connection back to the manager (i.e. pool).|

##### Callback
`afterDisconnecting` is an optional explicit callback that can be run after the db connection is released. If not provided, `.leaseConnection()` will return a deferred object.


<docmeta name="displayName" value=".leaseConnection()">
<docmeta name="pageType" value="method">
