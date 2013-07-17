# What is Sails?
> _Note: You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

Sails makes it easy to build custom, enterprise-grade Node.js apps. It is designed to resemble the MVC architecture from frameworks like Ruby on Rails, but with support for the more modern, data-oriented style of web app development.
You can do all the things you're used to with MVC frameworks like CakePHP, Grails, Symfony, etc., but Sails is especially good for building APIs, single page apps/sites, and realtime features like chat.


## The MVC Architecture
Sails is a Model, View, Controller (MVC) architecture for Node.js. You can learn more about MVC <a href="https://docs.djangoproject.com/en/dev/faq/general/#django-appears-to-be-a-mvc-framework-but-you-call-the-controller-the-view-and-the-view-the-template-how-come-you-don-t-use-the-standard-names">here</a>, <a href="http://symfony.com/legacy/doc/askeet/1_0/en/3">here</a>, and <a href="http://guides.rubyonrails.org/getting_started.html#the-mvc-architecture">here</a>, but the tl;dr is that it's the really awesome, industry-standard way of doing things for modern web apps.
If you're wondering if Sails is a "proper MVC", you're probably right! It wasn’t made to mimic Django, Zend, or Rails; it was made to resemble the MVC architecture we’re used to while still unlocking the features necessary to easily leverage WebSockets, streams, and data-driven APIs.


## With a Modern Twist
Sails does a few things other MVC frameworks can't do:


#### Socket.io / Realtime / WebSockets
  + Sails supports transport agnostic routing, which allows your controllers/policies to automatically handle Socket.io / WebSocket messages.  In the past, you'd have to maintain a separate code base to make that happen.
  + This makes it much easier to add pubsub features, in particular the server-originated or 'comet' notifications you need for realtime apps, realtime analytics dashboards, and multiplayer games.

#### Performance
  + Node has fantastic performance, and there are lots of resources out there to support that claim.
  + Specifically, we've had some great results using 4 EC2 small servers to scale Sails to 10,000 concurrent connections.
  + Built-in support for Redis session store, and Redis MQ for reverse pubsub routing

#### Node.js
  + Node.js is the fastest-growing, all-javascript solution to <a href="https://www.youtube.com/watch?v=jo_B4LTHi3I">server-side development</a>.
  + Writing your code in one language on the front-end and back-end means less context-shifting, faster development, and better apps.

#### Express
  + Sails's controllers and policies are really just [Express](http://expressjs.com/) middleware
  + This means your Sails app logic is interoperable with existing Express apps, and vice versa
  + Supports the existing ecosystem of Express middleware

#### REST Blueprints
  + Automatically generated JSON API for manipulating models
    + (you don't have to write any backend code to build simple CRUD apps)
  + Automatic route bindings for your controller actions

#### Built-in support for controller/action-level middleware mappings of:
  + authentication logic
  + role-based access control
  + custom policies (e.g. file storage quotas)
  
### Convenience features for front-end developers
If you are developing an HTML/CSS front-end powered by Sails, there are some other convenience features we've included that might help you out.

#### Support for Grunt
  + As of Sails v0.9, all new projects come with a Gruntfile
  + Grunt is to Node.js as mvn/ant is to Java, or as rake is to Ruby
  + Grunt has a strong, supportive community, and a wide array of plugins and build tools
  + Adding support for your favorite template engine or css/js preprocessor is as easy as modifying your project's Gruntfile

#### Asset bundling
  + Sails bundles support for LESS and JST templates
  + If you use the `--linker` option when creating your new project, your assets will be automatically bundled up and included in your layout HTML
  + Front-end support for SASS, Handlebars, CoffeeScript, Stylus, TypeScript, etc. is as easy as modifying your app's Gruntfile
  + In production mode, Sails will also minify and concatenate your assets
  + If you need to take web performance even further (this comes up for mobile web apps in particular), you can run `sails build` to output a CDN-ready snapshot of your apps assets    

#### PhoneGap, Chrome extensions, and SPA-friendliness
  + `sails build` spits out a ready-to-deploy `www` directory for use in all of the sorts of places where you need indepenedent, API-driven front-end code
  + Sails has easy-to-use CORS integration
  + Built-in support for cross-site request forgery (CSRF) protection, with a handy token-based option for single-page apps



## Finally, a note for UX-focused guys/gals
> From one geek to another:

I work on a lot of web and mobile apps with our team at <a href="http://balderdash.co">Balderdash</a>.  More than ever before, it's important that your applications not only work, but look and feel awesome.
I originally built Sails to tackle these sorts of API-driven, front-end heavy projects for our startup and enterprise clients.  Since then, top-notch experiences have become industry standard (typically using Backbone, Angular, Ember, Knockout, etc.)
Reducing the amount of time and energy you spend on your app's server code allows you to spend more time focusing on cool features.  The easier your backend code is to write and maintain, the more nimble you can be.  The more nimble you are, the more adaptable your project can be to your users' needs, and the faster you respond to bug fixes.  The more adaptable you are... you get the idea!

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/what_is_sails)
