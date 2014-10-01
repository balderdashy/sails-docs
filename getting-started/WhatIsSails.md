# 什麼是 Sails？


Sails 當然是一個網站開發框架。但退一步，這意味著什麼？有時候，當我們提到「網站」，我們指的是「前端網站」。我們認為像是網頁標準、HTML 5 或 CSS 3 的概念，以及像是 Backbone、Angular 或 jQuery 的框架。Sails 不是「那種」網站開發框架。Sails 與 Angular 及 Backbone 運作良好，但你永遠不會使用 Sails _取代_這些類別庫。

在另一方面，有時候當我們談論「網站開發框架」，我們指的是「後端網站」。這喚起了像是 REST、HTTP 或 WebSockets 的概念，以及像是 Java、Ruby 或 Node.js 的技術。一個「後端網站」框架可以幫助你做到一些事情，如建立 API、提供 HTML 檔案及同時處理成千上萬的使用者。Sails 是「那種」網站框架。



## 慣例優於設定

Sails 完成許多與其他 MVC 網站應用程式框架相同的目標，使用許多相同的方法學。這樣做是有目的的。一致的方式使得參與其中的任何人開發應用程式更具可預測性且高效率的。

想像一下，開始一份新的工作，在一家公司建立 Sails 應用程式。如果任何在你團隊中的人曾使用如 Zend、Laravel、CodeIgniter、Cake、Grails、Django、ASP.NET MVC 或 Rails，會覺得很熟悉 Sails。不僅如此，一般來說，他們還可以了解 Sails 專案，如何撰寫他們在過去已反覆實作的基本模式；無論他們的背景是 PHP、Ruby、Java、C# 或 Node.js。那麼你的第二個應用程式或第三個？每當你建立新的 Sails 應用程式，你以一個健全、熟悉的樣版開始，讓你更有效率。在許多情況下，你甚至可以回收重複使用一些後端程式碼。

> **歷史**
>
> Sails 沒有發明這個概念，它[已經存在多年](https://en.wikipedia.org/wiki/Convention_over_configuration)。即使在 Ruby on Rails 那句「慣例優於設定」（或稱 CoC）流行之前，JavaBeans 借用了常見於 90 年代末期到 21 世紀初期，傳統的 Java 網站框架極其冗長的 XML 設定到許多核心規範中。簡單來說就是用簡單的慣例（Convention）來取代繁雜的設定（Configuration），簡化開發者的工作。


## Loose Coupling

> TODO: explain why pushing towards an open standard for programming apps is important.
>
> TODO: more specifically, give some background why small, loosely coupled modules are good.
>
> TODO: explain how Sails core is a set of standalone, loosely coupled components (link to MODULES.md).
>
> TODO: discuss how a Sails app is a set of standalone, loosely coupled components:
>  + how each model, or controller, etc. is a node module.
>  + how policies are designed to be general-purpose and shared between apps and/or developers.
>  + how Sails strives to make adapter development as easy as possible, even for non-database integrations.
>
> TODO: explain how Sails is designed for any part to be rip-outable, overridden, or extended (hooks, generators, adapters)
>
> TODO: Explain how Sails can be used without any boilerplate files, just like Express, to fit an imperative programming style, or plug in as part of your existing Node / Node+Express app.

> Links:
> + [Unix philosophy](http://blog.izs.me/post/48281998870/unix-philosophy-and-node-js)
> + [Node culture](https://blog.nodejitsu.com/the-nodejs-philosophy/)


## Pragmatism

> TODO: set the stage- the purpose of any practical web framework should be to solve real-world use cases.  Node, being built on JavaScript, is the most intensely pragmatic thing to hit the scene since the introduction of Java.  It [will replace Java](http://readwrite.com/2013/08/09/why-javascript-will-become-the-dominant-programming-language-of-the-enterprise) [in the enterprise](http://blog.appfog.com/node-js-is-taking-over-the-enterprise-whether-you-like-it-or-not/).

> TODO: explain where this fits into the Node.js ecosystem, and pay homage to the PHP community (pragmatism is the best thing PHP has going for it)

> TODO: provide some examples of choices we've made w/ Sails that lean away from strict adherance and towards pragmatism (e.g. globals, services, symlinking dependencies on sails new, etc.)

> TODO: explain how it's important to allow for elegant harmony to be restored (ability to disable globals, running a sails app as a standard node module with `npm start`, running sails from a single file)



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
