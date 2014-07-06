# Blueprints
### What is this?
By default, Sails controllers automatically bind routes for each of their functions. Additionally, each controller will automatically bind routes for a CRUD API controlling the model which matches its name, if one exists.

### Description

By default, Sails controllers automatically bind routes for each of their functions. Additionally, each controller will automatically bind routes for a CRUD API controlling the model which matches its name, if one exists.

##### `prefix` (string)
Optional mount path prefix for blueprints (the automatically bound routes in your controllers) e.g. '/api/v2'

##### `actions` (boolean)
Whether routes are automatically generated for every action in your controllers (also maps `index` to `/:controller`) '/:controller', '/:controller/index', and '/:controller/:action'

##### `shortcuts` (boolean)
These CRUD shortcuts exist for your convenience during development, but you'll want to disable them in production.: `'/:controller/find/:id?'`, `'/:controller/create'`, `'/:controller/update/:id'`, and `'/:controller/destroy/:id'`

##### `rest` (boolean)
Automatic REST blueprints enabled? e.g. `'get /:controller/:id?'` `'post /:controller'` `'put /:controller/:id'` `'delete /:controller/:id'`

<!--
##### `expectIntegerId` (boolean)
If a blueprint route catches a request, only match :id param if it's an integer.  e.g. only trigger route handler if requests look like: `get /user/8` instead of: `get /user/a8j4g9jsd9ga4ghjasdha`.  You&rsquo;ll usually want to change this to `false` when using a database that uses strings for unique IDs, such as Mongo.
-->

##### `jsonp` (boolean)
Optionally wrap blueprint JSON responses in a JSONP callback using `res.jsonp()` from Express 3. (default: `false`)

##### `pluralize` (boolean)
Optionally use plural controller names in blueprint routes, e.g. `/users` for `api/controllers/UserController.js`. (default: `false`)



<docmeta name="uniqueID" value="Blueprints187690">
<docmeta name="displayName" value="Blueprints">

