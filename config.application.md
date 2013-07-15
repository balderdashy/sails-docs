## application.js
The application.js file holds all the generalized configuration options for an application.  This means that everything that doesn't have its own file can be found here.

```javascript
module.exports = {
  
	// Name of the application (used as default <title>)
	appName: "Sails Application",

	// Port this Sails application will live on
	port: 1337,

	// The environment the app is deployed in 
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	// Logger
	// Valid `level` configs:
	// 
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: 'info'
	}

};
```

_**appName:**_ `STRING`  This is the name of your application.  It is a string and can be any alpha-numeric string.

_**host:**_ `STRING`  (Optional) This is the host that your app will "think" it is running on.  I.E. it will only be accessable from this host.

_**port:**_ `INT`  This is the port number that your application will run on.  This needs to be set to a numeric interger between 1 and 65535.

_**environment:**_ `STRING`  This is the environment that the applicaiton is currently in.  This can be set to development, production, or test.

_**cache:**_ `OBJ`  (Optional) This is the setting object for cache.  Being an object, this will have its own attributes to be set.
* maxAge: `INT`  // This needs to be a positive numeric integer representing number of seconds that the cache should live.

_**log:**_ `OBJ`  (Optional)  This is the setting object for Logs.  Being an object, this will have its own attributes to be set.
* level: `STRING`  // This can be set to one of: verbose, info, debug, warn, error, silent
* colorize: `BOOL`    // This can be set to one of: true, false

_**session:**_ `OBJ`  (Optional)  This is the setting object for sessions.  Being an object, this will have its own attributes to be set.
* secret: `STRING`  // This can be set to any alphanmeric-symbolic string.
* store: `OBJ`  // (Optional) This needs to be an object.  This overrides the default store that sessions are stored in.  This only needs to be edited in special circumstances.
* key: `STRING`  // This can be set to any alphanmeric string.

_**viewEngine:**_ `OBJ` (Optional) The templating engine to use for your views. Default is [EJS](http://embeddedjs.com/). Currently only EJS and [Jade](http://jade-lang.com/) are supported.

_**layout:**_ `OBJ` (Optional) The file in the /views/ folder to use as the default layout. Default is false, which uses layout.ejs
