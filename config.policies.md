## policies.js
So, you don't want your mom to access your secret stash of ... code?  Then this is where you make that happen.  Policies are like any other system for authentication control.  You can allow or deny access in fine granularity with policies.

Policies are simply Express middleware functions which run before your controllers. You can apply one or more policies for a given controller or action.

Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder, at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`).


The default policy for all controllers and actions is `*': true`  (allows public access).


####Here's an example of adding some policies to a controller:
```javascript
RabbitController: {
	
	// Apply the `false` policy as the default for all of RabbitController's actions
	// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
	'*': false,

	// For the action `nurture`, apply the 'isRabbitMother' policy 
	// (this overrides `false` above)
	nurture	: 'isRabbitMother',

	// Apply the `isNiceToAnimals` and `hasRabbitFood` policies
	// before letting any users access our rabbits' `feed` action
	feed : ['isNiceToAnimals', 'hasRabbitFood']
	
	}
```
