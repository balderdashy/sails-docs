# Destroy (Blueprint)

Delete the record specified by `id` from the database forever and notify subscribed sockets.

```usage
DELETE /:model/:id
```

This destroys the record which matches the **id** parameter and responds with a JSON dictionary representing the destroyed instance. If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the record room.  And all sockets currently subscribed to the record will be unsubscribed from it.


### Parameters

 Parameter                          | Type                                    | Details
 ---------------------------------- | --------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model.<br/><br/>e.g. `'purchase'` (in `/purchase/7`)
 id<br/>*(required)*                | ((string))                              | The primary key value of the record to destroy, specified in the path.  <br/>e.g. `'7'` (in `/purchase/7`) .



### Example

Delete Pinkie Pie:

`DELETE /pony/4`

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected Response

```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 4,
  "createdAt": 1485550644076,
  "updatedAt": 1485550644076
}
```

### Socket notifications

If you have WebSockets enabled for your app, then every client [subscribed](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub) to the destroyed record will receive a notification where the event name is that of the model identity (e.g. `pony`), and the &ldquo;message&rdquo; has the following format:

```
verb: 'destroyed',
id: <the record primary key>,
previous: <a dictionary of the attribute values of the destroyed record (including associations)>
```

For instance, continuing the example above, all clients subscribed to `Pony` #4 (_except_ for the client making the request) might receive the following message:

```json
id: 4,
verb: 'destroyed',
data: {
  name: 'Pinkie Pie',
  hobby: 'kickin',
  createdAt: 1485550644076,
  updatedAt: 1485550644076
}
```

If the destroyed record had any links to other records, there will be some additional notifications:

For example, if Pony #4 had a `friends` attribute that included ponies #13 and #47, then any clients subscribed to ponies #13 and #47 would receive a `removedFrom` notification upon pony #4's destruction. (See the [remove-from blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/remove-from) for more info about this notification.)

Alternatively, if Pony #4 was in Pony #13's list of `friends`, then  clients subscribed to Pony #13 would receive an `updated` notification, as destroying Pony #4 would remove it from Pony #13's `friends`. (See the [update blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/update) for more info about this notification.)


<docmeta name="displayName" value="destroy">
<docmeta name="pageType" value="endpoint">

