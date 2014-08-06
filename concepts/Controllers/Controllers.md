# Controllers

### Overview

Controllers (the **C** in **MVC**) are the principle objects in your Sails application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server.  They often act as a middleman between your [models](http://beta.sailsjs.org/#/documentation/concepts/ORM/Models.html) and [views](/#/documentation/concepts/Views). For many applications, the controllers will contain the bulk of your project&rsquo;s [business logic](http://en.wikipedia.org/wiki/Business_logic).

### Actions
Controllers are comprised of a collection of methods called *actions*.  Action methods can be bound to [routes](/#/documentation/concepts/Routes) in your application so that when a client requests the route, the bound method is executed to perform some business logic and (in most cases) generate a response.  For example, the `GET /hello` route in your application could be bound to a method like:

```javascript
function (req, res) {
  return res.send("Hi there!");
}
```

so that any time a web browser is pointed to the `/hello` URL on your app's server, the page displays the message &ldquo;Hi there&rdquo;.

### Where are Controllers defined?
Controllers are defined in the `api/controllers/` folder. You can put any files you like in that folder, but in order for them to be loaded by Sails as controllers, a file must *end* in `Controller.js`.  By convention, Sails controllers are usually [*Pascal-cased*](http://c2.com/cgi/wiki?PascalCase), so that every word in the filename (including the first word) is capitilized: for example, `UserController.js`, `MyController.js` and `SomeGreatBigController.js` are all valid, Pascal-cased names.

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
};
```

This controller defines two actions: the &ldquo;hi&rdquo; responds to a request with a string message, while the &ldquo;bye&rdquo; action responds by redirecting to another web site.  The `req` and `res` objects will be familiar to anyone who has used [Express.js](https://github.com/expressjs) to write a web application.  This is by design, as Sails uses Express under the hood to handle routing.  Take special note, however, of the lack of a `next` argument for the actions.  Unlike Express  middleware methods, Sails controller actions should always be the last stop in the request chain--that is, they should always result in either a response or an error.  While it is possible to use `next` in an action method, you are strongly encouraged to use [policies](/#/documentation/concepts/Policies) instead wherever possible.

### Routing

By default, Sails will create a [blueprint action route](/#/documentation/reference/blueprint-api) for each action in a controller, so that a `GET` request to `/:controllerIdentity/:nameOfAction` will trigger the action.  If the example controller in the previous section was saved as `api/controllers/SayController.js`, then the `/say/hi` and `/say/bye` routes would be made available by default whenever the app was lifted.  If the controller was saved under the subfolder `/we`, then the routes would be `/we/say/hi` and `/we/say/bye`.  See the [blueprints documentation](http://beta.sailsjs.org/#/documentation/reference/blueprint-api) for more information about Sails&rsquo; automatic route binding.

Besides the default routing, Sails allows you to manually bind routes to controller actions using the [`config/routes.js`](/#/documentation/concepts/Routes) file.  Some examples of when you might want to use explicit routes are:

+ When you want to use separate actions to handle the same route path, based on the [HTTP method](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) (aka verb).  The aforementioned **action blueprint** routes bind *all* request methods for a path to a given action, including `GET`, `POST`, `PUT`, `DELETE`, etc.
+ When you want an action to be available at a custom URL (e.g. `PUT /login`, `POST /signup`, or a "vanity URL" like `GET /:username`)
+ When you want to set up additional options for how the route should be handled (e.g. special CORS configuration)

To manually bind a route to a controller action in the `config/routes.js` file, you can use the HTTP verb and path (i.e. the **route address**) as the key, and the controller name + `.` + action name as the value (i.e. the **route target**).

For example, the following manual route will cause your app to trigger the `makeIt()` action in `api/controllers/SandwichController.js` whenever it receives a POST request to `/make/a/sandwich`:

```js
  'POST /make/a/sandwich': 'SandwichController.makeIt'
```


> **Note:**
>
> For controller files saved in subfolders, the subfolder is part of the controller identity:
>
> ```js
>   '/do/homework': 'stuff/things/HomeworkController.do'
> ```
>
> This will cause the `do()` action in `api/controllers/stuff/things/HomeworkController.js` to be triggered whenever `/do/homework` is requested.

A full discussion of manual routing is out of the scope of this doc--please see the [routes documentation](/#/documentation/concepts/Routes) for a full overview of the available options.



### "Thin" Controllers

Most MVC frameworks recommend writing "thin" controllers, and while Sails is no exception (it is a good idea to keep your Sails controllers as simple as possible) it is also helpful to understand "why?"

Controller code is inherently dependent on some sort of trigger or event.  In a backend framework like Sails, this event is almost always an incoming request.  So if you write a bunch of code in one of your controller actions, it is not uncommon for that code's scope to be dependent on the "request context" (the `req` and `res` objects).  Which is fine...until you want to use that code from a slightly different action, or from the command line.

So the goal of the "thin controller" philosophy is to encourage decoupling of reusable code from any related scope entanglements.  In Sails, you can achieve this in a number of different ways, but the most common strategies for extrapolating code from controllers are:

+ Write a custom model method to encapsulate some code that performs a particular task relating to a particular model
+ Write a service as a function to encapsulate some code that performs a particular application-specific task
+ If you find some code which is useful across multiple different applications (and you have time to do this), you should extract it into a node module.  Then you can share it across your organization, use it in future projects, or better yet, [publish it on npm]() under a permissive open-source license for other developers to use and help maintain.


### Generating controllers

You can use the [Sails command line tool](/#/documentation/reference/cli) to quickly generate a controller, by typing:

```sh
$ sails generate controller <controller name> [action names separated by spaces...]
```

For example, if you run the following command:

```sh
$ sails generate controller comment create destroy tag like
info: Generated a new controller `comment` at api/controllers/CommentController.js!
```

Sails will generate `api/controllers/CommentController.js`:

```javascript
/**
 * CommentController.js
 *
 * @description :: Server-side logic for managing comments.
 */

module.exports = {

  /**
   * CommentController.create()
   */
  create: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.destroy()
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.tag()
   */
  tag: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  /**
   * CommentController.like()
   */
  like: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  }
};
```


<docmeta name="uniqueID" value="Controllers464694">
<docmeta name="displayName" value="Controllers">

