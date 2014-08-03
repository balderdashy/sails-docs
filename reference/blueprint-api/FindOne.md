# Find One

Returns a single record from the model as a JSON Object.

```
GET /:model/:record
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

If the action was triggered via a socket request, the requesting socket will be "subscribed" to the returned record.  If the record is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change.  See the [docs for .subscribe()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts) for more info.


### Parameters

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>
        <code>id</code>
        <em>(required)</em>
      </td>
      <td>
        <bubble>number</bubble>
        <br/>
        <em>-or-</em>
        <br/>
        <bubble>string</bubble>
      </td>
      <td>

        The desired record's primary key value

        <br/><strong>Example:</strong>
        <code>
          /product/7
        </code>

        <br/>

      </td>
    </tr>

    <tr>
      <td>
        <code>callback</code>
      </td>
      <td><bubble>string</bubble></td>
      <td>
        if specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing the result as the first (and only) argument

        <br/><strong>Example:</strong>
        <code>
          ?callback=myJSONPHandlerFn
        </code>

        <br/><strong>Default:</strong>
        <code>''</code>
      </td>
    </tr>

  </tbody>
</table>


### Example
Find the purchase with ID #1

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

