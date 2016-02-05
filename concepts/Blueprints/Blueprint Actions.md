# Blueprint Actions

Blueprint actions (not to be confused with blueprint action *routes*) are generic actions designed to work with any of your controllers that have a model of the same name (e.g. `ParrotController` would need a `Parrot` model).  Think of them as the default behavior for your application.  For instance, if you have a `User.js` model and an empty `UserController.js` controller, `find`, `create`, `update`, `destroy`, `populate`, `add` and `remove` actions exist implicitly, without you having to write them.

By default, the blueprint RESTful routes and shortcut routes are bound to their corresponding blueprint actions.  However, any blueprint action can be overridden for a particular controller by creating a custom action in that controller file (e.g. `ParrotController.find`).  Alternatively, you can override the blueprint action _everywhere in your app_ by creating your own custom blueprint action. (e.g. `api/blueprints/create.js`).

The current version of Sails ships with the following blueprint actions:

+ [find](http://sailsjs.org/documentation/reference/blueprint-api/Find.html)
+ [findOne](http://sailsjs.org/documentation/reference/blueprint-api/FindOne.html)
+ [create](http://sailsjs.org/documentation/reference/blueprint-api/Create.html)
+ [update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html)
+ [destroy](http://sailsjs.org/documentation/reference/blueprint-api/Destroy.html)
+ [populate](http://sailsjs.org/documentation/reference/blueprint-api/Populate.html)
+ [add](http://sailsjs.org/documentation/reference/blueprint-api/Add.html)
+ [remove](http://sailsjs.org/documentation/reference/blueprint-api/Remove.html)

For more information about blueprints, including how to disable and override them, see the [Blueprint API reference](http://sailsjs.org/documentation/reference/blueprint-api)

<docmeta name="displayName" value="Blueprint Actions">
