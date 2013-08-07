#Routes
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

This table routes urls to controllers/actions.

##Resourceful Routing
If the URL is not specified in **config/routes.js**, the default route for a URL is:
**/:controller/:action/:id**
where **:controller**, **:action**, and the **:id** request parameter are derived from the url

If **:action** is not specified, Sails will redirect to the appropriate action.  Out of the box,
Sails supports RESTful resourceful route conventions, as used in Backbone.js.

```
	# Backbone Conventions
	GET   :	/:controller			=> findAll()
	GET   :	/:controller/read/:id		=> find(id)
	POST  :	/:controller/create		=> create()
	POST  :	/:controller/create/:id		=> create(id)
	PUT   :	/:controller/update/:id		=> update(id)
	DELETE:	/:controller/destroy/:id	=> destroy(id)

	# You can also explicitly state the action
	GET   :	/:controller/findAll		=> findAll()
	GET   :	/:controller/find/:id		=> find(id)
	POST  :	/:controller/create		=> create(id)
	PUT   :	/:controller/update/:id		=> update(id)
	DELETE:	/:controller/destroy/:id	=> destroy(id)
```

If the requested controller/action doesn't exist:
  - if a view exists ( **/views/:controller/:action.ejs** ), Sails will render that view
  - if no view exists, but a model exists, Sails will automatically generate a JSON API for the 
  	model which matches **:controller**.
  - if no view OR model exists, Sails will respond with a 404.

## Custom Routes
You can define your own custom routes in **config/routes.js**

```javascript
module.exports.routes = {
	// To route the home page to the "index" action of the "home" controller:
	'/': {
		controller: 'home'
	},

	// Additional routes might look like:
	'/whateverYouWant': {
		controller: 'someController',
		action: 'someAction'
	},

	// If you want to set up a route only for a particular HTTP method/verb 
	// (GET, POST, PUT, DELETE) you can specify the verb before the path:
	'post /signup': {
		controller: 'auth',
		action: 'signup'
	}

	// Keep in mind default routes exist for each of your controllers
	// So if you have a UserController with an action called "juggle" 
	// a route will be automatically exist mapping it to /user/juggle.
	//
	// Additionally, unless you override them, new controllers will have 
	// create(), find(), findAll(), update(), and destroy() actions, 
	// and routes will exist for them as follows:

	/*

	// Standard RESTful routing
	// (if index is not defined, findAll will be used)
	'get /user': {
		controller	: 'user',
		action		: 'index'
	}
	'get /user/:id': {
		controller	: 'user',
		action		: 'find'
	}
	'post /user': {
		controller	: 'user',
		action		: 'create'
	}
	'put /user/:id': {
		controller	: 'user',
		action		: 'update'
	}
	'delete /user/:id': {
		controller	: 'user',
		action		: 'destroy'
	}
	*/
};

```

## Wildcard Routes
Wildcard routes can also be defined in **config/routes.js**.  If say for example, you want all unknown routes (routes that aren't real) to point to a specific controller and action.  Then you can use the _:unkownRoute_ arbitrary variable as the route.  An example of this is shown below.

```javascript
// config/routes.js

modules.exports.routes = {
  '/some/route': {
    controller: 'something',
    action: 'foo'
  },

  // Wildcard (404) handler
  '/:unknownRoute': {
    controller: 'notfound'
    action: 'index'
  }
};
```

Arbitrary variables will take any value that is put in the router and pass it down to the controller and action you specify.

Another example, if say you want the route as the username of a user on your system, you could do the following.

```javascript
  '/:username': {
    controller: 'user',
    action: 'profile'
  }
```

and in your controller,

```javascript
module.exports = {
  profile: function (req,res) {
    var username = req.param('username');
    User.findByUsername(username).done(function (err, user) {
       if (err) return res.send(err,500);
       res.view({ user: user });
    });
  }

};
```

This setup will allow UserA to visit http://yoursite.com/UserA and depending on your view, may see their profile page.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/routes)
