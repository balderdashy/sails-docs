# Blueprint API

### Overview

Together, blueprint routes and blueprint actions constitute the **blueprint API**, 
the built-in logic that powers the 
[RESTful JSON API](http://en.wikipedia.org/wiki/Representational_state_transfer) 
you get every time you create a model and controller.

For example, if you create a `User.js` model and `UserController.js` controller 
file in your project, then with blueprints enabled you will be able to 
immediately visit `/user/create?name=joe` to create a user, and visit `/user` to 
see an array of your app's users. All without writing a single line of code! More
simply, with blueprint enabled, you have all of the `GET`, `POST`, `PUT` and 
`DELETE` API ready for you to use as soon as you create the model and controller 
with the same name.

Blueprints are great for prototyping, but they are also a powerful tool in 
production due to their ability to be overridden, protected, extended or disabled 
entirely.

For the sake of example and explanation in rest of the sections of this document 
let `User` be the model and the controller, defined respectively in 
`/api/models/User.js` and `/api/controllers/UserController.js` files.


### Blueprint Routes

When you run `sails lift` with blueprints enabled, the framework inspects your 
controllers, models, and configuration in order to 
[bind certain routes](./#!/documentation/concepts/Routes) automatically. These 
implicit blueprint routes (sometimes called "shadows") allow your app to respond 
to certain requests without you having to bind those routes manually in your 
`config/routes.js` file. By default, the blueprint routes point to their 
corresponding blueprint *actions* (see "Blueprint Actions" below), any of which 
can be overridden with custom code.

There are three types of blueprint routes in Sails:

+ **RESTful routes**, where the path is always `/:model/:id?`. When the `User` 
  model and controller is defined, blueprint binds RESTful routes implicitly in 
  following way -
  ```
  'GET /user/:id?': {
    controller: 'User',
    action: 'find'
  },
  'POST /user': {
    controller: 'User',
    action: 'create'
  },
  'PUT /user/:id?': {
    controller: 'User',
    action: 'update'
  },
  'DELETE /user/:id?': {
    controller: 'User',
    action: 'destroy'
  }
  ```
  These routes use the HTTP verb to determine the action to take even if the 
  route is same. So, a `POST` request to `/user` will create a new user, a
  `PUT` request to `/user/123` will update the user with primary key 123 and 
  a `DELETE` request to `/user/123` will delete the user whose primary key is 123. 
  In a production environment, RESTful routes should generally be protected by 
  [policies](./#!/documentation/concepts/Policies) to avoid unauthorized access.


+ **Shortcut routes**, where the action to take is encoded in the path. For our 
  User model and controller Sails binds following four shortcut routes implicitly.
  ```
  'GET /user/find/:id?': {
    controller: 'User',
    action: 'find'
  },
  'GET /user/create/:id?': {
    controller: 'User',
    action: 'create'
  },
  'GET /user/update/:id?': {
    controller: 'User',
    action: 'update'
  },
  'GET /user/destroy/:id?': {
    controller: 'User',
    action: 'destroy'
  }
  ```
  As example, the `/user/create?name=joe` shortcut creates a new user, while 
  `/user/update/1?name=mike` updates the name field of user #1. Note that these 
  routes only respond to `GET` requests. Shortcut routes are very handy for 
  development, but generally should be disabled in a production environment.

+ **Action routes**, which automatically create routes for your custom controller 
actions. For example, let `query` be a custom action defined in User controller.
Then following routes would be implicitly available to sails -
  ```
  'GET /user/query/:id?': {
    controller: 'User',
    action: 'query'
  },
  'POST /user/query/:id?': {
    controller: 'User',
    action: 'query'
  },
  'PUT /user/query/:id?': {
    controller: 'User',
    action: 'query'
  },
  'DELETE /user/query/:id?': {
    controller: 'User',
    action: 'query'
  }
  ```
  If request is made in `/user/query/:id?` route then independent on the HTTP 
  verb the action would be same. Unlike RESTful and shortcut routes, action 
  routes do *not* require that a controller has a corresponding model file. Which
  means, if you define a controller in `/api/controllers/FooController.js` file 
  but no model in `/api/models/Foo.js` file, there would be no RESTful or 
  shortcut route with `/foo` but there will still be action routes available to 
  use.

See the [blueprints subsection of the configuration reference](./#!/documentation/reference/sails.config/sails.config.blueprints.html) for blueprint configuration options, including how 
to enable / disable different blueprint route types.


##### Blueprint Actions

Blueprint actions (not to be confused with blueprint action *routes*) are 
generic actions designed to work with any of your controllers that have a model 
of the same name (e.g. `ParrotController` would need a `Parrot` model).  Think of 
them as the default behavior for your application. For instance, if you have a 
`User.js` model and an empty `UserController.js` controller, `find`, `create`, 
`update`, `destroy`, `populate`, `add` and `remove` actions exist implicitly, 
without you having to write them.

By default, the blueprint RESTful routes and shortcut routes are bound to their 
corresponding blueprint actions.  However, any blueprint action can be overridden 
for a particular controller by creating a custom action in that controller file 
(e.g. `ParrotController.find`).  Alternatively, you can override the blueprint 
action _everywhere in your app_ by creating your own 
[custom blueprint action](./#!documentation/guides/customBlueprints). 
(e.g. `api/blueprints/create.js`).

The current version of Sails ships with the following blueprint actions:

+ [find](./#!/documentation/reference/blueprint-api/Find.html)
+ [findOne](./#!/documentation/reference/blueprint-api/FindOne.html)
+ [create](./#!/documentation/reference/blueprint-api/Create.html)
+ [update](./#!/documentation/reference/blueprint-api/Update.html)
+ [destroy](./#!/documentation/reference/blueprint-api/Destroy.html)
+ [populate](./#!/documentation/reference/blueprint-api/Populate.html)
+ [add](./#!/documentation/reference/blueprint-api/Add.html)
+ [remove](./#!/documentation/reference/blueprint-api/Remove.html)

Consequently, the blueprint API methods covered in this section of the 
documentation correspond one-to-one with the blueprint actions above.

### Overriding Blueprints

( taken from https://stackoverflow.com/questions/22273789/crud-blueprint-overriding-in-sailsjs )

To override blueprints in Sails v0.10, you create an api/blueprints folder and 
add your blueprint files (e.g. find.js, create.js, etc.) within. You can take a 
look at the code for the default actions in the Sails blueprints hook for a head 
start.

**Note:** Currently all files must be lowercase! (The default actions contains 
findOne.js, but in /api/blueprints it needs to be findone.js)

Adding custom blueprints is also supported, but they currently do not get bound 
to routes automatically. If you create a /blueprints/foo.js file, you can bind a 
route to it in your /config/routes.js file with (for example):

    GET /myRoute': {blueprint: 'foo'}


### Disabling blueprints on a per-controller basis

You may also override any of the settings from `config/blueprints.js` on a 
per-controller basis by defining a '_config' key in your controller defintion, 
and assigning it a configuration object with overrides for the settings in this 
file.

```
module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  }
}

```

### Notes

> + While the following documentation focuses on HTTP, the blueprint API (just 
> like any of your custom actions and policies) is also compatible with 
> WebSockets, thanks to the request interpreter.  Check out the reference section 
> on the [browser SDK](/#/documentation/reference/websockets/sails.io.js) for 
> example usage.
>

<docmeta name="uniqueID" value="blueprintapi170785">
<docmeta name="displayName" value="Blueprint API">
<docmeta name="stabilityIndex" value="2">
