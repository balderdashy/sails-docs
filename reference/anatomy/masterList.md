# myApp
## myApp
### Purpose
This is your Sails project's root directory.  It and most of the files and folders that are in it were generated upon running `sails new` .

### More Info




# UserController.js
## myApp/api/controllers/UserController.js
### Purpose
This file was created when you ran 'sails generate User'.  It contains all of the controller logic for the model called 'User'. 

This is where you will put "controller actions" that sends app data to your clients and render the views which display that data.

### More Info




# api
## myApp/api
### Purpose
This folder contains the vast majority of your app's back-end logic.  It houses the 'M' and 'C' in <a href="http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller"> MVC Framework </a>

### More Info
If you're new to MVC, check out <a href="http://omfgdogs.com"> This Link </a>



# User.js
## myApp/api/models/User.js
### Purpose
This file was created when you ran 'sails generate User'.  It contains the structure for the model called 'User'.

In this file you will specify what attributes each model instance should have.  You can also add custom model instance methods, specify 'policies', and even specify which storage adapter should be used for storing/retreiving these records.  


### More Info




# policies
## myApp/api/policies
### Purpose
This is the folder you will store your 'policy' files in.  A policy file is a .js file that contains what is essentially express middleware.  

In your model, you can specify policies located in this folder.  Before the model is accessed, clients will be authenticated by these policies. 

### More Info




# services
## myApp/api/services
### Purpose
This folder contains your services.  'Services' are similar to controller actions but are typically used for things like

For any logic that doesnt rely on req and res

- 
- 
- 

Each service is specified as its own .js file within this folder.  They can be called inside of a controller action by using EEEEPPPP!!! 

### More Info




# app.js
## myApp/app.js
### Purpose
I DON'T KNOW!!!

### More Info




# favicon.ico
## myApp/assets/favicon.ico
### Purpose
This file is the <a href="http://en.wikipedia.org/wiki/Favicon"> Favicon </a> for your app.  


### More Info




# images
## myApp/assets/images
### Purpose

This is where you should put image files that need to be statically hosted by your app.  

Upon lifting your app, an image called 'omgCat.jpg' could be found at http://localhost:1337/images/omgCat.jpg

### More Info




# app.js
## myApp/assets/js/app.js
### Purpose

Every time you view a page on your Sails app, a connection between your browser and Sails is made via socket.io .  This file is the reason that connection is made. It contains some conventional defaults for working with Socket.io + Sails.

Furthermore, it's a great place to put additional socket.io code in order to keep it clean and seperate from your other client-side javascript.



### More Info




# sails.io.js
## myApp/assets/js/sails.io.js
### Purpose
This file adds a few custom methods to socket.io which provide the "built-in" websockets functionality for Sails.

Specifically, those methods allow you to send and receive socket.io messages to & from Sails by simulating a REST client interface on top of socket.io. It models its API after the $.ajax pattern from jQuery you might be familiar with.


### More Info




# js
## myApp/assets/js
### Purpose
This is where you put client-side javascript files that you want to be statically hosted by your app.  Sails puts a few in there for making communication via socket.io easier.  
### More Info




# assets
## myApp/assets
### Purpose
This is your assets folder.  It houses all of the static files that your app will need to host.   Feel free to create your own files and folders in here.  Upon lifting, a file called 'newFolder.txt' could be accessed at http://localhost:1337/newFolder.txt .

The style,js, and images subdirectories are compressed and minified when you lift your app in production mode. Also, when you create your sails app with the --linker flag, these subdirectories and their contents are not only minified but injected into the DOM for each view that you render.  

### More Info




# robots.txt
## myApp/assets/robots.txt
### Purpose
This file tells web crawlers and search bots about your app.  It tells them what kind of content to expect as well as how to index it.

Learn all about robots.txt <a href="http://www.robotstxt.org/robotstxt.html"> right here </a> .

### More Info




# styles
## myApp/assets/styles
### Purpose
This is where you will put all of the .css files that you would like to be statically hosted by your app. 

### More Info







# 404.js
## myApp/config/404.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '404' status code for an http request.  

If no route matches are found for a request, Sails will respond using this handler.

This middleware can also be invoked manually from a controller or policy with `res.notFound()`

NOTE: This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.

### More Info




# 500.js
## myApp/config/500.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '500' status code for an http request.  

Default 500 (Server Error) middleware

If an error is thrown in a policy or controller, Sails will respond using this default error handler

