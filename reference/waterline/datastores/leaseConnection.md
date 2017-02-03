# .leaseConnection()

Lease a new connection from the datastore for use in running multiple queries on the same connection (i.e. so that the logic provided in `during` can reuse the db connection).


### Parameters
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 |  during             |   ((function))      | When finished, or if a fatal error occurs, `during` should call its callback, at which time this will take care of releasing the db connection back to the manager (i.e. pool). |
| 2 |  explicitCb         |   ((function?))     |             |



<docmeta name="displayName" value=".leaseConnection()">
<docmeta name="pageType" value="method">
