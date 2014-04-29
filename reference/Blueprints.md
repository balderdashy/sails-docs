# Blueprints

### Overview

Together, blueprint routes and blueprint actions constitute the **blueprint API**, the built-in logic that powers the [RESTful JSON API](http://en.wikipedia.org/wiki/Representational_state_transfer) you get every time you generate an empty model and controller.  

For example, if you create a `User` model and controller in your project, then with blueprints enabled you will be able to immediately visit `/user/create?name=joe` to create a user, and visit `/user` to see an array of your app's users.  All without writing a single line of code!

Blueprints are great for prototyping, but they are also a powerful tool in production due to their ability to be overridden, protected, extended or disabled entirely.

##### Blueprint Routes

When you run `sails lift` with blueprints enabled, the framework inspects your controllers, models, and configuration in order to [bind certain routes](./#!documentation/guides/routes) automatically. These implicit blueprint routes (sometimes called "shadows") allow your app to respond to certain requests without you having to bind those routes manually in your `config/routes.js` file.  By default, the blueprint routes point to their corresponding blueprint *actions* (see "Blueprint Actions" below), any of which can be overridden with custom code.

There are three types of blueprint routes in Sails:

+ **RESTful routes**, where the path is always `/:modelIdentity` or `/:modelIdentity/:id`.  These routes use the HTTP "verb" to determine the action to take; for example a `POST` request to `/user` will create a new user, and a `DELETE` request to `/user/123` will delete the user whose primary key is 123.  In a production environment, RESTful routes should generally be protected by [policies](./#!documentation/reference/Policies) to avoid unauthorized access.
+ **Shortcut routes**, where the action to take is encoded in the path.  For example, the `/user/create?name=joe` shortcut creates a new user, while `/user/update/1?name=mike` updates user #1. These routes only respond to `GET` requests.  Shortcut routes are very handy for development, but generally should be disabled in a production environment.
+ **Action routes**, which automatically create routes for your custom controller actions.  For example, if you have a `FooController.js` file with a `bar` action, then a `/foo/bar` route will automatically be created for you as long as blueprint action routes are enabled.  Unlike RESTful and shortcut routes, action routes do *not* require that a controller has a corresponding model file.


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
> + The examples URLs below assume you are running your Sails app locally on the default port (1337).  If your app is deployed on a server someplace, a different port, or with an SSL certificate, you'll need to adjust your usage accordingly.


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
        <code>GET http://localhost:1337/:modelIdentity</code>
      </td>
    </tr>
    <tr>
      <td>Shortcut</td>
      <td>
        <code>GET http://localhost:1337/:modelIdentity/find</code>
      </td>
    </tr>
  </tbody>
</table>
-->

The **find()** blueprint action returns a list of records from the model (given by `:modelIdentity`) as a JSON array of objects.  Records are filtered, paginated, and sorted based on parameters parsed from the request.

If the request was sent via a socket request, the requesting socket will be "subscribed" to all records returned.  If any of the returned records is subsequently updated or deleted, a message will be sent to that socket's client informing them of the change.  See the [docs for .subscribe()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts) for more info.


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
        For instance, if our `Purchase` model has an **amount** attribute, we could send `GET http://localhost:1337/purchase?amount=99.99` to return a list of $99.99 purchases.
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
        The order of returned records- by default, records are returned sorted by primary key
        
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

Assuming a `Purchase` model and an empty `PurchaseController`, to find and subscribe to the first 30 purchases from the database, enter the following into the URL bar in your web browser:

`GET http://localhost:1337/purchase`


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

> For advanced filtering, you can send a `where` query parameter with a stringified JSON object.  This object will be passed directly to Waterline as a criteria for a find, i.e. `Pony.find().where(req.param('where'))`  This allows you to use `contains`, `>`, `<`, `!`, `startsWith`, `endsWith`, and more.  For more on query operators, check out [the Model documentation](https://github.com/balderdashy/sails-docs/edit/0.9/reference/Blueprints.md)



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
        <code>GET http://localhost:1337/:modelIdentity/:id</code>
      </td>
    </tr>
    <tr>
      <td>Shortcut</td>
      <td>
        <code>GET http://localhost:1337/:modelIdentity/findOne/:id</code>
      </td>
    </tr>
  </tbody>
</table>
-->

The **findOne()** blueprint action returns a single record from the model (given by `:modelIdentity`) as a JSON object.  The specified `id` is the [primary key]() of the desired record.

If the request was sent via a connected socket (via socket.io), the socket will be "subscribed" to the resulting record.  That means that when the returned record is updated or deleted, a comet message will be sent over the socket.  See the [docs for .subscribe()](https://github.com/balderdashy/sails-docs/blob/master/reference/ModelMethods.md#subscriberequestrecordscontexts) for more info.


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
          http://localhost:1337/product/7
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

... 

<!--

`GET http://localhost:1337/:model/:id`

To look up a particular Product from the database:

_via the URL bar in your web browser_
`http://localhost:1337/pony/1`

#### Expected Response

```json
 {
   "name": "Rainbow Dash",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 }

```

### Find All (Shortcuts)

`http://localhost:1337/:model/find/`

Like before, we will get all the ponies in the database.  This time, using the `Blueprint Shortcut` routes.

via web browser 'http://localhost:1337/pony/find/'

#### Expected Response

```json
 [{
   "name": "Rainbow Dash",
   "id": 1,
   "createdAt": "2013-10-18T01:22:56.000Z",
   "updatedAt": "2013-10-18T01:22:56.000Z"
 },
 {
   "name": "Twilight Sparkle",
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }]

```

### Find One (Shortcuts)

`http://localhost:1337/:model/find/:recordID`

Like before, we will get just one Pony.  This time, using the `Blueprint Shortcut` routes.

via web browser 'http://localhost:1337/pony/find/47'

#### Expected Response

```json
 {
   "name": "Twilight Sparkle",
   "id": 47,
   "createdAt": "2013-10-14T01:22:00.000Z",
   "updatedAt": "2013-10-15T01:20:54.000Z"
 }

```


### Find Model/Collection associated with a particular record (REST)

`GET http://localhost:1337/:model/:recordID/:associatedAttribute`

Get all `Pet`s associated with the 'Pony' who has an ID of 4. 

via Web Browser

`GET http://localhost:1337/pony/4/pets`

#### Expected Response
```json
[{
    "name": "Gummy",
    "species": "crocodile"
    "id": 10,
    "createdAt": "2014-02-13T00:06:50.603Z",
    "updatedAt": "2014-02-13T00:06:50.603Z"
  },{
    "name": "Bubbles",
    "species": "crackhead"
    "id": 15,
    "createdAt": "2014-02-13T00:06:50.603Z",
    "updatedAt": "2014-02-13T00:06:50.603Z"
  }]

```

### Find Model/Collection associated with a particular record (Shortcuts)
HALP!

#### Expected Response
```json
[{
    "name": "Gummy",
    "species": "crocodile"
    "id": 10,
    "createdAt": "2014-02-13T00:06:50.603Z",
    "updatedAt": "2014-02-13T00:06:50.603Z"
  },{
    "name": "Bubbles",
    "species": "crackhead"
    "id": 15,
    "createdAt": "2014-02-13T00:06:50.603Z",
    "updatedAt": "2014-02-13T00:06:50.603Z"
  }]

```
-->

<!--
+ **limit** - the maximum number of records to send back-- useful for pagination.
+ **skip** - the number of records to skip-- useful for pagination. e.g. the following would return the second page of 30 results `http://localhost:1337/pony?skip=30&limit=30`
+ **sort** - the order in which to sort results, e.g. `http://localhost:1337/pony?sort=name DESC` or `http://localhost:1337/pony?sort=createdAt ASC`

-->


### Notes

> The 'Find One' method does not accept filtering/pagination/sorting query parameters (they wouldn't make a whole lot of sense)

> For the associations examples, while the blueprint routes work for all types of associations, keep in mind that the `associatedAttribute` will be the key name specified in your associatING model config for the associatED model or collection.  










# Create A Record

### `POST /:modelIdentity`

### Purpose
Create a new model instance in the database.
Attributes can be sent in the HTTP body as form-encoded values or JSON.

### Description
Responds with a JSON object representing the newly created instance.  If a validation error occurred, a JSON response with the invalid attributes and a `400` status code will be returned instead.

Additionally, a `create` event will be published to all listening sockets. 

This is equivalent to running `Pony.publishCreate( theNewlyCreatedPony.toJSON() )` in a custom controller.

If the request is sent using socket.io, the requesting socket will ALSO be subscribed to "updates"+"destroys" on the newly created model instance returned (instance room). 

This is equivalent to running `Pony.subscribe(req.socket, theNewlyCreatedPony)` in a custom controller.


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
        
        Pass in body parameter(s) with the same name as the attribute(s) defined on your model to set those values on your new record.
        <br/>
        For instance, if our `Product` model has **price** and **sku** attributes, we could send `POST http://localhost:1337/product?price=99.99&sku=f3291481da13bc` to create a $99.99 product with the specified sku.
        <br/>
        Nested objects and arrays passed in as parameters are handled the same way as if they were passed into the model's <a>.create()</a> method.

        <br/><strong>Example:</strong>
        <code>
          ?price=99.99&amp;sku=f3291481da13bc
        </code>

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

`POST http://localhost:1337/:model`

Create a new pony named "AppleJack" with a hobby of "pickin".

_via Postman_
`POST` `'http://localhost:1337/pony'`


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

`http://localhost:1337/:model/create?`

via web browser

`http://localhost:1337/pony/create?name=Shutterfly&&best_pony=yep`

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

You can create associations between models in 2 different ways.  You can either make the association with a record that already exists OR you can create the associated record as you associate.  Check out the examples to see how. 

These examples assume the existence of `Pet` and `Pony` APIs which can be created using the [Sails CLI Tool](/#!documentation/reference/CommandLine/CommandLine.html).  A One-To-One or a One Way association must have been configured for your models.  See [Model Association Docs](./ModelAssociations.md) for info on how to do this.

### Create record while associating w/ existing record (REST)

`POST http://localhost:1337/:model`

Create a new pony named "Pinkie Pie" and associate it with an existing pet named "Gummy" which has an `id` of 10.  

via Postman

`POST http://localhost:1337/pony`

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

`POST http://localhost:1337/:model`

Create a new pony named "Pinkie Pie", an "ice skating" hobby, and a new pet named "Gummy".

via Postman

`POST http://localhost:1337/pony`


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
<!--
### Examples with Many-To-Many Associations

Waterline does not currently support creating new records that are configured for a Many-To-Many association while simoultaniously making that association with another record.  Because of this, it cannot be done using blueprints.  Instead, you will have to do a create followed by an update.
-->

### Notes

> Don't forget to use double quotes for the keys in your JSON request body - single quotes won't work!








# Update A Record

### `PUT /:modelIdentity/:id`

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
          PUT http://localhost:1337/product/<strong>5</strong>
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
        
        Pass in body parameter(s) with the same name as the attribute(s) defined on your model to set those values on the desired record.
        <br/>
        For instance, if our `Product` model has **price** and **sku** attributes, we could send `PUT http://localhost:1337/product/5?price=99.99&amp;sku=f3291481da13bc` to change the price and sku of the product with id 5.
        <br/>
        Nested objects and arrays passed in as parameters are handled the same way as if they were passed into the model's <a>.create()</a> method.

        <br/><strong>Example:</strong>
        <code>
          ?price=99.99&amp;sku=f3291481da13bc
        </code>

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

Additionally, a comet message will be published to all sockets subscribed to the instance room, e.g.:

```javascript
//
// New usage:
//

// On the client

// You can still do `message`, but you'll get the 0.9-style comet messages (see below).

// New comet events you can subscribe to (for each model):
socket.on('user', console.log);
socket.on('pet', console.log);
socket.on('chair', console.log);

// -> Later, one of these might log something like:
/*
{
 verb: 'created',
 data: { name: 'Scott' },
 id: 15
}

{
 verb: 'updated'
 data: { name: 'Ricky' },
 id: 15
}

{
 verb: 'destroyed'
 data: { },
 id: 15
}

{
 verb: 'removedFrom',
 association: { alias: 'petHorses', model: 'Horse' },
 message: 'Removed a Horse from User\'s `petHorses`',
 data: { id: 'b728a8efcd2941313043' },
 id: 7
}

{
 verb: 'addedTo',
 association: { alias: 'petHorses', model: 'Horse' },
 message: 'Added a Horse to User\'s `petHorses`',
 data: { id: 'b728a8efcd2941313043;, name: 'Sea Biscuit' },
 id: 7
}
*/



//
// 0.9-style usage:
//

// On the client
socket.on('message', console.log);

// -> Later, this might log something like:
/*
{
 model: 'user',
 verb: 'update',
 data: { name: 'Scott' },
 id: 8
}
*/

```


This is equivalent to running `Pony.publishUpdate( pinkiesId, changedAttributes.toJSON() )` in a custom controller.

### Examples

### Update Record (REST)

`PUT http://localhost:1337/:model/:id`

Change AppleJack's hobby to "kickin".

_via Postman_
`PUT http://localhost:1337/pony/47?hobby=kickin`

### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Update Record (Shortcuts)

`http://localhost:1337/:model/update?`

via web browser

`http://localhost:1337/pony/update/5?name=Shutterfly_myLove`

#### Expected Response

```javascript
{
  "name": "Shutterfly_myLove",
  "best_pony": "yep",
  "createdAt": "2014-02-24T21:02:16.068Z",
  "updatedAt": "2014-02-24T21:07:41.695Z",
  "id": 5
}
```

### Add association between two existing records (REST)
`POST http://localhost:1337/:model/:recordID/:collectionName?`


Give Pinkie Pie the pre-existing pet named "Bubbles" who has ID 15.

via Postman

`POST http://localhost:1337/pony/4/pets?id=12`


#### Expected Response
```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 47,
  "pets": [{
      "name": "Gummy",
      "species": "crocodile"
      "id": 10,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    },{
      "name": "Bubbles",
      "species": "crackhead"
      "id": 15,
      "createdAt": "2014-02-13T00:06:50.603Z",
      "updatedAt": "2014-02-13T00:06:50.603Z"
    }],
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

### Add association between two existing records (Shortcuts)
`http://localhost:1337/:model/update?`

#### Expected Response
```json

```

### Remove Association (Many-To-Many) (REST)
`DELETE http://localhost:1337/:model/:recordID/:collectionName?`


Remove Pinkie Pie's pet, "Gummy" (ID 12)

via Postman

`DELETE http://localhost:1337/pony/4/pets?id=12`

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

`http://localhost:1337/:model/:recordID/:collectionName/remove?`


#### Expected Response
```json

```

### Notes

> Don't forget to use double quotes for the keys in your JSON request body - single quotes won't work!













# Destroy A Record

### `DELETE /:modelIdentity/:id`

Delete an existing record specified by `id` from the database forever.

### Description
Destroys the model instance which matches the **id** parameter.  Responds with a JSON object representing the newly destroyed instance.  If no model instance exists matching the specified **id**, a `404` is returned.

Additionally, a `destroy` event will be published to all sockets subscribed to the instance room. 

This is equivalent to running `Pony.publishDestroy( pinkiesId )` in a custom controller.

Consequently, all sockets currently subscribed to the instance room will be unsubscribed from it.


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
        
        The primary key value of the record to destroy.

        <br/><strong>Example:</strong>
        <code>
          DELETE http://localhost:1337/product/<strong>7</strong>
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



### Examples

#### Destroy (REST)

`DELETE http://localhost:1337/:model/:id`

Delete Pinkie Pie.

via web browser

`DELETE http://localhost:1337/pony/47`

#### Expected Response

```json
{
  "name": "Pinkie Pie",
  "hobby": "kickin",
  "id": 47,
  "createdAt": "2013-10-18T01:23:56.000Z",
  "updatedAt": "2013-11-26T22:55:19.951Z"
}
```

#### Destroy (Shortcuts)

`http://localhost:1337/:model/destroy/:recordID`

via web browser

`http://localhost:1337/pony/destroy/5`

#### Expected Response

```json
{
  "name": "Shutterfly_myLove",
  "best_pony": "yep",
  "createdAt": "2014-02-24T21:02:16.068Z",
  "updatedAt": "2014-02-24T21:07:41.695Z",
  "id": 5
}
```


### Notes

> Assumes the existence of both `PonyController` and a model called 'Pony'.

> Don't forget to use double quotes for the keys in your JSON request body - single quotes won't work!
