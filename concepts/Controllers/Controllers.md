# Controllers

### Overview

Controllers (the **C** in **MVC**) are the principal objects in your Sails application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server.  They often act as a middleman between your [models](http://sailsjs.org/documentation/concepts/ORM/Models.html) and [views](http://sailsjs.org/documentation/concepts/Views). For many applications, the controllers will contain the bulk of your project&rsquo;s [business logic](http://en.wikipedia.org/wiki/Business_logic).

### Actions
Controllers are comprised of a set of functions called *actions*.  Action methods can be bound to [routes](http://sailsjs.org/documentation/concepts/Routes) in your application so that when a client requests the route, the bound method is executed to perform some business logic and (in most cases) generate a response.  For example, the `GET /hello` route in your application could be bound to a method like:

```javascript
function (req, res) {
  return res.send("Hi there!");
}
```

so that any time a web browser is pointed to the `/hello` URL on your app's server, the page displays the message &ldquo;Hi there&rdquo;.

### Where are Controllers defined?
Controllers are defined in the `api/controllers/` folder. You can put any files you like in that folder, but in order for them to be loaded by Sails as controllers, a file must *end* in `Controller.js`.  By convention, Sails controllers are usually [*Pascal-cased*](http://c2.com/cgi/wiki?PascalCase), so that every word in the filename (including the first word) is capitalized: for example, `UserController.js`, `MyController.js` and `SomeGreatBigController.js` are all valid, Pascal-cased names.

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

This controller defines two actions: the &ldquo;hi&rdquo; responds to a request with a string message, while the &ldquo;bye&rdquo; action responds by redirecting to another web site.  The `req` and `res` objects will be familiar to anyone who has used [Express.js](https://github.com/expressjs) to write a web application.  This is by design, as Sails uses Express under the hood to handle routing.  Take special note, however, of the lack of a `next` argument for the actions.  Unlike Express  middleware methods, Sails controller actions should always be the last stop in the request chain--that is, they should always result in either a response or an error.  While it is possible to use `next` in an action method, you are strongly encouraged to use [policies](http://sailsjs.org/documentation/concepts/Policies) instead wherever possible.




### "Thin" Controllers

Most MVC frameworks recommend writing "thin" controllers, and while Sails is no exception (it is a good idea to keep your Sails controllers as simple as possible) it is also helpful to understand "why?"

Controller code is inherently dependent on some sort of trigger or event.  In a backend framework like Sails, this event is almost always an incoming request.  So if you write a bunch of code in one of your controller actions, it is not uncommon for that code's scope to be dependent on the "request context" (the `req` and `res` objects).  Which is fine...until you want to use that code from a slightly different action, or from the command line.

So the goal of the "thin controller" philosophy is to encourage decoupling of reusable code from any related scope entanglements.  In Sails, you can achieve this in a number of different ways, but the most common strategies for extrapolating code from controllers are:

+ Write a custom model method to encapsulate some code that performs a particular task relating to a particular model
+ Write a service as a function to encapsulate some code that performs a particular application-specific task
+ If you find some code which is useful across multiple different applications (and you have time to do this), you should extract it into a node module.  Then you can share it across your organization, use it in future projects, or better yet, [publish it on npm]() under a permissive open-source license for other developers to use and help maintain.


<docmeta name="uniqueID" value="Controllers464694">
<docmeta name="displayName" value="Controllers">
