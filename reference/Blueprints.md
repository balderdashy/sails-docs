# Blueprints

### Overview

Together, blueprint routes and blueprint actions constitute the **blueprint API**, the built-in logic that powers the [RESTful JSON API](http://en.wikipedia.org/wiki/Representational_state_transfer) you get every time you create a model and controller.  

For example, if you create a `User.js` model and `UserController.js` controller file in your project, then with blueprints enabled you will be able to immediately visit `/user/create?name=joe` to create a user, and visit `/user` to see an array of your app's users.  All without writing a single line of code!

Blueprints are great for prototyping, but they are also a powerful tool in production due to their ability to be overridden, protected, extended or disabled entirely.

##### Blueprint Routes

When you run `sails lift` with blueprints enabled, the framework inspects your controllers, models, and configuration in order to [bind certain routes](./#!documentation/guides/routes) automatically. These implicit blueprint routes (sometimes called "shadows") allow your app to respond to certain requests without you having to bind those routes manually in your `config/routes.js` file.  By default, the blueprint routes point to their corresponding blueprint *actions* (see "Blueprint Actions" below), any of which can be overridden with custom code.

There are three types of blueprint routes in Sails:

+ **RESTful routes**, where the path is always `/:modelIdentity` or `/:modelIdentity/:id`.  These routes use the HTTP "verb" to determine the action to take; for example a `POST` request to `/user` will create a new user, and a `DELETE` request to `/user/123` will delete the user whose primary key is 123.  In a production environment, RESTful routes should generally be protected by [policies](./#!documentation/reference/Policies) to avoid unauthorized access.
+ **Shortcut routes**, where the action to take is encoded in the path.  For example, the `/user/create?name=joe` shortcut creates a new user, while `/user/update/1?name=mike` updates user #1. These routes only respond to `GET` requests.  Shortcut routes are very handy for development, but generally should be disabled in a production environment.
+ **Action routes**, which automatically create routes for your custom controller actions.  For example, if you have a `FooController.js` file with a `bar` method, then a `/foo/bar` route will automatically be created for you as long as blueprint action routes are enabled.  Unlike RESTful and shortcut routes, action routes do *not* require that a controller has a corresponding model file.


See the [blueprints subsection of the configuration reference](./#!documentation/reference/Configuration/blueprints.html) for blueprint configuration options, including how to enable / disable different blueprint route types.


##### Blueprint Actions

Blueprint actions (not to be confused with blueprint action *routes*) are generic actions designed to work with any of your controllers that have a model of the same name (e.g. `ParrotController` would need a `Parrot` model).  Think of them as the default behavior for your application.  For instance, if you have a `User.js` model and an empty `UserController.js` controller, `find`, `create`, `update`, `destroy`, `populate`, `add` and `remove` actions exist implicitly, without you having to write them.

By default, the blueprint RESTful routes and shortcut routes are bound to their corresponding blueprint actions.  However, any blueprint action can be overridden for a particular controller by creating a custom action in that controller file (e.g. `ParrotController.find`).  Alternatively, you can override the blueprint action _everywhere in your app_ by creating your own [custom blueprint action](./#!documentation/guides/customBlueprints). (e.g. `api/blueprints/create.js`).

The current version of Sails ships with the following blueprint actions:

+ [find](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [findOne](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [create](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [update](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [destroy](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [populate](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [add](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)
+ [remove](./#!documentation/reference/Blueprints/TODO_MAKE_THESE_URL_SLUGS_BETTER)

Consequently, the blueprint API methods covered in this section of the documentation correspond one-to-one with the blueprint actions above.

### Notes

> + While the following documentation focuses on HTTP, the blueprint API (just like any of your custom actions and policies) is also compatible with WebSockets, thanks to the request interpreter.  Check out the reference section on the [browser SDK](./#!documentation/reference/SocketClient/SocketClient.html) for example usage.
>

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

# Find One



### `GET /:modelIdentity/:id`

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

The **findOne()** blueprint action returns a single record from the model (given by `:modelIdentity`) as a JSON object.  The specified `id` is the [primary key]() of the desired record.

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

# Create A Record

### `POST /:modelIdentity` or `GET /:modelIdentity/create`

### Purpose
Create a new model instance in the database.
Attributes can be sent in the HTTP body as form-encoded values or JSON.

### Description
Responds with a JSON object representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, a `create` event will be published to all listening sockets (see the docs for [.watch()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#watchrequest) for more info).

If the action is triggered via a socket request, the requesting socket will ALSO be subscribed to the newly created model instance.  If the record is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change. See the docs for .subscribe() for more info.

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
      <td><code>&#42;</code></td>
      <td>
        <bubble>string</bubble>
        <br/>
        <bubble>number</bubble>
        <br/>
        <bubble>object</bubble>
        <br/>
        <bubble>array</bubble>
      </td>
      <td>
        
        For <code>POST</code> (RESTful) requests, pass in body parameter with the same name as the attribute defined on your model to set those values on your new record.  For <code>GET</code> (shortcut) requests, add the parameters to the query string.
        Nested objects and arrays passed in as parameters are handled the same way as if they were passed into the model's <a>.create()</a> method.
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





### Examples

#### Create a record (REST)

Create a new pony named "AppleJack" with a hobby of "pickin".

#### Route
`POST /pony`



#### JSON Request Body
```json
{
  "name": "AppleJack",
  "hobby": "pickin"
}
```

#### Example Response
```json
{
  "name": "AppleJack",
  "hobby": "pickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### Create a record (shortcuts)

#### Route
`GET /pony/create?name=Shutterfly&best_pony=yep`

#### Expected Response

```javascript
{
 "name": "Shutterfly",
 "best_pony": "yep",
 "createdAt": "2014-02-24T21:02:16.068Z",
 "updatedAt": "2014-02-24T21:02:16.068Z",
 "id": 5
}

```


### Examples with One Way Associations

You can create associations between models in two different ways.  You can either make the association with a record that already exists OR you can create both records simultaneously.  Check out the examples to see how. 

These examples assume the existence of `Pet` and `Pony` APIs which can be created by hand or using the [Sails CLI Tool](/#!documentation/reference/CommandLine/CommandLine.html).  The `Pony` model must be configured with a `pet` attribute pointing to the `Pet` model.  See [Model Association Docs](./ModelAssociations.md) for info on how to do this.

### Create record while associating w/ existing record (REST)

Create a new pony named "Pinkie Pie" and associate it with an existing pet named "Gummy" which has an `id` of 10.  

#### Route
`POST /pony`

#### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": 10
}
```

#### Example Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile",
    "id": 10
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```


### Create new record while associating w/ another new record (REST)

Create a new pony named "Pinkie Pie", an "ice skating" hobby, and a new pet named "Gummy".

#### Route
`POST /pony`


#### JSON Request Body
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
  }
}
```

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pet": {
    "name": "Gummy",
    "species": "crocodile"
    "id": 10
  },
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}
```

# Update A Record

### `PUT /:modelIdentity/:id` or `GET /:modelIdentity/update/:id`

Update an existing record.
Attributes to change should be sent in the HTTP body as form-encoded values or JSON.

### Description
Updates the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly updated instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.  If no model instance exists matching the specified **id**, a `404` is returned.

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
        
        The primary key value of the record to update.

        <br/><strong>Example:</strong>
        <code>
          PUT /product/<strong>5</strong>
        </code>

        <br/>

      </td>
    </tr>

    <tr>
      <td><code>&#42;</code></td>
      <td>
        <bubble>string</bubble>
        <br/>
        <bubble>number</bubble>
        <br/>
        <bubble>object</bubble>
        <br/>
        <bubble>array</bubble>
      </td>
      <td>
        
        For <code>POST</code> (RESTful) requests, pass in body parameters with the same name as the attributes defined on your model to set those values on the desired record.  For <code>GET</code> (shortcut) requests, add the parameters to the query string.
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

### Examples

### Update Record (REST)

Change AppleJack's hobby to "kickin".

#### Route
`PUT /pony/47`

#### JSON Request Body
```json
{
  "hobby": "kickin"
}
```

### Expected Response
```json
{
  "name": "AppleJack",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Update Record (Shortcuts)

`GET /pony/update/47?hobby=kickin`

#### Expected Response

Same as above.

### Add association between two existing records (REST)

Give Pinkie Pie the pre-existing pet named "Bubbles" who has ID 15.

#### Route
`POST /pony/4/pets`

#### JSON Request Body
```json
{
  "id": 15
}
```

#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 4,
  "pets": [{
      "name": "Gummy",
      "species": "crocodile"
      "id": 10,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    },{
      "name": "Bubbles",
      "species": "wiggleworm"
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Add association between two existing records (Shortcuts)
`POST /pony/4/pets/add/15`

### Remove Association (Many-To-Many) (REST)

Remove Pinkie Pie's pet, "Gummy" (ID 12)

#### Route
`DELETE /pony/4/pets`

#### JSON Request Body
```json
{
  "id": 12
}
```

#### Expected Response
```json

{
  "name": "Pinkie Pie",
  "hobby": "ice skating",
  "pets": [{
      "name": "Bubbles",
      "species": "crackhead"
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "id": 4,
  "createdAt": "2013-10-18T01:22:56.000Z",
  "updatedAt": "2013-11-26T22:54:19.951Z"
}

```

#### Remove Association (Many-To-Many) (Shortcuts)

#### Route 

`GET /pony/4/pets/remove/12`

#### Expected Response

Same as above.

# Destroy A Record

### `DELETE /:modelIdentity/:id` or `GET /:modelIdentity/:id/destroy`

Delete an existing record specified by `id` from the database forever.

### Description
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
