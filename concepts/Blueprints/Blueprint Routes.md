# Blueprint Routes

When you run `sails lift` with blueprints enabled, the framework inspects your controllers, models, and configuration in order to [bind certain routes](http://sailsjs.org/documentation/concepts/Routes) automatically. These implicit blueprint routes (sometimes called "shadow routes", or even just "shadows") allow your app to respond to certain requests without you having to bind those routes manually in your `config/routes.js` file.  By default, the blueprint routes point to their corresponding blueprint *actions* (see "Blueprint Actions" below), any of which can be overridden with custom code.

There are four types of blueprint routes in Sails:

#### **RESTful routes**
REST blueprints are the automatically generated routes Sails uses to expose a conventional REST API on top of a controller's `find`, `create`, `update`, and `destroy` actions. The path for RESTful routes is always `/:modelIdentity` or `/:modelIdentity/:id`.  These routes use the HTTP "verb" to determine the action to take. 

For example, a BoatController with `rest` enabled generates the following routes:

+ GET /boat -> BoatController.find         
+ GET /boat/:id -> BoatController.findOne  
+ POST /boat -> BoatController.create      
+ PUT /boat/:id -> BoatController.update   
+ DELETE /boat/:id -> BoatController.destroy

`rest` blueprint routes are enabled by default, and are suitable for use in a production scenario, as long as they are protected by [policies](http://sailsjs.org/documentation/concepts/Policies) to avoid unauthorized access.

#### **Shortcut routes**
Shortcut routes are simple helpers to provide access to a controller's CRUD methods from your browser's URL bar, where the action to take is encoded in the path.  When enabled, GET, POST, PUT, and DELETE routes will be generated for the controller's`find`, `create`, `update`, and `destroy` actions.  For example, the `/user/create?name=joe` shortcut creates a new user, while `/user/update/1?name=mike` updates user #1. These routes only respond to `GET` requests.  

Shortcut routes are enabled by default, and are very handy for development, but generally should be disabled in a production environment.

#### **Action routes**

Action routes automatically create routes for your custom controller actions, and speed up the backend development workflow by eliminating the need to manually bind routes. When enabled, GET, POST, PUT, and DELETE routes will be generated for every one of a controller's actions.

For example, if you have a `FooController.js` file with a `bar` method, then a `/foo/bar` route will automatically be created for you as long as blueprint action routes are enabled.  Unlike RESTful and shortcut routes, action routes do *not* require that a controller has a corresponding model file.

If an `index` action exists, additional naked routes will be created for it. Finally, all `actions` blueprints support an optional path parameter, `id`, for convenience.  

`actions` are enabled by default, and can be OK for production-- however, if you'd like to continue to use controller/action autorouting in a production deployment, you must take great care not to inadvertently expose unsafe/unintentional controller logic to GET requests.  
#### **Index routes**

Index routes automatically create &ldquo;root&rdquo; routes for specific actions named `index`.  For example, if you have a `FooController.js` file with an `index` action in it, a `/foo` route will automatically be bound to that action.  If you have a [standalone action](http://sailsjs.com/documentation/concepts/actions-and-controllers#?standalone-actions) at `api/controllers/index.js`, a `/` route will be bound to it.

See the [blueprints subsection of the configuration reference](http://sailsjs.org/documentation/reference/sails.config/sails.config.blueprints.html) for blueprint configuration options, including how to enable / disable different blueprint route types.

<docmeta name="displayName" value="Blueprint Routes">
