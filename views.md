#Views
> _**Note:** You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._

> ##### Building a native iOS app in Cocoa, or an Android app in Java?
> Views, in Sails, are **just** for serving HTML.  If you're using Sails for a game, or a native iOS/Android app, or a toaster, you probably don't need to worry about them right now.  Still, since you usually need to build *something* for mobile and/or desktop web browsers (e.g. a website for your game, or browser-viewable profiles for your mobile app), you might want to read on anyways.


## What is a View?
If we wanted to be academic about it, (which we will for a moment, forgive me) a view is the representation of the data presented by your application.

But for us, in the world of building web apps, it's important to understand that views in Sails are **HTML templates sent down from the server**.  In other words, a Sails view is equivalent to any other plain-jane HTML page-- it's just that some parts can change depending on the data we send down into it from our controller.

> ##### What about client-side templates and SPAs?
> These sorts of server-side views, in most of the 2000s, were a central component of web applications.  Nowadays, more and more web experiences are being built as SPAs (Single Page Apps), using client-side routes for different sections of the UI (e.g. #my_profile, or #user/3af84920abb4) and loading HTML templates *from the browser* in all sorts of interesting ways. You might be familiar with this concept from web UI frameworks like Backbone, Angular, Ember, Knockout, etc.
> Sails is built **specifically for** these types of modern apps, but in this section of the docs, we'll be focusing on server-side views.  If you've got a good handle on how this works in Node.js from working with a framework like Express, feel free to skip ahead!


## Where do I put my views?
Views are defined in your app's `views/` folder by default, but like all of the default paths in Sails, they are [configurable](https://github.com/balderdashy/sails-wiki/blob/0.9/config.paths.md).

## Getting dynamic data in your views (Templating)

To display dynamic data (stuff that changes depending on the user/request) in our views, we need to consider two things:

##### (1) How will the data will show up in the HTML?

By default, views are EJS ([Embedded JavaScript](http://embeddedjs.com/)) files. that look like `home/index.ejs`.  The notation for EJS templates looks a lot like what you might have seen before in PHP (`<?php ?>`), Ruby (`.erb`), Java (`.jsp`), or Grails (`.gsp`).

> But I like Jade/Handlebars/Dust/JST...?
> Sails supports the same view engines as Express through the use of the `consolidate library`.  For more on configuring other view engines, check out your `config/views.js` file, and the [configuration reference for views](https://github.com/balderdashy/sails-wiki/blob/0.9/config.views.md).  We'll focus on EJS for the examples below.

In EJS, you use special template markup (e.g. `<%= someValue %>`) to grab hold of the data being passed in.  These special template tags are processed on the server, and will never show up when the HTML from the rendered view is actually sent down to a user's browser.

There are three kinds of template tags in EJS:
+ `<%= someValue %>`
   + > TODO
+ `<%- someRawHTML %>
  + Be careful!  This tag can make you vulnerable to XSS attacks if you don't know what you're doing.
  + > TODO
+ `<%  /* some javascript code with access to the data as local variables */ %>`
  + Useful for conditionals (`if`/`else`), and looping over data (`for`/`each`)
  + > TODO

Here's an example of a view (views/corndog/index.ejs) that consumes some data sent down from a controller:

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



##### (2) Where will the data will come from?

In Sails (and every other MVC framework), views have their dynamic data passed down from a controller.  The method `res.view()` in Sails controllers allows you to respond to the client with the view which corresponds with the controller and action you're running it from.  For example, calling `res.view()` in the `index` action in `controllers/FooController.js` would render the view at `views/foo/index.ejs`.  Calling `res.view()` in the `create` action of the `UserController` would render the view at `views/user/index.ejs`.  Make sense?

To pass data into the view, include it as the `data` argument to `res.view(data)`.  However, **it must be a plain JavaScript object!**  You cannot send down an array directly-- however you can include it as one of the keys of your object.  In other words, something like the following would work just fine:

```javascript
res.view({
  name: 'Mike',
  favoriteColor: 'green',
  friends: [{
    name: 'Margaret Thatcher',
    favoriteColor: 'purple'
  },
  {
    name: 'Big Bird',
    favoriteColor: 'yellow'
  }]
});
```

Finally, `res.view()` should always be the last thing you call in a controller- by calling it, you're responding to the request, and you don't have access to it anymore.  Trying to do stuff after responding will usually result in an error, so as a rule, don't do it!




## Reusing HTML
Sails has built-in support for **layouts** and **partials** to facilitate code reuse within your views.  You might say building your app on Sails keeps you [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself). (Sorry, couldn't resist.)


## Layouts

> TODO: rewrite this


## View Partials

A partial is a small HTML template you can include in views, layouts, and even other partials.  Typical use cases include footers, headers, navigation sections, etcetera.  It's recommended to stick to convention and create a `views/partials` folder for holding your view partials, but partials can be loaded from anywhere.

For example, here's what a footer view partial might look like:

##### `views/partials/footer.ejs`
```html
<footer>
	<span>
		<div class="float-right">
		</div>
		<div class="float-left">
			Balderdash &copy; 2013
		</div>
		<div class="clearfix">
		</div>
	</span>
<footer>
```

Now, lets include it from our home page (we'll use the relative path to our partial.  Notice how we don't include the partial's file extension (`.ejs` in this case):

####`views/home/index.ejs`
```html
<h1>The Coolest App</h1>
<p>It will probably has sharing and photos and stuff like that.</p>
<%- partial('partials/footer') %>  
```









<!--

```text
PROJECT FOLDER
└── views
    ├── 401.ejs
    ├── 404.ejs
    ├── layout.ejs
    └── <controller>
        ├── index.ejs
        ├── <action>.ejs
        └── partials
            ├── footer.ejs
            ├── header.ejs
            ├── page.ejs
            └── sections
                ├── about.ejs
                ├── blog.ejs
                └── chat.ejs
```

This layout makes it really simple to navigate and keep things organized.

-->



<!--
## What about using multiple layouts?

Express 3 removed native support for layouts.  In Sails, we've managed to keep this around, but we don't officially support multiple layouts.

That said, at least in EJS, instead of indicating your custom layout with the `layout` local,
you must use `_layoutFile`:
```javascript
res.view({
  _layoutFile: 'relativePathToYourCustomLayoutFromTheTargetView.ejs'
});
```

The path to the layout you're wanting to use should be specified  **relative** to the view you're rendering.

So if you're in the create action of the UserController, rendering a view (`views/user/create.ejs`), the relative path to your custom layout might be: `../staticSiteLayout.ejs`

```text
PROJECT FOLDER
└── views
    ├── staticSiteLayout.ejs
    ├── layout.ejs
    └── user
    	└── create.ejs
```
-->



<!--
If you need to override a layout for a specific view, you can do so in the res.view call as below:

```javascript
res.view({
  layout: "different_layout"
})
```
-->




<!--

Here's an example controller:
```javascript
        // controllers/CorndogController.js
	module.exports = {

		index: function(req, res) {
                        // will render the view at `views/corndog/index.ejs`
			return res.view({
				corndogs: [
                                  { name: 'Hank the Corndog' },
                                  {name: 'Lenny the Corndog'}
                                ]
			});
		}
	};
```
-->
