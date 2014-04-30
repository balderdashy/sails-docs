# Controllers

### Overview

Controllers (the **C** in **MVC**) are the objects in your Sails application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server.  They often act as a middleman between your [models](./#!documentation/reference/models) and [views](./#!documentation/reference/views). For many applications, the controllers will contain the bulk of your project&rsquo;s [business logic](http://en.wikipedia.org/wiki/Business_logic).

### Actions
Controllers are comprised of a collection of methods called *actions*.  Action methods can be bound to [routes](./#!documentation/reference/routes) in your application so that when a client requests the route, the bound method is executed to perform some business logic and (in most cases) generate a response.  For example, the `GET /hello` route in your application could be bound to a method like:

```javascript
function (req, res) {
    return res.send("Hi there!");
}
```

so that any time a web browser is pointed to the `/hello` URL on your app's server, the page displays the message &ldquo;Hi there&rdquo;.

### Where are Controllers defined?
Controllers are defined in the `api/controllers/` folder. You can put any files you like in that folder, but in order for them to be loaded by Sails as controllers, a file must *end* in `Controller.js`.  Additionally, by convention Sails controllers are usually *Pascal-cased*, so that every word in the filename (including the first word) is capitilized: for example, `UserController.js`, `MyController.js` and `SomeGreatBigController.js` are all valid, Pascal-cased names.  

You may organize your controllers into groups by saving them in subfolders of `api/controllers`, however note that the subfolder name *will become part of the Controller&rsquo;s identity* when used for routing (more on that in the "Routing" section below).

### What does a Controller file look like?
A controller file defines a Javascript object whose keys are action names, and whose values are the corresponding action methods.  Here&rsquo;s a simple example of a full controller file:

```javascript
module.exports = {
   hi: function (req, res) {
       return res.send("Hi there!");
   },
   bye: function (req, res) {
       return res.redirect("http://www.sayonara.com");
   }
}
```

This controller defines two actions: the &rdquo;hi&rdquo; responds to a request with a string message, while the &rdquo;bye&rdquo; action responds by redirecting to another web site.  The `req` and `res` objects will be familiar to anyone who has used [Express.js](http://expressjs.com) to write a web application.  This is by design, as Sails uses Express under the hood to handle routing.  Take special note, however, of the lack of a `next` argument for the actions.  Unlike Express  middleware methods, Sails controller actions should always be the last stop in the request chain--that is, they should always result in either a response or an error.  While it is possible to use `next` in an action method, you are strongly encouraged to use [policies](./#!documentation/reference/policies) instead wherever possible.

### Routing

By default, Sails will create a [blueprint action route](./#!documentation/reference/blueprints) for each action in a controller, so that a `GET` request to `/:controller/:actionName` will trigger the route.  If the example controller in the previous section was saved as `api/controllers/SayController.js`, then the `/say/hi` and `/say/bye` routes would be made available by default whenever the app was lifted.  If the controller was saved under the subfolder `/we`, then the routes would be `/we/say/hi` and `/we/say/bye`.  See the [blueprints documentation](./#!documentation/reference/blueprints) for more information about Sails&rsquo; automatic route binding, including RESTful routes for your models.

Besides the default routing, Sails allows you to manually bind routes to controller actions using the `config/routes.js` file.  Some examples of when you will want to manually bind routes are:

+ When you want to use separate actions to handle the same route path, based on the HTTP verb.  The default routes bind *all* requests for a path to an action, whether they be `GET`, `POST`, `PUT`, `DELETE` or something else.
+ When you want to use a different path for the route.
+ When you want to set up additional options for how the route should be handled.

To manually bind a route to a controller action in the `config/routes.js` file, you can use the HTTP verb and path as the key and the controller *identity* + `.` + action name as the value.  For example:

```
"POST /make/a/sandwich": "SandwichController.makeSandwich"
```

will cause the `makeSandwich` action in `api/controllers/SandwichController.js` to be triggered whenever `/make/a/sandwich` is requested with `POST`.  Note that for controller files saved in subfolders, the subfolder is part of the controller identity:

```
"/do/homework": "stuff/things/HomeworkController.do"
```

will cause the `do` action in `api/controllers/stuff/things/HomeworkController.js` to be triggered whenever `/do/homework` is requested.

A full discussion of manual routing is out of the scope of this doc--please see the [routes documentation](./#!documentation/reference/routes) for a full overview of the available options.  

### Generating controllers

You can use the [Sails command line tool](./#!documentation/reference/CommandLine) to quickly generate a controller, by typing:
```
sails generate controller <controller name> [action names...]
```
For example:
```
sails generate controller comment create destroy tag like
```
generates:
```javascript
var CommentController = {
	create: function(req, res) {

	},

	destroy: function(req, res) {

	},

	tag: function(req, res) {

	},

	like: function(req, res) {

	}
}

module.exports = CommentController;
```
