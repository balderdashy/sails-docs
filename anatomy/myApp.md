# myApp
### Purpose
This is your Sails project's root directory.  With the exception of your model and controller, all the files and folders that are in it were generated upon running `sails new` .



# myApp/api/controllers/UserController.js
### Purpose
This file was created when you ran 'sails generate User'.  It contains all of the controller logic for the model called 'User'. 

This is where you will put "controller actions" that send data to your clients and render the views which display that data.


# myApp/api
### Purpose
This folder contains the vast majority of your app's back-end logic.  It is home to the 'M' and 'C' in [MVC Framework](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

In it you will find the following.

- Adapters: Adapters are the middle man between your Sails app and the database.  
- Controllers: Controllers contain most of the back-end logic for your app.
- Models: Models are the structures that contain data for your Sails App.
- Policies: Policies are typically used to authenticate clients and restrict access to certain parts of your app.
- Services: Services are similar to controller actions.  They contain logic that used by your app that doesn't necessarily rely on `.req()` and `.res()`.  

### More Info
If you're new to MVC, check out [this link](http://omfgdogs.com).



# myApp/api/models/User.js
### Purpose
This file was created when you ran 'sails generate User'.  It contains the structure for the model called 'User'.

In this file you will specify what attributes each model instance (record) should have.  You can also add custom model instance methods, specify 'policies' which can be defined in `/myApp/api/policies/` , and even specify which storage adapter should be used for storing/retreiving these records.  

