# Policies
### Overview

Policies in Sails are versatile tools for authorization and access control-- they let you allow or deny access to your controllers down to a fine level of granularity.  For example, if you were building Dropbox, before letting a user upload a file to a folder, you might check that she `isAuthenticated`, then ensure that she `canWrite` (has write permissions on the folder.)  Finally, you'd want to check that the folder she's uploading into `hasEnoughSpace`.

Policies can be used for anything: HTTP BasicAuth, 3rd party single-sign-on, OAuth 2.0, or your own custom authorization/authentication scheme.

> NOTE: policies apply **only** to controller actions, not to views.  If you define a route in your [routes.js config file](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html) that points directly to a view, no policies will be applied to it.  To make sure policies are applied, you can instead define a controller action which displays your view, and point your route to that action.


### Writing Your First Policy

Policies are files defined in the `api/policies` folder in your Sails app.  Each policy file should contain a single function.

When it comes down to it, policies are really just Connect/Express middleware functions which run **before** your controllers.  You can chain as many of them together as you like-- in fact they're designed to be used this way.  Ideally, each middleware function should really check just *one thing*.

For example, the `canWrite` policy mentioned above might look something like this:

```javascript
// policies/canWrite.js
module.exports = function canWrite (req, res, next) {
  var targetFolderId = req.param('id');
  var userId = req.session.user.id;
  
  Permission
  .findOneByFolderId( targetFolderId )
  .exec( function foundPermission (err, permission) {

    // Unexpected error occurred-- skip to the app's default error (500) handler
    if (err) return next(err);

    // No permission exists linking this user to this folder.  Maybe they got removed from it?  Maybe they never had permission in the first place?  Who cares?
    if ( ! permission ) return res.redirect('/notAllowed');
    
    // OK, so a permission was found.  Let's be sure it's a "write".
    if ( permission.type !== 'write' ) return res.redirect('/notAllowed');

    // If we made it all the way down here, looks like everything's ok, so we'll let the user through
    next();
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
    // Apply 'isLogged' in by default to all actions that are NOT specified below
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


### I'm using Passport--what about me?!

Passport works great with Sails!  In general, since Sails uses Connect/Express at its core, all of the Connect/Express-oriented things work pretty well.  In fact, Sails has no problem interpreting most Express middleware to work with socket.io.

There are a few good examples of this floating around, such as [Using Passport.JS with Sails.JS](http://jethrokuan.github.io/2013/12/19/Using-Passport-With-Sails-JS.html).



<docmeta name="uniqueID" value="Policies766425">
<docmeta name="displayName" value="Policies">

