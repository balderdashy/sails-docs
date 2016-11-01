# sails.config.blueprints

These configurable settings allow you to configure the blueprint API in Sails.  Some settings (like `sails.config.blueprints.populate`) control the behavior of built-in blueprint actions, whereas others (like `sails.config.blueprints.shortcuts`) tweak the behavior of blueprint routing and/or determine whether Sails automatically binds certain kinds of blueprint routes at all.


### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `actions`| ((boolean))|`true`|Whether routes are automatically generated for every action in your controllers (also maps `index` to `/:controller`) '/:controller', '/:controller/index', and '/:controller/:action'
|`rest`|((boolean))|`true`|Automatic REST blueprints enabled? e.g. `'get /:controller/:id?'` `'post /:controller'` `'put /:controller/:id'` `'delete /:controller/:id'`
|`shortcuts`|((boolean))|`true`|These CRUD shortcuts exist for your convenience during development, but you'll want to disable them in production.: `'/:controller/find/:id?'`, `'/:controller/create'`, `'/:controller/update/:id'`, and `'/:controller/destroy/:id'`
| `prefix`      | ((string))| `''`     | Optional mount path prefix for blueprints (the automatically bound routes in your controllers) e.g. '/api/v2'
| `restPrefix`  | ((string))| `''`     | Optional mount path prefix for RESTful blueprints (the automatically bound RESTful routes for your controllers and models) e.g. '/api/v2'. Will be joined to your `prefix` config. e.g. `prefix: '/api'` and `restPrefix: '/rest'`, RESTful actions will be available under `/api/rest`
|`pluralize`|((boolean))|false|Optionally use plural controller names in blueprint routes, e.g. `/users` for `api/controllers/UserController.js`.
|`populate`|((boolean))|`true`|Whether the blueprint controllers should populate model fetches with data from other models which are linked by associations.  If you have a lot of data in one-to-many associations, leaving this on may result in very heavy api calls.
|`defaultLimit`|((integer))|`30`|The default number of records to show in the response from a "find" action.  Doubles as the default size of populated arrays if `populate` is `true`.
|`autoWatch`|((boolean))|`true`| Whether to subscribe the requesting socket in the `find` and `findOne` blueprint actions to notifications about newly _created_ records via the blueprint API.


<docmeta name="displayName" value="sails.config.blueprints">
<docmeta name="pageType" value="property">

