# Installation

To install the latest stable release:
```
npm install sails
```

Or to install globally with the command line tool: ```sudo npm install -g sails```


# Creating a New Sails Project

The global install of Sails comes bundled with a command-line tool which allows you to generate a new app as shown below:

```
# Create the app
sails foo
cd foo

# Install dependencies
npm install

# Fire up the server	
sails start
```

At this point if you visit <a href="http://localhost:1337/">http://localhost:1337/</a> You will see
the default index.html page that Sails starts with. Lets get Sails to tell us Hello.


# Hello, Sails!
To get Sails to say "Hello World!", you need only to define one controller with an action and define
one route. Lets start with the controller.

```
sails generate controller hello index
```

We then want to edit the index actions in your hello controller. We will send back the string
'Hello World!'.

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
rm public/index.html
``

We want the application to display this hello response when a request for the root "/" route
comes in. Go into the **/config/routes.js** file. You can manually define these mappings, and here 
we will do so. Change the file to look like this. 

```javascript
exports = {
	'/': {
		controller: 'home',
		action: 'index'
	}
}
```

One great feature of Sails is that by default, you do not have to define incoming routes to
controller actions. This is talked more about in the 
<a href="https://github.com/balderdashy/sails/wiki/Routing">Routing page</a> of this wiki.

Finally, restart the server
```
sails start
```

Now when you visit <a href="http://localhost:1337/">http://localhost:1337/</a> the browser should
have recieved the response 'Hello World!'.


# Creating a Model
Creating a model is very easy with the command line tool. You can even define attributes and their
type by adding arguments at the end of the command. To generate a User model with a name, age, and
email enter the following.

```
sails generate model User name:string age:int email:string
```

# Automatic JSON API: Better Than Scaffolding

Sails API scaffolding is nothing like Rails scaffolding. HTML scaffolds just don't make sense for 
modern web apps! Instead, Sails automatically builds a RESTful JSON API for your models. Best of
all, it supports HTTP _and_ WebSockets! By default for every controller you create, you get the
basic CRUD operations created automatically.

# Security
_TODO_

## Using https
_TODO_