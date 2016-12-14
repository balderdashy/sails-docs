# Blueprint Actions

Blueprint actions (not to be confused with blueprint action *routes*) are generic actions designed to work with your models.  Think of them as the default behavior for your application.  For instance, if you have a `User.js` model then `find`, `create`, `update`, `destroy`, `populate`, `add` and `remove` actions exist implicitly, without you having to write them.

By default, the blueprint RESTful routes and shortcut routes are bound to their corresponding blueprint actions.  However, any blueprint action can be overridden for a particular controller by creating a custom action in that controller file (e.g. `ParrotController.find`).

The current version of Sails ships with the following blueprint actions:

+ [find](http://sailsjs.org/documentation/reference/blueprint-api/Find)
+ [findOne](http://sailsjs.org/documentation/reference/blueprint-api/FindOne)
+ [create](http://sailsjs.org/documentation/reference/blueprint-api/create)
+ [update](http://sailsjs.org/documentation/reference/blueprint-api/Update)
+ [destroy](http://sailsjs.org/documentation/reference/blueprint-api/Destroy)
+ [populate](http://sailsjs.org/documentation/reference/blueprint-api/Populate)
+ [add](http://sailsjs.org/documentation/reference/blueprint-api/Add)
+ [remove](http://sailsjs.org/documentation/reference/blueprint-api/Remove)

For more information about blueprints, including how to disable and override them, see the [Blueprint API reference](http://sailsjs.org/documentation/reference/blueprint-api)

<docmeta name="displayName" value="Blueprint Actions">
