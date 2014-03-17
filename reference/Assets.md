# Assets
### Overview

Assets refer to any [static files](http://en.wikipedia.org/wiki/Static_web_page) (js, css, images, etc) that you need to be accessible to the outside world.

TODO: expand on where assets are located, and basic overview of the workflow in Sails for someone who has used grunt (i.e. put your files in assets, stuff gets synced to [`.tmp/public/`](), gets served when you run [`sails lift`]() )

TODO: explain that this uses Express static middleware, and that it comes AFTER the sails router (meaning if you have `assets/images/foo.jpg`, you can create a route for that and it will override the static file)

> The `assets` directory in Sails is roughly equivalent to the `public` folder in an [Express](http://www.expressjs.com) app.



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


