# Policies

> ##### So, you don&rsquo;t want your mom to access your secret stash of ... code?  Here's how you can make that happen. 

Policies are versatile tools for authorization and access control-- they let you allow or deny access to your controllers down to a fine level of granularity, then make it easy to make iterative changes if your needs change.

When you get down to the meat of it, policies are simply Connect/Express middleware functions which run **before** your controllers. 


You can apply one or more policies for a given controller or action.

Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder, at which point it can be referenced by its filename, minus the extension, (e.g. `authenticated`).  

There are a few special, built-in policy mappings:
  + `true`: public  (allows anyone to access the mapped controller/action)
  +  `false`: disabled (allows **no-one** to access the mapped controller/action)

 `'*': true` is the default policy for all controllers and actions.  In production, it's good practice to set this to `false` to make sure you have all of your controllers explicitly mapped.


##Here&rsquo;s an example of adding some policies to a controller:
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

Besides protecting rabbits (while a noble cause, no doubt), here are a few other example use cases for policies:
+ cookie-based authentication
+ role-based access control
+ limiting file uploads based on MB quotas
+ OAuth
+ BasicAuth
+ or any other kind of authentication scheme you can imagine
