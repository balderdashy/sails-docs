# Blueprint routes

When you run `sails lift` with blueprints enabled, the framework inspects your models and configuration in order to [bind certain routes](http://sailsjs.com/documentation/concepts/Routes) automatically. These implicit blueprint routes (sometimes called "shadow routes", or even just "shadows") allow your app to respond to certain requests without you having to bind those routes manually in your `config/routes.js` file.  When enabled, the blueprint routes point to their corresponding blueprint *actions* (see "Action routes" below), any of which can be overridden with custom code.

There are four types of blueprint routes in Sails:

### RESTful routes
REST blueprints are the automatically generated routes Sails uses to expose a conventional REST API for a model, including `find`, `create`, `update`, and `destroy` actions. The path for RESTful routes is always `/:modelIdentity` or `/:modelIdentity/:id`.  These routes use the HTTP "verb" to determine the action to take.

For example, with [`rest`](http://sailsjs.com/documentation/reference/configuration/sails-config-blueprints#?routerelated-settings) enabled, having a `Boat` model in your app generates the following routes:

+ **GET /boat** -> find boats matching criteria provided on the query string, using the [`find` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/find-where).
+ **GET /boat/:id** -> find a single boat with the given unique ID (i.e. primary key) value, using the [`findOne` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/find-one).
+ **POST /boat** -> create a new boat with the attributes provided in the request body, using the [`create` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/create).
+ **PATCH /boat/:id** -> update the boat with the given unique ID with the attributes provided in the request body, using the [`update` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/update).
+ **DELETE /boat/:id** -> destroy the boat with the given unique ID, using the [`destroy` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/destroy).

If the `Boat` model has a &ldquo;to-many&rdquo; relationship with a `Driver` model through an attribute called `drivers`, then the following additional routes would be available:

+ **PUT /boat/:id/drivers/add/:fk** -> add the driver with the unique ID equal to the `:fk` value to the `drivers` collection of the boat with the ID given as `:id`, using the [`add` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/add-to).
+ **DELETE /boat/:id/drivers/add/:fk** -> remove the driver with the unique ID equal to the `:fk` value to the `drivers` collection of the boat with the ID given as `:id`, using the [`remove` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/remove-from)
+ **PUT /boat/:id/drivers** -> replace the entire `drivers` collection with the drivers whose unique IDs are contained in an array provided as the body of the request, using the [`replace` blueprint](http://sailsjs.com/documentation/reference/blueprint-api/replace).

`rest` blueprint routes are enabled by default, and are suitable for use in a production scenario, as long as they are protected by [policies](http://sailsjs.com/documentation/concepts/Policies) to avoid unauthorized access.

##### Notes

> + If your app contains a controller whose name matches that of your model, then you can override the default actions pointed to by the RESTful routes by providing your own controller actions.  For example, if you have an `api/controllers/BoatController.js` controller file containing a custom `find` action, then the `GET /boat` route will point at that action.
> + If your app contains a route in `config/routes.js` that matches one of the above RESTful routes, it will be used instead of the default route.

### Shortcut routes
Shortcut routes are simple helpers to provide access to a CRUD methods for a model from your browser's URL bar, where the action to take is encoded in the path.

The shortcut routes are as follows:

| Route | Blueprint | Example URL |
| ----- | --------- | ------- |
| GET /:modelIdentity/find | [find](http://sailsjs.com/documentation/reference/blueprint-api/find-where) | `http://localhost:1337/user/find?name=bob`
| GET /:modelIdentity/find/:id | [findOne](http://sailsjs.com/documentation/reference/blueprint-api/find-one) | `http://localhost:1337/user/find/123`
| GET /:modelIdentity/create | [create](http://sailsjs.com/documentation/reference/blueprint-api/create) | `http://localhost:1337/user/create?name=bob&age=18`
| GET /:modelIdentity/update/:id | [update](http://sailsjs.com/documentation/reference/blueprint-api/update) | `http://localhost:1337/user/update/123?name=joe`
| GET /:modelIdentity/destroy/:id | [destroy](http://sailsjs.com/documentation/reference/blueprint-api/destroy) | `http://localhost:1337/user/destroy/123`
| GET /:modelIdentity/:id/:association/add/:fk | [add](http://sailsjs.com/documentation/reference/blueprint-api/add-to) | `http://localhost:1337/user/123/pets/add/3`
| GET /:modelIdentity/:id/:association/remove/:fk | [remove](http://sailsjs.com/documentation/reference/blueprint-api/remove-from) | `http://localhost:1337/user/123/pets/remove/3`
| GET /:modelIdentity/:id/:association/replace?association=[1,2...] | [replace](http://sailsjs.com/documentation/reference/blueprint-api/replace) | `http://localhost:1337/user/123/pets/replace?pets=[3,4]`

Shortcut routes are enabled by default, and are very handy for development, but generally should be disabled in a production environment.

##### Notes

> + Like RESTful routes, shortcut routes can be overridden by providing an action in a matching controller, or by providing a route in `config/routes.js`.
> + the same _action_ is executed for similar RESTful/shortcut routes.  For example, the `POST /user` and `GET /user/create` routes that Sails creates when it loads `api/models/User.js` will respond by running the same code (even if you [override the blueprint action](http://sailsjs.com/documentation/reference/blueprint-api#?overriding-blueprints))
> + When using a <a href="https://en.wikipedia.org/wiki/NoSQL" target="_blank">NoSQL</a> database (like <a href="https://docs.mongodb.com/" target="_blank">MongoDB</a>) with your model&rsquo;s [`schema` configuration](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?schema) set to `false`, shortcut routes will interpret any parameter value for an unknown attribute as a _string_.  Be careful doing `http://localhost:1337/game/create?players=2` if you don&rsquo;t have a `players` attribute with a `number` type!

### Action routes

Action routes automatically create routes for your custom controller actions, and speed up the backend development workflow by eliminating the need to manually bind routes. When enabled, GET, POST, PUT, and DELETE routes will be generated for every one of a controller's actions.

For example, if you have a `FooController.js` file with a `bar` method, then a `/foo/bar` route will automatically be created for you as long as `sails.config.blueprints.actions` is enabled.  Unlike RESTful and shortcut shadows, implicit, per-action shadow routes do *not* require that a controller has a corresponding model file.

If an `index` action exists, additional naked routes will be created for it. Finally, all `actions` blueprints support an optional path parameter, `id`, for convenience.

`actions` are disabled by default. They can be OK for production-- however, if you'd like to continue to use controller/action autorouting in a production deployment, you must take great care not to inadvertently expose unsafe/unintentional controller logic to GET requests. You can easily turn off a particular method or path in your [`/config/routes.js`](http://sailsjs.com/documentation/anatomy/my-app/config/routes-js) file using the [response target syntax](http://sailsjs.com/documentation/concepts/routes/custom-routes#?response-target-syntax), for example:

```javascript
'POST /user': {response: 'notFound'}
```

##### Notes
> + Action routes respond to _all_ HTTP verbs (GET, PUT, POST, etc.).  You can use `req.method` inside an action to determine which method was used.

##### Index routes

When action shadows (`sails.config.blueprints.actions`) are enabled, an additional "root" shadow route is automatically exposed for actions named `index`.  For example, if you have a `FooController.js` file with an `index` action in it, a `/foo` shadow route will automatically be bound for that action.  Similarly, if you have a [standalone action](http://sailsjs.com/documentation/concepts/actions-and-controllers#?standalone-actions) at `api/controllers/foo/index.js`, a `/foo` route will be exposed automatically on its behalf.

See the [blueprints subsection of the configuration reference](http://sailsjs.com/documentation/reference/sails.config/sails.config.blueprints.html) for blueprint configuration options, including how to enable / disable different categories of blueprint routes.

> Note:  There is a special exception for top-level standalone actions.  For example, if you have a standalone action at `api/controllers/index.js`, it will be bound to a `/` shadow route automatically.

<docmeta name="displayName" value="Blueprint routes">
