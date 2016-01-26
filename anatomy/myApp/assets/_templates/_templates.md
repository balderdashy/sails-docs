# myApp/assets/templates
### Purpose - Client-side Templates

Client-side HTML templates are important prerequisites for certain types of modern, rich client applications built for browsers; particularly [SPAs](https://en.wikipedia.org/wiki/Single-page_application). Whether or not you use this sort of template in your app and how you structure your templates is, of course, completely up to you.  But for the sake of convention, new apps generated with Sails include a `templates/` folder for you by default.

To work their magic, frameworks like Backbone, Angular, Ember, and Knockout require
that you load these templates client-side.

By default, your Gruntfile is configured to automatically load and precompile
client-side JST templates in your `assets/templates` folder, then
include them here automatically (between TEMPLATES and TEMPLATES END).

    <!--TEMPLATES-->
        
    <!--TEMPLATES END-->

To customize this behavior to fit your needs, just edit your Gruntfile.
For example, here are a few things you could do:

- Import templates from other directories
- Use a different template engine (handlebars, jade, dust, etc) 
- Internationalize your client-side templates using a server-side stringfile before they're served.


<docmeta name="displayName" value="templates">

