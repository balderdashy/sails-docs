# Assets
### Overview

Assets refer to any [static files](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc) that you need to be accessible to the outside world. In your Sails project, your assets will go into the [`assets/`]() directory. When placed in this directory, there are a series of automated tasks that run to help you manage your assets. The task automation is handled by a task runner called [Grunt](http://gruntjs.com/). Grunt allows you to manage assets very easily, and most of the code to do this is already written and accessable through grunt plugins. Just find a plugin you need, configure the task, and Grunt takes care of the rest.

In a Sails project there is a default process to help manage your assets. Giving a basic overview, it starts with you placing asset directories and files under the `assets/` folder. Grunt is then configuered to take these assets and perform various manipulations to them (e.g. concatenating, compiling, linking) and then copy them over to a `./tmp/public/` directory. This directory is your project's public folder that is publically acessable over the web. In fact, this public folder is roughly equivalent to the public folder in an [express](http://www.expressjs.com) app. All of this occures whenever you run the `sails lift` command.


### Express Static Middleware
Behind the scenes, Sails is using express [static middleware](http://www.senchalabs.org/connect/static.html) to serve your static asset files. You can configure this middleware in [`/config/express.js`](). It is important to note that this static middleware is run **after** the sails router (meaning if you have a route named /assets/index.html and an asset with the same path, the route will override the serving of this file.) Normally you wouldnt have to worry about this feature, but it is good to know none the less.

>If you are unfamiliar with the concept of middleware, check out [this](http://stephensugden.com/middleware_guide/) helpful article.

# Default Tasks

### Overview

The asset pipeline bundled in Sails is a set of Grunt tasks configured with conventional defaults designed to make your project more consistent and productive.

The entire front-end asset workflow is completely customizable-- while it provides some default tasks out of the box, Sails makes it easy to [configure new tasks]() to fit your needs.


TODO:
Explain what's possible with the default tasks in the sails asset pipeline, i.e.
However, Sails does do a few extra things to help you out:  
- Automatic [LESS compilation]()
- Automatic [JST compilation]()
- Optional automatic asset injection, minification, and concatenation


##### clean

>TODO: short description, link to contrib module

##### jst

> todo same thing

etc.






# Disabling Grunt

To disable Grunt integration in Sails, delete your Gruntfile (and/or [`tasks/`]() folder) or [disable the Grunt hook]().

If you still want to use Grunt for other purposes, but don't want any of the default web front-end stuff, just delete your project's `assets` folder and remove the front-end oriented tasks from the `grunt/register` and `grunt/config` folders.  You can also run `sails new myCoolApi --no-frontend` to omit the `assets` folder and front-end-oriented Grunt tasks for future projects.  You can also replace your `sails-generate-frontend` module with alternative community generators, or create your own.  This allows `sails new` to create the boilerplate for native iOS apps, Android apps, Cordova apps, SteroidsJS apps, etc.



# Automation

### Overview

The [`tasks/`](./#!documentation/anatomy/tasks) directory is a suite of Grunt tasks and their configurations.  Some helpful [default tasks]() are bundled for your convenience.  The Grunt integration is mainly useful for bundling front-end assets, (like stylesheets, scripts, & markup templates) but it can also be used to run all kinds of development tasks, from [browserify]() compilation to [database migrations]().

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, read on!


### What tasks does Sails run automatically?

Sails registers Grunt tasks located in the [`tasks/register/`]() folder.

###### `sails lift`

Runs the `default` task (`tasks/register/default.js`).

###### `sails lift --prod`

Runs the `prod` task (`tasks/register/prod.js`).

###### `sails www`

Runs the `build` task (`tasks/register/build.js`).

###### `sails www --prod` (production)

Runs the `buildProd` task (`tasks/register/buildProd.js`).


### Can I customize this for SASS, Angular, client-side Jade templates, etc?

You can modify, omit, or replace any of these Grunt tasks to fit your requirements. You can also add your own Grunt tasks- just add a `someTask.js` file in the `grunt/config` directory to configure the new task, then register it with the appropriate parent task(s) (see files in `grunt/register/*.js`).
