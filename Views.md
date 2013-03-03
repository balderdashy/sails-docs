There are three kinds of views in Sails. There are traditional view partials, view templates, and
the layout.

# What is a View?
In Sails a view is the representation of the UI of your application. Views are, by default, ejs
files. This ejs, or any other configurable templating libray, takes care of the presentation of the
data. Sails even allows you to create templates that are injected into the DOM. With this, all
you ever have respond with is JSON objects in your controllers, creating a truely API-driven
application.

# Where do I define Views?
Traditional views are defined in the **ui/views/** directory while templates are defined in the 
**/ui/views/templates/** directory.

# Server-side Views, Layout, and View Partials
Server-side views in the **/ui/views/** directory are by default ejs files that will handle the job
of presenting data when requested a view but the client. The method ```res.view()``` call will
respond to a client with the appropriate view. If no controller or action for a request exist, Sails resourceful routing automatically serves a view if the view **/views/:controller/:action.ejs** exists.

Here's an example of a view (ui/views/corndog/index.ejs) that consumes some data sent down from a controller:

```
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

Opening up **/ui/views/layout.ejs** you will see some ejs partials ```<%- rigging.css ->```, ```<%- rigging.js ->```, ```<%- body ->```, and ```<%- rigging.templateLibrary ->```.

Both **rigging.css** and **rigging.js** partials inject compiled css and js assets into your layout.
The **body** partial is where the req views will be injected. Finally, **rigging.templateLibrary**
is used for client side template injection.

The default **/ui/views/layout.ejs** will look like this:

```
<!DOCTYPE html>
<html>
	<head>
		<title><%- title %></title>

		<!-- Viewport mobile tag for sensible mobile support -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		
		<!-- JavaScript and stylesheets from your public folder are included here -->
		<%- rigging.css %>
		<%- rigging.js %>
	</head>

	<body>
		<%- body %>

		<!-- Templates from your view path are included here -->
		<%- rigging.templateLibrary %>
	</body>
</html>
```

This layout files is the beginning to a html5 compatable website application.  This is about all you need.  If you want to add in custom links to javascript or to external resources that are not handled by rigging, this is where you should do it.

# View Partials

Partials are just like they sound.  A View Partial is only a small part of the overall dom that you see on your web application.  With that said, a partial is nothing more than another (smaller) ejs file.  Lets take a look at a partial from the sails example, and how we should include it from another ejs file.

**/ui/views/site/partials/footer.ejs**
```
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
As you can see, this is nothing more than a simple ejs file.  Nothing special, nothing magical.

Now, lets call it from our index file.

**/ui/views/site/index.ejs**
```
<%- partial('partials/header')%>
<%- partial('partials/page')%>
<%- partial('partials/footer') %>  
```

Boring you say?  Well, maybe.  We don't have a lot in our index.ejs file, but thats because we don't need a lot.  We call the partials for the site we need to include.  Simply calling a partial by relative path will have it included at runtime.  This makes our code base very clean and easy to read.

Something a little more complicated?  Sure!  We'll do a 2 level partial this time.  Using our same index.ejs file lets take a look at the "page" partial.

**/ui/views/site/partials/page.ejs**
```
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

Still simple, but whats this? we are now including other partials from within our partial?  YES! that is exactly what we are doing.  From what you can see now...we can create a hierarchial system of partials that make it easy to navigate through the files for designers.

Lets take a look at the "about" section.  Since we are dealing with html5, we like to name the folders that the partials are held in accordingly.  Why? because it just makes sense!

**/ui/views/site/partials/sections/about.ejs**
```
<p>
Sails.js is a platform built on Node.js for easily building fast, scalable network applications. Sails.js provides a MVC framework perfect for data-intensive real-time applications that run across distributed devices.  Sails.js provides a json API right out of the box.<br>
<br>
Current Version: v0.0
</p>
```

Lets look at this a bit now.  We just included a partial from within another partial.  We can use relative pathing to include and because our **/ui/views/site/partials/page.ejs** page and **/ui/views/site/partials/sections** folder are at the same level in the file system, relative pathing is easy to use.  Simple right?  We thought so too.

We have a stucture that we prefer to use for partials to make things easy to read.  This is by no means a "have-to-use" structure, but we do suggest it, as its our standards.


```
PROJECT FOLDER
└── ui
    └── views
        ├── 401.ejs
        ├── 404.ejs
        ├── layout.ejs
        ├── site
        │   ├── index.ejs
        │   └── partials
        │       ├── footer.ejs
        │       ├── header.ejs
        │       ├── page.ejs
        │       └── sections
        │           ├── about.ejs
        │           ├── blog.ejs
        │           └── chat.ejs
        └── templates
```

This layout makes it really simple to navigate and keep things organized.

More infomation about view partials
can be found <a href="http://expressjs.com/2x/guide.html#view-partials">here</a>.

_TODO_

<!-- # View Promises
With Promises, views can be used to build complex API responses that join together several models
without ever having to write a controller.  
_TODO_ -->

# Client-side Templates
Any template files included in the **ui/views/templates/** directory are automatically "absorbed"
as client-side templates and injected into the DOM wherever the ```<%- templateLibrary %>``` view
partial is employed.

#Templating Engine Configuration
You can easily use any templating engine you like by changing your configuration file. Just change
the templateEngine property to the appropriate template extension name.