# What is Sails?


Sails is, of course, a web framework.  But take a step back.  What does that mean?  Sometimes, when we refer to the "web", we mean the "front-end web."  We think of concepts like web standards, or HTML 5, or CSS 3; and frameworks like Backbone, or Angular, or jQuery.  Sails is not "that kind" of a web framework.  Sails works great with Angular and Backbone, but you would never use Sails _instead_ of those libraries.

On the other hand, sometimes when we talk about "web frameworks", we mean the "back-end web."  This evokes concepts like REST, or HTTP, or WebSockets; and technologies like Java, or Ruby, or Node.js.  A "back-end web" framework helps you do things like build APIs, serve HTML files, and handle hundreds of thousands of simultaneous users.  Sails is "that kind" of web framework.



## Convention over Configuration

Sails accomplishes many of the same goals as other MVC web application frameworks, using many of the same methodologies.  This was done on purpose.  A consistent approach makes developing apps more predictable and efficient for everybody involved.

Imagine starting a new job at a company building a Sails app (or imagine starting the company, if that's your thing.)  If anyone on your team has worked with frameworks like Zend, Laravel, CodeIgniter, Cake, Grails, Django, ASP.NET MVC, or Rails, Sails will feel pretty familiar.  Not only that, but they can look at a Sails project and know, generally, how to code up the basic patterns they've implemented over and over again in the past; whether their background is in PHP, Ruby, Java, C#, or Node.js.  What about your second app, or your third?  Each time you create a new Sails app, you start with a sane, familiar boilerplate that makes you more productive.  In many cases, you'll even be able to recycle some of your backend code.

> **History**
>
> Sails didn't invent this concept-- it's [been around for years](https://en.wikipedia.org/wiki/Convention_over_configuration).  Even before the phrase "Convention over Configuration" (or CoC) was popularized by Ruby on Rails, it was a core tenet of the JavaBeans specification and in many ways, a natural lashback against the extremely verbose XML configuration common in traditional Java web frameworks of the late '90s and early 2000s.


## Loose Coupling

The days of forcing a one-size-fits-all approach to development are over.  We need tools that allow us to pick and choose the components that fit our requirements.  In fact, it’s just plain lazy to create things any other way.  Sails’s approach is to loosely couple components so that they can be added or subtracted from your app at will.

Node at its core has created a “can do” culture eager to experiment and make things work. Sails embraces this attitude and strives to deliver tools that work around you.  The level of automation or magic you want in Sails is directly tied to the time you have for a project and your experience working with Node. Sails is flexible enough to allow you to explore and create when you have the time but also provides automation when you don’t.

Sails accomplishes this loose coupling using plain-ole require.  No magic, other than the time to craft components that can be part of the whole but don’t need to be present in order for the whole to work.  For example, controllers, models, and configuration files are just Node modules.  Sails uses some convention to help.  Sails picks up on the name UserController.js in the Controllers folder to deduce that this is indeed a user controller.  Another example involves policies.  So policies allow you to have a bit of code that executes on controller or specific controller action.  The cool part is that the configuration file that connects the policy with the controller/action are separate.  That means you can write a bunch of different policies and they are completely portable between Sails apps.  You can decide later which controller/actions you want to apply them to.  

Sails core consists of twenty different hooks: modules that modify the server runtime, adding middleware, binding route listeners, or otherwise attaching additional capabilities to the framework.  This gives you access to override or disable every component and configuration parameter in Sails.  These hooks are loaded at run-time when Sails starts.  You even have the ability to have one-time configuration for your hook itself.  This is actually one of the key differentiators between hooks and services.

Another example of loose coupling is configuration files.  Need some configuration to be available for your project?  No problem.  Create a file in the config folder that uses the common module.exports pattern and everything in that module is available for you from the sails global object.

Almost every component of Sails can either be omitted, overwritten, or extended.  For example, Sails has a group of tools called blueprints.  These blueprints make it really easy to get a project up and running with regard to routes and CRUD operations.  But suppose you want to use the read, update, and delete operations but the create action needs some tender loving care.  No problem, just build a create action and the other CRUD operations keep working.  Your custom action subs in for the blueprint action.  It’s just that simple.

> Links:
> + [Unix philosophy](http://blog.izs.me/post/48281998870/unix-philosophy-and-node-js)
> + [Node culture](https://blog.nodejitsu.com/the-nodejs-philosophy/)


<!--## Pragmatism-->

<!--> TODO: set the stage- the purpose of any practical web framework should be to solve real-world use cases.  Node, being built on JavaScript, is the most intensely pragmatic thing to hit the scene since the introduction of Java.  It [will replace Java](http://readwrite.com/2013/08/09/why-javascript-will-become-the-dominant-programming-language-of-the-enterprise) [in the enterprise](http://blog.appfog.com/node-js-is-taking-over-the-enterprise-whether-you-like-it-or-not/).-->

<!--> TODO: explain where this fits into the Node.js ecosystem, and pay homage to the PHP community (pragmatism is the best thing PHP has going for it)-->

<!--> TODO: provide some examples of choices we've made w/ Sails that lean away from strict adherance and towards pragmatism (e.g. globals, services, symlinking dependencies on sails new, etc.)-->

<!--> TODO: explain how it's important to allow for elegant harmony to be restored (ability to disable globals, running a sails app as a standard node module with `npm start`, running sails from a single file)-->



<!--
## The MVC Architecture
Sails implements the aforementioned Model, View, Controller (MVC) architecture for Node.js. You can learn more about MVC <a href="https://docs.djangoproject.com/en/dev/faq/general/#django-appears-to-be-a-mvc-framework-but-you-call-the-controller-the-view-and-the-view-the-template-how-come-you-don-t-use-the-standard-names">here</a>, <a href="http://symfony.com/legacy/doc/askeet/1_0/en/3">here</a>, and <a href="http://guides.rubyonrails.org/getting_started.html#the-mvc-architecture">here</a>, but the tl;dr is that it's the really awesome, industry-standard way of doing things for modern web apps.
If you're wondering if Sails is a "proper MVC", you're probably right! It wasn’t made to mimic Django, Zend, or Rails; it was made to resemble the MVC architecture we’re used to while still unlocking the features necessary to leverage the unique advantages of Node.js: seamless WebSockets support, advanced memory management using streams, and composable, data-driven APIs using the powerful concept of chainable middleware from Connect/Express.
-->



<!--
## With a Modern Twist
Sails does a few things other MVC frameworks can't do:


### Socket.io / Realtime / WebSockets
Sails supports transport agnostic routing, which allows your controllers/policies to automatically handle Socket.io / WebSocket messages.  In the past, you'd have to maintain a separate code base to make that happen. This makes it much easier to add pubsub features, in particular the server-originated or 'comet' notifications you need for realtime apps, realtime analytics dashboards, and multiplayer games.

### Performance
Node has fantastic performance. Specifically, we've had some great results using 4 EC2 small servers to scale Sails to 10,000 concurrent connections.  In that case, the bottleneck was actually our test client.  Sails users have reported getting about 9k concurrent connections on one EC2 medium server.

+ Built-in support for Redis session store, and Redis MQ for reverse pubsub routing

### Node.js
Node.js is the fastest-growing, all-javascript solution to <a href="https://www.youtube.com/watch?v=jo_B4LTHi3I">server-side development</a>. Writing your code in one language on the front-end and back-end means less context-shifting, faster development, and better apps.

### Express
Sails's controllers and policies are really just [Express](https://github.com/expressjs/) middleware. This means your Sails app logic is interoperable with existing Express apps, and vice versa

+ Supports the existing ecosystem of Express middleware

### REST Blueprints
  + Automatically generated JSON API for manipulating models (You don't have to write any backend code to build simple CRUD apps)
  + Automatic route bindings for your controller actions

### Built-in support for controller/action-level middleware mappings of:
  + Authentication logic
  + Role-based access control
  + Custom policies (e.g. file storage quotas)


## Convenience features for front-end developers
If you are developing an HTML/CSS front-end powered by Sails, there are some other convenience features we've included that might help you out.

### Support for Grunt
As of Sails v0.9, all new projects come with a Gruntfile. Grunt is to Node.js as mvn/ant is to Java, or as rake is to Ruby. It has a strong, supportive community, and a wide array of plugins and build tools. Adding support for your favorite template engine or css/js preprocessor is as easy as modifying your project's Gruntfile

### Asset bundling
Sails bundles support for LESS and JST templates

  + If you use the `--linker` option when creating your new project, your assets will be automatically bundled up and included in your layout HTML
  + Front-end support for SASS, Handlebars, CoffeeScript, Stylus, TypeScript, etc. is as easy as modifying your app's Gruntfile
  + In production mode, Sails will also minify and concatenate your assets
  + If you need to take web performance even further (this comes up for mobile web apps in particular), you can run `sails build` to output a CDN-ready snapshot of your apps assets

### PhoneGap, Chrome extensions, and SPA-friendliness
  + `sails build` spits out a ready-to-deploy `www` directory for use in all of the sorts of places where you need indepenedent, API-driven front-end code
  + Sails has easy-to-use CORS integration
  + Built-in support for cross-site request forgery (CSRF) protection, with a handy token-based option for single-page apps



## Finally, a note for UX-focused guys/gals
> ####From one geek to another:

> I work on a lot of web and mobile apps with our team at <a href="http://balderdash.co">Balderdash</a>.  More than ever before, it's important that your applications not only work, but look and feel awesome.
I originally built Sails to tackle these sorts of API-driven, front-end heavy projects for our startup and enterprise clients.  Since then, top-notch experiences have become industry standard (typically using Backbone, Angular, Ember, Knockout, etc.)
Reducing the amount of time and energy you spend on your app's server code allows you to spend more time focusing on cool features.  The easier your backend code is to write and maintain, the more nimble you can be.  The more nimble you are, the more adaptable your project can be to your users' needs, and the faster you respond to bug fixes.  The more adaptable you are... you get the idea!


-->

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/what_is_sails)


<docmeta name="uniqueID" value="WhatIsSails126387">
<docmeta name="displayName" value="What Is Sails">
