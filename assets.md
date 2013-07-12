# Assets
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

Assets refer to anything (js, css, html, images, etc) that needs to be accessible to the outside world. 
The `assets` folder is where all of your assets will go, and will be served as static assets. 
If you have experience with ExpressJs, it is equivalent to the `public` folder (the same as in sails 0.8.x).  

However, Sails does do a few extra things to help you out.
 - Automatic LESS compilation
 - Automatic JST compilation
 - Optional automatic asset injection, minification, and concatenation

In order to take advantage of asset injection, minification, and concatenation you must put your assets in folder under 
`assets/linker`. Any asset you put in linker will be automatically injected based on special flags in your views.
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

If you did not create an application with the `--linker` option. You will need to create the following file structure
```
assets/
  linker/
    js/
    styles/
    templates/
```
