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

Action files can use one of two formats: _function_ or _machine_.

##### Machine actions
This is the recommended way of creating an action file.  It utilizes the [node-machine specification](http://node-machine.org) to specify an actions expected _inputs_ (the request parameters) and its _exits_ (the possible responses).  By defining your action as a machine, it is essentially self-documenting and self-validating.  Here's a sample machine that looks up a user by ID, and either displays a "welcome" view or redirects to a signup page if the user can't be found:

```
module.exports = {

   friendlyName: 'Welcome user',

   description: 'Look up the specified user and welcome them, or redirect to a signup page if no user was found.',

   inputs: {
      userId: {
         description: 'The ID of the user to look up.',
         example: 123,
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

   fn: function (inputs, exits) {

      // Look up the user whose ID was specified in the request.
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

##### Function actions

You can also specify actions by declaring a function with `req` and `res` parameters.  Here's the same action as above, specified as a function:

```
module.exports = function welcomeUser (req, res) {

   // If no `userId` was specified, return an error.
   if (!req.param('userId')) {
      return res.serverError('No user ID specified!');
   }

   // Look up the user whose ID was specified in the request.
   User.findOne(inputs.userId).exec(function (err, user) {
      // Handle unknown errors.
      if (err) {return res.serverError(err);}
      // If no user was found, redirect to signup.
      if (!user) {return res.redirect('/signup');
      // Display the welcome view.
      return res.view('welcome', {name: user.name});
   });

}
```

At first, using a function may seem simpler and easier than declaring an action as a machine.  But using a machine provides several advantages:

 * The code you write is not directly dependent on `res` and `res`, making it easier to re-use or abstract into a [helper](http://sailsjs.com/documentation/concepts/helpers).
 * You guarantee that you&rsquo;ll be able to quickly determine the names and types of the request parameters the action expects, and you'll know that they will be automatically validated before the action is run.
 * You&rsquo;ll be able to see all of the possible outcomes from running the action without having to dissect the code.

In a nutshell, your code will be standardized in a way that makes it easier to re-use and modify later.



### What does a controller file look like?
A controller file defines a Javascript dictionary (aka "plain object") whose keys are action names, and whose values are the corresponding action methods.  Here&rsquo;s a simple example of a full controller file:

```javascript
module.exports = {
  hi: function (req, res) {
    return res.send('Hi there!');
  },
  bye: function (req, res) {
    return res.redirect('http://www.sayonara.com');
  }
};
```

This controller defines two actions: `hi` and `bye`.  The `hi` action responds to a request with a string message, while the `bye` action responds by redirecting to another web site.  The `req` and `res` objects will be familiar to anyone who has used [Express.js](https://github.com/expressjs) to write a web application.  This is by design, as Sails uses Express under the hood to handle routing.  Take special note, however, of the lack of a `next` argument for the actions.  Unlike Express  middleware methods, Sails controller actions should always be the last stop in the request chain--that is, they should always result in either a response or an error.  While it is technically possible to use `next` in an action method, you are strongly encouraged to use [policies](http://sailsjs.org/documentation/concepts/Policies) instead wherever possible.

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
