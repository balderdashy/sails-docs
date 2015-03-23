# O que é Sails?

Sails é, claro, um web framework. Mas vamos voltar um pouco. O que isso significa? As vezes quando nos referimos a "web", nós queremos dizer "front-end web". Nós pensamos nos conceitos como padrões web, ou HTML 5, ou CSS 3; e frameworks tal como Backbone, ou Angular, ou jQuery. Sails não é "este tipo" de web framework. Sails funciona bem com Angular e Backbone, mas você nunca usará Sails _no lugar_ de alguma destas bibliotecas.

Por outro lado, as vezes quando nós falamos de "web frameworks", nós queremos dizer "back-end web". Isso invoca conceitos como REST, ou HTTP, ou WebSockets; e tecnologias como Java, ou Ruby, ou Node.js. Um framework "back-end" ajuda você a fazer coisas como APIs, servir arquivos HTML, tratar centenas de milhares de usuários simultâneos. Sails é "este tipo" de web framework.


## Convenção sobre Configuração

Velas realiza muitos dos objetivos como outros frameworks de aplicação web MVC, usando muitas das mesmas metodologias. Isto foi feito de propósito. Uma abordagem consistente torna o desenvolvimento de aplicativos mais previsível e eficiente para todos envolvidos.

Imagine começar um novo emprego em uma empresa de construção de um app Sails (ou imaginar começando a empresa, se isso é coisa sua.) Se alguém em sua equipe tem trabalhado com frameworks como Zend, Laravel, CodeIgniter, Cake, Grails, Django, ASP.NET MVC, ou Rails, Sails vai se sentir muito familiar. Não só isso, mas eles podem olhar para um projeto Sails e saber, em geral, a forma de codificar com os padrões básicos que eles implementaram uma e outras vezes no passado; Se a sua formação é em PHP, Ruby, Java, C #, ou Node.js. E sobre o seu segundo aplicativo, ou seu terceiro? Cada vez que você criar um novo app Sails, você começa conciente, familiar que faz você mais produtivo. Em muitos casos, você vai mesmo ser capaz de reciclar um pouco do seu código de backend.

> **História**
>
> Sails não inventou esse conceito -- existe [há anos](https://en.wikipedia.org/wiki/Convention_over_configuration). Antes mesmo de a frase "Convensão sobre Configuração" (ou CoC) ser popularizado por Ruby on Rails, era um inquilino de núcleo da especificação JavaBeans e em muitos aspectos, um lashback natural contra a configuração XML extremamente verbosa comum em frameworks para web Java tradicionais do final dos anos 90 e início dos anos 2000.

## Acoplamento Flexível

Os dias de forçar uma abordagem única para desenvolvimento acabaram. Precisamos de ferramentas que permitem-na escolher os componentes que se ajustam às nossas necessidades. Na verdade, é simplesmente preguiçoso para criar as coisas de outra maneira. A abordagem de Sails está a componentes acoplados livremente, para que possam ser adicionado ou removidos de seu app à vontade.

Node em seu núcleo criou um "posso fazer" a cultura ansiosa para experimentar e fazer as coisas funcionarem. Sails abraça essa atitude e se esforça para fornecer ferramentas que funcionam em torno de você. O nível de automação ou magia que quer em Sails está directamente relacionado com o tempo que você tem para um projeto e sua experiência trabalhando com Node. Sails é flexível o suficiente para que você possa explorar e criar quando você tem tempo, mas também fornece automação quando você não.

Sails accomplishes this loose coupling using plain-ole require.  No magic, other than the time to craft components that can be part of the whole but don’t need to be present in order for the whole to work.  For example, controllers, models, and configuration files are just Node modules.  Sails uses some convention to help.  Sails picks up on the name UserController.js in the Controllers folder to deduce that this is indeed a user controller.  Another example involves policies.  So policies allow you to have a bit of code that executes on controller or specific controller action.  The cool part is that the configuration file that connects the policy with the controller/action are separate.  That means you can write a bunch of different policies and they are completely portable between Sails apps.  You can decide later which controller/actions you want to apply them to.  

Sails core consists of twenty different hooks: modules that modify the server runtime, adding middleware, binding route listeners, or otherwise attaching additional capabilities to the framework.  This gives you access to override or disable every component and configuration parameter in Sails.  These hooks are loaded at run-time when Sails starts.  You even have the ability to have one-time configuration for your hook itself.  This is actually one of the key differentiators between hooks and services.

Another example of loose coupling is configuration files.  Need some configuration to be available for your project?  No problem.  Create a file in the config folder that uses the common module.exports pattern and everything in that module is available for you from the sails global object.

Almost every component of Sails can either be omitted, overwritten, or extended.  For example, Sails has a group of tools called blueprints.  These blueprints make it really easy to get a project up and running with regard to routes and CRUD operations.  But suppose you want to use the read, update, and delete operations but the create action needs some tender loving care.  No problem, just build a create action and the other CRUD operations keep working.  Your custom action subs in for the blueprint action.  It’s just that simple.

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
