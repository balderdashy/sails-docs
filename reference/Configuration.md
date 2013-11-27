# Configuration
### Overview
This is an overview of all of the configuration


# 404
### What is this?
The default 404 handler.

### Moar









# 500
### What is this?
The default 500 error handler.

### Moar







# Adapters
### What is this?
The adapters configuration object lets you create different global “saved settings” that you can mix and match in your models.

### Moar












# Bootstrap
### What is this?
This is an asynchronous boostrap function that runs before your Sails app gets lifted (i.e. starts up). This gives you an opportunity to set up your data model, run jobs, or perform some special logic.

### Moar









# Controllers
### What is this?
By default, Sails controllers automatically bind routes for each of their functions. Additionally, each controller will automatically bind routes for a CRUD API controlling the model which matches its name, if one exists.

### Moar









# CSRF
### What is this?
When enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified as the '_csrf' parameter.

### Moar











# Express
### What is this?
If you want to use custom middleware or add local variables and helpers to templates you can do so by configuring express in this config file.

### Moar










# Local
### What is this?
While you’re developing your app, this config file should include any settings specifically for your development computer (db passwords, etc.)

### Moar














# Locales
### What is this?
This is a folder that contains the Language files for different locales.

### Moar












# Log
### What is this?
The logger file configures the log level for your app, as well as the transport.

### Moar









# Policies
### What is this?
Policies are like any other system for authentication control. You can allow or deny access in fine granularity with policies.

### Moar

Your app's ACL (access control list) is located in **config/policies.js**.

## Applying a Policy

### To a Specific Action

To apply a policy to a specific action in particular, you should specify it on the right-hand side of that action:

```javascript
{
  ProfileController: {
      edit: 'isLoggedIn'
  }
}
```


### To an Entire Controller

To set the default policy mapping for a controller, use the `*` notation:
> **Note:** Default policy mappings do not "cascade" or "trickle down."  Specified mappings for the controller's actions will override the default mapping.  In this example, `isLoggedIn` is overriding `false`.

```javascript
{
  ProfileController: {
    '*': false,
    edit: 'isLoggedIn'
  }
}
```

### Globally
> **Note:** Global policy mappings do not "cascade" or "trickle down" either.  Specified mappings, whether they're default controller mappings or for specific actions, will **ALWAYS** override the global mapping.  In this example, `isLoggedIn` is overriding `false`.

```javascript
{

  // Anything you don't see here (the unmapped stuff) is publicly accessible
  '*': true,

  ProfileController: {
    '*': false,
    edit: 'isLoggedIn'
  }
}
```


## Built-in policies

### true

> This is the default policy mapped to all controllers and actions in a new project.  In production, it's good practice to set this to `false` to prevent access to any logic you might have inadvertently exposed.

Allow public access to the mapped controller/action.  This will allow any request to get through, no matter what.

```javascript
module.exports = {
  UserController: {

    // login should always be accessible
    login: true

  }
}
```


### false

**NO** access to the mapped controller/action.  No requests get through.  Period.

```javascript
module.exports = {
  MathController: {

    // This fancy algorithm we're working on isn't done yet
    // so we set it to false to disable it
    someFancyAlgorithm: false

  }
}
```


## Custom policies

You can apply one or more policies to a given controller or action.  Any file in your `/policies` folder (e.g. `authenticated.js`) is referable in your ACL (`config/policies.js`) by its filename minus the extension, (e.g.  `'authenticated'`).


```javascript
module.exports = {
  FileController: {
    upload: ['isAuthenticated', 'canWrite', 'hasEnoughSpace']
  }
}
```

## Multiple Policies

To apply two or more policies to a given action, (order matters!) you can specify an array, each referring to a specific policy. 

```javascript
UserController: {
    lock: ['isLoggedIn', 'isAdmin']
}
```

In each of the policies, the next policy in the chain will only be run if `next()`, the third argument, is called.  When and if the last policy calls `next()`, the requested controller action is run.



# Routes
### What is this?
Sails uses a number of different strategies to route requests. This section lists them top-to-bottom, in order of precedence.

### Moar


Sails uses a number of different strategies to route requests. Here they are top-to-bottom, in order of precedence:

##1. Static Assets
Flat files in your `assets` directory- (these are sometimes referred to as &lsquo;public&rsquo;)

If you have an image file at `/assets/images/foo.jpg`, it will be made available automatically via the route:  `/images/foo.jpg`


##2. Static Routes
This object routes static URLs to handler functions-- In most cases, these functions are actions inside of your controllers. For convenience, you can also connect routes directly to views or external URLs.

