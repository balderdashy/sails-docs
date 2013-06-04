# Assets

Sails uses a very powerful tool named Grunt to manage your assets. With Grunt, the asset management process is completely customizable and very easy to fit your projects needs.

## What is Grunt?
Grunt is a javascript task manager that has a very fast growing ecosystem of plugins that help automate any task that you could think of. Why did we decide to use this task runner to manage assets? From Grunts very own [website](http://gruntjs.com/).

_In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort._

With that in mind, Grunt not only allows you to manage assets very easily, but most of the code to do this is already written and accessable through grunt plugins. Just find a plugin you need, configure the task, and Grunt takes care of the rest.

If you are using Grunt for the very first time, the only setup required is to install the grunt CLI globally on your machine. _Note: you may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this._
```bash
npm install -g grunt-cli
```

## Sails and Grunt
In a Sails app, you will not need to create a Gruntfile or install any Grunt plugins to work right outside of the box. When you created you Sails project, this was done for you with some sensible default Grunt tasks configured and plugins installed. Of course, the plugins you use and the Grunt tasks that run are completely customizable. If you'd like a more comprehensive understanding of Grunt, [here](http://gruntjs.com/getting-started) is a good place to start.

## Default Asset Management with Grunt
By default when you run ```sails lift``` to start your server, a Grunt task will run that will first precompile all of your templates in the **assets/templates/** folder to a JST file. It will then copy all of your assets into a **.tmp/** folder in the application root. Finally we inject all of your css, scripts, and templates into the **index.html** file. A watch task is configured to repeat this process every time you make a change in your assets directory or any of its subdirectories.

## Example of a Custom Asset Management
Internally when we use sails, we like to use less with out projects. Here is quick example of overwritting the default Gruntfile so that less files will compile to css and be injected into **index.html**.

```javascript
module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // We no longer want to copy over all files, so we exclude .less files.
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './assets',
            src: ['**/*', '!**/*.less'],
            dest: '.tmp/public'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '.tmp/public',
            src: ['**/*', '!**/*.less'],
            dest: 'www'
          }
        ]
      }
    },

    clean: {
      dev: ['.tmp/public/**'],
      build: ['www']
    },

    jst: {
      dev: {
        options: {
          templateSettings: {
            interpolate : /\{\{(.+?)\}\}/g
          }
        },
        files: {
          '.tmp/public/templates/templates.js': ['assets/templates/**/*.html']
        }
      }
    },

    // configure the less pluging to compile all less files into there individual css files and place them in the .tmp/public/styles/ directory. We do not copy over the importer.less file.
    less: {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'assets/styles/',
            src: ['**/*.less','!importer.less'],
            dest: '.tmp/public/styles/',
            ext: '.css'
          }
        ]
      }
    },

    scriptlinker: {
      devJs: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '\n<script src="%s"></script>\n',
          appRoot: '.tmp/public/'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/js/jquery.js', '.tmp/public/js/foobar.js',
          '.tmp/public/js/**/*.js']
        }
      },
      devStyles: {
        options: {
          startTag: '<!--STYLES-->',
          endTag: '<!--STYLES END-->',
          fileTmpl: '\n<link rel="stylesheet" href="%s">\n',
          appRoot: '.tmp/public/'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/styles/**/*.css']
        }
      },
      devTpl: {
        options: {
          startTag: '<!--TEMPLATES-->',
          endTag: '<!--TEMPLATES END-->',
          fileTmpl: '\n<script type="text/template" data-id="%s"></script>\n',
          appRoot: '.tmp/public/'
        },
        files: {
          '.tmp/public/index.html': ['.tmp/public/templates/**/*']
        }
      }
    },

    watch : {
      api: {
        files: ['api/**/*']
      },
      assets: {
        files: ['assets/**/*'],
        tasks: ['assetsChanged']
      }
    }
  });

  // Get path to core grunt dependencies from Sails
  // Added grunt-contrib-less plugin.
  var depsPath = grunt.option('gdsrc');
  grunt.loadTasks(depsPath + '/grunt-contrib-clean/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-copy/tasks');
  grunt.loadTasks(depsPath + '/grunt-scriptlinker/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-jst/tasks');
  grunt.loadTasks('node_modules/grunt-contrib-less/tasks');
  grunt.loadTasks(depsPath + '/grunt-contrib-watch/tasks');

  // When Sails is lifted:
  grunt.registerTask('default', [
    'reloadAssets',
    'watch'
  ]);

  // added less:dev task.
  grunt.registerTask('reloadAssets', [
    'clean:dev',
    'jst:dev',
    'less:dev',
    'copy:dev',
    'scriptlinker:devJs',
    'scriptlinker:devStyles',
    'scriptlinker:devTpl'
  ]);

  // When assets are changed:
  grunt.registerTask('assetsChanged', [
    'reloadAssets'
  ]);

  // Build the assets into a web accessable folder.
  grunt.registerTask('build', [
    'reloadAssets',
    'clean:build',
    'copy:build'
  ]);

  // When API files are changed:
  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);

    // Send a request to a development-only endpoint on the server
    // which will reuptake the file that was changed.
    var baseurl = grunt.option('baseurl');
    var gruntSignalRoute = grunt.option('signalpath');
    var url = baseurl + gruntSignalRoute + '?action=' + action + '&filepath=' + filepath;

    require('http').get(url)
    .on('error', function(e) {
      console.error(filepath + ' has ' + action + ', but could not signal the Sails.js server: ' + e.message);
    });
  });
};
```
