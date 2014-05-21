# myApp/config/local.js
### Purpose

This file contains your Sails app's local environment settings.  Modify this when you need to change the port or production environment of your app.  

While you're developing your app, this config file should include any settings specifically for your development computer (db passwords, etc.)

When you're ready to deploy your app in production, you can use this file for configuration options on the server where it will be deployed.


> PLEASE NOTE: 
This file is included in your .gitignore, so if you're using git as a version control solution for your Sails app, keep in mind that this file won't be committed to your repository!
>
> The good news is, that means you can specify configuration for your local machine in this file without inadvertently committing personal information (like database passwords) to the repo.  Plus, this prevents other members of your team from commiting their local configuration changes on top of yours.

##### Port
The `port` setting determines which TCP port your app will be deployed on. Ports are a transport-layer concept designed to allow many different networking applications to run at the same time on a single computer.

You can read more about ports [right here](http://en.wikipedia.org/wiki/Port_(computer_networking)).

By default, if it's set, Sails uses the `PORT` environment variable. Otherwise it falls back to port 1337.

In production, you'll probably want to change this setting to 80 (http://) or 443 (https://) if you have an SSL certificate


##### Environment
The runtime "environment" of your Sails app is either 'development' or 'production'.

In development, your Sails app will go out of its way to help you.  For instance, you will receive more descriptive error and debugging output.

In production, Sails configures itself (and its dependencies) to optimize performance. You should always put your app in production mode before you deploy it to a server- This helps ensure that your Sails app remains stable, performant, and scalable.

By default, Sails sets its environment using the `NODE_ENV` environment variable. If NODE_ENV is not set, Sails will run in the 'development' environment.



<docmeta name="uniqueID" value="localjs386958">
<docmeta name="displayName" value="local.js">

```
/**
 * Local environment settings
 *
 * While you're DEVELOPING your app, this config file should include
 * any settings specifically for your development computer (db passwords, etc.)
 *
 * When you're ready to deploy your app in PRODUCTION, you can always use this file
 * for configuration options specific to the server where the app will be deployed.
 * But environment variables are usually the best way to handle production settings.
 *
 * PLEASE NOTE:
 *		This file is included in your .gitignore, so if you're using git
 *		as a version control solution for your Sails app, keep in mind that
 *		this file won't be committed to your repository!
 *
 *		Good news is, that means you can specify configuration for your local
 *		machine in this file without inadvertently committing personal information
 *		(like database passwords) to the repo.  Plus, this prevents other members
 *		of your team from commiting their local configuration changes on top of yours.
 *
 *
 * For more information, check out:
 * http://links.sailsjs.org/docs/config/local
 */

module.exports = {

  // Your SSL certificate and key, if you want to be able to serve HTTP responses
  // over https:// and/or use websockets over the wss:// protocol
  // (recommended for HTTP, strongly encouraged for WebSockets)
  //
  // In this example, we'll assume you created a folder in your project, `config/ssl`
  // and dumped your certificate/key files there:
  // ssl: {
  //   ca: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl_gd_bundle.crt'),
  //   key: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.key'),
  //   cert: require('fs').readFileSync(__dirname + './ssl/my_apps_ssl.crt')
  // },


  // The `port` setting determines which TCP port your app will be deployed on
  // Ports are a transport-layer concept designed to allow many different
  // networking applications run at the same time on a single computer.
  // More about ports: http://en.wikipedia.org/wiki/Port_(computer_networking)
  //
  // By default, if it's set, Sails uses the `PORT` environment variable.
  // Otherwise it falls back to port 1337.
  //
  // In production, you'll probably want to change this setting
  // to 80 (http://) or 443 (https://) if you have an SSL certificate

  port: process.env.PORT || 1337,



  // The runtime "environment" of your Sails app is either 'development' or 'production'.
  //
  // In development, your Sails app will go out of its way to help you
  // (for instance you will receive more descriptive error and debugging output)
  //
  // In production, Sails configures itself (and its dependencies) to optimize performance.
  // You should always put your app in production mode before you deploy it to a server-
  // This helps ensure that your Sails app remains stable, performant, and scalable.
  //
  // By default, Sails sets its environment using the `NODE_ENV` environment variable.
  // If NODE_ENV is not set, Sails will run in the 'development' environment.

  environment: process.env.NODE_ENV || 'development'

};

```
