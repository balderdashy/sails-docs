There are three kinds of views in Sails. There are traditional view partials, view templates, and
the layout.

# What is a View?
In Sails a view is the representation of the UI of your application. Views are, by default, ejs
files. This ejs, or any other configurable templating libray, takes care of the presentation of the
data. Sails even allows you to create templates that are injected into the DOM. With this, all
you ever have respond with is JSON objects in your controllers, creating truely API-driven
application.

# Where do I define Views?
Traditional views are defined in the **ui/views/** directory while templates are defined in the 
**/ui/views/templates/** directory.

# Server-side Views, Layout, and View Partials
Server-side views in the **/ui/views/** directory are by default ejs files that will handle the job
of presenting data when requested a view but the client. The method ```res.view()``` call will
respond to a client with the appropriate view. If no controller or action for a request exist, Sails resourceful routing also serves a view if the view **/views/:controller/:action.ejs** exists.

```javascript
	var User = {

		follow: function(req, res) {

			// some logic goes here
			...

			// will respond with the '/ui/view/user/follow.ejs' view
			return res.view();
		}
	}
```

Opening up **/ui/views/layout.ejs** you will see some ejs partials ```<%- rigging.css ->```,
```<%- rigging.js ->```, ```<%- body ->```, and ```<%- rigging.templateLibrary ->```.
Both **rigging.css** and **rigging.js** partials inject compiles css and js assets into your layout.
The **body** partial is where the req views will be injected. Finally, **rigging.templateLibrary**
is used for cliend side template injection.


Infomation about view partials
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
