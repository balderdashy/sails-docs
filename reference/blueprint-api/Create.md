# Create (Blueprint)

Create a new record in your database.

```javascript
POST /:model
```

Responds with a JSON dictionary representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, if the [`autoWatch` setting](http://sailsjs.com/documentation/reference/configuration/sails-config-blueprints?properties) is on (which it is by default), then a "created" notification will be published to all client sockets which are _watching_ this model; that is, client sockets who have previously sent a request to the "Find" blueprint action.  Those same sockets will also be subscribed to hear about subsequent changes to the new record.

Finally, if this blueprint action is triggered via a socket request, then the requesting socket will ALSO be subscribed to the newly created record.  In other words, if the record is subsequently updated or deleted using blueprints, a message will be sent to that client socket informing them of the change.  See [`.subscribe()`](http://sailsjs.com/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) for more info.

### Parameters

Parameters should be sent in the [request body](https://www.getpostman.com/docs/requests#body).  By default, Sails understands the most common types of encodings for body parameters, including url-encoding, form-encoding, and JSON.

 Parameter      | Type                                                      | Details
 -------------- | --------------------------------------------------------- |:---------------------------------
 model          | ((string))   | The [identity](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?identity) of the model in which the new record should be created.<br/><br/>e.g. `'purchase'` (in `POST /purchase`)
 _*_            | ((json?))                                                  | Send [body parameters](https://www.getpostman.com/docs/requests#body) with the same names as the attribute defined on your model to set those values on your new record.  <br/> <br/>These values are handled the same way as if they were passed into the model's <a href="http://sailsjs.com/documentation/reference/waterline-orm/models/create">.create()</a> method.

### Example

Create a new pony named "AppleJack" with a hobby of "pickin", whose is friends with ponies #13 and #25:

`POST /pony`

```json
{
  "name": "AppleJack",
  "hobby": "pickin",
  "friends": [13,25]
}
```

[![Run in Postman](https://s3.amazonaws.com/postman-static/run-button.png)](https://www.getpostman.com/run-collection/96217d0d747e536e49a4)

##### Example Response
```json
{
  "id": 47,
  "name": "AppleJack",
  "hobby": "pickin",
  "friends": [
    {
      "id": 13,
      "name": "Sparkle",
      "hobby": "hoppin",
      "createdAt": "2012-06-12T03:01:45.000Z",
      "updatedAt": "2013-09-25T21:23:08.000Z"
    },
    {
      "id": 25,
      "name": "Lollipop",
      "hobby": "winkin",
      "createdAt": "2011-01-03T22:54:53.000Z",
      "updatedAt": "2012-04-13T08:08:12.000Z"
    }
  ],
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Resourceful PubSub (RPS)

If you have websockets enabled for your app, then every client subscribed to the model (due to a previous socket request to the [`find`](http://sailsjs.com/documentation/reference/blueprint-api/find) or [`findOne`](http://sailsjs.com/documentation/reference/blueprint-api/find-one) blueprints) will receive a notification where the event name is that of the model identity (e.g. `pony`), and the data &ldquo;payload&rdquo; has the following format:

```
verb: 'created',
data: <a dictionary of the attribute values of the new record (without associations)>
id: <the new record primary key>,
```

For instance, continuing the example above, all clients subscribed to the `Pony` model (_except_ for the client making the request, if the request was made via websocket) would receive the following notification:

```js
id: 47,
verb: 'created',
data: {
  name: 'AppleJack',
  hobby: 'pickin',
  createdAt: '2013-10-18T01:23:56.000Z',
  updatedAt: '2013-11-26T22:55:19.951Z'
}
```

Similarly, if the new record included values for attributes representing [one-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many) or [many-to-many](http://sailsjs.com/documentation/concepts/models-and-orm/associations/many-to-many) associations, then `addedTo` notifications would be sent to any clients subscribed to the records on the other side of the relationship.  See the [add blueprint reference](http://sailsjs.com/documentation/reference/blueprint-api/add-to) for more info about those notifications.

<docmeta name="displayName" value="create">
<docmeta name="pageType" value="endpoint">