By default, your root route (aka home page) points to a view located at `views/home/index.ejs`. (This would also work if you had a file at: `/views/home.ejs`)


But what if you want your home page to display a signup form located at `views/user/signup.ejs`?
```javascript
'/' : {
	view : 'user/signup'
}
```

Let&rsquo;s say you&rsquo;re building an email client, like Gmail. You might want your home route to serve an interface using custom logic. In this scenario, you have a custom controller `MessageController` with an `inbox` action: `'/' : 'message.inbox'`

Alternatively, you can use the more verbose syntax:
```javascript
'/': {
	controller	: 'message',
	action		: 'inbox'
}
```

If you decided to call your action `index` instead of `inbox`, since the `index` action is the default, you can shortcut even further to: `'/': 'MessageController'`



Up until now, we haven&rsquo;t specified a specific HTTP method/verb. The routes above will apply to ALL verbs! If you want to set up a route only for one in particular (GET, POST, PUT, DELETE, etc.), just specify the verb before the path. 

For example, if you have a `UserController` with a `signup` action, and somewhere else, you&rsquo;re serving a signup form that looks like:
```html
<form action="/signup">
	<input name="username" type="text"/>
	<input name="password" type="password"/>
</form>
```
You could define the following route: `'post /signup'	: 'user.signup'`.

Finally, here&rsquo;s an example of how you would route all GET requests to the `/google` route to Google&rsquo;s website: `'get /google'	: 'http://google.com'`

