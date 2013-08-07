# Adapters
> _**Note:** You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._


####*See [sails-adapter-boilerplate](https://github.com/balderdashy/sails-adapter-boilerplate) for a quick start guide.*


Like most MVC frameworks, Sails provides an ORM (Object Relational Mapping) called Waterline for normalizing
interactions with models, no matter what data source you're using. In this guide, we'll be demonstrating how to build adapters for Waterline by building one for Redis.

## Code Setup
To get started, you'll need to clone the main sails repo and create or clone a repo for your new adapter. In our case, the adapter is called "sails-redis", keeping in line with the Sails convention of naming adapters with the format "sails-<db name>". So, you should have a `sails/` and a `sails-redis/` directory.

Next, we need to set up the project with the initial file structure, so do:

```
cd sails-redis
touch README.md
touch package.json
touch .gitignore
touch RedisAdapter.js
```

You'll notice that the actual adapter is named RedisAdapter.js. This is also a Sails convention. Name your adapter <DBname>Adapter.js. You can set up your .gitignore like this or any way you like:

```
.\#*
*#
node_modules
ssl
.DS_STORE
*~
.idea
nbproject
.waterline
npm-debug.log
```

The README is next:

```
![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png) 

# RedisAdapter

Adds Redis support for Sails.

# Sails.js Repo
http://SailsJs.com


## About Waterline
Waterline is a new kind of storage and retrieval engine.  It provides a uniform API for accessing stuff from different kinds of databases, protocols, and 3rd party APIs.  That means you write the same code to get users, whether they live in mySQL, LDAP, MongoDB, or Facebook.
Waterline also comes with built-in transaction support, as well as a configurable environment setting. 
> NOTE: Waterline is currently in unreleased alpha-- that means it's not production ready!  If you want to use waterline in a production app, please contribute.  Currentliy, the plan is for an open alpha release early next year (2013).  Thanks!
You can learn more about

*Waterline repo: https://github.com/balderdashy/sails-redis*


## Writing your own adapters
It's easy to add your own adapters for integrating with proprietary systems or existing open APIs.  For most things, it's as easy as `require('some-module')` and mapping the appropriate methods to match waterline semantics.
```

Our package.json:

```
{
  "name": "sails-redis",
  "version": "0.0.1",
  "description": "Redis adapter for Sails.js",
  "main": "RedisAdapter.js",
  "scripts": {
    "test": "echo \"Adapter should be tested using Sails.js core.\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/balderdashy/sails-redis.git"
  },
  "keywords": [
    "redis",
    "orm",
    "waterline",
    "sails"
  ],
  "author": "Carlo DiCelico",
  "license": "MIT",
  "readmeFilename": "README.md",
  "dependencies": {
    "async": "0.1.22",
    "underscore": "1.4.3",
    "underscore.string": "2.3.1",
    "redis": "0.8.2",
    "hiredis": "0.1.14"
  }
}
```

And finally, some boilerplate for the adapter, which I'll explain later. Note that some of this may be different for your adapter, but this is a good general starting point. You can also refer to the other adapters (sails-mysql, sails-dirty, and sails-mongo) to get a feel for how they vary:

```
/*---------------------------------------------------------------
  :: sails-redis
  -> adapter
---------------------------------------------------------------*/

var async = require('async')
, _       = require('underscore')
, _str    = require('underscore.string')
, redis   = require('redis');

module.exports = (function(){

  var dbs = {};

  var adapter = {

    syncable: false,

    registerCollection: function(collection, cb) {},

    teardown: function(cb) {},

    describe: function(collectionName, cb) {},

    define: function(collectionName, definition, cb) {},

    drop: function(collectionName, cb) {},

    create: function(collectionName, data, cb) {},

    find: function(collectionName, options, cb) {},

    stream: function(collectionName, options, stream) {},

    update: function(collectionName, options, values, cb) {},

    destroy: function(collectionName, options, cb) {},

    identity: 'sails-redis'

  };

  //////////////                 //////////////////////////////////////////
  ////////////// Private Methods //////////////////////////////////////////
  //////////////                 //////////////////////////////////////////
  function connect (collection, cb) {}

  function marshalConfig(config) {}

  return adapter;

})();
```

## Testing Setup
To set up testing, from within the adapter directory, `sails-redis/` in this case, do `npm link`. Then change to the `sails/` directory and npm link to the custom module: `cd ../sails && npm link sails-redis`. Once that's done, you can verify that you can run tests by doing `npm test` from within `sails/`. The tests will fail at this point but that's okay, you just want to verify that they're running and can see your new adapter.



## Adapter API

### `Model.update(collectionName, criteria, newValues, cb) :: cb(err, success)`
####Update one or more models:
+ err is truthy if an error occurred
+ success is truthy if the update was successful
+ err AND success are falsy if the update was unsuccessful because the criteria in question didn't return any extant models

### `Model.destroy(collectionName, criteria, cb) :: cb(err, success)`
####Destroy one or more models:
+ err is truthy if an error occurred
+ success is truthy if the update was successful
+ err AND success are falsy if the operation was unsuccessful because the criteria in question didn't return any extant models

