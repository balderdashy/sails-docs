# Remove (Blueprint)

Remove a foreign record (e.g. a comment) from one of this record's collections (e.g. "comments").

```usage
DELETE /:model/:id/:association/:fk
```

This action removes a reference to some other record (the "foreign" or "child" record) from a collection of this record (the "primary" or "parent" record).  Note that this does not actually destroy the foreign record-- it just unlinks it.

+ If the primary record does not exist, this responds using `res.notFound()`.
+ If the foreign record does not exist, it is created first.
+ If the collection doesn't contain a reference to the foreign record, this action will have no effect.
+ If the association is 2-way (meaning it has `via`), then the foreign key or collection it points to with that `via` will also be updated on the foreign record.

### Parameters

 Parameter                          | Type                                    | Details
:---------------------------------- | --------------------------------------- |:---------------------------------
 model | ((string)) | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model for the parent record.<br/><br/>e.g. `'store'` (in `/store/16/employeesOfTheMonth/7`)
 id | ((string)) | The desired parent record's primary key value.<br/><br/>e.g. `'16'` (in `/store/16/employeesOfTheMonth/7`)
 association       | ((string))                              | The name of the collection attribute.<br/><br/>e.g. `'employeesOfTheMonth'`
 fk  | ((string))    | The primary key of the child record to remove from the collection.<br/><br/>e.g. `'7'`


### Example

Say you're building an app for a small chain of grocery stores.  Each store has a giant television screen that displays the current "Employees of the Month" at that store, so that customers and team members see it when they walk in the door.  In order to be sure it is up to date, you build a scheduled job (e.g. using [cron](https://en.wikipedia.org/wiki/Cron)) that runs on the first day of every month to change the "Employees of the Month" for each store in their system.

Let's say that, as a part of this scheduled job, we send a request to remove Dolly (employee #7) from store #16's `employeesOfTheMonth`:

```
DELETE /store/16/employeesOfTheMonth/7
```
[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected Response

```json
{
  "id": 16,
  "name": "Parmer and N. Lamar",
  "createdAt": 1485552033435,
  "updatedAt": 1485552048794,
  "employeesOfTheMonth": [
    {
      "id": 12,
      "name": "Motoki",
      "createdAt": 1485462079725,
      "updatedAt": 1485476060873
    }
  ]
}
```

### Socket notifications

If you have WebSockets enabled for your app, then every client [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to the parent record will receive a notification about the removed child, where the notification event name is that of the parent model identity (e.g. `store`), and the &ldquo;message&rdquo; has the following format:

```
id: <the parent record primary key>,
verb: 'removedFrom',
attribute: <the parent record collection attribute name>,
removedId: <the child record primary key>
```

For instance, continuing the example above, all clients subscribed to employee #7 (_except_ for the client making the request) would receive the following message:

```javascript
id: 16,
verb: 'removedFrom',
attribute: 'employeesOfTheMonth',
removedId: 7
```

**Clients subscribed to the child record receive an additional notification:**

Assuming `employeesOfTheMonth` was defined with a `via`, then either `updated` or `removedFrom` notifications would also be sent to any clients who were [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to Dolly, the child record we removed.

> If the attribute pointed at by the `via` is [also plural](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many) (e.g. `employeeOfTheMonthAtStores`), then another `removedFrom` notification will be sent. Otherwise, if the `via` [points at a singular attribute](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many) (e.g. `employeeOfTheMonthAtStore`) then the [`updated` notification](http://sailsjs.com/documentation/reference/blueprint-api/update#?socket-notifications) will be sent.


### Notes

> + If you'd like to spend some more time with Dolly, a more detailed walkthrough for the example above is available [here](https://gist.github.com/mikermcneil/e5a20b03be5aa4e0459b).
> + This action is for dealing with _plural_ ("collection") associations.  If you want to set or unset a _singular_ ("model") attribute, just use [update](http://sailsjs.com/documentation/reference/blueprint-api/update) and set the foreign key to the id of the new foreign record (or `null` to clear the association).
> + If you want to completely _replace_ the set of records in the collection with another set, use the [replace](http://sailsjs.com/documentation/reference/blueprint-api/replace) blueprint.

<docmeta name="displayName" value="remove from">
<docmeta name="pageType" value="endpoint">