## 3. Advanced Route config
#### Upload Limit
By default routes are limited to `10mb` uploads, to change the upload limit set the `uploadLimit` config on your route:
```javascript
'/': {
	...,
	uploadLimit: '100mb'
}
```
The limit setting uses `express.limit()` internally, and supports any valid [connect.limit()](http://www.senchalabs.org/connect/limit.html) values 
#### CORS (Cross origin resource sharing)
Additionally, you can also enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on a route:
```javascript
'/': {
	...,
	cors: true
	// cors: 'http://sailsjs.org, http://sailsjs.com'
}
```
If CORS is enabled on a route, the _csrf token is set to `null` to prevent accidental _csrf token exposure.
##4. Action Blueprints
These routes can be disabled in `config/controllers.js` by setting: `module.exports.controllers.routes.actions = false`
 

All of your controllers' actions are automatically bound to a route.  For example: If you have a controller, `FooController`:
+ its action `bar` is accessible at `/foo/bar`
+ its action `index` is accessible at `/foo/index`, and also `/foo`


##5. View Blueprints

These routes can be disabled in `config/controllers.js` by setting: `module.exports.views.routes = false`

If you have a view file at `/views/foo/bar.ejs`, it will be rendered and served automatically via the route:  `/foo/bar`


##6. Shortcut CRUD blueprints
These routes can be disabled in `config/controllers.js` by setting: `module.exports.controllers.routes.shortcuts = false`

If you have a model, `Foo`, and a controller, `FooController`, you can access CRUD operations for that model at:
+ `/foo/find/:id?`	->	search lampshades using specified criteria or with id=:id
+ `/foo/create`	->	create a lampshade using specified values		
+ `/foo/update/:id`	->	update the lampshade with id=:id		
+ `/foo/destroy/:id`	->	delete lampshade with id=:id

##7. REST blueprints
These routes can be disabled in `config/controllers.js` by setting: `module.exports.controllers.routes.rest = false`
 
If you have a model, `Foo`, and a controller, `FooController`, you can access CRUD operations for that model at:
+ `get /foo/:id?`	->	search lampshades using specified criteria or with id=:id
+ `post /foo`		-> create a lampshade using specified values
+ `put /foo/:id`	->	update the lampshade with id=:id
+ `delete /foo/:id`	->	delete lampshade with id=:id

##8. Default 404 (not found) handler
Finally, if nothing else matched, the default 404 handler is triggered. See `config/404.js` to adjust your app&rsquo;s 404 logic.


# Session
### What is this?
Sails session integration leans heavily on the great work already done by Express, but also unifies Socket.io with the Connect session store.

### Moar



Sails session integration leans heavily on the great work already done by Express, but also unifies 
Socket.io with the Connect session store. It uses Connect&rsquo;s cookie parser to normalize configuration
differences between Express and Socket.io and hooks into Sails&rsquo; middleware interpreter to allow you
to access and auto-save to `req.session` with Socket.io the same way you would with Express.

For more information on configuring the session, check out:
http://sailsjs.org/#!documentation

##`secret`
Session secret is automatically generated when your new app is created.
Replace at your own risk in production-- you will invalidate the cookies of your users, forcing them to log in again. 

##Shared Redis session store
In production, uncomment the following line to set up a shared redis session store
that can be shared across multiple Sails.js servers.
```javascript
adapter: 'redis',
```

The following values are optional, if no options are set a redis instance running
on localhost is expected.
Read more about options at: https://github.com/visionmedia/connect-redis
```javascript
        host: 'localhost',
        port: 6379,
        ttl: <redis session TTL in seconds>,
        db: 0,
        pass: <redis auth password>
        prefix: 'sess:'
```

Uncomment the following lines to use your Mongo adapter as a session store
```javascript
        adapter: 'mongo',

        host: 'localhost',
        port: 27017,
        db: 'sails',
        collection: 'sessions',
```
Optional Values:
```javascript
        // # Note: url will override other connection settings
        // url: 'mongodb://user:pass@host:port/database/collection',

        username: '',
        password: '',
        auto_reconnect: false,
        ssl: false,
        stringify: true

```







# Sockets
### What is this?
These configuration options provide transparent access to Sails’ encapsulated pubsub/socket server for complete customizability.

### Moar



These configuration options provide transparent access to Sails&rsquo; encapsulated pubsub/socket server for complete customizability.

##transports
Here is an array of allowed transport methods which the clients will try to use. The flashsocket transport is disabled by default; you can enable flashsockets by adding &lsquo;flashsocket&rsquo; to this list:
```javascript   
    transports: [
    'websocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling'
   ],
```

##adapter
`adapter: 'memory'`

The data store where socket.io will store its message queue and answer pubsub logic


##MQ Support for Redis
Node.js (and consequently Sails.js) apps scale horizontally. It&rsquo;s a powerful, efficient approach, but it involves a tiny bit of planning. At scale, you&rsquo;ll want to be able to copy your app onto multiple Sails.js servers and throw them behind a load balancer.

One of the big challenges of scaling an application is that these sorts of clustered deployments cannot share memory, since they are on physically different machines. On top of that, there is no guarantee that a user will &ldquo;stick&rdquo; with the same server between requests, since the load balancer will route each request to the server with the least impact on load. All pubsub processing and shared memory has to be offloaded to a shared, remote messaging queue (usually Redis).

Luckily, Sails provides production MQ support for Redis by default!

To enable a remote redis pubsub server:
```javascript
adapter: 'redis',

// The IP address and configuration of your redis host:
// (if left unset, Sails will try to connect to a redis via port 6379 on localhost)

host: '127.0.0.1',
port: 6379,
db: 'sails',
pass: '<redis auth password>'
```

###origins
`origins: '*:*'`

Match string representing the origins that are allowed to connect to the Socket.IO server

##heartbeats
`heartbeats: true`

Sets whether we should use heartbeats to check the health of Socket.IO connections

##close timeout
`'close timeout': 60`

When client closes connection, the # of seconds to wait before attempting a reconnect. This value is sent to the client after a successful handshake.

##heartbeat timeout
`'heartbeat timeout': 60`

The # of seconds between heartbeats sent from the client to the server. This value is sent to the client after a successful handshake.

##heartbeat interval
`'heartbeat interval': 25`

The max # of seconds to wait for an expcted heartbeat before declaring the pipe broken. This number should be less than the `heartbeat timeout`

##polling duration
`'polling duration': 20`

The maximum duration of one HTTP poll; if it exceeds this limit it will be closed.

##flash policy server
`'flash policy server': true`

Enables the flash policy server if the flashsocket transport is enabled. 

##flash policy port
`'flash policy port': 10843`

By default the Socket.io client will check port 10843 on your server to see if flashsocket connections are allowed. The Adobe Flash Player normally uses 843 as default port but Socket.io defaults to a non root port (10843) by default.

If you are using a hosting provider that doesn&rsquo;t allow you to start servers other than on port 80 or the provided port, and you still want to support flashsockets  you can set the `flash policy port` to -1

##destroy buffer size
`'destroy buffer size': '10E7'`

Used by the HTTP transports. The Socket.io server buffers HTTP request bodies up to this limit. This limit is not applied to websocket or flashsockets.

##destroy upgrade
`'destroy upgrade': true`

Do we need to destroy non-socket.io upgrade requests?

##browser client
`'browser client': true`

Should Sails/Socket.io serve the `socket.io.js` client? (as well as WebSocketMain.swf for Flash sockets, etc.)

##browser client cache
`'browser client cache': true`

Cache the Socket.io file generation in the memory of the process to speed up the serving of the static files.

##browser client minification
`'browser client minification': false`

Does Socket.io need to send a minified build of the static client script?

##browser client etag
`'browser client etag': false`

Does Socket.io need to send an ETag header for the static requests?

##browser client expires
`'browser client expires': 315360000`

Adds a Cache-Control: private, x-gzip-ok=&ldquo;&rdquo;, max-age=31536000 header to static requests, but only if the file is requested with a version number like /socket.io/socket.io.v0.9.9.js.

##browser client gzip
`'browser client gzip': false`

Does Socket.io need to GZIP the static files? This process is only done once and the computed output is stored in memory so we don&rsquo;t have to spawn a gzip process for each request.

##browser client handler
`'browser client handler': false`

Optional override function to serve all static files, including socket.io.js et al. Of the form :: `function (req, res) { /* serve files */ }`

##match origin protocol
`'match origin protocol': false`

Meant to be used when running socket.io behind a proxy. Should be set to true when you want the location handshake to match the protocol of the origin. This fixes issues with terminating the SSL in front of Node and forcing location to think it&rsquo;s wss instead of ws.


##authorization
`authorization: true`

Global authorization for Socket.io access. This is called when the initial handshake is performed with the server. By default, Sails verifies that a valid cookie was sent with the upgrade request However, in the case of cross-domain requests, no cookies are sent for some transports, so sockets will fail to connect.  You might also just want to allow anyone to connect w/o a cookie!
 
To bypass this cookie check, you can set `authorization: false`, which will silently create an anonymous cookie+session for the user.

`authorization: true` indicates that Sails should use the built-in logic

You can also use your own custom logic with: `authorization: function (data, accept) { ... }`

##store
`store: undefined`

Direct access to the Socket.io MQ store config. The &lsquo;adapter&rsquo; property is the preferred method (`undefined` indicates that Sails should defer to the &lsquo;adapter&rsquo; config)

##logger
`logger: undefined`

A logger instance that is used to output log information. (`undefined` indicates deferment to the main Sails log config)

##log level
`'log level': undefined`

The amount of detail that the server should output to the logger. (`undefined` indicates deferment to the main Sails log config)

##log colors
`'log colors': undefined`

Whether to color the log type when output to the logger. (`undefined` indicates deferment to the main Sails log config)

##static
`'static': undefined`

A Static instance that is used to serve the Socket.io client and its dependencies.

##resource
`resource: '/socket.io'`

The entry point where Socket.io starts looking for incoming connections. This should be the same between the client and the server.









# Views
### What is this?
Server-sent views are a classic and effective way to get your app up and running. Views are normally served from controllers, but by default, Sails also exposes routes to allow you to preview your viewsn in a browser.

### Moar


##Routes
If enabled, views are automatically served at logical routes, based on their paths. This comes in handy any time you just want to serve some static HTML. (i.e. a brochure site)

For example, the static view files below are available at the specified routes:

+ `views/catalog.ejs`  		: `get /catalog`
+ `views/catalog/index.ejs`	: both `get /catalog` & `get /catalog/index`
+ `views/catalog/story.ejs`	: `get /catalog/story`


##Layouts
Layouts are simply top-level HTML templates you can use as wrappers for your server-side views.  If you&rsquo;re using ejs, you can take advantage of Sails&rsquo; built-in `layout` support.

With using a layout, when one of your views is served, it is injected into the `<%- body %>` partial defined in the layout.  This lets you reuse header and footer logic between views.

The `layout` setting may be set to one of:

+ false		::	don&rsquo;t use a layout (just render the view by itself)
+ &ldquo;string&rdquo;		::	the relative path to your layout from your views folder (`views/`)

If you&rsquo;d like to use more than one `layout` file, you can! 
See the [full documentation on views](https://github.com/balderdashy/sails-wiki/blob/0.9/views.md) for more information.


###Using Layouts With Other View Engines
In Express 3, built-in support for layouts/partials was deprecated. Instead, developers are expected to rely on the view engines themselves to implement this features. (See https://github.com/balderdashy/sails/issues/494 for more info on that.)

Since adopting Express 3, Sails has chosen to support the legacy `layouts` feature for convenience, backwards compatibility with Express 2.x and Sails 0.8.x apps, and in particular, familiarity for new community members coming from other MVC frameworks. As a result, layouts have only been tested with the default view engine (ejs).

If layouts aren&rsquo;t your thing, or (for now) if you&rsquo;re using a server-side view engine other than ejs, (e.g. Jade, handlebars, haml, dust) you&rsquo;ll need to set this option to: `layout:false` and then rely on your view engine&rsquo;s built-in layout/partial support.

