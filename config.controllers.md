##Controllers

By default, Sails controllers automatically bind routes for each of their functions. Additionally, each controller will automatically bind routes for a CRUD API controlling the model which matches its name, if one exists.

NOTE
>These settings are for the global configuration of controllers.
>You may also override these settings on a per-controller basis by modifying the 'blueprints' object in your controllers

###blueprints
####*prefix*
Optional mount path prefix for blueprints (the automatically bound routes in your controllers) e.g. '/api/v2'
####*actions*
Whether routes are automatically generated for every action in your controllers (also maps `index` to `/:controller`) '/:controller', '/:controller/index', and '/:controller/:action'
####*shortcuts*
These CRUD shortcuts exist for your convenience during development, but you'll want to disable them in production.: `'/:controller/find/:id?'`, `'/:controller/create'`, `'/:controller/update/:id'`, and `'/:controller/destroy/:id'`
####*rest*
Automatic REST blueprints enabled? e.g. `'get /:controller/:id?'` `'post /:controller'` `'put /:controller/:id'` `'delete /:controller/:id'`
####*expectIntegerId*
If a blueprint route catches a request, only match :id param if it's an integer.  e.g. only trigger route handler if requests look like: `get /user/8` instead of: `get /user/a8j4g9jsd9ga4ghjasdha`
