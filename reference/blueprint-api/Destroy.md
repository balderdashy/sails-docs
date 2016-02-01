# Destroy (Blueprint)

Delete an existing record specified by `id` from the database forever, and respond with the deleted record.

```
DELETE /:model/:id
```

This destroys the record which matches the **id** parameter and responds with a JSON dictionary representing the destroyed instance. If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the record room.  And all sockets currently subscribed to the record will be unsubscribed from it.


### Parameters

 Parameter                          | Type                                    | Details
 ---------------------------------- | --------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((string))                              | The primary key value of the record to destroy, specified in the path.  <br/>e.g. `'5'` (in `DELETE /product/5`) .
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