One of the best parts about Sails is it uses [Waterline](https://github.com/balderdashy/waterline).  This means you can start developing your data models long before you commit to a particular database. 



# myApp/api/policies
### Purpose
This is the folder you will store your `policy` files in.  A policy file is a .js file that contains what is essentially express middleware for authenticating access to routes in your app.  

If you want to make sure only the user `rick1983` can access `http://prism.gov/rick1983` , this is the folder you would put that policy in. 



# myApp/api/services
### Purpose
This folder contains your services.  'Services' are similar to controller actions but are typically used for things that don't nessecarily have to happen between the time when the user sends a request and when the server sends back a response.  Any logic that doesn't rely on `.req()` and `.res()` can be turned into a service if for no other reason than to keep your controllers clean and managable.  

Hypothetically, one could create a service for

- Sending emails
- Automating tweets to celebrities
- Retreiving data from a third party API then pushing that data to your client WHEN IT'S READY (over websockets)

Each service is specified as its own .js file within this folder.  They can be called inside of a controller action by using `Services.<serviceName>.<functionName>()`. 



# myApp/app.js
### Purpose
This file exists only to tell Node how to start your app.  It is used once and only when you lift your app from the command line.  You should just ignore this file.



# myApp/assets/favicon.ico
### Purpose
This file is the [Favicon](http://en.wikipedia.org/wiki/Favicon") for your app.  



# myApp/assets/images
### Purpose

This is where you should put image files that need to be statically hosted by your app.  

Upon lifting your app, an image called `omgCat.jpg` could be found at `http://localhost:1337/images/omgCat.jpg`



# myApp/assets/js/app.js
### Purpose

Every time you view a page on your Sails app, a connection between your browser and Sails is made via Socket.IO.  This file is the reason that connection is made. It should be treated as an example for working with Socket.IO + Sails.

Furthermore, it's a great file to keep and add additional Socket.IO code in order to keep your Socket.IO code clean and seperate from your other client-side javascript.



# myApp/assets/js/sails.io.js
### Purpose
This file adds a few custom methods to socket.io which provide the "built-in" websockets functionality for Sails.

Specifically, those methods allow you to send and receive Socket.IO messages to & from Sails by simulating a REST client interface on top of Socket.IO. It models it's API after the $.ajax pattern from jQuery which you might be familiar with.



# myApp/assets/js
### Purpose
This is where you put client-side javascript files that you want to be statically hosted by your app.  Sails puts a few in there for making communication via socket.io easier.



# myApp/assets
### Purpose
This is your assets folder.  It houses all of the static files that your app will need to host.  Feel free to create your own files and folders in here.  Upon lifting, a file called `myApp/assets/newFolder/data.txt` could be accessed at `http://localhost:1337/newFolder/data.txt`.




# myApp/assets/robots.txt
### Purpose
This file tells web crawlers and search bots about your app.  It tells them what kind of content to expect as well as how to index it.

Learn all about robots.txt [right here](http://www.robotstxt.org/robotstxt.html).



# myApp/assets/styles
### Purpose
This is where you will put all of the .css files that you would like to be statically hosted by your app. 



# myApp/config/400.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '400' status code for an http request.  

If no route matches are found for a request, Sails will respond using this handler.

This middleware can also be invoked manually from a controller or policy with `res.badRequest([Error Message])`

> **NOTE:** This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.



# myApp/config/403.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '403' status code for an http request.  

If no route matches are found for a request, Sails will respond using this handler.

This middleware can also be invoked manually from a controller or policy with `res.forbidden([Error Message])`

> **NOTE:** This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.



# myApp/config/404.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '404' status code for an http request.  

If no route matches are found for a request, Sails will respond using this handler.

This middleware can also be invoked manually from a controller or policy with `res.notFound([Error Message])`

> **NOTE:** This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.



# myApp/config/500.js
### Purpose
This file contains customizable Sails middleware used to assist with delivering the '500' status code for an http request.  

Default 500 (Server Error) middleware

If an error is thrown in a policy or controller, Sails will respond using this default error handler

This middleware can also be invoked manually from a controller or policy with `res.serverError([Error Message])`

> **NOTE:** This function is Sails middleware. This means that not only do `req` and `res` work just like their Express equivalents to handle HTTP requests, they also simulate the same interface for receiving socket messages.




# myApp/config/bootstrap.js
### Purpose
This is a server-side javascript file that is executed by Sails just before your app is lifted.

This gives you an opportunity to set up your data model, run jobs, or perform some special logic.




# myApp/config/controllers.js
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

You may also override these settings on a per-controller basis by defining a `_config` key in any of your controller files, and assigning it an object.



# myApp/config/cors.js
### Purpose
This file defines how your Sails app handles CORS and contains settings for configuring it.

Cross-Origin Resource Sharing is like a more modern version of JSONP. It allows your server/API to successfully respond to requests from client-side JavaScript code running on some other domain (e.g. google.com)

Unlike JSONP, it works with POST, PUT, and DELETE requests

For more information on CORS, check out [this here hyperlink](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)".

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



# myApp/config/csrf.js
### Purpose
This file defines how your Sails app handles CSRF and contains settings for configuring it.

Cross-Site Request Forgery Protection tokens are like a tracking chip.  While a session tells the server that a user "is who they say they are", a csrf token tells the server "you are where you say you are".

When enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified as the `_csrf` parameter.

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



### More Info
> For more information on CSRF, check out [this hyperlink](http://en.wikipedia.org/wiki/Cross-site_request_forgery).



# myApp/config/i18n.js
### Purpose
This file contains your Sails app's [supported locales](http://en.wikipedia.org/wiki/Locales). 




# myApp/config/locales
### Purpose
This folder contains the information that is used by your app in supporting visiting client's different [locales](http://en.wikipedia.org/wiki/Locale).



# myApp/config/locales/fr.json
### Purpose
This tells French browsers sexy things in JSON. 



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




# myApp/config/log.js
### Purpose

This file contains the logger configuration for your Sails app. 

Configure the log level for your app, as well as the transport. 

Underneath the covers, Sails uses Winston for logging, which allows for some pretty neat custom transports/adapters for log messages.



# myApp/config
### Purpose
This folder contains various files that will allow you to customize and configure your Sails app.



# myApp/config/session.js
### Purpose
This file contains information that tells Sails where to store your sessions.  

Sails session integration leans heavily on the great work already done by Express, but also unifies socket.io with the Connect session store. It uses Connect's cookie parser to normalize configuration differences between Express and socket.io and hooks into Sails' middleware interpreter to allow you to access and auto-save to `req.session` with Socket.io the same way you would with Express.

This is where you would go to configure a different session store like Redis or Mongo.  In this file you will find commented examples of what that configuration should look like.  

This file also contains your 'Session Secret' that is generated by Sails when you create your app.  Do not change or remove this unless you really know what you are doing. 




# myApp/config/views.js
### Purpose
This file is where Sails looks to find out which templating engine to use when rendering server side HTML templates.  By default Sails uses ejs but it supports all view engines which implement TJ Holowaychuk's `consolidate.js`, including, but not limited to:

- ejs
- jade
- handlebars
- mustache
- underscore
- hogan
- haml
- haml-coffee
- dust
- atpl
- eco
- ect
- jazz
- jqtpl
- JUST
- liquor
- QEJS
- swig
- templayed
- toffee
- walrus
- whiskers




# myApp/Gruntfile.js
### Purpose

Sails uses [GRUNT](http://gruntjs.com) for asset management. This file contains configuration information for the GRUNT tasks that Sails for this purpose. 

If you created your Sails app with `sails new foo --linker`, this is also where you can define the location of files that are automatically minified and injected (in order) into the views rendered by your app.

At the top part of this file, you'll find a few of the most commonly configured options, but Sails' integration with Grunt is also fully customizable.  If you'd like to work with your assets differently  you can change this file to do anything you like!

### More Info
> More information on using Grunt to work with static assets: http://gruntjs.com/configuring-tasks



# myApp/package.json
### Purpose
This is a standard configuration file for [NPM](https://npmjs.org/doc/json.html). Among other things, this file contains the name and version of all of the Node Modules that your app depends on to run.  You can change this manually but be careful to adhere to their rules or things might break.

### More Info
> Check out [this awesome interactive guide by Nodejitsu](http://package.json.nodejitsu.com) explaining package.json 


# myApp/README.md
### Purpose
If you want to create a [README file](http://en.wikipedia.org/wiki/README) for your app, this is a good place to put it.  If you host your app on Github, the contents of this file will be displayed at the bottom of the Github repo page.



# myApp/views/home
### Purpose
This folder contains the default view that is loaded when you visit the base URL of your app.  If you're curious how this happens, go look inside `myApp/config/routes.js` .  Spoiler alert, it's an explicitely defined route we setup by default.




# myApp/views/home/index.ejs
### Purpose
This is the actual template that is rendered by default when a user visits the base URL of your lifted app.  Notice the file extension?  It stands for [Embedded JavaScript](http://embeddedjs.com/).  EJS is what Sails uses by default to render server side HTML views.  This can be changed in `myApp/config/views.js`.

If a new view you've created isn't rendering, make sure you've hooked it up in your `myApp/config/routes.js`.

If you're used to putting all your HTML in a single file, this might look funny.  You might be thinking "Where are the head and body tags"?  The answer is, `myApp/views/layout.ejs`.



# myApp/views/layout.ejs
### Purpose
This [Embedded JavaScript file](http://embeddedjs.com/) acts as the default layout for all server side views rendered by your app.  

Before one of your custom views is sent to the client, it is injected into this file.  It is this file that is actually sent to the client.  

Feel free to change this as you see fit.  Its also a great place to include javascript and css that you plan on using in every view.  This keeps you from having to include them in all your custom .ejs files.  Note, this isnt an issue if you created your app with the `--linker` flag.  In this case, everything in your assets directory is minified and injected into every view rendered by your app. 




# myApp/views
### Purpose
This is the directory that holds all of your custom views.  

To create a custom view, create a new directory inside of this then create a new .ejs file.  In order for it to be rendered by a client, you must either set up a route in `myApp/config/routes.js` or use the `res.view()` method inside of a custom controller action.




# myApp/api/adapters
### Purpose
This is the directory that holds custom adapters.  If you arent writing any custom adapters, don't worry about this folder.  




# myApp/api/controllers
### Purpose
This is the directory that holds your controllers.  In Sails, controllers are javascript files that contain logic for interacting with models and rendering appropriate views to the client.

When you call `sails generate controller cats` via the command line from inside your project's root directory, Sails will generate the file `myApp/api/controllers/CatsController.js`. 



# myApp/api/models
### Purpose
This is the directory that holds your models.  In Sails, models are the structures that contain data for your Sails App.

When you call `sails generate model cats` via the command line from inside your project's root directory, Sails will generate the file `myApp/api/models/Cat.js`.  In that file you can put lay out how the records in your database will look and function.



# myApp/api/policies/isAuthenticated.js
### Purpose
This is an example policy file against which all routes are checked before allowing a client access to any part of your app.  By default, it allows everyone to access everything but this can (and probably should) be changed before you switch into production mode.     

In Sails, a policy is simply express middleware that does something to authenticate users before they are allowed to access some part of your app.  For more information on creating policies, you'll probably want to check our guide on it.




# myApp/assets/js/socket.io.js
### Purpose
This is a client side javascript file that was created by Sails to make communication between your Sails app and Socket.IO easier and more useful.  This file contains the extra Socket.IO methods that allow you to mimic http requests over Socket.IO.  You probably won't ever have to touch this file.





# myApp/config/adapters.js
### Purpose
This file contains the settings for all of your adapters.

In Sails, adapters act as the middleman (or middlelady) between the app and the database.  To put it another way, they act as plugins for [Waterline](https://github.com/balderdashy/waterline), the fancy [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping) that Sails uses to talk to databases.   

This file lets you create different global "saved settings" that you can mix and match in your models. The `default` option indicates which "saved setting" should be used if a model doesn't have an adapter specified.  Keep in mind that options you define directly in your model definitions will override these default settings.




# myApp/config/policies.js
### Purpose
This file contains the default policies for your app.

Policies are simply Express middleware functions which run before your controllers. You can apply one or more policies to a given controller, or protect just one of it's actions. Any policy file (e.g. `myApp/api/policies/authenticated.js`) can be dropped into the `myApp/api/policies/` folder, at which point it can be accessed by it's filename, minus the extension, (e.g. `authenticated`).



# myApp/config/routes.js
### Purpose
This file is where you can define explicit routes to connect clients with the resources that they request.

When a user tries to access a resource on your app, Sails uses this file (and a few other things) in order to map the URL requested to it's appropriate controller action which upon authentication, will respond to the client with the requested resource.  

By default, there is only one explicitely defined route.  Its purpose is to point users that try to access the base URL `http://localhost:1337/` to the view located in `myApp/views/home/index.ejs`. Feel free to add as many routes as you'd like to this file.  

You can even define routes in a way such that part of the requested URL is treated as a request parameter. For example, `http://localhost:1337/ponies/PinkiePie` would request the resource with the 'id' parameter equal to 'PinkiePie'.




# myApp/config/sockets.js
### Purpose
This is a configuration file that allows you to customize the way your app talks to clients over Socket.IO. 

It provides transparent access to Sails' encapsulated pubsub/socket server for complete customizability. In it you can do things on the list below (and more!).

- Override onConnect/onDisconnect methods (server side)
- Set transport method
- Change Heartbeat Interval
- Change socket store

### More Info
> Socket.IO configuration options can be found [here](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO).



# myApp/views/403.ejs
### Purpose
This is the default "403: Forbidden" page.  User agents that don't "Accept" HTML will see a JSON version instead.  You can customize the control logic for your needs in `myApp/config/403.js`

Furthermore, you can change the appearance of this page by editing it directly.




# myApp/views/404.ejs
### Purpose
This is the default "404: Not Found" page.  User agents that don't "Accept" HTML will see a JSON version instead.  You can customize the control logic for your needs in `myApp/config/404.js`

Furthermore, you can change the appearance of this page by editing it directly.



# myApp/views/500.ejs
### Purpose
This is the default "500: Server Error" page.  User agents that don't "Accept" HTML will see a JSON version instead.  You can customize the control logic for your needs in `myApp/config/500.js`

Furthermore, you can change the appearance of this page by editing it directly.
