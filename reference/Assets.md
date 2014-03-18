# Assets
### Overview

Assets refer to any [static files](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc) that you want to serve from your app. In Sails, these files are placed in the [`assets/`]() directory, where they are processed and synced to a hidden, temporary directory ([`./tmp/public/`]()) when you lift your app.  The contents of this folder are what Sails actually serves. (This public folder is roughly equivalent to the "public" folder in [express](http://www.expressjs.com), or the "static" or "www" folder you might be familiar with from other web servers.)


### Static middleware

Behind the scenes, Sails uses the [static middleware](http://www.senchalabs.org/connect/static.html) from Express to serve your assets. You can configure this middleware (e.g. cache settings) in [`/config/express.js`]().

It is important to note that the static [middleware](http://stephensugden.com/middleware_guide/) is installed **after** the Sails router.  So if you define an explicit route, but also have a file in your assets directory with a conflicting path, the explicit route will intercept the request before it reaches the static middleware.

For example, if you create `assets/index.html`, with no routes defined in your [`config/routes.js`]() file, it will be served as your home page.  But if you define an explicit route, `'/': 'FooController.bar'`, that route will take precedence.



### URL slugs

> TODO: explain how to work around this limitation if you want to use vanity URLs.

<!-- ================================================ -->

# Task Automation

### Overview

The [`tasks/`](./#!documentation/anatomy/tasks) directory contains a suite of [Grunt tasks](http://gruntjs.com/creating-tasks) and their [configurations](http://gruntjs.com/configuring-tasks). 

Tasks are mainly useful for bundling front-end assets, (like stylesheets, scripts, & client-side markup templates) but they can also be used to automate all kinds of repetitive development chores, from [browserify]() compilation to [database migrations]().

Sails bundles some [conventional tasks]() for convenience, but with [literally hundreds of plugins](http://gruntjs.com/plugins) to choose from, you can use tasks to automate just about anything with minimal effort.  If someone hasn't already built what you need, [authoring](http://gruntjs.com/creating-tasks) and [publishing your own Grunt plugin](http://gruntjs.com/creating-plugins) to [npm](http://npmjs.org) is a breeze.

> If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.


### Asset pipeline

> TODO: explain how to configure the pipeline.js file to change target files
> TODO: also explain how some of the things are in the actually `tasks/config/foobar.js` files themselves.


### Task configuration

Configured tasks are...

> TODO: explain what configured tasks are

You can modify, omit, or replace any of these Grunt tasks to fit your requirements. You can also add your own Grunt tasks- just add a `someTask.js` file in the `grunt/config` directory to configure the new task, then register it with the appropriate parent task(s) (see files in `grunt/register/*.js`).

> TODO: explain how to configure and install a new grunt task, especially mentioning `npm install grunt-contrib-foobar --save-dev`.  Add a caveat about the npm version issue with `^` vs `~`.



### Task triggers

In [development mode](), Sails runs the [`default`]() task ([`tasks/register/default.js`]()).  This compiles LESS, CoffeeScript, and client-side JST templates, then links to them automatically from your app's dynamic views and static HTML pages.

In production, Sails runs the [`prod`]() task ([`tasks/register/prod.js`]()) which shares the same duties as `default`, but also minifies your app's scripts and stylesheets.  This reduces your application's load time and bandwidth usage.

These task triggers are ["basic" Grunt tasks](http://gruntjs.com/creating-tasks#basic-tasks) located in the [`tasks/register/`]() folder.  Below, you'll find the complete reference of all task triggers in Sails, and the command which kicks them off:

##### `sails lift`

Runs the **default** task (`tasks/register/default.js`).

##### `sails lift --prod`

Runs the **prod** task (`tasks/register/prod.js`).

##### `sails www`

Runs the **build** task (`tasks/register/build.js`).

##### `sails www --prod` (production)

Runs the **buildProd** task (`tasks/register/buildProd.js`).




<!-- ================================================ -->

# Default Tasks

### Overview

The asset pipeline bundled in Sails is a set of Grunt tasks configured with conventional defaults designed to make your project more consistent and productive. The entire frontend asset workflow is completely customizable, while it provides some default tasks out of the box. Sails makes it easy to [configure new tasks]() to fit your needs.

Here are a few things that the default Grunt configuration in Sails does to help you out:  
- Automatic LESS compilation
- Automatic JST compilation
- Automatic Coffescript compilation
- Optional automatic asset injection, minification, and concatenation
- Create a web ready public directory.
- File watching and syncing
- Optimization of assets in production

### Default Grunt Task Behavior.

Below are the Grunt tasks that are included in your Sails project as well as a small description of exactly what each does in your project. Also included are a link to the usage docs for each task.

##### clean

> This grunt task is configured to clean out the contents in the `.tmp/public/` of your sails project.

> [usage docs](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> Compiles coffeeScript files from `assest/js/` into Javascript and places them into `.tmp/public/js/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-coffee)

##### concat

> Concatenates files javascript and css from a defined array. Creates concatenated files in `.tmp/public/concat/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-concat)

##### copy

> **dev task config**
> Copies all directories and files, exept coffescript and less fiels, from the sails assets folder into the `.tmp/public/` directory.

> **build task config**
> Copies all directories nd files from the .tmp/public directory into a www directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-copy)

##### cssmin

> Minifies css files and places them into `.tmp/public/min/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-cssmin)

##### jst

> Precompiles Underscore templates to a `.jst` file. (i.e. basically it takes HTML files and turns them into tiny little javascript functions that you pass data to and return HTML. This can speed up template rendering on the client, and reduce bandwidth usage.

> [usage docs](https://github.com/gruntjs/grunt-contrib-jast)

##### less

> Compiles LESS files into CSS. Only the `assets/styles/importer.less` is compiled. This allows you to control the ordering yourself, i.e. import your dependencies, mixins, variables, resets, etc. before other stylesheets).

> [usage docs](https://github.com/gruntjs/grunt-contrib-less)

##### sails-linker

> Automatically inject <script> tags for javascript files and <link> tags for css files.  Also automatically links an output file containing precompiled templates using a <script> tag. A much more detailed description of this task can be found [here](https://github.com/balderdashy/sails-generate-frontend/blob/master/docs/overview.md#a-litte-bit-more-about-sails-linking). 

> [usage docs](https://github.com/Zolmeister/grunt-sails-linker)

##### sync

> A grunt task to keep directories in sync. It is very similar to grunt-contrib-copy but tries to copy only those files that has actually changed. It specifically synchronize files from the `assets/` folder to `.tmp/public/`, smashing anything that's already there.

> [usage docs](https://github.com/tomusdrw/grunt-sync)

##### uglify

> Minifies client-side javascript `assets`.

> [usage docs](https://github.com/gruntjs/grunt-contrib-uglify)

##### watch

> Run predefined tasks whenever watched file patterns are added, changed or deleted. Watch for changes on files in the `assets/` folder, and re-run the appropriate tasks.

> [usage docs](https://github.com/gruntjs/grunt-contrib-watch)


<!-- ================================================ -->





# Disabling Grunt

To disable Grunt integration in Sails, simply delete your Gruntfile (and/or [`tasks/`]() folder). You can also [disable the Grunt hook]().

If you still want to use Grunt for other purposes, but don't want any of the default web front-end stuff, just delete your project's assets folder and remove the front-end oriented tasks from the `grunt/register/` and `grunt/config/` folders.  You can also run `sails new myCoolApi --no-frontend` to omit the assets folder and front-end-oriented Grunt tasks for future projects.  You can also replace your `sails-generate-frontend` module with alternative community generators, or [create your own]().  This allows `sails new` to create the boilerplate for native iOS apps, Android apps, Cordova apps, SteroidsJS apps, etc.
