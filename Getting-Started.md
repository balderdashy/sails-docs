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
    node app.js			
```


# Hello, Sails!
To get Sails to say "Hello!", you need only to create a controller

```
    sails generate controller hello index
```

Then in your hello controller inside the index action you will send back a string

```javascript

	var HelloController = {

		index: function(req, res) {
			res.send('Hello!');
		}
	}

	exports = HelloController;
```

After you have added that, you will want to remove the default index.html page that shows at the
start of your application

```
		rm public/index.html
```

We now want the application to display this hello response when a request for the root "/" route
comes in. Go into the config/routes.js file. One unique thing about Sails is that by default, you do
not have to define incoming routes to controller actions. You can manually define these mappings,
and here we will do so. Change the file to look like this.

```javascript

		exports = {
			'/': {
				controller: 'home',
				action: 'index'
			}
		}
```

Finally, start the server
```
		sails app.js
```

Now when you visit <a href="http://localhost:1337/">http://localhost:1337/</a> the index action of
the home controller, which will respond with 'Hello!'.


# Creating a Model
Creating a model is just as easy too.

```
		sails generate model User
```

# Automatic JSON API: Better Than Saffolding

HTML scaffolds just don't make sense for modern web apps.  Instead, Sails automatically builds a RESTful JSON API for your models.  Best of all, it supports HTTP _and_ WebSockets!

# Security
_TODO_

## Using https
_TODO_