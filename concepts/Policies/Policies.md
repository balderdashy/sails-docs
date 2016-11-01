# Policies
### Overview

Policies in Sails are versatile tools for authorization and access control-- they let you allow or deny access to your controllers down to a fine level of granularity.  For example, if you were building Dropbox, before letting a user upload a file to a folder, you might check that she `isAuthenticated`, then ensure that she `canWrite` (has write permissions on the folder.)  Finally, you'd want to check that the folder she's uploading into `hasEnoughSpace`.

Policies can be used for anything: HTTP BasicAuth, 3rd party single-sign-on, OAuth 2.0, or your own custom authorization/authentication scheme.

> NOTE: policies apply **only** to controller actions, not to views.  If you define a route in your [routes.js config file](http://sailsjs.com/docs/reference/configuration/sails-config-routes) that points directly to a view, no policies will be applied to it.  To make sure policies are applied, you can instead define a controller action which displays your view, and point your route to that action. &nbsp;


### Writing Your First Policy

Policies are files defined in the `api/policies` folder in your Sails app.  Each policy file should contain a single function.

When it comes down to it, policies are really just Connect/Express middleware functions which run **before** your controllers.  You can chain as many of them together as you like-- in fact they're designed to be used this way.  Ideally, each middleware function should really check just *one thing*.

For example, the `canWrite` policy mentioned above might look something like this:

```javascript
// policies/canWrite.js
module.exports = function canWrite (req, res, next) {
  var targetFolderId = req.param('id');

  // If the requesting user is not logged in, then they are _never_ allowed to write.
  // No reason to continue-- we can go ahead and bail out now.
  if (!req.session.me) {
    return res.redirect('/login');
  }

  // Check the database to see if a permission record exists which matches both the
  // target folder id, the appropriate "type", and the id of the logged-in user.
  Permission.findOne({
    folder: targetFolderId,
    user: req.session.me,
    type: 'write'
  })
  .exec(function (err, permission) {

    // Unexpected error occurred-- use the app's default error (500) handler.
    //
    // > We do this because this should never happen, and if it does, it means there
    // > is probably something wrong with our database, and we want to know about it!)
    if (err) { return res.serverError(err); }

    // No "write" permission record exists linking this user to this folder.
    // Maybe they got removed from it?  Or maybe they never had permission in the first place...
    if (!permission) {
      return res.redirect('/login');
    }

    // If we made it all the way down here, looks like everything's ok, so we'll let the user through.
    // (from here, the next policy or the controller action will run)
    return next();

  });
};
```


### Protecting Controllers with Policies

Sails has a built in ACL (access control list) located in `config/policies.js`.  This file is used to map policies to your controllers.

This file is  *declarative*, meaning it describes *what* the permissions for your app should look like, not *how* they should work.  This makes it easier for new developers to jump in and understand what's going on, plus it makes your app more flexible as your requirements inevitably change over time.

Your `config/policies.js` file should export a Javascript object whose keys are controller names (or `'*'` for  global policies), and whose values are objects mapping action names to one or more policies.  See below for more details and examples.

##### To apply a policy to a specific controller action:

```js
{
  ProfileController: {
      // Apply the 'isLoggedIn' policy to the 'edit' action of 'ProfileController'
      edit: 'isLoggedIn'
      // Apply the 'isAdmin' AND 'isLoggedIn' policies, in that order, to the 'create' action
      create: ['isAdmin', 'isLoggedIn']
  }
}
```

##### To apply a policy to an entire controller:

```js
{
  ProfileController: {
    // Apply 'isLoggedIn' by default to all actions that are NOT specified below
    '*': 'isLoggedIn',
    // If an action is explicitly listed, its policy list will override the default list.
    // So, we have to list 'isLoggedIn' again for the 'edit' action if we want it to be applied.
    edit: ['isAdmin', 'isLoggedIn']
  }
}
```

> **Note:** Default policy mappings do not "cascade" or "trickle down."  Specified mappings for the controller's actions will override the default mapping.

##### To apply a policy to all actions that are not explicitly mapped:

```js
{
  // Apply 'isLoggedIn' to all actions by default
  '*': 'isLoggedIn',
  ProfileController: {
      // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
      'foo': 'isAdmin'
  }
}
```

> Remember, default policies will not be applied to any controller / action that is given an explicit mapping.


##### Using policies with blueprint actions

Sails' built-in [blueprint API](http://sailsjs.org/documentation/concepts/blueprints) is implemented using regular Sails controller actions.  The only difference is that blueprint actions are implicit.

To apply your policies to blueprint actions, set up your policy mappings just like we did in the example above, but pointed at name of the relevant implicit [blueprint action](http://sailsjs.org/documentation/concepts/blueprints/blueprint-actions) in your controller.  For example:
```js
{
  UserController: {
    // Apply the 'isLoggedIn' policy to the 'update' action of 'UserController'
    update: 'isLoggedIn'
  }
}
```


### Built-in policies
Sails provides two built-in policies that can be applied globally, or to a specific controller or action.
  + `true`: public access  (allows anyone to get to the mapped controller/action)
  +  `false`: **NO** access (allows **no-one** to access the mapped controller/action)

 `'*': true` is the default policy for all controllers and actions.  In production, it's good practice to set this to `false` to prevent access to any logic you might have inadvertently exposed.

##### Adding some policies to a controller:
```javascript
  // in config/policies.js

  // ...
  RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    nurture : 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    feed : ['isNiceToAnimals', 'hasRabbitFood']
  }
  // ...
```

Here&rsquo;s what the `isNiceToAnimals` policy from above might look like (this file would be located at `policies/isNiceToAnimals.js`):

```javascript
module.exports = function isNiceToAnimals (req, res, next) {

  // `req.session` contains a set of data specific to the user making this request.
  // It's kind of like our app's "memory" of the current user.

  // If our user has a history of animal cruelty, not only will we
  // prevent her from going even one step further (`return`),
  // we'll go ahead and redirect her to PETA (`res.redirect`).
  if ( req.session.user.hasHistoryOfAnimalCruelty ) {
    return res.redirect('http://PETA.org');
  }

  // If the user has been seen frowning at puppies, we have to assume that
  // they might end up being mean to them, so we'll
  if ( req.session.user.frownsAtPuppies ) {
    return res.redirect('http://www.dailypuppy.com/');
  }

  // Finally, if the user has a clean record, we'll call the `next()` function
  // to let them through to the next policy or our controller
  next();
};
```

Besides protecting rabbits (while a noble cause, no doubt), here are a few other use cases for policies:
+ cookie-based authentication
+ role-based access control
+ limiting file uploads based on MB quotas
+ any other kind of authentication scheme you can imagine



<docmeta name="displayName" value="Policies">
