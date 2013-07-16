## controllers.js

The controllers.js config file allows you to customize the default capabilities of your controllers that are there for you convenience. Let us look at the options in more detail below:

```javascript
module.exports = {
  
	// (Note: global blueprint config may be overridden on a per-controller basis
	// by setting the 'blueprint' property in a controller)
	blueprints: {

		// Optional mount path prefix for blueprint routes
		// e.g. '/api/v2'
		prefix: '',


		// Routes to automatically inject
		routes: {

			// Automatically create routes for every action in the controller
			// (also maps `index` to /:controller)
			'get /:controller/:action?': true,
			'post /:controller/:action?': true,
			'put /:controller/:action?': true,
			'delete /:controller/:action?': true,


			// REST shortcuts
			//
			// ** NOTE **
			// These REST shortcuts exist for your convenience during development,
			// but you'll want to disable them in production.
			'/:controller/find/:id?': true,
			'/:controller/create': true,
			'/:controller/update/:id': true,
			'/:controller/destroy/:id': true,


			// REST methods
			'get /:controller/:id?': true,
			'post /:controller': true,
			'put /:controller/:id': true,
			'delete /:controller/:id': true

		},


		// If a blueprint REST route catches a request,
		// only match an `id` if it's an integer
		//
		// e.g.	only fire route if requests look like:
		//		get /user/8
		// instead of:
		//		get /user/a8j4g9jsd9ga4ghjasdha
		expectIntegerId: true

	},
	
	
	// CSRF middleware protection, all non-GET requests must send '_csrf' parmeter
	// _csrf is a parameter for views, and is also available via GET at /csrfToken
	csrf: false

};
```

The first thing to note is the default blueprint options will apply to all controllers but can be overriden individually by placing these options under a `blueprints` object in that controller file. Within the blueprints object we have these properties:

`_**prefix:**_` This is the optional mount path prefix for blueprint routes. This prefix will be appended to the url path so if you assigned `prefix: '/api/v2'` then an example url path would be `/api/v2/user/update/1`.

`_**routes:**_` In this object you can determine which routes with with the different HTTP methods get automatically generated for each controller action. For example if you wanted to disable the automatic creation of all routes that perform **GET** requests you can write this `get :controller/:action?: false`. You can also disable the automatic creation the REST shortcuts that are created for you. For development these shortcuts help you perform CRUD methods very quickly right in the browser.

> _Note: These shotcuts can, and should be disabled when you are going to deploy your app in production._

'_**expectingIntegerId:**_' This property will allow you to catch a request only if the `id` is an integer.
