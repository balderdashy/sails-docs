# myApp/assets/templates
### Purpose - Client-side Templates

HTML templates are important prerequisites of modern, rich client applications.
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

<docmeta name="uniqueID" value="templatesmd846667">
<docmeta name="displayName" value="templates">