This middleware can also be invoked manually from a controller or policy with `res.serverError( [errors] )`

NOTE: This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.



### More Info




# bootstrap.js
## myApp/config/bootstrap.js
### Purpose
This is a server-side javascript file that is executed by Sails just before your app is lifted.

This gives you an opportunity to set up your data model, run jobs, or perform some special logic.


### More Info




# controllers.js
## myApp/config/controllers.js
### Purpose

This file contains the global configuration settings for your app's controller & blueprint routes.

In it you will find the following settings

| Setting Name | Default Setting | What it do? |
|--------------|-----------------|-------------|
| blueprints.rest | true | Should REST API routes be generated for this controller ? | 
| blueprints.action | true | Should routes be generated for and linked to controller actions? |
| blueprints.shortcuts | true | Should the various http methods be mapped to their appropriate CRUD method? |
| blueprints.prefix | null | Should the given string be prepended to all routes for this controller? |
| blueprints.pluralize | false | Should sails append an 's' to automatically generated routes for this controller? |
| expectIntegerId | false | Should Sails assume that every 'id' in the query string for actions on this controller be an integer? |
| jsonp | false | Should Sails allow built-in CRUD methods to support JSONP for cross-domain requests on this controller? |

You may also override these settings on a per-controller basis by defining a '_config' key in any of your controller files, and assigning it an object.

### More Info




# cors.js
## myApp/config/cors.js
### Purpose
This file defines how your Sails app handles CORS and contains settings for configuring it.

Cross-Origin Resource Sharing is like a more modern version of JSONP. It allows your server/API to successfully respond to requests from client-side JavaScript code running on some other domain (e.g. google.com)

Unlike JSONP, it works with POST, PUT, and DELETE requests

For more information on CORS, check out <a href="http://en.wikipedia.org/wiki/Cross-origin_resource_sharing"> this here hyperlink </a> .

This can be changed on a per-route basis by adding a "cors" object to the route configuration like this

```javascript

'/get foo': {
  controller: 'foo',
  action: 'bar',
  cors: {
    origin: 'http://foobar.com,https://owlhoot.com'	
  }
 }

```



### More Info




# csrf.js
## myApp/config/csrf.js
### Purpose
This file defines how your Sails app handles CSRF and contains settings for configuring it.


Cross-Site Request Forgery Protection tokens are like a tracking chip.  While a session tells the server that a user "is who they say they are", a csrf token tells the server "you are where you say you are".

When enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified as the '_csrf' parameter.

This option protects your Sails app against cross-site request forgery (or CSRF) attacks. A would-be attacker needs not only a user's session cookie, but also this timestamped, secret CSRF token, which is refreshed/granted when the user visits a URL on your app's domain.

This allows us to have certainty that our users' requests haven't been hijacked, and that the requests they're making are intentional and legitimate.

This token has a short-lived expiration timeline, and must be acquired by either:

(a) For traditional view-driven web apps:
	- Fetching it from one of your views, where it may be accessed as a local variable, e.g.
```html
<form>
	<input type="hidden" name="_csrf" value="<%= _csrf %>" />
</form>
```

(b)	For AJAX/Socket-heavy and/or single-page apps: 
 - Sending a GET request to the `/csrfToken` route, where it will be returned as JSON, e.g.
```javascript
{ _csrf: 'ajg4JD(JGdajhLJALHDa' }
```

Enabling this option requires managing the token in your front-end app. For traditional web apps, it's as easy as passing the data from a view into a form action.

In AJAX/Socket-heavy apps, just send a GET request to the /csrfToken route to get a valid token.

For more information on CSRF, check out <a href="http://en.wikipedia.org/wiki/Cross-site_request_forgery"> this hyperlink </a>

### More Info




# i18n.js
## myApp/config/i18n.js
### Purpose
This file contains your Sails app's <a href="http://en.wikipedia.org/wiki/Locale"> supported locales </a>. 

### More Info




# locales
## myApp/config/locales
### Purpose
This folder contains the information that is used by your app in supporting different <a href="http://en.wikipedia.org/wiki/Locale"> locales </a>. 

### More Info




# local.js
## myApp/config/local.js
### Purpose

This file contains your Sails app's local environment settings.  Modify this when you need to change the port or production environment of your app.  

While you're developing your app, this config file should include any settings specifically for your development computer (db passwords, etc.)

When you're ready to deploy your app in production, you can use this file for configuration options on the server where it will be deployed.


