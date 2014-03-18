# Assets
### Overview

Assets refer to any [static files](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc) that you need to be accessible to the outside world. In your Sails project, your assets will go into the [`assets/`]() directory. When placed in this directory, there are a series of automated tasks that run to help you manage your assets. The task automation is handled by a task runner called [Grunt](http://gruntjs.com/). Grunt allows you to manage assets very easily, and most of the code to do this is already written and accessable through grunt plugins. Just find a plugin you need, configure the task, and Grunt takes care of the rest.

In a Sails project there is a default process to help manage your assets. Giving a basic overview, it starts with you placing asset directories and files under the `assets/` folder. Grunt is then configuered to take these assets and perform various manipulations to them (e.g. concatenating, compiling, linking) and then copy them over to a `./tmp/public/` directory. This directory is your project's public folder that is publically acessable over the web. In fact, this public folder is roughly equivalent to the public folder in an [express](http://www.expressjs.com) app. All of this occures whenever you run the `sails lift` command.


### Express Static Middleware
Behind the scenes, Sails is using express [static middleware](http://www.senchalabs.org/connect/static.html) to serve your static asset files. You can configure this middleware in [`/config/express.js`](). It is important to note that this static middleware is run **after** the sails router (meaning if you have a route named /assets/index.html and an asset with the same path, the route will override the serving of this file.) Normally you wouldnt have to worry about this feature, but it is good to know none the less.

>If you are unfamiliar with the concept of middleware, check out [this](http://stephensugden.com/middleware_guide/) helpful article.

# Default Tasks

### Overview

The asset pipeline bundled in Sails is a set of Grunt tasks configured with conventional defaults designed to make your project more consistent and productive. The entire frontend asset workflow is completely customizable, while it provides some default tasks out of the box. Sails makes it easy to [configure new tasks]() to fit your needs.

However, Sails does do a few extra things to help you out:  
- Automatic LESS compilation
- Automatic JST compilation
- Automatic Coffescript compilation
- Optional automatic asset injection, minification, and concatenation
- Tasks to create public web directories
- File watching and syncing

### Default Grunt Task Behavior.

Below are the Grunt tasks that are included in your Sails project as well as a small description of exactly what each does in your project. Also included are a link to the usage docs for each task.

##### clean

> This grunt task is configured to clean out the contents in the `.tmp/public/` of your sails project.

> [usage docs](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> Compiles coffeeScript files from `assest/js/` into Javascript and places them into `.tmp/public/js/` directory.

> [usage docs](https://github.com/gruntjs/grunt-contrib-coffee)

##### concact

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


# Disabling Grunt

To disable Grunt integration in Sails, simply delete your Gruntfile (and/or [`tasks/`]() folder). You can also [disable the Grunt hook]().

If you still want to use Grunt for other purposes, but don't want any of the default web front-end stuff, just delete your project's assets folder and remove the front-end oriented tasks from the `grunt/register/` and `grunt/config/` folders.  You can also run `sails new myCoolApi --no-frontend` to omit the assets folder and front-end-oriented Grunt tasks for future projects.  You can also replace your `sails-generate-frontend` module with alternative community generators, or [create your own]().  This allows `sails new` to create the boilerplate for native iOS apps, Android apps, Cordova apps, SteroidsJS apps, etc.

# Automation

### Overview

The [`tasks/`](./#!documentation/anatomy/tasks) directory is a suite of Grunt tasks and their configurations.  Some helpful [default tasks]() are bundled for your convenience.  The Grunt integration is mainly useful for bundling front-end assets, (like stylesheets, scripts, & markup templates) but it can also be used to run all kinds of development tasks, from [browserify]() compilation to [database migrations]().

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, read on!


### What tasks does Sails run automatically?

Sails registers Grunt tasks located in the [`tasks/register/`]() folder.

##### `sails lift`

Runs the **default** task (`tasks/register/default.js`).

##### `sails lift --prod`

Runs the **prod** task (`tasks/register/prod.js`).

##### `sails www`

Runs the **build** task (`tasks/register/build.js`).

##### `sails www --prod` (production)

Runs the **buildProd** task (`tasks/register/buildProd.js`).


### Can I customize this for SASS, Angular, client-side Jade templates, etc?

You can modify, omit, or replace any of these Grunt tasks to fit your requirements. You can also add your own Grunt tasks- just add a `someTask.js` file in the `grunt/config` directory to configure the new task, then register it with the appropriate parent task(s) (see files in `grunt/register/*.js`).
