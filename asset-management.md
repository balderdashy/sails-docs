# Asset Management
> _Note: You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

Sails uses a very powerful tool called [Grunt](https://github.com/gruntjs/grunt) to manage assets.  

## What is Grunt?
Grunt is a javascript task manager that has a fast growing ecosystem of plugins that help automate any task that you could think of. Why did we decide to use this task runner to manage assets? From Grunt's very own [website](http://gruntjs.com/).

_In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort._

With that in mind, Grunt not only allows you to manage assets very easily, but most of the code to do this is already written and accessable through grunt plugins. Just find a plugin you need, configure the task, and Grunt takes care of the rest.

If you'd like a more comprehensive understanding of Grunt, [here](http://gruntjs.com/getting-started) is a good place to start.

## Default Asset Management with Grunt
Here is what the default grunt file does:

 - clear the .tmp folder created by the last time the app was run. Your .tmp folder is the public facing directory of your web application.
 - compile JST templates from assets/linker
 - compile Less styles
 - copy assets into a .tmp/public folder (this is where static files are served from)
 - run secret injector code
   - automatically inject assets into dev files. See [Assets Documentation](/balderdashy/sails/wiki/assets) for more details
 - watch for changes

<!-- TODO production enviroment default asset management -->

## Configuring a Grunt Task
To customize your own Grunt task, you must first ensure that the grunt plugin you are going to use is installed. You can install it from your terminal. If you wanted to use the grunt handlebars plugin you could do this.
```bash
  npm install --save-dev grunt-contrib-handlebars
```

We can then configure the plugin options, load the task, and include it in a registered grunt task. Here is a snippet of code for these steps.

```javascript
module.exports = function(grunt) {
  ...

  // configure the handlebars task
  handlebars: {
    dev: {
      options : {
        namespace: "JST"
      },
      files: {
        "path/to/results.js": "path/to/source.hbs",
        "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
      }
    }
  }

  // load the handlebars plugin
  grunt.loadTasks('grunt-contrib-handlebars');

  // A simple default task that runs the handlebars task
  grunt.registerTask('default', [
    'handlebars:dev'
  ]);

  ...
}
```

[Here](http://gruntjs.com/sample-gruntfile) is a very well documented example of a full Gruntfile.


<!-- TODO: sails build docs -->
<!--

## Building Assets for CDN/Phonegap
Sails allows you to build your assets in a way that can be used with CDN's or Phonegap.  Simply setup your assets like you would for launching the site in production mode.  Then run the following command from your projects root folder.

```bash
sails build 
```

This will output all the files needed to host your app on a CDN or use it with phonegap into ```/build/``` directory.
  -->
