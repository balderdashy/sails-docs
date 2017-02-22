# sails.config.blueprints

These configurable settings allow you to configure the blueprint API in Sails.  Some settings (like `sails.config.blueprints.populate`) control the behavior of built-in blueprint actions, whereas others (like `sails.config.blueprints.shortcuts`) tweak the behavior of blueprint routing and/or determine whether Sails automatically binds certain kinds of blueprint routes at all.


### Properties

| Property    | Type       | Default   | Details |
|:------------|:----------:|:----------|:--------|
| `actions`| ((boolean))|`true`| Whether implicit blueprint ("shadow") routes are automatically generated for every action in your app. e.g. having an `api/controllers/foo/bar.js` file or a `bar` function in `api/controllers/FooController.js` would automatically route incoming requests to `/foo/bar` to that action, as long as it is not overridden by a [custom route]( [custom routes](http://sailsjs.com/documentation/concepts/routes/custom-routes)).  When enabled, this setting _also_ binds additional, special implicit ("shadow") routes to any actions named `index`; for the relative "root" URL for your app and each of its controllers.  For example, a `/foo` shadow route for `api/controllers/foo/index.js`, or a `/` shadow route for `api/controllers/index.js`
|`rest`|((boolean))|`true`|Automatic REST blueprints enabled? e.g. `'get /:model/:id?'` `'post /:model'` `'put /:model/:id'` `'delete /:model/:id'`
|`shortcuts`|((boolean))|`true`|These CRUD shortcuts exist for your convenience during development, but you'll want to disable them in production.: `'/:model/find/:id?'`, `'/:model/create'`, `'/:model/update/:id'`, and `'/:model/destroy/:id'`
| `prefix`      | ((string))| `''`     | Optional mount path prefix (e.g. '/api/v2') for all [blueprint routes](http://sailsjs.com/documentation/concepts/blueprints/blueprint-routes), including `rest`, `actions`, and `shortcuts`.  This only applies to implicit blueprint ("shadow") routes, not your [custom routes](http://sailsjs.com/documentation/concepts/routes/custom-routes).)
| `restPrefix`  | ((string))| `''`     | Optional mount path prefix for all REST blueprint routes on a controller, e.g. '/api/v2'. (Does not include `actions` and `shortcuts` routes.) This allows you to take advantage of REST blueprint routing, even if you need to namespace your RESTful API methods.  Will be joined to your `prefix` config, e.g. `prefix: '/api'` and `restPrefix: '/rest'` RESTful actions will be available under `/api/rest`.
|`pluralize`|((boolean))|false| Whether to use plural model names in blueprint routes, e.g. `/users` for the `User` model. (This only applies to blueprint autoroutes, not manual routes from `sails.config.routes`)
|`autoWatch`|((boolean))|`true`| Whether to subscribe the requesting socket in the `find` and `findOne` blueprint action to notifications about newly _created_ records via the blueprint API.
|`defaultLimit`|((integer))|`30`|The default number of records to show in the response from a "find" action.  Doubles as the default size of populated arrays if `populate` is `true`.
|`parseBlueprintOptions`|((function))|(See below)|Provide this function in order to override the default behavior for blueprint actions (including search criteria, skip, limit, sort and population).

##### Using `parseBlueprintOptions`

Each blueprint action includes, at its core, a Waterline model method call.  For instance, the `find` blueprint, when run for the `User` model, runs `User.find()` in order to retrieve some user records.  The options that are passed to these Waterline methods are determined by a call to `parseBlueprintOptions()`.  The default version of this method (available via `sails.hooks.blueprints.parseBlueprintOptions()`) determines the default behaviors for blueprints.  You can override `parseBlueprintOptions` in your [blueprints config](http://sailsjs.com/documentation/reference/configuration/sails-config-blueprints) (in [`config/blueprints.js`](http://sailsjs.com/documentation/anatomy/config/blueprints.js)) to customize the behavior for _all_ blueprint actions, or on a [per-route basis](http://sailsjs.com/documentation/concepts/routes/custom-routes#?route-target-options) to customize the behavior for a single route.

The `parseBlueprintOptions()` method takes a single argument (the [request object](http://sailsjs.com/documentation/reference/request-req)) and is expected to return a Waterline query options dictionary.  A full example of a such a dictionary is as follows (keep in mind that not all keys apply to all blueprint actions):

```js
{
  // The model identity, REQUIRED.
  using: 'user',

  // Search criteria, used by `find`, `findOne`, `destroy`, `populate` and `update`.
  // Note that for all except `find`, the `where` clause must include only the model's primary key.
  criteria: {
    where: {
      age: 25
    },
    // Skip, limit and sort will be ignored by all blueprints except `find`.
    skip: 5,
    limit: 10,
    sort: [{score: 'desc'}]
  },

  // Dictionary of associations to populate.  Each key should be an attribute name,
  // with the value set to a criteria object like the one above.
  populates: {
    pets: {
      where: {
        breed: 'cat'
      },
      sort: [{name: 'asc'}],
      limit: 5
    }
  },

  // Values for a new record, valid only for the `create` blueprint.
  newRecord: {
    name: 'bob',
    age: 30,
    score: 10,
    pets: [3, 65]
  },

  // Values for an updated record, valid only for the `update` blueprint.
  valuesToSet: {
    name: 'joe',
    age: 12,
  },

  // Name of a plural association attribute to modify.
  // Valid for `add`, `remove`, `replace` and `populate`.
  alias: 'pets',

  // The primary key of the record containing a plural association to modify.
  // Valid for `add`, `remove`, and `replace`.
  targetRecordId: 123,

  // The primary keys of associated records, for use in `add`, `remove` and `replace`.
  // For `add` and `remove` this array must contain only one value.
  associatedIds: [34, 12]

}
```

Adding your own `parseBlueprintOptions()` is an advanced concept, and it is recommended that you first familiarize yourself with the [default method code](https://github.com/balderdashy/sails/blob/master/lib/hooks/blueprints/parse-blueprint-options.js) and use it as a starting point.  For small modifications to blueprint behavior, it is best to first call the default method inside your override and then make changes to the returned query options:

```js
parseBlueprintOptions: function(req) {

  // Get the default query options.
  var queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);

  // If the query is set to populate `pets`, limit the number of pets to 1.
  if (queryOptions.populates.pets) {
    queryOptions.populates.pets.limit = 1;
  }

  return queryOptions;

}
```

<docmeta name="displayName" value="sails.config.blueprints">
<docmeta name="pageType" value="property">
