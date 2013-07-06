# Configuration

So, now you have Sails.js installed and it's loading up your awesome new project.

What? Thats not good enough? Well then, lets see what we can configure to suit your needs!

# Overview of configuration files
One of the major advantages of Sails.js is its flexibility.  As with most MVC frameworks, Sails.js assumes standard conventions, but also allows you to change its configuration to fit your needs.  Below is a list and short explanation of each.

* <a href="#adapters.js">adapters.js</a>      (This file handles database/datasource adapters)
* <a href="#application.js">application.js</a>   (This file handles General settings for your application)
* <a href="#assets.js">assets.js</a>        (This file handles the asset settings for CSS/Js/styles and other resources)
* <a href="#bootstrap.js">bootstrap.js</a>     (This file holds code that needs to be run before the app launches)
* <a href="#locales">locales</a>          (Folder that holds locale specific settings)
	* <a href="#english.js">english.js</a>   (This file handles translated strings for Locale use)
* <a href="#local.js">local.js</a>         (This file is included in the `.gitignore` and won't be pushed up to your git repository.  It handles any LOCAL overrides needed)
	* <a href="#local.ex.js">local.ex.js</a>      (This is an example file of local.js)
* <a href="#policies.js">policies.js</a>      (This file defines policies that are used to grant or deny access to users)
* <a href="#routes.js">routes.js</a>        (This file contains all the user specified routes for the system.  The system will attempt dynamic routing if this is blank)
* <a href="#views.js">views.js</a>         (This file handles all view related settings, such as the view engine and layout)

<span id="adapters.js"></span>
## adapters.js
The adapters.js file is where you will specify your database options for the entire app.  Lets take a look at the file and get familiar with all the parts:

```javascript
// Configure installed adapters
// If you define an adapter in your model definition, 
// it will override anything from this global config.
module.exports.adapters = {

	// If you leave the adapter config unspecified 
	// in a model definition, 'default' will be used.
	'default': 'disk',
	
	// In-memory adapter for DEVELOPMENT ONLY
	// (data is NOT preserved when the server shuts down)
	memory: {
		module: 'sails-dirty',
		inMemory: true
	},

	// Persistent adapter for DEVELOPMENT ONLY
	// (data IS preserved when the server shuts down)
	disk: {
		module: 'sails-dirty',
		filePath: './.tmp/dirty.db',
		inMemory: false
	},

	// MySQL is the world's most popular relational database.
	// Learn more: http://en.wikipedia.org/wiki/MySQL
	mysql: {
		module		: 'sails-mysql',
		host		: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
		user		: 'YOUR_MYSQL_USER',
		password	: 'YOUR_MYSQL_PASSWORD',
		database	: 'YOUR_MYSQL_DB'
	}
};
```

You may have noticed the _default_ setting: this is set to _disk_ by default.  Disk means that the data is stored on the local file system instead of in a database.  You can change this to any of the other defined options below that.  This is the default that will be used throughtout your entire app.  If you need to override this on a per model basis, you can do that inside the model itself.  See [Models](/balderdashy/sails/wiki/models).

_**memory:**_  This is an option for _'default':_ .  Memory stores all data in memory.  This memory is erased when the server is shutdown.

_**disk:**_  This is an option for _'default':_ .  Disk stores all data on disk in the .tmp folder.  This is persisted through restarts.

_**mysql:**_ This is an option for _'default':_ .  Mysql stores all data in a MySQL Database.  This is persisted through restarts.  This requires the setup of a Mysql server either locally or remote.

### Future
As more adapters are created, they will be added to this guide.  Sails.js plans to support a wide variety of data source adapters.

<span id="application.js"></span>
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

_**appName:**_ \<string\>  This is the name of your application.  It is a string and can be any alpha-numeric string.

_**host:**_ \<string\>  (Optional) This is the host that your app will "think" it is running on.  I.E. it will only be accessable from this host.

_**port:**_ \<integer\>  This is the port number that your application will run on.  This needs to be set to a numeric interger between 1 and 65535.

_**environment:**_ \<string\>  This is the environment that the applicaiton is currently in.  This can be set to development, production, or test.

_**cache:**_ \<object\>  (Optional) This is the setting object for cache.  Being an object, this will have its own attributes to be set.
* maxAge: \<integer\>  // This needs to be a positive numeric integer representing number of seconds that the cache should live.

_**log:**_ \<object\>  (Optional)  This is the setting object for Logs.  Being an object, this will have its own attributes to be set.
* level: \<string\>  // This can be set to one of: verbose, info, debug, warn, error, silent
* colorize: \<bool\>    // This can be set to one of: true, false

_**session:**_ \<object\>  (Optional)  This is the setting object for sessions.  Being an object, this will have its own attributes to be set.
* secret: \<string\>  // This can be set to any alphanmeric-symbolic string.
* store: \<object\>  // (Optional) This needs to be an object.  This overrides the default store that sessions are stored in.  This only needs to be edited in special circumstances.
* key: \<string\>  // This can be set to any alphanmeric string.

_**viewEngine:**_ \<object\> (Optional) The templating engine to use for your views. Default is [EJS](http://embeddedjs.com/). Currently only EJS and [Jade](http://jade-lang.com/) are supported.

_**layout:**_ \<object\> (Optional) The file in the /views/ folder to use as the default layout. Default is false, which uses layout.ejs

<span id="assets.js"></span>
## assets.js
This file handles the assets that will be included at run time.

```javascript
// Asset rack configuration
module.exports.assets = {

	// In development mode
	// A list of directories, in order, which will be recursively parsed for css, javascript, and templates
	// and then can be automatically injected in your layout/views via the view partials:
	// ( assets.css(), assets.js() and assets.templateLibrary() )
	sequence: [
		'assets/mixins', 
		'assets/js', 
		'assets/styles', 
		'assets/templates'
	]
};
```
_**sequence:**_ \<array\>  This is an array of folders that will be included during runtime.  Each item will be processed in the order it is read in the array (fifo top-down).

<span id="bootstrap.js"></span>
## bootstrap.js
The bootstrap function is run before the server is launched.  A callback function is passed as the first argument that you must trigger when you're finished, e.g.

```
module.exports.bootstrap = function (cb) {
  User.create({
    name: 'Colonel Sanders',
    email: 'colonel@kfc.com',
    age: 286
  }, cb);
};
```

<span id="locales"></span>
## Locales
This is a folder that contains the Language files for different locales.

<span id="english.js"></span>
### english.js
This file holds all of the language strings for the English Locale.

<span id="local.js"></span>
## local.js
This file holds local overrides for an app.  For example, if you wanted to use a different port than the one for the app.

```javascript
// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.
//
// For example, to use port 80 on the local machine, override the `port` config

module.exports.host = '127.0.0.1';
module.exports.port = 8080;
module.exports.environment = 'production';
```
Many of the other configuration items in the other files can be included here for local overrides.  They normally follow the naming convention of ```module.exports.<config option>```. This can be determined by looking at the config files themselves.  For example, the adapters would be ```module.exports.adapters.default = mysql```

<span id="local.ex.js"></span>
### local.ex.js
This is just an example file for _local.js_.

<span id="policies.js"></span>
## policies.js
So, you don't want your mom to access your secret stash of ... code?  Then this is where you make that happen.  Policies are like any other system for authentication control.  You can allow or deny access in fine granularity with policies.

```javascript
/**
* Policy defines middleware that is run before each controller/controller.
* Any policy dropped into the /middleware directory is made globally available through sails.middleware
* Below, use the string name of the middleware
*/
module.exports.policies = {

	// Default policy (allow public access)
	'*': true

	/** Example mapping: 
	someController: {

		// Apply the "authenticated" policy to all actions
		'*': 'authenticated',

		// For someAction, apply 'somePolicy' instead
		someAction: 'somePolicy'
	}
	*/
};
```
Each attribute of _policies_ is a key/value pair.  The _key_ is the action name that you want to restrict/unrestrict.  The _value_ can be a simple boolean (true/false) or the name of the policy you want to enforce.  Policies should be found/created as middleware in the _api/policies/_ folder.

<span id="routes.js"></span>
## routes.js
Resourceful routing in Sails.js is automatic, but you can also assign custom routes from specific URLs to your controllers' actions.  

For instance, if you have an AuthController with a `login` action, the url `http://yourdomain.com/auth/login` would automatically exist.  But if you also want `http://yourdomain.com/login` to work, your routes file might look like the following:

```javascript
module.exports.routes = {
	
	// To route the home page to the "index" action of the "home" controller:
	'/' : {
		controller	: 'home'
	},

	'/login' : {
		controller  : 'auth'
		action      : 'login'
	}

};
```
Each attribute of _routes_ is a key/object pair.  The _key_ is the route that you want to control.  This can me "/" for the home page or /user/ for the users page.  It can really be whatever you want the user to be able to type and get content at.  The objects _controller:_ defines what controller to look in for this route, while the _action_ defines what action will be run when the route is executed.  If no action is given, Sails.js assumes that you want to execute the index action.

<span id="views.js"></span>
## views.js
The views.js file controls how your views will display.  From if you will use a layout file to what type of language can be used to create the view files.

```javascript
module.exports = {
	viewEngine: 'ejs',
	layout: true
};
```
_**viewEngine:**_ \<string\>  (Optional) This is the view engine that will be used to parse the view files.

_**layout:**_ \<bool or string\>  (Optional) This is a special value.  It can either be true or false.  If false, it will not use a layout for views.  If true, it will assume that the default file to use is _/views/layout.ejs_ and will use it.  If you pass it a string instead, it will use the file at the string that you passed it.

If you plan to use a viewEngine other than the default, you must verify that it is available to Sails.js.