# Assets
> _**Note:** You are viewing the Sails.js v0.9.x documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

Assets refer to anything (js, css, html, images, etc) that needs to be accessible to the outside world. 
The `assets` folder is where all of your assets will go, and will be served as static assets. 
If you have experience with [Express](http://www.expressjs.com), it is equivalent to the `public` folder (the same as in Sails 0.8.x).  

However, Sails does do a few extra things to help you out:
 - Automatic LESS compilation
 - Automatic JST compilation
 - Optional automatic asset injection, minification, and concatenation

In order to take advantage of asset injection, minification, and concatenation you must put your assets in folder under 
`assets/linker`. Any asset you put in `linker` will be automatically injected based on special flags in your views.
```html
<!--SCRIPTS-->
All .js files in assets/linker/js will be included here
In production mode, they will all be concatenated and minified
<!--SCRIPTS END-->

<!--STYLES-->
All .css files in assets/linker/styles (including automatically compile ones from LESS) will be included here
In production mode, they will all be concatenated and minified
<!--STYLES END-->

<!--TEMPLATES-->
All *.html files will be compiled as JST templates and included here.
<!--TEMPLATES END-->
```
Jade templates are also supported
```jade
// SCRIPTS
// SCRIPTS END

// STYLES
// STYLES END

// TEMPLATES
// TEMPLATES END
```

If you did not create an application with the `--linker` option, you will need to create the following file structure
and also add the special flags metioned above into the desired views:
```
assets/
  linker/
    js/
    styles/
    templates/
```

Since the order of styles and scripts is important, you can change the order of injection by opening your
`Gruntfile.js` file. You will see three arrays at the top of the file where you can use Grunt-style
wildcard/glob/splat expressions to order your assets.

Here is an example:
```javascript
module.exports = function (grunt) {
 
 'use strict';
 
 ...
 
  var jsFilesToInject = [
    // Need this order for these libraries to work correctly
    'linker/js/vendor/jquery.js',
    'linker/js/vendor/underscore.js',
    'linker/js/vendor/backbone.js',
    
    // Inject all of js assests after
    'linker/**/*.js'
  ];
 
 ...
 
}
```
