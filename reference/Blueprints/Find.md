# Find

### `GET /:modelIdentity`

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
        <code>GET /:modelIdentity</code>
      </td>
    </tr>
    <tr>
      <td>Shortcut</td>
      <td>
        <code>GET /:modelIdentity/find</code>
      </td>
    </tr>
  </tbody>
</table>
-->

The **find()** blueprint action returns a list of records from the model (given by `:modelIdentity`) as a JSON array of objects.  Records are filtered, paginated, and sorted based on parameters parsed from the request.

If the action was triggered via a socket request, the requesting socket will be "subscribed" to all records returned.  If any of the returned records are subsequently updated or deleted, a message will be sent to that socket's client informing them of the change.  See the [docs for .subscribe()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts) for more info.


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
      <code>&#42;</code>
      </td>
      <td>
        <bubble>string</bubble>
        <br/>
        <em>-or- </em>
        <br/>
        <bubble>number</bubble>
      </td>
      <td>
        To filter results based on a particular attribute, specify a query parameter with the same name as the attribute defined on your model.
        <br/>
        For instance, if our `Purchase` model has an **amount** attribute, we could send `GET /purchase?amount=99.99` to return a list of $99.99 purchases.
        <br/><strong>Example:</strong>
        <code>
          ?amount=99.99
        </code>
      </td>
    </tr>
    <tr>
      <td><code>where</code></td>
      <td><bubble>object</bubble></td>
      <td>
        Instead of filtering based on a specific attribute, you may instead choose to provide a <code>where</code> parameter with a Waterline WHERE criteria object, <em>encoded as a JSON string</em>.  This allows you to take advantage of <code>contains</code>, <code>lessThan</code> and other sub-attribute modifiers for more powerful queries.
        <br/><strong>Example:</strong>
        <code>
          ?where={"name":{"contains":"theodore"}}
        </code>
        <br/>
        <strong>Default:</strong> <code>{}</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>limit</code>
      </td>
      <td><bubble>number</bubble></td>
      <td>
        The maximum number of records to send back (useful for pagination)
        <br/><strong>Example:</strong>
        <code>
          ?limit=30
        </code>
        <br/><strong>Default:</strong>
        <code>30</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>skip</code>
      </td>
      <td><bubble>number</bubble></td>
      <td>
        The number of records to skip (useful for pagination)
        <br/><strong>Example:</strong>
        <code>
          ?skip=0
        </code>
        <br/><strong>Default:</strong>
        <code>0</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>sort</code>
      </td>
      <td><bubble>string</bubble></td>
      <td>
        The order of returned records
        
        <br/><strong>Example:</strong>
        <code>?sort=name%20ASC</code>
        or
        <code>?sort=name%20DESC</code>
        <br/><strong>Default:</strong>
        <em>by default, returned records are sorted by primary key, ascending</em>
      </td>
    </tr>
    <tr>
      <td>
        <code>callback</code>
      </td>
      <td><bubble>string</bubble></td>
      <td>
        If specified, a JSONP response will be sent (instead of JSON).  This is the name of the client-side javascript function to call, passing results as the first (and only argument
        
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

<!--
<iframe style="border: 1px solid #999;width: 100%; height: 300px"
        src="http://plnkr.co/as0NyD?t=readme" frameborder="0"
        allowfullscreen="allowfullscreen">
  Loading plunk...
  <em>Example not loading?  View it <a href="http://plnkr.co/as0NyD">on Plunker</a></em>
</iframe>
-->

Assuming a `Purchase` model and a `PurchaseController` without a custom `find` method, find the first 30 purchases from the database:

#### Route 
`GET /purchase`


#### Expected Response

 ```json
 [{
   "amount": 49.99,
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 },
 {
   "amount": 99.99,
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }]
 ```


### Notes

> Unlike earlier versions of Sails, a socket is *not* automatically subscribed to the "class room" for a model as a result of running the "find" blueprint.  Therefore, it will not be alerted when a new instance of that model is created.  This behavior can be changed by setting the `autoWatch` property to `true` in `/config/blueprints.js`.

<docmeta name="uniqueID" value="Find290807">
<docmeta name="displayName" value="Find">

