#Configuration
> _**Note:** You are viewing the Sails.js v0.9.x documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

###Contents:
####[404](https://github.com/balderdashy/sails-wiki/blob/0.9/config.404.md)
The default 404 error handler.

####[500](https://github.com/balderdashy/sails-wiki/blob/0.9/config.500.md)
The default 500 error handler.

####[Adapters](https://github.com/balderdashy/sails-wiki/blob/0.9/config.adapters.md)
The adapters configuration object lets you create different global “saved settings” that you can mix and match in your models. 

####[Bootstrap](https://github.com/balderdashy/sails-wiki/blob/0.9/config.bootstrap.md)
This is an asynchronous boostrap function that runs before your Sails app gets lifted (i.e. starts up). This gives you an opportunity to set up your data model, run jobs, or perform some special logic.

####[Controllers](https://github.com/balderdashy/sails-wiki/blob/0.9/config.controllers.md)
By default, Sails controllers automatically bind routes for each of their functions. Additionally, each controller will automatically bind routes for a CRUD API controlling the model which matches its name, if one exists.

####[CSRF](https://github.com/balderdashy/sails-wiki/blob/0.9/config.csrf.md)
When enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified as the '_csrf' parameter.

####[Local](https://github.com/balderdashy/sails-wiki/blob/0.9/config.local.md)
While you’re developing your app, this config file should include any settings specifically for your development computer (db passwords, etc.)

####[Locales](https://github.com/balderdashy/sails-wiki/blob/0.9/config.locales.md)
This is a folder that contains the Language files for different locales.

####[Log](https://github.com/balderdashy/sails-wiki/blob/0.9/config.log.md)
The logger file configures the log level for your app, as well as the transport.

####[Policies](https://github.com/balderdashy/sails-wiki/blob/0.9/config.policies.md)
Policies are like any other system for authentication control. You can allow or deny access in fine granularity with policies.

####[Routes](https://github.com/balderdashy/sails-wiki/blob/0.9/config.routes.md)
Sails uses a number of different strategies to route requests. This section lists them top-to-bottom, in order of precedence.

####[Session](https://github.com/balderdashy/sails-wiki/blob/0.9/config.session.md)
Sails session integration leans heavily on the great work already done by Express, but also unifies Socket.io with the Connect session store.

####[Sockets](https://github.com/balderdashy/sails-wiki/blob/0.9/config.sockets.md)
These configuration options provide transparent access to Sails’ encapsulated pubsub/socket server for complete customizability.

####[Views](https://github.com/balderdashy/sails-wiki/blob/0.9/config.views.md)
Server-sent views are a classic and effective way to get your app up and running. Views are normally served from controllers, but by default, Sails also exposes routes to allow you to preview your viewsn in a browser.
