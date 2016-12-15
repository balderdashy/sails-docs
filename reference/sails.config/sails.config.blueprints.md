# sails.config.blueprints

These configurable settings allow you to configure the blueprint API in Sails.  Some settings (like `sails.config.blueprints.populate`) control the behavior of built-in blueprint actions, whereas others (like `sails.config.blueprints.shortcuts`) tweak the behavior of blueprint routing and/or determine whether Sails automatically binds certain kinds of blueprint routes at all.


### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `actions`| ((boolean))|`true`|Whether routes are automatically generated for every action in your app, e.g. having a `api/controllers/foo/bar.js` file or a `bar` function in `api/controllers/FooController.js` would result in a `/foo/bar` route.  When `true`, also generates `index` actions bound to the "root" URL for your app and each of its controllers, e.g. a `/foo` route for `api/controllers/foo/index.js`, or a `/` route for `api/controllers/index.js`
|`rest`|((boolean))|`true`|Automatic REST blueprints enabled? e.g. `'get /:model/:id?'` `'post /:model'` `'put /:model/:id'` `'delete /:model/:id'`
|`shortcuts`|((boolean))|`true`|These CRUD shortcuts exist for your convenience during development, but you'll want to disable them in production.: `'/:model/find/:id?'`, `'/:model/create'`, `'/:model/update/:id'`, and `'/:model/destroy/:id'`
| `prefix`      | ((string))| `''`     | Optional mount path prefix for all blueprint routes on a controller, including `rest`, `actions`, and `shortcuts`, e.g. '/api/v2'. This allows you to take advantage of blueprint routing, even if you need to namespace your API methods. (This only applies to blueprint autoroutes, not manual routes from `sails.config.routes`.) \
| `restPrefix`  | ((string))| `''`     | Optional mount path prefix for all REST blueprint routes on a controller, e.g. '/api/v2'. (Does not include `actions` and `shortcuts` routes.) This allows you to take advantage of REST blueprint routing, even if you need to namespace your RESTful API methods.  Will be joined to your `prefix` config, e.g. `prefix: '/api'` and `restPrefix: '/rest'` RESTful actions will be available under `/api/rest`.
|`pluralize`|((boolean))|false| Whether to use plural model names in blueprint routes, e.g. `/users` for the `User` model. (This only applies to blueprint autoroutes, not manual routes from `sails.config.routes`)
|`populate`|((boolean))|`true`| Whether the blueprint actions should populate model fetches with data from other models which are linked by associations.  If you have a lot of data in one-to-many associations, leaving this on may result in very heavy api calls.
|`autoWatch`|((boolean))|`true`| Whether to subscribe the requesting socket in the `find` and `findOne` blueprint action to notifications about newly _created_ records via the blueprint API.
|`defaultLimit`|((integer))|`30`|The default number of records to show in the response from a "find" action.  Doubles as the default size of populated arrays if `populate` is `true`.


<docmeta name="displayName" value="sails.config.blueprints">
<docmeta name="pageType" value="property">
