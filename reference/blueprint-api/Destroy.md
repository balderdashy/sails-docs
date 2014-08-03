# Destroy a Record

Deletes an existing record specified by `id` from the database forever and returns the values of the deleted record.

```
DELETE /:model/:record
```

Destroys the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly destroyed instance.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the instance room.

Consequently, all sockets currently subscribed to the instance will be unsubscribed from it.


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

        The primary key value of the record to destroy.  For `POST` (RESTful) requests, this can be supplied in the JSON body or as part of the route path.  For `GET` (shortcut) requests, it must be supplied in the route path.

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



### Examples

#### Destroy (REST)

Delete Pinkie Pie.

#### Route
`DELETE /pony`

#### JSON Request Body
```json
{
  "id": 4
}
```

#### Expected Response

```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 4,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### Destroy (Shortcuts)

#### Route
`GET /pony/destroy/4`

#### Expected Response

Same as above.


<docmeta name="uniqueID" value="DestroyARecord867513">
<docmeta name="displayName" value="destroy">

