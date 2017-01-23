# Remove (Blueprint)

Remove a foreign record (e.g. a comment) from one of this record's collection associations (e.g. "comments").

```javascript
DELETE /:model/:id/:association/:fk
```

This action removes a reference to some other record (the "foreign" record) from a collection attribute of this record (the "primary" record).  Note that this does not actually destroy the foreign record-- it just removes it.

+ If the foreign record does not exist, it is created first.
+ If the collection doesn't contain a reference to the foreign record, this action will be ignored.
+ If the association is 2-way (i.e. reflexive, with "via" on both sides) the association on the foreign record will also be updated.

### Parameters

 Parameter                          | Type                                    | Details
:---------------------------------- | --------------------------------------- |:---------------------------------
 model | ((string)) | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model for the parent record.<br/><br/>e.g. `'store'` (in `/store/16/employeesOfTheMonth/7`)
 id | ((string)) | The desired target record's primary key value<br/><br/>e.g. `'16'` (in `/store/16/employeesOfTheMonth/7`)
 association       | ((string))                              | The name of the collection association<br/><br/>e.g. `'employeesOfTheMonth'`
 fk  | ((string))    | The id of the foreign record to remove from the collection association.<br/><br/>e.g. `7`


### Example

Say you're building an app for a small chain of grocery stores.  Each store has a giant television screen that displays the current "Employee of the Month" at that store, so that customers and team members see it when they walk in the door.  In order to be sure it is up to date, you build a scheduled job (e.g. using [cron](https://en.wikipedia.org/wiki/Cron)) that runs on the first day of every month to change the "Employees of the Month" for each store in our system.

Let's say that, as a part of this scheduled job, we send a request to remove remove Dolly (employee #7) from the `employeesOfTheMonth` list of store #16:

```
DELETE /store/16/employeesOfTheMonth/7
```
[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected Response

```json
{
  "id": 16,
  "name": "Parmer and N. Lamar",
  "createdAt": "2014-08-03T01:16:35.440Z",
  "updatedAt": "2014-08-03T01:51:41.567Z",
  "employeesOfTheMonth": []
}
```

### Resourceful PubSub (RPS)

If you have websockets enabled for your app, then every client subscribed to the parent record (either via a call to [`.subscribe()`](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) or due to previous socket request to the [`find`](http://sailsjs.com/documentation/reference/blueprint-api/find) or [`findOne`](http://sailsjs.com/documentation/reference/blueprint-api/find-one) blueprints) will receive a notification for the new child, where the notification event name is that of the parent model identity (e.g. `store`), and the data &ldquo;payload&rdquo; has the following format:

```
id: <the parent record primary key>,
verb: 'removedFrom',
attribute: <the parent record collection attribute name>,
removedId: <the child record primary key>
```

for instance, continuing the example above, all clients subscribed to employee #16 (_except_ for the client making the request, if the request was made via websocket) would receive the following notification:

```
id: 16,
verb: 'removedFrom',
attribute: 'employeesOfTheMonth',
removedId: 7
```

Similarly, if the relationship between the parent and child models is [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many), then subscribers to the child record will receive `removedFrom` notifications as well (with the `id` and `removedId` values reversed).  If the relationship is [one-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many), then subscribers to the child will receive an `updated` notification (see the [update blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/update) for more info about that notification).

### Notes

> + If you'd like to spend some more time with Dolly, a more detailed walkthrough for the example above is available [here](https://gist.github.com/mikermcneil/e5a20b03be5aa4e0459b).
> + This action is for dealing with _plural_ ("collection") associations.  If you want to set or unset a _singular_ ("model") association, just use [update](http://sailsjs.com/documentation/reference/blueprint-api/update) and set the model association to the id of the new foreign record (or `null` to clear the association). If you want to completely _replace_ the set of records in the collection with another set, use the [replace](http://sailsjs.com/documentation/reference/blueprint-api/replace) blueprint.

<docmeta name="displayName" value="remove from">
<docmeta name="pageType" value="endpoint">

