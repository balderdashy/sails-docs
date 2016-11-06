# Create (Blueprint)

Create a new record in your database.

```
POST /:model
```

Responds with a JSON dictionary representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, if the [`autoWatch` setting](http://sailsjs.org/documentation/reference/configuration/sails-config-blueprints?properties) is on (which it is by default), then a "created" notification will be published to all client sockets which are _watching_ this model; that is, client sockets who have previously sent a request to the "Find" blueprint action.  Those same sockets will also be subscribed to hear about subsequent changes to the new record.

Finally, if this blueprint action is triggered via a socket request, then the requesting socket will ALSO be subscribed to the newly created record.  In other words, if the record is subsequently updated or deleted using blueprints, a message will be sent to that client socket informing them of the change.  See [`.subscribe()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) for more info.

### Parameters

Parameters should be sent in the [request body](https://www.getpostman.com/docs/requests#body).  By default, Sails understands the most common types of encodings for body parameters, including url-encoding, form-encoding, and JSON.

 Parameter      | Type                                                      | Details
 -------------- | --------------------------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?identity) of the model in which the new record should be created.<br/><br/>e.g. `'purchase'` (in `POST /purchase`)
 _*_            | ((json?))                                                  | Send [body parameters](https://www.getpostman.com/docs/requests#body) with the same names as the attribute defined on your model to set those values on your new record.  <br/> <br/>These values are handled the same way as if they were passed into the model's <a href="http://sailsjs.org/documentation/reference/waterline-orm/models/create">.create()</a> method.
 _callback_     | ((string?))                                                | If specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Example

Create a new pony named "AppleJack" with a hobby of "pickin":

`POST /pony`

```json
{
  "name": "AppleJack",
  "hobby": "pickin"
}
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Example Response
```json
{
  "name": "AppleJack",
  "hobby": "pickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```


<docmeta name="displayName" value="create">
<docmeta name="pageType" value="endpoint">

