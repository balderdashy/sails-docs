So you got Sails.JS installed now and its loading up your awesome new project.  What? thats not good enough? OK, lets see what we can configure to make it better for your needs!!!

# Overview of Configurations
One of the major advantages of Sails.JS that makes it such a powerhouse MVC is the fact that is incredibly flexable.  As with most porgrams now days, Sails.JS has configurations files.  Below is a list and short explination of each.

* adapters.js      (This file handles database/datasource adapters)
* application.js   (This file handles General settings for your application)
* assets.js        (This file handles the asset settings for CSS/Js/styles and other resources)
* bootstrap.js     (This file holds code that needs to be run before the app launches)
* locales          (Folder that holds locale specific settings)
	* english.js   (This file handles translated strings for Locale use)
* local.ex.js      (This is an example file of local.js)
* local.js         (This file is not included in the `.gitignore`, and so won't be pushed up to your git repository.  It handles any LOCAL overrides needed)
* policies.js      (This file defines policies that are used to grant or deny access to users)
* routes.js        (This file contains all the user specified routes for the system.  The system will attempt dynamic routing if this is blank)
* views.js         (This file handles all view related settings, such as the view engine and layout)

# adapters.js

The adapters.js file is where you will specify your database options for the entire app.  Lets take a look at the file and get familiar with all the parts.

```javascript
// Configure installed adapters
// If you define an attribute in your model definition, 
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

OK, so the first thing you may have noticed is the _default_ setting.  This is set to _disk_ by default.  Disk means that the data is stored on the local file system instead of in a database.  You can change this to any of the other definded options below that.  This is the default that will be used throughtout your entire app.  If you need to override this on a per model basis, you can do that inside the model itself.  See [Models](Models).

momery:  This is an option for _'default':_ .