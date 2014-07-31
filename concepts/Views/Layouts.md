# Layouts

When building an app with many different pages, it can be helpful to extrapolate markup shared by several HTML files into a layout.  This [reduces the total amount of code](http://en.wikipedia.org/wiki/Don't_repeat_yourself) in your project and helps you avoid making the same changes in multiple files down the road.

In Sails and Express, layouts are implemented by the view engines themselves.  For instance, `jade` has its own layout system, with its own syntax.

For convenience, Sails bundles special support for layouts **when using the default view engine, EJS**. If you'd like to use layouts with a different view engine, check out [that view engine's documentation](./#!documentation/reference/Views/ViewEngines.html) to find the appropriate syntax.


### Creating Layouts

Sails layouts are special `.ejs` files in your app's `views/` folder you can use to "wrap" or "sandwich" other views. Layouts usually contain the preamble (e.g. `!DOCTYPE html<html><head>....</head><body>`) and conclusion (`</body></html`).  Then the original view file is included using `<%- body %>`.  Layouts are never used without a view- that would be like serving someone a bread sandwich.

Layout support for your app can be configured or disabled in [`config/views.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/views.js.html), and can be overridden for a particular route or action by setting a special [local](./#!documentation/reference/Views/Locals.html) called `layout`. By default, Sails will compile all views using the layout located at `views/layout.ejs`.


### Notes

> #### Why do layouts only work for EJS?
> In Express 3, built-in support for layouts/partials was deprecated. Instead, developers are expected to rely on the view engines themselves to implement this features. (See https://github.com/balderdashy/sails/issues/494 for more info on that.)
> 
> Since adopting Express 3, Sails has chosen to support the legacy `layouts` feature for convenience, backwards compatibility with Express 2.x and Sails 0.8.x apps, and in particular, familiarity for new community members coming from other MVC frameworks. As a result, layouts have only been tested with the default view engine (ejs).
>
> If layouts aren&rsquo;t your thing, or (for now) if you&rsquo;re using a server-side view engine other than ejs, (e.g. Jade, handlebars, haml, dust) you&rsquo;ll want to set `layout:false` in [`sails.config.views`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.views.html), then rely on your view engine&rsquo;s custom layout/partial support.




<docmeta name="uniqueID" value="Layouts870655">
<docmeta name="displayName" value="Layouts">