PLEASE NOTE: 
This file is included in your .gitignore, so if you're using git as a version control solution for your Sails app, keep in mind that this file won't be committed to your repository!

The good news is, that means you can specify configuration for your local machine in this file without inadvertently committing personal information (like database passwords) to the repo.  Plus, this prevents other members of your team from commiting their local configuration changes on top of yours.

##### Port
The `port` setting determines which TCP port your app will be deployed on. Ports are a transport-layer concept designed to allow many different networking applications to run at the same time on a single computer.

You can read more about ports <a href="http://en.wikipedia.org/wiki/Port_(computer_networking)"> right here </a>.

By default, if it's set, Sails uses the `PORT` environment variable. Otherwise it falls back to port 1337.

In production, you'll probably want to change this setting to 80 (http://) or 443 (https://) if you have an SSL certificate


##### Environment
The runtime "environment" of your Sails app is either 'development' or 'production'.

In development, your Sails app will go out of its way to help you.  For instance, you will receive more descriptive error and debugging output.

In production, Sails configures itself (and its dependencies) to optimize performance. You should always put your app in production mode before you deploy it to a server- This helps ensure that your Sails app remains stable, performant, and scalable.

By default, Sails sets its environment using the `NODE_ENV` environment variable. If NODE_ENV is not set, Sails will run in the 'development' environment.

### More Info




# log.js
## myApp/config/log.js
### Purpose

This file contains the logger configuration for your Sails app. 

Configure the log level for your app, as well as the transport. 

Underneath the covers, Sails uses Winston for logging, which allows for some pretty neat custom transports/adapters for log messages.

### More Info




# config
## myApp/config
### Purpose
This folder contains various files that will allow you to customize and configure your Sails app.

### More Info




# session.js
## myApp/config/session.js
### Purpose


### More Info




# views.js
## myApp/config/views.js
### Purpose


### More Info




# Gruntfile.js
## myApp/Gruntfile.js
### Purpose


### More Info




# package.json
## myApp/package.json
### Purpose


### More Info




# README.md
## myApp/README.md
### Purpose


### More Info




# home
## myApp/views/home
### Purpose


### More Info




# 500.ejs
## myApp/views/500.ejs
### Purpose


### More Info




# index.ejs
## myApp/views/home/index.ejs
### Purpose


### More Info




# layout.ejs
## myApp/views/layout/ejs
### Purpose


### More Info




# views
## myApp/views
### Purpose


### More Info




# adapters
## myApp/api/adapters
### Purpose


### More Info




# controllers
## myApp/api/controllers
### Purpose


### More Info




# models
## myApp/api/models
### Purpose


### More Info




# isAuthenticated.js
## myApp/api/policies/isAuthenticated.js
### Purpose


### More Info




# assets/js/socket.io.js
## myApp/assets/js/socket.io.js
### Purpose


### More Info




# 400.js
## myApp/config/400.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '400' status code for an http request.  

Sails will automatically respond using this middleware when a blueprint is requested
with missing or invalid parameters

(e.g. `POST /user` was used to create a user, but required parameters were missing)

This middleware can also be invoked manually from a controller or policy:
res.badRequest( [validationErrors], [redirectTo] )

For requesters expecting JSON, everything works like you would expect. A simple JSON response indicating the 400: Bad Request status with relevant information will be returned. 

For traditional (not-AJAX) web forms, this middleware follows best-practices for when a user submits invalid form data:

i. First, a one-time-use flash variable is populated, probably a string message or an array of semantic validation error objects.
ii.Then the user is redirected back to `redirectTo`, i.e. the URL where the bad request originated.
iii. There, the controller and/or view might use the flash `errors` to either display a message or highlight the invalid HTML form fields.

### More Info




# 403.js
## myApp/config/403.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '403' status code for an http request.  

This middleware can be invoked from a controller or policy with `res.forbidden( [message] )`

@param {String|Object|Array} message

The message parameter is an optional message to inject into view locals or JSON response

NOTE: This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.

### More Info




# adapters.js
## myApp/config/adapters.js
### Purpose


### More Info




# policies.js
## myApp/config/policies.js
### Purpose


### More Info




# routes.js
## myApp/config/routes.js
### Purpose


### More Info




# sockets.js
## myApp/config/sockets.js
### Purpose


### More Info




# 403.ejs
## myApp/views/403.ejs
### Purpose


### More Info




# 404.ejs
## myApp/views/404.ejs
### Purpose

### More Info




