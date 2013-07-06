#Views
There are three kinds of views in Sails: Traditional view partials, view templates, and
the layout.

## What is a View?
In Sails, a view is the representation of the UI of your application. Views are, by default, EJS ([Embedded JavaScript](http://embeddedjs.com/)) files. EJS, or any other configurable templating libray, takes care of the presentation of the data. Sails even allows you to create templates that are injected into the DOM. This means you only ever need to respond with JSON objects in your controllers, creating a truly API-driven
application.

## Where do I define Views?
Traditional views are defined in the **/views/** directory while templates are defined in the 
**/assets/templates/** directory.

## Server-side Views, Layout, and View Partials
Server-side views in the **/views/** directory are by default EJS files that will handle the job
of presenting data when a view is requested by the client. The method ```res.view()``` call will
respond to a client with the appropriate view. If no controller or action for a request exist, Sails.js's resourceful routing automatically serves a view if the view **/views/:controller/:action.ejs** exists.

Here's an example of a view (views/corndog/index.ejs) that consumes some data sent down from a controller:

```html
<div>
  <h1>My first view</h1>

  <h2>My corndog collection:</h2>
  <ul>
    <% _.each(corndogs, function (corndog) { %>
    <li><%= corndog.name %></li>
    <% }) %>
  </ul>
</div>
```

And here's what the controller looks like:
```javascript
	var CorndogController = {

		index: function(req, res) {
			return res.view({
				corndogs: [{name: 'Hank the Corndog'}, {name: 'Lenny the Corndog'}]
			});
		}
	}
	module.exports = CorndogController;
```

Opening up **/views/layout.ejs** you will see some EJS partials ```<%- assets.css() ->```, ```<%- assets.js() ->```, ```<%- body ->```, and ```<%- assets.templateLibrary() ->```.

Both **assets.css()** and **assets.js()** partials inject compiled CSS and JS assets into your layout.
The **body** partial is where the req views will be injected. Finally, **assets.templateLibrary()**
is used for client side template injection.

The default **/views/layout.ejs** will look like this:

```html
<!DOCTYPE html>
<html>
	<head>
		<title><%- title %></title>

		<!-- Viewport mobile tag for sensible mobile support -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		
		<!-- JavaScript and stylesheets from your public folder are included here -->
		<%- assets.css() %>
		<%- assets.js() %>
	</head>

	<body>
		<%- body %>

		<!-- Templates from your view path are included here -->
		<%- assets.templateLibrary() %>
	</body>
</html>
```

This layout file is the beginning of an HTML5-compatable web application.  This is about all you need; if you want to add in custom links to JavaScript or to external resources that are not handled by assets, this is where you should do it.

If you need to override a layout for a specific view, you can do so in the res.view call as below:

```javascript
res.view({
  layout: "different_layout"
})
```

This could be called from any controller output.

## View Partials

Partials are just as they sound; a View Partial is only a small part of the overall DOM that you see on your web application.  With that said, a partial is nothing more than another (smaller) EJS file. Lets take a look at a partial from the Sails example, and how we should include it from another EJS file.

**/views/site/partials/footer.ejs**
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
<footer>
```
As you can see, this is nothing more than a simple EJS file: nothing special, nothing magical.

Now, lets call it from our index file.

**/views/site/index.ejs**
```html
<%- partial('partials/header')%>
<%- partial('partials/page')%>
<%- partial('partials/footer') %>  
```

Boring you say?  Well, maybe.  We don't have a lot in our index.ejs file, but thats because we don't need a lot.  We call the partials for the site we need to include.  Simply calling a partial by relative path will have it included at runtime.  This makes our code base very clean and easy to read.

Something a little more complicated?  Sure!  We'll do a two-level partial this time.  Using our same index.ejs file, lets take a look at the "page" partial.

**/views/site/partials/page.ejs**
```html
<section id="section1">
	<span>
		<%- partial('sections/about')%>
	</span>
</section>
<section id="section2">
	<span>
		<%- partial('sections/blog')%>
	</span>
	<span>
		<%- partial('sections/chat')%>
	</span>
	<div class="clearfix"></div>
</section>
```

Still simple. But what's this? We are now including other partials from within our partial?  YES! that is exactly what we are doing.  We can create a hierarchical system of partials that make it easy for designers to navigate through the files.

Lets take a look at the "about" section.  Since we are dealing with HTML5, we like to name the folders that the partials are held in accordingly.  Why? because it just makes sense!

**/views/site/partials/sections/about.ejs**
```html
<p>
Sails.js is built on Node.js for easily building fast, scalable network applications. Sails.js provides a MVC framework perfect for data-intensive real-time applications that run across distributed devices.  Sails.js provides a JSON API right out of the box.<br>
<br>
Current Version: v0.8.82
</p>
```

Lets look at this a bit now.  We just included a partial from within another partial.  We can use relative pathing to include and because our **/views/site/partials/page.ejs** page and **/views/site/partials/sections** folder are at the same level in the file system, relative pathing is easy to use.  Simple right?  We thought so, too.

We have a structure that we prefer to use for partials to make things easy to read.  This is by no means a "have-to-use" structure, but we do suggest it, as it is our standard.


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

More infomation about view partials
can be found <a href="http://expressjs.com/2x/guide.html#view-partials">here</a>.

<!-- _TODO_

## View Promises
With Promises, views can be used to build complex API responses that join together several models
without ever having to write a controller.  
_TODO_ -->

## Client-side Templates

Any template files included in the **assets/templates/** directory are automatically "absorbed"
as client-side templates and injected into the DOM wherever the ```<%- templateLibrary %>``` view
partial is employed.

##Templating Engine Configuration

One of the benefits of Sails.js is flexibility.  Sails.js's views system allows for other templating engines than the default (EJS).  The JADE Node Template Engine is available for use as well.  Just install it via *npm* and change the engine in **/config/views.js**, or use `sails new appname --template=jade` for new projects.