**Notice: This documentation is for the newest release of Sails that is still in production but will
be out very soon. Most of this documentation will not work if you install sails from the npm
registery.**

Sometimes when you hit certain contoller actions, you want to make perform a job. You do not want to
worry if the data you recieved is valid, if a user is authorized, or many other things. Policies
allow you to run a piece of middleware logic before your actions run. That way your actions can be
written assuming that .... 

# Defining Access Control Rules
if you look in **/config/policy.js** file, by default you will see a single policy set.

```javascript
var policy = {

	// Default policy (allow public access)
	'*': true
};
module.exports = policy;
```

This means that every action in every controller is accessible from any request.
While this a good default, you can see how this can lead to problems if a non registered user wants
to delete someone else from the database or update someone elses information. Lets define custome
policies to take care of that.

## Custom Policies

Since we want to protect against that behavior, we need to define some policies.

```javascript
var policy = {

	UserController: {

		// For the update and destroy actions apply 'authentication' instead
		update: 'authenticated',

		destory: 'authenticated'
	}
};

the **'authenticated'** value simply runs the logic in the **/middleware/authenticated.js** file.
This can be anything, but in this case, this logic will make sure a user is in an authenticated
session of the appliction. It then allows the controller action logic to run if. 

_TODO: explain more about middleware_

We would also want to make sure that authenticated users can create and read. In that case, we can
just say that all the actions in the User controller require an authenticated user. We can write it
like this.

```javascript
var policy = {

	UserController: {

		// All actions in the user controller need authenticaton.
		'*': 'authenticated'
	}
};

module.exports = policy;
```



