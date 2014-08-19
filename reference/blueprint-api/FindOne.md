# Find One

Returns a single record from the model as a JSON Object.

```
GET /:model/:id
```

<!--
<table>
  <thead>
    <tr>
      <th colspan="2">Blueprint Routes</th>
    </tr>
    <tr>
      <th>Type</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>REST</td>
      <td>
        <code>GET /:modelIdentity/:id</code>
      </td>
    </tr>
    <tr>
      <td>Shortcut</td>
      <td>
        <code>GET /:modelIdentity/findOne/:id</code>
      </td>
    </tr>
  </tbody>
</table>
-->

The **findOne()** blueprint action returns a single record from the model (given by `:modelIdentity`) as a JSON object.  The specified `id` is the [primary key](http://en.wikipedia.org/wiki/Unique_key) of the desired record.

If the action was triggered via a socket request, the requesting socket will be "subscribed" to the returned record.  If the record is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change.  See the docs for [.subscribe()](/#/documentation/reference/websockets/resourceful-pubsub/subscribe.html) for more info.


### Parameters

 Parameter                          | Type                                    | Details
 ---------------------------------- | --------------------------------------- |:---------------------------------
 id<br/>*(required)*                | ((number))<br/>*-or-*<br/>((string))    | The desired record's primary key value<br/><br/>e.g. `/product/7`
 callback                           | ((string))                              | If specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Example
Find the purchase with ID #1, E.g. `http://localhost:1337/purchase/1`

#### Route
`GET /purchase/1`


#### Expected Response

 ```json
 {
   "amount": 49.99,
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 }
 ```

<docmeta name="uniqueID" value="FindOne259267">
<docmeta name="displayName" value="find one">

