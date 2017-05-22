# Actions and controllers

### Overview

_Actions_ are the principal objects in your Sails application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server.  They often act as a middleman between your [models](http://sailsjs.com/documentation/concepts/ORM/Models.html) and [views](http://sailsjs.com/documentation/concepts/Views). For many applications, the actions will contain the bulk of your project&rsquo;s [business logic](http://en.wikipedia.org/wiki/Business_logic).

Actions are bound to [routes](http://sailsjs.com/documentation/concepts/Routes) in your application, so that when a client requests the route, the action is executed to perform some business logic and send a response.  For example, the `GET /hello` route in your application could be bound to an action like:

```javascript
function (req, res) {
  return res.send('Hi there!');
}
```

Any time a web browser is pointed to the `/hello` URL on your app's server, the page will display the message: &ldquo;Hi there!&rdquo;.

### Where are actions defined?
Actions are defined in the `api/controllers/` folder and subfolders (we&rsquo;ll talk more about _controllers_ in a bit). In order for a file to be recognized as an action, it must be _kebab-cased_ (containing only lowercase letters, numbers and dashes).  When referring to an action in Sails (for example, when [binding it to a route](http://sailsjs.com/documentation/concepts/routes/custom-routes#?action-target-syntax)), use its path relative to `api/controllers`, without any file extension.  For example, the `api/controllers/user/find.js` file represents an action with the identity `user/find`.

##### File extensions for actions

An action can have any file extension besides `.md` (Markdown) and `.txt` (text).  By default, Sails only knows how to interpret `.js` files, but you can customize your app to use things like [CoffeeScript](http://sailsjs.com/documentation/tutorials/using-coffee-script) or [TypeScript](http://sailsjs.com/documentation/tutorials/using-type-script) as well.

### What does an action file look like?

Action files can use one of two formats: _classic_ or _Actions2_.

##### Classic actions

The quickest way to get started creating a Sails action is to declare it as a function.  When a client requests a route that is bound to that action, the function will be called using the [request object](http://sailsjs.com/documentation/reference/request-req) as the first argument (typically named `req`), and the [response object](http://sailsjs.com/documentation/reference/response-res) as the second argument (typically named `res`).  Here's a sample action function that looks up a user by ID, and either displays a "welcome" view or redirects to a signup page if the user can't be found:

```javascript
module.exports = function welcomeUser (req, res) {

   // Get the `userId` parameter from the request.
   // This could have been set on the querystring, in
   // the request body, or as part of the URL used to
   // make the request.
   var userId = req.param('userId');

   // If no `userId` was specified, or it wasn't a number, return an error.
   if (!_.isNumeric(userId)) {
      return res.badRequest(new Error('No user ID specified!'));
   }

   // Look up the user whose ID was specified in the request.
   User.findOne(userId).exec(function (err, user) {
      // Handle unknown errors.
      if (err) {return res.serverError(err);}
      // If no user was found, redirect to signup.
      if (!user) {return res.redirect('/signup');
      // Display the welcome view, setting the view variable
      // named "name" to the value of the user's name.
      return res.view('welcome', {name: user.name});
   });

}
```

##### Actions2

Another, more structured way to create an action is by writing it as a _machine_, in much the same way that Sails [helpers](http://sailsjs.com/documentation/concepts/helpers) are created.  By defining your action as a machine, it is essentially self-documenting and self-validating.  Here's the same actions as above, rewritten using the machine format:

```javascript
module.exports = {

   friendlyName: 'Welcome user',

   description: 'Look up the specified user and welcome them, or redirect to a signup page if no user was found.',

   inputs: {
      userId: {
         description: 'The ID of the user to look up.',
         // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
         // if the `userId` parameter is not a number.
         type: 'number',
         // By making the `userId` parameter required, Sails will automatically respond with
         // `res.badRequest` if it's left out.
         required: true
      }
   },

   exits: {
      success: {
         responseType: 'view',
         viewTemplatePath: 'welcome'
      },
      notFound: {
         description: 'No user with the specified ID was found in the database.',
         responseType: 'redirect'
      }
   },

   fn: function (inputs, exits, env) {

      // Look up the user whose ID was specified in the request.
      // Note that we don't have to validate that `userId` is a number;
      // the machine runner does this for us and returns `badRequest`
      // if validation fails.
      User.findOne(inputs.userId).exec(function (err, user) {

         // Handle unknown errors.
         if (err) {return exits.error(err);}

         // If no user was found, redirect to signup.
         if (!user) {return exits.notFound('/signup');

         // Display the welcome view.
         return exits.success({name: user.name});
      });
   }
};
```

Sails uses the [machine-as-action](https://github.com/treelinehq/machine-as-action) module to automatically create route-handling functions out of machines like the example above.  See the [machine-as-action docs](https://github.com/treelinehq/machine-as-action#customizing-the-response) for more information.

> Note that machine-as-action provides actions with access to the [request object](http://sailsjs.com/documentation/reference/request-req) as `env.req`, and to the Sails application object (in case you don&rsquo;t have [globals](http://sailsjs.com/documentation/concepts/globals) turned on) as `env.sails`.

Using classic `req, res` functions for your actions is the quickest way to start out with a new app.  However, using Actions2 provides several advantages:

 * The code you write is not directly dependent on `req` and `res`, making it easier to re-use or abstract into a [helper](http://sailsjs.com/documentation/concepts/helpers).
 * You guarantee that you&rsquo;ll be able to quickly determine the names and types of the request parameters the action expects, and you'll know that they will be automatically validated before the action is run.
 * You&rsquo;ll be able to see all of the possible outcomes from running the action without having to dissect the code.

In a nutshell, your code will be standardized in a way that makes it easier to re-use and modify later.

### Controllers

The quickest way to get started writing Sails apps is to organize your actions into _controller files_.  A controller file is a [_PascalCased_](https://en.wikipedia.org/wiki/PascalCase) file whose name must end in `Controller`, containing a dictionary of actions.  For example, a  "User controller" could be created at `api/controllers/UserController.js` file containing:

```javascript
module.exports = {
   login: function (req, res) { ... },
   logout: function (req, res) { ... },
   signup: function (req, res) { ... },
};
```

You can use [`sails generate controller`](http://sailsjs.com/documentation/reference/command-line-interface/sails-generate#?sails-generate-controller-foo-action-1-action-2) to quickly create a controller file.

##### File extensions for controllers

A controller can have any file extension besides `.md` (Markdown) and `.txt` (text).  By default, Sails only knows how to interpret `.js` files, but you can customize your app to use things like [CoffeeScript](http://sailsjs.com/documentation/tutorials/using-coffee-script) or [TypeScript](http://sailsjs.com/documentation/tutorials/using-type-script) as well.


### Standalone actions

For larger, more mature apps, _standalone actions_ may be a better approach than controller files.  In this scheme, rather than having multiple actions living in a single file, each action is in its own file in an appropriate subfolder of `api/controllers`.  For example, the following file structure would be equivalent to the  `UserController.js` file:

```
api/
 controllers/
  user/
   login.js
   logout.js
   signup.js
```

where each of the three Javascript files exports a `req, res` function or an Actions2 definition.

Using standalone actions has several advantages over controller files:

* It's easier to keep track of the actions that your app contains, by simply looking at the files contained in a folder rather than scanning through the code in a controller file.
* Each action file is small and easy to maintain, whereas controller files tend to grow as your app grows.
* [Routing to standalone actions](http://sailsjs.com/documentation/concepts/routes/custom-routes#?action-target-syntax) in nested subfolders is more intuitive than with nested controller files (`foo/bar/baz.js` vs. `foo/BarController.baz`).

* Blueprint index routes apply to top-level standalone actions, so you can create an `api/controllers/index.js` file and have it automatically bound to your app&rsquo;s `/` route (as opposed to having to create an arbitrary controller file to hold the root action).


### Keeping it lean

In the tradition of most MVC frameworks, Sails recommends that your apps contain "thin" controllers -- that is, your action code should be as lean as possible, with any re-usable code moved into [helpers](http://sailsjs.com/documentation/concepts/helpers) or even extracted into node modules.  This makes your apps easier to maintain in the long term!

<docmeta name="displayName" value="Actions and controllers">
