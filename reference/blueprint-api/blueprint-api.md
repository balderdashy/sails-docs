# Blueprint API

### Overview

Together, blueprint routes and blueprint actions constitute the **blueprint API**, the built-in logic that powers the [RESTful JSON API](http://en.wikipedia.org/wiki/Representational_state_transfer) you get every time you create a model and controller.

For example, if you create a `User.js` model and `UserController.js` controller file in your project, then with blueprints enabled you will be able to immediately visit `/user/create?name=joe` to create a user, and visit `/user` to see an array of your app's users.  All without writing a single line of code!

Blueprints are great for prototyping, but they are also a powerful tool in production due to their ability to be overridden, protected, extended or disabled entirely.

##### Blueprint Routes

When you run `sails lift` with blueprints enabled, the framework inspects your controllers, models, and configuration in order to [bind certain routes](./#!/documentation/concepts/Routes) automatically. These implicit blueprint routes (sometimes called "shadows") allow your app to respond to certain requests without you having to bind those routes manually in your `config/routes.js` file.  By default, the blueprint routes point to their corresponding blueprint *actions* (see "Blueprint Actions" below), any of which can be overridden with custom code.

There are three types of blueprint routes in Sails:

+ **RESTful routes**, where the path is always `/:modelIdentity` or `/:modelIdentity/:id`.  These routes use the HTTP "verb" to determine the action to take; for example a `POST` request to `/user` will create a new user, and a `DELETE` request to `/user/123` will delete the user whose primary key is 123.  In a production environment, RESTful routes should generally be protected by [policies](./#!/documentation/concepts/Policies) to avoid unauthorized access.
+ **Shortcut routes**, where the action to take is encoded in the path.  For example, the `/user/create?name=joe` shortcut creates a new user, while `/user/update/1?name=mike` updates user #1. These routes only respond to `GET` requests.  Shortcut routes are very handy for development, but generally should be disabled in a production environment.
+ **Action routes**, which automatically create routes for your custom controller actions.  For example, if you have a `FooController.js` file with a `bar` method, then a `/foo/bar` route will automatically be created for you as long as blueprint action routes are enabled.  Unlike RESTful and shortcut routes, action routes do *not* require that a controller has a corresponding model file.


See the [blueprints subsection of the configuration reference](./#!/documentation/reference/sails.config/sails.config.blueprints.html) for blueprint configuration options, including how to enable / disable different blueprint route types.


##### Blueprint Actions

Blueprint actions (not to be confused with blueprint action *routes*) are generic actions designed to work with any of your controllers that have a model of the same name (e.g. `ParrotController` would need a `Parrot` model).  Think of them as the default behavior for your application.  For instance, if you have a `User.js` model and an empty `UserController.js` controller, `find`, `create`, `update`, `destroy`, `populate`, `add` and `remove` actions exist implicitly, without you having to write them.

By default, the blueprint RESTful routes and shortcut routes are bound to their corresponding blueprint actions.  However, any blueprint action can be overridden for a particular controller by creating a custom action in that controller file (e.g. `ParrotController.find`).  Alternatively, you can override the blueprint action _everywhere in your app_ by creating your own [custom blueprint action](./#!documentation/guides/customBlueprints). (e.g. `api/blueprints/create.js`).

The current version of Sails ships with the following blueprint actions:

+ [find](./#!/documentation/reference/blueprint-api/Find.html)
+ [findOne](./#!/documentation/reference/blueprint-api/FindOne.html)
+ [create](./#!/documentation/reference/blueprint-api/Create.html)
+ [update](./#!/documentation/reference/blueprint-api/Update.html)
+ [destroy](./#!/documentation/reference/blueprint-api/Destroy.html)
+ [populate](./#!/documentation/reference/blueprint-api/Populate.html)
+ [add](./#!/documentation/reference/blueprint-api/Add.html)
+ [remove](./#!/documentation/reference/blueprint-api/Remove.html)

Consequently, the blueprint API methods covered in this section of the documentation correspond one-to-one with the blueprint actions above.

### Overriding blueprints

In Sails v0.10 it is possible to override the core blueprints where they are enabled for controllers.

Create a `api/blueprints` directory and add the required blueprint files (e.g. `find.js`, `create.js`, etc.). The code for the default actions in the Sails blueprints hook can be found in the `/node_modules/sails/lib/hooks/blueprints/actions` directory of your project.

Files can be mixed case (such as `findOne.js`) but the blueprints are case-sensitive.

### Custom blueprints

Adding custom blueprints is also supported, but they are not automatically bound to routes.

You can create a basic blueprint like this and save it as `/blueprints/foo.js`:

```js
module.exports = function fooBlueprint(req, res) {
  res.ok('Foo!');
}
```

To bind this to a route, edit `/config/routes.js` like this:

```js
  'GET /myRoute': {
    blueprint: 'foo',
    model: 'the-model-for-foo
  }
```

Note that blueprints assume that controllers are directly associated with a model. If you don't specify the model, you may get an error on lift like:

```
Ignoring attempt to bind route (/myRoute) to blueprint action (`foo`),
but no valid model was specified and we couldn't guess one based on the path.
```

References:
* https://stackoverflow.com/questions/22273789/crud-blueprint-overriding-in-sailsjs

### Disabling blueprints on a per-controller basis

You may also override any of the settings from `config/blueprints.js` on a per-controller basis by defining a '_config' key in your controller defintion, and assigning it a configuration object with overrides for the settings in this file.

```
module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  }
}

```

### Disabling blueprints on a per-route basis

Typically as a project evolves and you want to reduce the surface area of the API, you'll start specifying exactly the routes you wish to expose in `config/routes.js`. But you can disable blueprint routes using policies while prototyping.

For example, in `config/policies.js` you can use techniques like this:

```js
module.exports.policies = {
	// Default policy for all controllers and actions
	'*': ['authenticated'],

	// Custom controller
	LogController: {
		'*': false,
		'find': true,
		'findOne': true,
	}
};
```

The example above white-lists the `find` and `findOne` blueprints (the assumption here is that logs are read-only). This effectively _bans_ the usage of the blueprint actions that are not required.

### Notes

> + While the following documentation focuses on HTTP, the blueprint API (just like any of your custom actions and policies) is also compatible with WebSockets, thanks to the request interpreter.  Check out the reference section on the [browser SDK](/#/documentation/reference/websockets/sails.io.js) for example usage.
>

<docmeta name="uniqueID" value="blueprintapi170785">
<docmeta name="displayName" value="Blueprint API">
<docmeta name="stabilityIndex" value="2">
