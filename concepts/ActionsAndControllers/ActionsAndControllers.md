# Actions and Controllers

### Overview

_Actions_ are the principal objects in your Sails application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server.  They often act as a middleman between your [models](http://sailsjs.org/documentation/concepts/ORM/Models.html) and [views](http://sailsjs.org/documentation/concepts/Views). For many applications, the actions will contain the bulk of your project&rsquo;s [business logic](http://en.wikipedia.org/wiki/Business_logic).

Actions are bound to [routes](http://sailsjs.org/documentation/concepts/Routes) in your application, so that when a client requests the route, the action is executed to perform some business logic and send a response.  For example, the `GET /hello` route in your application could be bound to an action like:

```javascript
function (req, res) {
  return res.send('Hi there!');
}
```

Any time a web browser is pointed to the `/hello` URL on your app's server, the page will display the message: &ldquo;Hi there&rdquo;.

### Where are actions defined?
Actions are defined in the `api/controllers/` folder and subfolders (we&rsquo;ll talk more about _controllers_ in a bit). In order for a file to be recognized as an action, it must be _kebab-cased_ (containing only lowercase letters, numbers and dashes).  When referring to an action in Sails (for example, when [binding it to a route](http://sailsjs.com/documentation/concepts/routes/custom-routes#?action-target-syntax)), use its path relative to `api/controllers`, without any file extension.  For example, the `api/controllers/user/find.js` file represents an action with the identity `user/find`.

### What does an action file look like?

Action files can use one of two formats: _classic_ or _Actions2_.

##### Classic actions

The quickest way to get started creating a Sails action is to declare it as a function.  When a client requests a route that is bound to that action, the function will be called using the [request object](http://sailsjs.com/documentation/reference/request-req) as the first argument (typically named `req`), and the [response object](http://sailsjs.com/documentation/reference/response-res) as the second argument (typically named `res`).  Here's a sample action function that looks up a user by ID, and either displays a "welcome" view or redirects to a signup page if the user can't be found:

```
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

```
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

At first, using a function may seem simpler and easier than declaring an action as a machine.  But using a machine provides several advantages:

 * The code you write is not directly dependent on `res` and `res`, making it easier to re-use or abstract into a [helper](http://sailsjs.com/documentation/concepts/helpers).
 * You guarantee that you&rsquo;ll be able to quickly determine the names and types of the request parameters the action expects, and you'll know that they will be automatically validated before the action is run.
 * You&rsquo;ll be able to see all of the possible outcomes from running the action without having to dissect the code.

In a nutshell, your code will be standardized in a way that makes it easier to re-use and modify later.

### Controllers

Actions that share a common purpose are often organized into _controllers_ to make apps easier to maintain.  In Sails, controllers are especially useful when using [policies](http://next.sailsjs.org/documentation/concepts/policies), as you can easily apply a single policy to all of the actions in a controller.

The recommended way to organize action is to simply group the action files into folders.  For example, if your app has the following files:

```
api/
 controllers/
  user/
   login.js
   logout.js
   signup.js
```

then you can consider the **api/controllers/user** folder the "User controller".

For compatibility with previous versions of Sails, you can also create traditional _controller files_.  A controller file is a [_PascalCased_](https://en.wikipedia.org/wiki/PascalCase) file whose name must end in `Controller`, containing a dictionary of actions (which can be declared as either functions or machines).  For example, you could get the same "User controller" shown above by creating a `api/controllers/UserController.js` file containing:

```
module.exports = {
   login: ...,
   logout: ...,
   signup: ...
};
```

where `login`, `logout` and `signup` are functions or machine definitions.

### Keeping it lean

In the tradition of most MVC frameworks, Sails recommends that your apps contain "thin" controllers -- that is, your action code should be as lean as possible, with any re-usable code moved into [helpers](http://sailsjs.com/documentation/concepts/helpers) or even extracted into node modules.  This makes your apps easier to maintain in the long term!

<docmeta name="displayName" value="Actions and Controllers">
