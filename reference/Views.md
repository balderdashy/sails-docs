# Views

### Overview

In Sails, views are markup templates that are rendered _on the server_ into HTML pages.  In most cases, views are rendered and then used as the response to an incoming HTTP request, e.g. to serve your home page.

Alternatively, a view can be rendered directly into an HTML string for use in your backend code (see [`sails.renderView()`]().)  For instance, you might use this approach to send HTML emails, or to build big XML strings for use with a legacy API.


###### Creating a view

By default, Sails is configured to use EJS ([Embedded Javascript](http://embeddedjs.com/)) as its view engine.  The syntax for EJS is highly conventional- if you've worked with php, asp, erb, gsp, jsp, etc., you'll immediately know what you're doing.

If you prefer to use a different view engine, there are a multitude of options.  Sails supports all of the view engines compatible with [Express]() via [Consolidate]().

Views are defined in your app's `views/` folder by default, but like all of the default paths in Sails, they are [configurable]().


###### Rendering a view

Anywhere you can access the `res` object (i.e. a controller action, custom response, or policy), you can use [`res.view`]() to send one of your views down to the requesting user.

You can also hook up a view directly to a route in your `routes.js` file.  Just indicate the relative path to the view from your app's `views/` directory.  For example:

```javascript
{
  'get /': {
    view: 'homepage'
  },
  'get /signup': {
    view: 'signupFlow/basicInfo'
  },
  'get /signup/password': {
    view: 'signupFlow/chooseAPassword'
  },
  // and so on.
}
```

###### What about single-page apps?

If you are building a web application for the browser, part (or all) of your navigation may take place on the client; i.e. instead of the browser fetching a new HTML page each time the user navigates around, the client-side code preloads some markup templates which are then rendered without needing to hit the server again directly.

In this case, you have a couple of options for bootstrapping the single-page app:

+ Use a single view, e.g. `views/publicSite.ejs`.  Advantages:
  + You can use the view engine in Sails to pass data from the server directly into the HTML that will be rendered on the client.  This is an easy way to get stuff like user data to your client-side javascript, without having to send AJAX/WebSocket requests from the client.
+ Use a single HTML page in your assets folder , e.g. `assets/index.html`. Advantages:
  + Although you can't pass server-side data directly to the client this way, this approach allows you to further decouple the client and server-side parts of your application.
  + Anything in your assets folder can be moved to a static CDN (like Cloudfront or CloudFlare), allowing you to take advantage of that provider's geographically distributed data centers to get your content closer to your users.



# View Engines

The default view engine in Sails is [EJS](https://github.com/visionmedia/ejs).

##### Swapping out the view engine

To use a different view engine, you should use npm to install it in your project, then set `sails.config.views.engine` (in `config/views.js`.)

For example, to switch to jade, run `npm install jade --save-dev`, then set `engine: 'jade'` in `config/views.js`.



##### Supported view engines

  - [atpl](https://github.com/soywiz/atpl.js)
  - [dust](https://github.com/akdubya/dustjs) [(website)](http://akdubya.github.com/dustjs/) (.dust)
  - [eco](https://github.com/sstephenson/eco)
  - [ect](https://github.com/baryshev/ect) [(website)](http://ectjs.com/)
  - [ejs](https://github.com/visionmedia/ejs) (.ejs)
  - [haml](https://github.com/visionmedia/haml.js) [(website)](http://haml-lang.com/)
  - [haml-coffee](https://github.com/9elements/haml-coffee) [(website)](http://haml-lang.com/)
  - [handlebars](https://github.com/wycats/handlebars.js/) [(website)](http://handlebarsjs.com/) (.hbs)
  - [hogan](https://github.com/twitter/hogan.js) [(website)](http://twitter.github.com/hogan.js/)
  - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/) (.jade)
  - [jazz](https://github.com/shinetech/jazz)
  - [jqtpl](https://github.com/kof/node-jqtpl) [(website)](http://api.jquery.com/category/plugins/templates/)
  - [JUST](https://github.com/baryshev/just)
  - [liquor](https://github.com/chjj/liquor)
  - [lodash](https://github.com/bestiejs/lodash) [(website)](http://lodash.com/)
  - [mustache](https://github.com/janl/mustache.js)
  - [QEJS](https://github.com/jepso/QEJS)
  - [ractive](https://github.com/Rich-Harris/Ractive)
  - [swig](https://github.com/paularmstrong/swig) [(website)](http://paularmstrong.github.com/swig/)
  - [templayed](http://archan937.github.com/templayed.js/)
  - [toffee](https://github.com/malgorithms/toffee)
  - [underscore](https://github.com/documentcloud/underscore) [(website)](http://documentcloud.github.com/underscore/)
  - [walrus](https://github.com/jeremyruppel/walrus) [(website)](http://documentup.com/jeremyruppel/walrus/)
  - [whiskers](https://github.com/gsf/whiskers.js)



##### Registering a custom view engine

For instructions on adding support for a view engine not listed above, check out the [consolidate project](https://github.com/visionmedia/consolidate.js/blob/master/Readme.md#api) repository.


# Layouts

Layouts are special files in your `views/` folder you can use to wrap your other views.  For an app with many different pages, it can be helpful to extrapolate markup shared by several HTML files into a layout.  This [reduces the total amount of code](http://en.wikipedia.org/wiki/Don't_repeat_yourself) in your project and helps you avoid making the same changes in multiple files down the road.



# Locals

In Sails (and other MVC frameworks), views have access to variables called `locals`.  Locals represent server-side data that is _accessible_ to your view-- locals are not actually _included_ in the rendered HTML unless you explicitly reference them using special syntax provided by your view engine.

```ejs
<div>Logged in as <a><%= name %></a>.</div>
```

###### Using locals in your views

The notation for accessing locals in your views varies between view engines.  In EJS, you use special template markup (e.g. `<%= someValue %>`) to access locals from your view.

There are three kinds of template tags in EJS:
+ `<%= someValue %>`
  + Most of the time, you'll want to use this kind of tag.
  + Escape, then inject a non-HTML string.
+ `<%- someRawHTML %>
  + Inject an HTML string verbatim.
  + Be careful!  This tag can make you vulnerable to XSS attacks if you don't know what you're doing.
+ `<% if (!loggedIn) { %><a>Logout</a><% } %>`
  + Run the javascript inside the `<% ... %>` (on the server at render-time)
  + Useful for conditionals (`if`/`else`), and looping over data (`for`/`each`).


Here's an example of a view (`views/backOffice/profile.ejs`) using two locals, `user` and `corndogs`:

```html
<div>
  <h1><%= user.name %>'s first view</h1>
  <h2>My corndog collection:</h2>
  <ul>
    <% _.each(corndogs, function (corndog) { %>
    <li><%= corndog.name %></li>
    <% }) %>
  </ul>
</div>
```

> You might have noticed another local, `_`.  By default, Sails passes down a few locals to your views automatically, including `lodash` (`_`).

If the data you wanted to pass down to this view was completely static, you don't necessarily need a controller- you could just hard-code the view and its locals in your `config/routes.js` file, i.e:

```javascript
  // ...
  'get /profile': {
    view: 'backOffice/profile',
    locals: {
      user: {
        name: 'Frank',
        emailAddress: 'frank@enfurter.com'
      },
      corndogs: [
        { name: 'beef corndog' },
        { name: 'chicken corndog' },
        { name: 'soy corndog' }
      ]
    }
  },
  // ...
```

On the other hand, in the more likely scenario that this data is dynamic, we'd need to use a controller action to load it from our models, then pass it to the view using the [res.view()]() method.

Assuming we hooked up our route to one of our controller's actions (and our models were set up), we might define the action something like this:

```javascript

User.findOne({
  id: req.param('id')
})
.populate('corndogCollection')
.exec(function whenReady (err, theUser) {
  if (err) return res.serverError(err);
  if (!theUser) return res.badRequest('Unknown user with id: ', theUser.id);

  return res.view('backOffice/profile', {
    user: theUser,
    corndogs: theUser.corndogCollection
  });
});
```


