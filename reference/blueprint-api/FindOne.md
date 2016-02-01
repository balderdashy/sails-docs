# Find One (Blueprint)

Look up a single record from the database.

```
GET /:model/:id
```


The **findOne()** blueprint action returns a single record from the model (given by `:model`) as a JSON object. The specified `id` is the [primary key](http://en.wikipedia.org/wiki/Unique_key) of the desired record.

If the action was triggered via a socket request, the requesting socket will be "subscribed" to the returned record. If the record is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change. See the docs for [.subscribe()](http://sailsjs.org/documentation/reference/websockets/resourceful-pubsub/subscribe.html) for more info.


### Parameters

 Parameter                          | Type                                    | Details
 ---------------------------------- | --------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) of the containing model.<br/><br/>e.g. `'purchase'` (in `/purchase/7`)
 id                | ((string))    | The desired target record's primary key value<br/><br/>e.g. `'7'` (in `/purchase/7`).
 _callback_                         | ((string?))                             | Optional. If specified, a JSONP response will be sent (instead of JSON). This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`



### Example
Find the purchase with id #1:

```
GET /purchase/1
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Expected Response

 ```json
 {
   "amount": 49.99,
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 }
 ```


<docmeta name="displayName" value="find one">
