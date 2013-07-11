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

Okay, so the first thing you may have noticed is the _default_ setting.  This is set to _disk_ by default.  Disk means that the data is stored on the local file system instead of in a database.  You can change this to any of the other defined options below that.  This is the default that will be used throughtout your entire app.  If you need to override this on a per model basis, you can do that inside the model itself.  See [Models](Models).

_**memory:**_  This is an option for _'default':_ .  Memory stores all data in memory.  This memory is erased when the server is shutdown.

_**disk:**_  This is an option for _'default':_ .  Disk stores all data on disk in the .tmp folder.  This is persisted through restarts.

_**mysql:**_ This is an option for _'default':_ .  Mysql stores all data in a MySQL Database.  This is persisted through restarts.  This requires the setup of a Mysql server either locally or remote.

### Future
As more adapters are created, they will be added to this guide.  Sails.JS plans to support a wide variety of data source adapters.


