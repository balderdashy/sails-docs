# Blueprint API

### Overview

For a conceptual overview of blueprints, see [Concepts > Blueprints](http://sailsjs.org/documentation/concepts/blueprints).

### Activating/deactivating blueprints in your app

The process for activating/deactivating blueprints varies slightly with the kind of blueprint route you are concerned with (RESTful routes, shortcut routes or action routes).  See the [Blueprint Routes documentation section](http://sailsjs.org/documentation/concepts/blueprints?blueprint-routes) for a discussion of the different blueprint types.

##### RESTful routes

RESTful routes are activated by default in new Sails apps, and can be turned off by setting [`sails.config.blueprints.rest`](http://sailsjs.org/documentation/reference/configuration/sails-config-blueprints) to `false` (typically in [`/config/blueprints.js`](http://sailsjs.org/documentation/anatomy/my-app/config/blueprints-js).

Sails will create RESTful routes whenever it loads a [controller](http://sailsjs.org/documentation/concepts/controllers) and [model](http://sailsjs.org/documentation/concepts/models-and-orm/models) file with the same identity.  For example, `api/controllers/PetController.js` and `api/models/Pet.js` would both have the identity `pet`.  If both of those files were added to a Sails app (manually or by running [`sails generate api pet`](http://sailsjs.org/documentation/reference/command-line-interface/sails-generate#?sails-generate-api-foo)), then Sails would automatically create RESTful routes accessible at the URL `/pet` whenever the app was loaded.

##### Shortcut routes

Shortcut routes are activated by default in new Sails apps, and can be turned off by setting [`sails.config.blueprints.shortcuts`](http://sailsjs.org/documentation/reference/configuration/sails-config-blueprints) to `false` (typically in [`/config/blueprints.js`](http://sailsjs.org/documentation/anatomy/my-app/config/blueprints-js).

Like RESTful routes (see above), Sails creates shortcut routes for any controller/model pair with the same identity.  Note that the same _action_ is executed for similar RESTful/shortcut routes.  For example, the `POST /user` and `GET /user/create` routes that Sails creates when it loads `api/controllers/UserController.js` and `api/models/User.js` will respond by running the same code (even if you [override the blueprint action](http://sailsjs.org/documentation/reference/blueprint-api#?overriding-blueprints))

##### Action routes

Actions routes are activated by default in new Sails apps, and can be turned off by setting [`sails.config.blueprints.actions`](http://sailsjs.org/documentation/reference/configuration/sails-config-blueprints) to `false` (typically in [`/config/blueprints.js`](http://sailsjs.org/documentation/anatomy/my-app/config/blueprints-js).

While action routes are activated, any function added as a property of a controller's `module.exports` object will be exposed as a route at the URL `<controller identity>/<property name>`.  For example, if `api/controllers/PetController.js` contains:

```javascript
module.exports {
  adore: function (req, res) {
    res.send("I adore pets!");
  }
}
```

then a route `/pet/adore` will automatically be created.  Note that action routes respond to _all_ HTTP verbs (GET, PUT, POST, etc.).  You can use `req.method` inside an action to determine which method was used.

##### Disabling blueprints on a per-controller basis

You may also override any of the settings from [`config/blueprints.js`](http://sailsjs.org/documentation/anatomy/my-app/config/blueprints-js) on a per-controller basis by defining a `_config` key in your controller definition:

```javascript
// In /api/controllers/PetController.js
module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  }
}
```


### Overriding blueprints

##### RESTful / shortcut routes and actions

To override a RESTful blueprint route for a single controller, simply create an action in that controller with the appropriate name: [_find_](http://sailsjs.org/documentation/reference/blueprint-api/find-where), [_findOne_](http://sailsjs.org/documentation/reference/blueprint-api/find-one), [_create_](http://sailsjs.org/documentation/reference/blueprint-api/create), [_update_](http://sailsjs.org/documentation/reference/blueprint-api/update), [_destroy_](http://sailsjs.org/documentation/reference/blueprint-api/destroy), [_populate_](http://sailsjs.org/documentation/reference/blueprint-api/populate), [_add_](http://sailsjs.org/documentation/reference/blueprint-api/add) or [_remove_](http://sailsjs.org/documentation/reference/blueprint-api/remove).

To override the default _action_ that _all_ controllers use, create an `api/blueprints` folder and add files to it with names matching the actions to override (e.g. `find.js`, `findone.js`, `create.js`, etc.). You can take a look at [the code for the default actions](https://github.com/balderdashy/sails/tree/master/lib/hooks/blueprints/actions) in the Sails blueprints hook for a head start.

> **Note:** All blueprint action files must be lowercase! (The default actions contains `findOne.js`, but in `/api/blueprints` it needs to be `findone.js`).

##### Action routes

In production apps, you may often wish to turn action routes off completely for security reasons (to keep from accidentally exposing a controller action).  However, if you do wish to keep action routes on, but simply want to turn off a particular method or path, you can do so easily in your [`/config/routes.js`](http://sailsjs.org/documentation/anatomy/my-app/config/routes-js) file using the [response target syntax](http://sailsjs.org/documentation/concepts/routes/custom-routes#?response-target-syntax), for example:

```
'POST /user': {response: 'notFound'}
```

### Custom blueprints

Along with the built-in RESTful actions provided by Sails, you can create your own custom blueprints to be shared by your controllers.  However, custom blueprints do not get bound to routes automatically. If you create a /blueprints/foo.js file, you can bind a route to it in your [`/config/routes.js`](http://sailsjs.org/documentation/anatomy/my-app/config/routes-js) file using the [blueprint target syntax](http://sailsjs.org/documentation/concepts/routes/custom-routes#?blueprint-target-syntax).  For example:

```
GET /myRoute: {blueprint: 'foo'}
```

### Blueprints and resourceful pubsub

##### Blueprints and `.subscribe()`

By default, the **Find** and **Find One** blueprint actions will call [`.subscribe()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/subscribe) automatically when a socket request is used. This subscribes the requesting socket to each of the returned records.  However, the **Update** and **Destroy** actions will *not* cause a message to be sent to the requesting socket by default--only to the *other* connected sockets.  This is intended to allow the caller of `io.socket.update()` (for example) to use the client-side SDK's callback to handle the server response separately.  To force the blueprint actions to send messages to all sockets, *including the requesting socket*, set `sails.config.blueprints.mirror` to `true`.


##### Blueprints and `.watch()`

By default, the **Find** blueprint action will call [`.watch()`](http://sailsjs.org/documentation/reference/web-sockets/resourceful-pub-sub/watch) on the model.  This behavior can be changed for all models by setting [`sails.config.blueprints.autoWatch`](http://sailsjs.org/documentation/reference/configuration/sails-config-blueprints) to `false`, or for a specific model by setting the `autoWatch` property to `false` in the model's definition (e.g. in `api/models/Foo.js`).


### Notes

> + While the following documentation focuses on HTTP, the blueprint API (just like any of your custom actions and policies) is also compatible with WebSockets, thanks to the virtual request interpreter.  Check out the reference section on the browser SDK ([Reference > WebSockets > sails.io.js](http://sailsjs.org/documentation/reference/websockets/sails.io.js)) for example usage.


<docmeta name="displayName" value="Blueprint API">
<docmeta name="stabilityIndex" value="2">
