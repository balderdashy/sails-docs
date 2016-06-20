# Blueprint Routes

When you run `sails lift` with blueprints enabled, the framework inspects your controllers, models, and configuration in order to [bind certain routes](http://sailsjs.org/documentation/concepts/Routes) automatically. These implicit blueprint routes (sometimes called "shadow routes", or even just "shadows") allow your app to respond to certain requests without you having to bind those routes manually in your `config/routes.js` file.  By default, the blueprint routes point to their corresponding blueprint *actions* (see "Blueprint Actions" below), any of which can be overridden with custom code.

There are three types of blueprint routes in Sails:

+ **RESTful routes**, where the path is always `/:modelIdentity` or `/:modelIdentity/:id`.  These routes use the HTTP "verb" to determine the action to take; for example a `POST` request to `/user` will create a new user, and a `DELETE` request to `/user/123` will delete the user whose primary key is 123.  In a production environment, RESTful routes should generally be protected by [policies](http://sailsjs.org/documentation/concepts/Policies) to avoid unauthorized access.
+ **Shortcut routes**, where the action to take is encoded in the path.  For example, the `/user/create?name=joe` shortcut creates a new user, while `/user/update/1?name=mike` updates user #1. These routes only respond to `GET` requests.  Shortcut routes are very handy for development, but generally should be disabled in a production environment.
+ **Action routes**, which automatically create routes for your custom controller actions.  For example, if you have a `FooController.js` file with a `bar` method, then a `/foo/bar` route will automatically be created for you as long as blueprint action routes are enabled.  Unlike RESTful and shortcut routes, action routes do *not* require that a controller has a corresponding model file.


See the [blueprints subsection of the configuration reference](http://sailsjs.org/documentation/reference/sails.config/sails.config.blueprints.html) for blueprint configuration options, including how to enable / disable different blueprint route types.

<docmeta name="displayName" value="Blueprint Routes">
