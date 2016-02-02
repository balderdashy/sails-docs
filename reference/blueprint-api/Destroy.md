# Destroy (Blueprint)

Delete the record specified by `id` from the database forever and notify subscribed sockets.

```
DELETE /:model/:id
```

This destroys the record which matches the **id** parameter and responds with a JSON dictionary representing the destroyed instance. If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the record room.  And all sockets currently subscribed to the record will be unsubscribed from it.


### Parameters

 Parameter                          | Type                                    | Details
 ---------------------------------- | --------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model.<br/><br/>e.g. `'purchase'` (in `/purchase/7`)
 id                | ((string))    | The desired target record's primary key value<br/><br/>e.g. `'7'` (in `/purchase/7`).
 id<br/>*(required)*                | ((string))                              | The primary key value of the record to destroy, specified in the path.  <br/>e.g. `'7'` (in `/purchase/7`) .
 _callback_                           | ((string?))                              | If specified, a JSONP response will be sent (instead of JSON). This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`



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
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```



<docmeta name="displayName" value="destroy">
<docmeta name="pageType" value="endpoint">

