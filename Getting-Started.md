> **Notice:** This documentation is for the bleeding-edge build of Sails.  Most of this documentation will not work if you install sails from the npm registry.  The documentation below walks you through installation of the bleeding-edge version.  This guide will be updated when the next production npm release is out.

# Installation

At this time the stable release on the npm registry does not work with this guide. To install the bleeding-edge version:

```
sudo npm install -g sails@git://github.com/balderdashy/sails.git#waterline
```

<!-- This version will work with this guide at the time of writing. -->
<!-- Or to install globally with the command line tool: ```sudo npm install -g sails``` -->


# Creating a New Sails Project

The global install of Sails comes bundled with a command-line tool which allows you to generate a new app as shown below:

```
# Create the app
sails new testProject
cd testProject

# Fire up the server	
sails lift
```

The default port for Sails is 1337.  At this point if you visit <a href="http://localhost:1337/">http://localhost:1337/</a> You will see
the default index.html page.  Now, let's get Sails to tell us Hello.


# Hello, Sails!
To get Sails to say "Hello World!", you need only to define one controller with an action and define
one route. Lets start with the controller.

```
sails generate controller hello index
```

This will generate a file called `HelloController.js` in your app's `api/controllers` directory with one action, `index()`.

Now let's edit that action to send back the string `'Hello World!'`.

```javascript

var HelloController = {

	index: function(req, res) {
		res.send('Hello World!');
	}
}

exports = HelloController;
```

After you have added that, you will want to remove the default index.html page that shows at the
start of your application.

```
rm ui/public/index.html
```

We want the application to display this hello response when a request for the root "/" route
comes in. Go into the **/config/routes.js** file. Here you can manually define these mappings,
and here we will do so. Change the file to look like this.

```javascript
var routes = {
	'/': {
		controller: 'hello',
		action: 'index'
	}
}

module.exports = routes;
```

As you will see when working more with Sails, one great feature is that by default, you do not have
to define incoming routes to controller actions. This is talked more about in the 
<a href="https://github.com/balderdashy/sails/wiki/Routing">Routing page</a> of this wiki.

Finally, restart the server by going to your node terminal and pressing control+c. Then enter the
following.

```
sails start
```

Now when you visit <a href="http://localhost:1337/">http://localhost:1337/</a> the browser should
have recieved the response **'Hello World!'**.


# Creating a Model
Creating a model is very easy with the command line tool. You can even define attributes and their
type by adding arguments at the end of the command. To generate a User model with a name, age, and
email enter the following.

```
sails generate model User
```

You will see that this creates a user model at **/api/model/Users.js**.

# Automatic JSON API: Better Than Scaffolding

Sails API scaffolding is nothing like Rails scaffolding. HTML scaffolds just don't make sense for 
modern web apps! Instead, Sails automatically builds a RESTful JSON API for your models. Best of
all, it supports HTTP _and_ WebSockets! By default for every controller you create, you get the
basic CRUD operations created automatically.

# Security
_TODO_

## Using https
_TODO_