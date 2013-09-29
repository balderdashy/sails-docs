# Views

Server-sent views are a classic and effective way to get your app up and running.
Views are normally served from controllers, but by default, Sails also exposes routes to allow you to preview your views in a browser.  This automatic routing can be disabled using the `blueprint` config below.  You can also configure your templating language/framework of choice, and configure Sails&rsquo; layout support.

##Routes
If enabled, views are automatically served at logical routes, based on their paths. This comes in handy any time you just want to serve some static HTML. (i.e. a brochure site)

For example, the static view files below are available at the specified routes:

+ `views/catalog.ejs`  		: `get /catalog`
+ `views/catalog/index.ejs`	: both `get /catalog` & `get /catalog/index`
+ `views/catalog/story.ejs`	: `get /catalog/story`


##Layouts
Layouts are simply top-level HTML templates you can use as wrappers for your server-side views.  If you&rsquo;re using ejs, you can take advantage of Sails&rsquo; built-in `layout` support.

With using a layout, when one of your views is served, it is injected into the `<%- body %>` partial defined in the layout.  This lets you reuse header and footer logic between views.

The `layout` setting may be set to one of:

+ false		::	don&rsquo;t use a layout (just render the view by itself)
+ &ldquo;string&rdquo;		::	the relative path to your layout from your views folder (`views/`)

If you&rsquo;d like to use more than one `layout` file, you can! 
See the [full documentation on views](https://github.com/balderdashy/sails-wiki/blob/0.9/views.md) for more information.


<!--
##Engine
###View engine (aka template language) to use for your app's *server-side* views

While this setting defaults to `ejs`, Sails (like Express) supports all view engines which implement 
TJ Holowaychuk's `consolidate.js`, including, but not limited to:

+ ejs, jade, handlebars, mustache
+ underscore, hogan, haml, haml-coffee, dust
+ atpl, eco, ect, jazz, jqtpl, JUST, liquor, QEJS
+ swig, templayed, toffee, walrus, & whiskers


To further customize your `engine` configuration, you can use the alternative format
to enable use of various consolidate supported engines in custom ways:

```javascript
engine: {
    ext: 'html',
    fn: require('consolidate').swig
}
```
-->

###Using Layouts With Other View Engines
In Express 3, built-in support for layouts/partials was deprecated. Instead, developers are expected to rely on the view engines themselves to implement this features. (See https://github.com/balderdashy/sails/issues/494 for more info on that.)

Since adopting Express 3, Sails has chosen to support the legacy `layouts` feature for convenience, backwards compatibility with Express 2.x and Sails 0.8.x apps, and in particular, familiarity for new community members coming from other MVC frameworks. As a result, layouts have only been tested with the default view engine (ejs).

If layouts aren&rsquo;t your thing, or (for now) if you&rsquo;re using a server-side view engine other than ejs, (e.g. Jade, handlebars, haml, dust) you&rsquo;ll need to set this option to: `layout:false` and then rely on your view engine&rsquo;s built-in layout/partial support.
