# Routes
### Overview

The most basic feature of any web application is the ability to interpret a request sent to a URL, then send back a response.  In order to do this, your application has to be able to distinguish one URL from another.

Like most web frameworks, Sails provides a router: a mechanism for mapping URLs to controllers and views.  **Routes** are rules that tell Sails what to do when faced with an incoming request.  There are two main types of routes in Sails: **custom** (or "explicit") and **automatic** (or "implicit").


### Custom Routes

Sails lets you design your app's URLs in any way you like- there are no framework restrictions.

Every Sails project comes with [`config/routes.js`](), a simple [Node.js module]() that exports an object of custom, or "explicit" **routes**. For example, this `routes.js` file defines six routes; some of them point to a controller's action, while others route directly to a view.

```javascript
// config/routes.js
module.exports = {
  'get /signup': { view: 'conversion/signup' },
  'post /signup': 'AuthController.processSignup',
  'get /login': { view: 'portal/login' },
  'post /login': 'AuthController.processLogin',
  '/logout': 'AuthController.logout',
  'get /me': 'UserController.profile'
}
```


Each **route** consists of an **address** (on the left, e.g. `'get /me'`) and a **target** (on the right, e.g. `'UserController.profile'`)  The **address** is a URL path and (optionally) a specific [HTTP method](). The **target** can be defined a number of different ways ([see the reference section on the subject]()), but the two different syntaxes above are the most common.  When Sails receives an incoming request, it checks the **address** of all custom routes for matches.  If a matching route is found, the request is then passed to its **target**.

For example, we might read `'get /me': 'UserController.profile'` as:

> "Hey Sails, when you receive a GET request to `http://mydomain.com/me`, run the `profile` action of `UserController`, would'ya?"

#### Notes
+ Just because a request matches a route address doesn't necessarily mean it will be passed to that route's target _directly_.  For instance, HTTP requests will usually pass through some [middleware]() first.  And if the route points to a controller [action](), the request will need to pass through any configured [policies]() first.  Finally, there are a few special [route options]() which allow a route to be "skipped" for certain kinds of requests.
+ The router can also programmatically **bind** a **route** to any valid route target, including canonical Node middleware functions (i.e. `function (req, res, next) {}`).  However, you should always use the conventional [route target syntax]() when possible- it streamlines development, simplifies training, and makes your app more maintainable.



### Automatic Routes

When Sails can't match a request to one of your custom routes, it tries matching it against your app's automatic, or "implicit" routes.  Automatic routes are URLs which Sails listens to automatically, based on your app's files and configuration.

TODO:talk about
+ Blueprint routes (shadows)
+ Assets




### Supported Protocols

The Sails router is "protocol-agnostic"; it knows how to handle both [HTTP requests]() and messages sent via [WebSockets](). It accomplishes this by listening for Socket.io messages sent to reserved event handlers in a simple format, called JWR (JSON-WebSocket Request/Response).  This specification is implemented and available out of the box in the [client-side socket SDK](). 



#### Notes
+ Advanced users may opt to circumvent the router entirely and send low-level, completely customizable WebSocket messages directly to the underlying Socket.io server.  You can bind socket events directly in your app's [`onConnect`]() function (located in [`config/sockets.js`]().)  But bear in mind that, in most cases, you are better off leveraging the request interpreter for socket communication - maintaining consistent routes across HTTP and WebSockets helps keep your app maintainable.



<docmeta name="uniqueID" value="Routes849188">
<docmeta name="displayName" value="Routes">

