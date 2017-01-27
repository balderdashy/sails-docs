# Destroy (Blueprint)

Delete the record specified by `id` from the database forever and notify subscribed sockets.

```javascript
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

If you have WebSockets enabled for your app, then every client [subscribed](/documentation/reference/web-sockets/resourceful-pub-sub) to the destroyed record will receive a notification where the event name is that of the model identity (e.g. `pony`), and the &ldquo;message&rdquo; has the following format:

```
verb: 'destroyed',
id: <the record primary key>,
previous: <a dictionary of the attribute values of the destroyed record (including associations)>
```

For instance, continuing the example above, all clients subscribed to `Pony` #4 (_except_ for the client making the request, if the request was made via websocket) might receive the following message:

```
id: 4,
verb: 'destroyed',
data: {
  name: 'Pinkie Pie',
  hobby: 'kickin',
  createdAt: 1485550644076,
  updatedAt: 1485550644076
}
```

Similarly, if the destroyed record had any links to other records via [one-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many) or [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many) associations, then `updated` or `removedFrom` notifications would be sent to any clients subscribed to the records on the other side of the relationship.  See the [update blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/update) and [remove-from blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/remove-from) for more info about those notifications.

<docmeta name="displayName" value="destroy">
<docmeta name="pageType" value="endpoint">

