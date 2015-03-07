# Sailsって何？


SailsはもちろんWebフレームワークです。しかしちょっと立ち返って考えみましょう。これってどういう意味でしょうか。時に我々がWebと行った時は「フロントエンドのWeb」を意味します。つまりWeb標準とか、HTML5とかCSS3のような感じにだったり、またフレームワークではBackboneやAngular、jQueryといった感じにです。Sailsは「その手のWebフレームワーク」ではありません。SailsはAngularはBackboneとうまく組み合わせて使うことが出来ますがSailsをそれらのフレームワークの_代わりに_使うことは出来ません。

その一方で「Webフレームワーク」というと「Webバックエンド」を指すことも有ります。これはRESTやHTTP,WebSocketなどを想起させるものであり、JavaやRuby、Node.jsのような技術分野に関するものです。「バックエンドWeb」のフレームワークを使うことでAPIを作ったりHTMLファイルを提供したり非常に多くのユーザからの同時アクセスを処理したりといったことを楽に行うことが出来ます。Sailsはそういう種類にフレームワークです。



## 設定より慣習

Sailsは他のMVCWebフレームワークと同様の目的を、多くの同様な方法を使って成し遂げます。これはあえてそうしています。アプリケーション開発に関する一貫したアプローチはアプロケーション開発をより予測可能に、そして関わる全ての人々に対して効率的にすることができるからです。

会社でSailsアプリケーションを開発する仕事を始める(あるいはそれを行う会社を作ること)ことを想像してください。もしチームの中にZendやLaravel,、CodeIgniter、Cake、Grails、Django、ASP.NET MVC、Railsで仕事をした人がいるとすれは、Sailsは彼らにとって馴染みあるものです。それだけでなく通常は(バックグラウンドがPHPであるかRubyかJavaかC#かNode.jsにかかわらず)Sailsプロジェクトを見た途端に今までいくつもいくつも書き上げてきた基本的なコードの書き方と同じだと思うでしょう。２つ目や３つ目のプロジェクトはどうでしょうか。Sailsの新規アプリケーションを作るときはいつでも見慣れた、きちんとしたboilerplateを使って開発を始められますのでより生産的に開発を行えます。多くの場合においてはある程度のバックエンドコードを再利用することだって出来ます。

> **歴史**
>
> Sailsがこういうコンセプトを発明したのではありません。もう[ずっと前からあった](https://en.wikipedia.org/wiki/Convention_over_configuration)のです。設定より慣習(CoCとも言います)という言葉がRuby on Railsで有名になりましたがそれより前にも、（90年代後半や2000年代初頭の伝統的なJavaWebフレームワークで一般的に見られた、恐ろしく冗長なXML設定に対する自然な反発として）JavaBeansのコアテナントのスペックその他で多く使われていたのです。


## ゆるい結合

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


## 現実主義

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
