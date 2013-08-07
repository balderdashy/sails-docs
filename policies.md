# Policies (ACL)
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

So, you don&rsquo;t want your mom to access your secret stash of ... code?  Here's how you can make that happen. 

## What Are Policies?

Policies in Sails are versatile tools for authorization and access control-- they let you allow or deny access to your controllers down to a fine level of granularity.  For example, if you were building Dropbox, before letting a user upload a file to a folder, you might check that she `isAuthenticated`, then ensure that she `canWrite` (has write permissions on the folder.)  Finally, you'd want to check that the folder she's uploading into `hasEnoughSpace`.

Policies can be used for anything: HTTP BasicAuth, 3rd party single-sign-on, OAuth 2.0, or your own custom authorization/authentication scheme.


## Writing Your First Policy

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


## How do I protect my controllers with policies?

Sails has a built in ACL (access control list) located in `config/policies.js`.  This file is used to map policies to your controllers.  

This file is  *declarative*, meaning it describes *what* the permissions for your app should look like, not *how* they should work.  Declarative programming has many benefits, but in particular, it is both conventional and adaptable.  This makes it easier for new developers to jump in and understand what's going on, plus it makes your app more flexible as your requirements inevitably change over time.

You can apply one or more policies to a given controller or action.  Any file in your `/policies` folder (e.g. `authenticated.js`) is referable in your ACL (`config/policies.js`) by its filename minus the extension, (e.g.  `'authenticated'`).  

Additionally, there are a few special, built-in policy mappings:
  + `true`: public access  (allows anyone to get to the mapped controller/action)
  +  `false`: **NO** access (allows **no-one** to access the mapped controller/action)

 `'*': true` is the default policy for all controllers and actions.  In production, it's good practice to set this to `false` to prevent access to any logic you might have inadvertently exposed.

### Here&rsquo;s an example of adding some policies to a controller:
```javascript
	RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		'*': false,
	
		// For the action `nurture`, apply the 'isRabbitMother' policy 
		// (this overrides `false` above)
		nurture	: 'isRabbitMother',
	
		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		feed : ['isNiceToAnimals', 'hasRabbitFood']
	}
```

Here&rsquo;s what the `isNiceToAnimals` policy from above might look like: (this file would be located at `policies/isNiceToAnimals.js`)

We&rsquo;ll make some educated guesses about whether our system will consider this user someone who is nice to animals.
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

#### Besides protecting rabbits (while a noble cause, no doubt), here are a few other use cases for policies:
+ cookie-based authentication
+ role-based access control
+ limiting file uploads based on MB quotas
+ any other kind of authentication scheme you can imagine


## What about me?  I'm using Passport?!

Passport works great with Sails!  In general, since Sails uses Connect/Express at its core, all of the Connect/Express-oriented things work pretty well.  In fact, Sails has no problem interpreting most Express middleware to work with socket.io.

There are a few good examples of this floating around.  Here's a good one (hasn't been tested in v0.9.x yet):
https://gist.github.com/theangryangel/5060446



[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/policies)
