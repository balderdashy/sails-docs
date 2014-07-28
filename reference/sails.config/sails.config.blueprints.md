# sails.config.blueprints

By default, Sails controllers automatically bind routes for each of their functions. Additionally, each controller will automatically bind routes for a CRUD API controlling the model which matches its name, if one exists.

### Properties

| Property    | Type       | Default   | Details |
|-------------|:----------:|-----------|---------|
| `actions`| ((boolean))|true|Whether routes are automatically generated for every action in your controllers (also maps `index` to `/:controller`) '/:controller', '/:controller/index', and '/:controller/:action'
|`rest`|((boolean))|true|Automatic REST blueprints enabled? e.g. `'get /:controller/:id?'` `'post /:controller'` `'put /:controller/:id'` `'delete /:controller/:id'`
|`shortcuts`|((boolean))|true|These CRUD shortcuts exist for your convenience during development, but you'll want to disable them in production.: `'/:controller/find/:id?'`, `'/:controller/create'`, `'/:controller/update/:id'`, and `'/:controller/destroy/:id'`
| `prefix`      | ((string))| ''     | Optional mount path prefix for blueprints (the automatically bound routes in your controllers) e.g. '/api/v2'
|`pluralize`|((boolean))|false|Optionally use plural controller names in blueprint routes, e.g. `/users` for `api/controllers/UserController.js`.
|`populate`|((boolean))|true|Whether the blueprint controllers should populate model fetches with data from other models which are linked by associations.  If you have a lot of data in one-to-many associations, leaving this on may result in very heavy api calls.
|`defaultLimit`|((integer))|30|The default number of records to show in the response from a "find" action.  Doubles as the default size of populated arrays if `populate` is `true`.
|`autoWatch`|((boolean))|true|Whether to run [`Model.watch()`](http://beta.sailsjs.org/#/documentation/reference/websockets/resourceful-pubsub/watch.html) in the `find` and `findOne` blueprint actions.  Can be overridden on a per-model basis.
|`jsonp`|((boolean))|false|Optionally wrap blueprint JSON responses in a JSONP callback using `res.jsonp()` from Express 3.

<docmeta name="uniqueID" value="Blueprints187690">
<docmeta name="displayName" value="sails.config.blueprints">

