# Policies
Sometimes when you hit certain contoller actions, you want to perform a job. You don't want to
worry about if the data you recieved is valid, if a user is authorized, etc. Policies
allow you to run a piece of middleware logic before your actions run. 

## Defining Access Control Rules
If you look in the **config/policies.js** file, by default you will see a single policy set.

```javascript
module.exports.policies = {

	// Default policy (allow public access)
	'*': true

};
```

This means that every action in every controller is accessible from any request.
While this is a good default, you can see how this can lead to problems if a non-registered user wants
to delete someone else from the database or update someone else's information. Let's define custom
policies to take care of that.

## Custom Policies

Since you want to protect against that behavior, you'll need to define some policies.

```javascript
module.exports.policies = {

	UserController: {

		// For the update and destroy actions apply 'authentication' instead
		update: 'authenticated',

		destroy: 'authenticated'
	}
};
```

The **'authenticated'** value simply runs the logic in the **api/policies/authenticated.js** file.
This can be anything; in this case, this logic will make sure a user is in an authenticated
session of the appliction. It then allows the controller action logic to run. 

Your **api/policies/authenticated.js** file might look like this:

```js
module.exports = function(req, res, next) {
    // perform authentication logic
    next()
}
```

You'd also want to make sure that authenticated users can create and read. In that case, you can
just say that all the actions in the User controller require an authenticated user. You can write it
like this.

```javascript
module.exports.policies = {

	UserController: {

		// All actions in the user controller need authenticaton.
		'*': 'authenticated'
	}
};
```

As you can see, this can make for much cleaner controller action code in that you only need the
business logic. The miscellaneous jobs such as validating data or making sure users are authorized
no longer have to be in the action, and instead live in modular middleware files. 

## Chaining Policies

To apply two policies to a given action, in order, you can specify an array of strings, each referring to a specific middleware. 

```javascript
controller1: {
    action0: ['policy0', 'policy1'],
    action1: true
}
```

Then, in your policy definitions:
```javascript
// api/policies/policy0.js
module.exports = function (req,res,next) {
  // Verify that some constraint passes, or take some action at the beginning of each request
  var passes = req.session.authenticated;
 
  // Call next to continue on to next policy or the controller
  if (passes) return next();
  else return res.redirect('/login');
}
```

```javascript
// api/policies/policy1.js
module.exports = function (req,res,next) {
  // Then you might want to take some action at the beginning of each request
  // to make it available in your controller
  req.lottery = Math.random();
  next();
}
```

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/policies)