# myApp/views/layout.ejs
### Purpose
This [Embedded JavaScript file](http://embeddedjs.com/) acts as the default layout for all server side views rendered by your app.  

Before one of your custom views is sent to the client, it is injected into this file.  It is this file that is actually sent to the client.  

Feel free to change this as you see fit.  Its also a great place to include javascript and css that you plan on using in every view.  This keeps you from having to include them in all your custom .ejs files.  Note, this isnt an issue if you created your app with the `--linker` flag.  In this case, everything in your assets directory is minified and injected into every view rendered by your app. 


<docmeta name="uniqueID" value="layoutejs708856">
<docmeta name="displayName" value="layout.ejs">

```
<!DOCTYPE html>
<html>
  <head>
    <title>New Sails App</title>

    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    
    <!--  
        Stylesheets and Preprocessors
        ==============================

        You can always bring in CSS files manually with `<link>` tags, or asynchronously
        using a solution like AMD (RequireJS).  Or, if you like, you can take advantage 
        of Sails' conventional asset pipeline (boilerplate Gruntfile).

        By default, stylesheets from your `assets/linker/styles` folder are included
        here automatically (between STYLES and STYLES END). Both CSS (.css) and LESS (.less)
        are supported. In production, your styles will be minified and concatenated into
        a single file.
        
        To customize any part of the built-in behavior, just edit your Gruntfile.
        For example, here are a few things you could do:
            
            + Change the order of your CSS files
            + Import stylesheets from other directories
            + Use a different or additional preprocessor, like SASS, SCSS or Stylus
    -->

    <!--STYLES-->
    <!--STYLES END-->
  </head>

  <body>
    <%- body %>



    <!--
        Client-side Templates
        ========================

        HTML templates are important prerequisites of modern, rich client applications.
        To work their magic, frameworks like Backbone, Angular, Ember, and Knockout require
        that you load these templates client-side.

        By default, your Gruntfile is configured to automatically load and precompile
        client-side JST templates in your `assets/linker/templates` folder, then
        include them here automatically (between TEMPLATES and TEMPLATES END).
        
        To customize this behavior to fit your needs, just edit your Gruntfile.
        For example, here are a few things you could do:

            + Import templates from other directories
            + Use a different template engine (handlebars, jade, dust, etc.)
            + Internationalize your client-side templates using a server-side
              stringfile before they're served.
    -->

    <!--TEMPLATES-->
    <!--TEMPLATES END-->


    <!--

      Client-side Javascript
      ========================

      You can always bring in JS files manually with `script` tags, or asynchronously
      on the client using a solution like AMD (RequireJS).  Or, if you like, you can 
      take advantage of Sails' conventional asset pipeline (boilerplate Gruntfile).

      By default, filesin your `assets/linker/js` folder are included here
      automatically (between SCRIPTS and SCRIPTS END).  Both JavaScript (.js) and
      CoffeeScript (.coffee) are supported. In production, your scripts will be minified
      and concatenated into a single file.
      
      To customize any part of the built-in behavior, just edit your Gruntfile.
      For example, here are a few things you could do:
          
          + Change the order of your scripts
          + Import scripts from other directories
          + Use a different preprocessor, like TypeScript

    -->

    <!--SCRIPTS-->
    <!--SCRIPTS END-->
  </body>
</html>

```
