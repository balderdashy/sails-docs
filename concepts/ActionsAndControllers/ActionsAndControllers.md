# Actions and controllers

### Overview

_Actions_ are the principal objects in your Sails application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server.  They often act as a middleman between your [models](https://sailsjs.com/documentation/concepts/models-and-orm) and [views](https://sailsjs.com/documentation/concepts/views). With rare exceptions, the actions will orchestrate the bulk of your project&rsquo;s [business logic](http://en.wikipedia.org/wiki/Business_logic).

Actions are bound to [routes](https://sailsjs.com/documentation/concepts/Routes) in your application, so that when a user agent requests a particular URL, the bound action is executed to perform some business logic and send a response.  For example, the `GET /hello` route in your application could be bound to an action like:

```javascript
async function (req, res) {
  return res.send('Hi there!');
}
```

Any time a web browser is pointed to the `/hello` URL on your app's server, the page will display the message: &ldquo;Hi there!&rdquo;.

### Where are actions defined?
Actions are defined in the `api/controllers/` folder and subfolders (we&rsquo;ll talk more about _controllers_ in a bit). In order for a file to be recognized as an action, it must be _kebab-cased_ (containing only lowercase letters, numbers and dashes).  When referring to an action in Sails (for example, when [binding it to a route](https://sailsjs.com/documentation/concepts/routes/custom-routes#?action-target-syntax)), use its path relative to `api/controllers`, without any file extension.  For example, the `api/controllers/user/find.js` file represents an action with the identity `user/find`.

##### File extensions for actions

An action can have any file extension besides `.md` (Markdown) and `.txt` (text).  By default, Sails only knows how to interpret `.js` files, but you can customize your app to use things like [CoffeeScript](https://sailsjs.com/documentation/tutorials/using-coffee-script) or [TypeScript](https://sailsjs.com/documentation/tutorials/using-type-script) as well.

### What does an action file look like?

Action files can use one of two formats: _classic_ or _actions2_.

##### Classic actions

The traditional way of getting started creating a Sails action is to declare it as a function.  When a client requests a route that is bound to that action, the function will be called using the [incoming request object](https://sailsjs.com/documentation/reference/request-req) as the first argument (typically named `req`), and the [outgoing response object](https://sailsjs.com/documentation/reference/response-res) as the second argument (typically named `res`).  Here's a sample action function that looks up a user by ID, and either displays a "welcome" view or redirects to a signup page if the user can't be found:

```javascript
module.exports = async function welcomeUser (req, res) {

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
  var user = await User.findOne({ id: userId });

  // If no user was found, redirect to signup.
  if (!user) { return res.redirect('/signup' );

  // Display the welcome view, setting the view variable
  // named "name" to the value of the user's name.
  return res.view('welcome', {name: user.name});

}
```

##### actions2

Another, more structured way to create an action is by writing it in the more modern ("actions2") syntax.  In much the same way that Sails [helpers](https://sailsjs.com/documentation/concepts/helpers) work, by defining your action with a declarative definition ("_machine_"), it is essentially self-documenting and self-validating.  Here's the same action as above, rewritten using the actions2 format:

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
        viewTemplatePath: 'pages/welcome'
      },
      notFound: {
        description: 'No user with the specified ID was found in the database.',
        responseType: 'notFound'
      }
   },

   fn: async function (inputs, exits) {

      // Look up the user whose ID was specified in the request.
      // Note that we don't have to validate that `userId` is a number;
      // the machine runner does this for us and returns `badRequest`
      // if validation fails.
      var user = await User.findOne({ id: inputs.userId });

      // If no user was found, respond "notFound" (like calling `res.notFound()`)
      if (!user) { return exits.notFound(); }

      // Display the welcome view.
      return exits.success({name: user.name});
   }
};
```

Sails uses the [machine-as-action](https://github.com/treelinehq/machine-as-action) module to automatically create route-handling functions out of machines like the example above.  See the [machine-as-action docs](https://github.com/treelinehq/machine-as-action#customizing-the-response) for more information.

> Note that machine-as-action provides actions with access to the [request object](https://sailsjs.com/documentation/reference/request-req) as `this.req`.

<!--
Removed in order to reduce the amount of information:  (Mike nov 14, 2017)

and to the Sails application object (in case you don&rsquo;t have [globals](https://sailsjs.com/documentation/concepts/globals) turned on) as `this.sails`.
-->

Using classic `req, res` functions for your actions is technically less typing.  However, using actions2 provides several advantages:

 * The code you write is not directly dependent on `req` and `res`, making it easier to re-use or abstract into a [helper](https://sailsjs.com/documentation/concepts/helpers).
 * You guarantee that you&rsquo;ll be able to quickly determine the names and types of the request parameters the action expects, and you'll know that they will be automatically validated before the action is run.
 * You&rsquo;ll be able to see all of the possible outcomes from running the action without having to dissect the code.

In a nutshell, your code will be standardized in a way that makes it easier to re-use and modify later.  And since you'll declare the action's parameters ahead of time, you'll be much less likely to expose edge cases and security holes.

###### Exit signals

In an action, helper, or script, throwing anything will trigger the `error` exit by default. If you want to trigger any other exit, you can do so by throwing a "special exit signal". This will either be a string (the name of the exit), or an object with the name of the exit as the key and the output data as the value.
For example, instead of the usual syntax:

```javascript
return exits.hasConflictingCourses();
```

You could use the shorthand:

```javascript
throw 'hasConflictingCourses';
```

Or, to include output data:

```javascript
throw { hasConflictingCourses: ['CS 301', 'M 402'] };
```

Aside from being an easy-to-read shorthand, exit signals are especially useful if you're inside of a `for` loop, `forEach`, etc., but still want to exit through a particular exit.

### Controllers

The quickest way to get started writing Sails apps is to organize your actions into _controller files_.  A controller file is a [_PascalCased_](https://en.wikipedia.org/wiki/PascalCase) file whose name must end in `Controller`, containing a dictionary of actions.  For example, a  "User controller" could be created at `api/controllers/UserController.js` file containing:

```javascript
module.exports = {
  login: function (req, res) { ... },
  logout: function (req, res) { ... },
  signup: function (req, res) { ... },
};
```

You can use [`sails generate controller`](https://sailsjs.com/documentation/reference/command-line-interface/sails-generate#?sails-generate-controller-foo-action-1-action-2) to quickly create a controller file.

##### File extensions for controllers

A controller can have any file extension besides `.md` (Markdown) and `.txt` (text).  By default, Sails only knows how to interpret `.js` files, but you can customize your app to use things like [CoffeeScript](https://sailsjs.com/documentation/tutorials/using-coffee-script) or [TypeScript](https://sailsjs.com/documentation/tutorials/using-type-script) as well.


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

where each of the three Javascript files exports a `req, res` function or an actions2 definition.

Using standalone actions has several advantages over controller files:

* It's easier to keep track of the actions that your app contains, by simply looking at the files contained in a folder rather than scanning through the code in a controller file.
* Each action file is small and easy to maintain, whereas controller files tend to grow as your app grows.
* [Routing to standalone actions](https://sailsjs.com/documentation/concepts/routes/custom-routes#?action-target-syntax) in nested subfolders is more intuitive than with nested controller files (`foo/bar/baz.js` vs. `foo/BarController.baz`).

* Blueprint index routes apply to top-level standalone actions, so you can create an `api/controllers/index.js` file and have it automatically bound to your app&rsquo;s `/` route (as opposed to having to create an arbitrary controller file to hold the root action).


### Keeping it lean

In the tradition of most MVC frameworks, mature Sails apps usually have "thin" controllers -- that is, your action code ends up lean, because reusable code has been moved into [helpers](https://sailsjs.com/documentation/concepts/helpers) or occasionally even extracted into separate node modules.  This approach can definitely make your app easier to maintain as it grows in complexity.

But at the same time, extrapolating code into reusable helpers _too early_ can cause maintainence issues that waste time and productivity.  So the right answer lies somewhere in the middle.

Sails recommends this general rule of thumb:  **Wait until you're about to use the same piece of code for the _third_ time before you extrapolate it into a separate helper.**  But as with any dogma, use your judgement!  If the code in question is very long or complex, then it might make sense to pull it out into a helper much sooner.  Conversely, if you know what you're building is a quick, throwaway prototype, you might just copy and paste the code to save time.

> Whether you're developing for passion or profit, at the end of the day, the goal is to make the best possible use of your time as an engineer.  Some days that means getting more code written, and other days it means looking out for the long-term maintainability of the project.  If you're not sure which of these goals is more important at your current stage of development, you might take a step back and give it some thought.  (Better yet, have a chat with the rest of your team or [other folks building apps on Node.js/Sails](https://sailsjs.com/support).)

<docmeta name="displayName" value="Actions and controllers">
<docmeta name="nextUpLink" value="/documentation/concepts/views">
<docmeta name="nextUpName" value="Views">
