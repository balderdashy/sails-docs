# Policies
### Overview

Policies in Sails are versatile tools for authorization and access control-- they let you execute some logic _before_ an action is run, to determine whether or not to continue processing the request.  The most common use-case for policies is to restrict certain actions to _logged-in users only_.

> NOTE: policies apply **only** to controllers and actions, not to views.  If you define a route in your [routes.js config file](http://sailsjs.com/docs/reference/configuration/sails-config-routes) that points directly to a view, no policies will be applied to it.  To make sure policies are applied, you can instead define an action which displays your view, and point your route to that action. &nbsp;

### Protecting Actions and Controllers with Policies

Sails has a built in ACL (access control list) located in `config/policies.js`.  This file is used to map policies to your actions and controllers.

This file is  *declarative*, meaning it describes *what* the permissions for your app should look like, not *how* they should work.  This makes it easier for new developers to jump in and understand what's going on, plus it makes your app more flexible as your requirements inevitably change over time.

The `config/policies.js` file is a dictionary whose properties and values differ depending on whether you are applying policies to [controllers](http://sailsjs.com/documentation/concepts/actions-and-controllers#?controllers) or [standalone actions](http://sailsjs.com/documentation/concepts/actions-and-controllers#?standalone-actions).

##### Applying policies to a controller

To apply policies to a controller, use the controller name as the name of a property in the  `config/policies.js` dictionary, and set its value to a dictionary mapping actions in that controller to policies that should be applied to them.  Use `*` to represent &ldquo;all unmapped actions&rdquo;.  A policy's _name_ is the same as its filename, minus the file extension.

```js
{
  UserController: {
     '*': 'isLoggedIn', // By default, require requests to come from a logged-in user
                        // (runs the policy in api/policies/isLoggedIn.js)
     'delete': 'isAdmin', // Only allow admin users to delete other users
                          // (runs the policy in api/policies/isAdmin.js)
     'login': true // Allow anyone to access the login action, even if they're not logged in.
}
```

##### Applying policies to standalone actions

To apply policies to one or more standalone actions, use the action path (relative to `api/controllers`) as a property name in the `config/policies.js` dictionary, and set the value to the policy or policies that should apply to those actions.  By using a wildcard `*` at the end of the action path, you can apply policies to all actions that begin with that path.  Here's the same set of policies as above, rewritten to apply to standalone actions:

```js
{
  'user/*': 'isLoggedIn',
  'user/delete': 'isAdmin',
  'user/login': true
}
```

> Note that this example differs slightly from that of the controller-based policies, in that the `isLoggedIn` policy will apply to all actions in the `api/controllers/user` folder _and subfolders_ (except for `user/delete` and `user/login`, as is explained in the next section).

##### Policy ordering and precedence

It is important to note that policies do _not_ &ldquo;cascade&rdquo;.  In the examples above, the `isLoggedIn` policy will be applied to all actions in the `UserController.js` file (or standalone actions living under `api/controllers/user` ) _except for `delete` and `login`_.  If you wish to apply multiple policies to an action, list the policies in an array, for example:

```javascript
'getEncryptedData': ['isLoggedIn', 'isInValidRegion']
```

##### Using policies with blueprint actions

Sails' built-in [blueprint API](http://sailsjs.com/documentation/concepts/blueprints) is implemented using regular Sails actions.  The only difference is that blueprint actions are implicit.

To apply your policies to blueprint actions, set up your policy mappings just like we did in the example above, but pointed at the name of the relevant implicit [blueprint action](http://sailsjs.com/documentation/concepts/blueprints/blueprint-actions) in your controller (or as a standalone action).  For example:
```js
{
  UserController: {
    // Apply the 'isLoggedIn' policy to the 'update' action of 'UserController'
    update: 'isLoggedIn'
  }
}
```
or
```js
{
  'user/update': 'isLoggedIn'
}
```

##### Global policies

You can apply a policy to _all_ actions that are not otherwise explicitly mapped by using the `*` property.  For example:

```js
{
  '*': 'isLoggedIn',
  'user/login': true
}
```
This would apply the `isLoggedIn` policy to every action except the `login` action in `api/controllers/user/login.js` (or in `api/controllers/UserController.js`).

### Built-in policies
Sails provides two built-in policies that can be applied globally, or to a specific controller or action.
  + `true`: public access  (allows anyone to get to the mapped controller/action)
  +  `false`: **NO** access (allows **no-one** to access the mapped controller/action)

 `'*': true` is the default policy for all controllers and actions.  In production, it's good practice to set this to `false` to prevent access to any logic you might have inadvertently exposed.

In addition to `true` and `false`, all Sails apps generated with [`sails new`](http://sailsjs.com/documentation/reference/command-line-interface/sails-new) include the [`isLoggedIn` policy](http://sailsjs.com/documentation/anatomy/api/policies/is-logged-in-js) in `api/policies`.  This policy checks the session for a `userId` property, and if it doesn&rsquo;t find one, sends the default [`forbidden` response](http://sailsjs.com/documentation/concepts/custom-responses/default-responses#?resforbidden).  It can be used as an easy way to restrict actions to logged-in-users only, and modified to suit your needs (for example, to [redirect](http://sailsjs.com/documentation/reference/response-res/res-redirect) to `/login` instead of returning `res.forbidden()`).

### Writing Your First Policy

For many apps, the `isLoggedIn` policy that is added to new Sails apps will be all that is needed.  However, if you find the need to add your own policies, you can do so by saving them in the `api/policies` folder.  Each policy file should export a single function with `req`, `res` and `next` arguments.

When it comes down to it, policies are really just middleware functions which run **before** your actions.  You can chain as many of them together as you like-- in fact they're designed to be used this way.  Ideally, each middleware function should really check just *one thing*.

For example, the `isAdmin` policy mentioned above might look something like this:

```javascript
// policies/isAdmin.js
module.exports = function isAdmin (req, res, next) {

  // If there's no `userId` in the session, then the user is not logged in
  // (so we can't tell if they're an admin or not!)
  // In that case, don't allow access.
  if (!req.session.userId) {
    return res.forbidden();
  }

  // Attempt to look the user up in the database.
  User.findOne(req.session.userId).exec(function(err, user) {

    // Handle unknown errors
    if (err) { return res.serverError(err); }

    // If the user couldn't be found, forbid access.
    // (this handles the rare case of a logged-in user being deleted)
    if (!user) { return res.forbidden(); }

    // If the user isn't an admin, forbid access.
    if (!user.isAdmin) { return res.forbidden(); }

    // If we made it all the way down here, looks like everything's ok, so we'll let the user through.
    // (from here, the next policy or the action will run)
    return next();

  });

};
```






<docmeta name="displayName" value="Policies">
