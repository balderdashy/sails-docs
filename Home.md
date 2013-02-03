# Getting Started With Sails

![image_squidhome@2x.png](http://i.imgur.com/m1vTk.png) 

# Installation

> New to Node.js?  Get started by following the directions here: http://nodejs.org/

Once you have Node.js up and running, installing Sails is pretty dern easy.  Just type:
```sh
sudo npm install -g sails
```


# Creating a New Sails Project

The global install of Sails comes bundled with a command-line tool which allows you to generate a new app as shown below:

```sh
# Create the app
sails new testProject

# cd into the new folder
cd testProject

# Fire up the server	
sails lift
```

The default port for Sails is 1337.  At this point if you visit <a href="http://localhost:1337/">http://localhost:1337/</a> You will see
the default index.html page.  Now, let's get Sails to tell us Hello.


# Hello, Sails!
To get Sails to say "Hello World!", you need only to define one controller with an action and define
one route. Lets start with the controller.

```sh
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

```sh
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

```sh
sails lift
```

Now when you visit <a href="http://localhost:1337/">http://localhost:1337/</a> your browser should say **'Hello World!'**.


# Creating a Model
Creating a model is very easy with the command line tool. You can even define attributes and their
type by adding arguments at the end of the command. To generate a User model, enter the following:
```
sails generate model User
```

You will see that this creates a user model at **/api/model/User.js**.  Let's give her a name-- try uncommenting the name attribute so it looks more or less like this:

```javascript
var User = {
        attributes      : {
                name: 'STRING'
        }

};
module.exports = User;
```

# What's Better Than Scaffolding?  How About a JSON API?

Sails API scaffolding is nothing like Rails scaffolding. HTML scaffolds just don't make sense for 
modern web apps! Instead, Sails automatically builds a RESTful JSON API for your models. Best of
all, it supports HTTP _and_ WebSockets! By default for every controller you create, you get the
basic CRUD operations created automatically.

For instance, after generating the User model above, if you visit `http://localhost:1337/user/create`, you'll see:
```json
{
  "createdAt": "2013-01-10T01:33:19.105Z",
  "updatedAt": "2013-01-10T01:33:19.105Z",
  "id": 1
}
```

That's it!  You just created a model in the database!  You can also `find`, `update`, and `destroy` users:

```
# List of all users
http://localhost:1337/user

# Find the user with id 1
http://localhost:1337/user/1

# Create a new user
http://localhost:1337/user/create
(or send an HTTP POST to http://localhost:1337/user)

# Update the user with id 1
http://localhost:1337/user/update/1
(or send an HTTP PUT to http://localhost:1337/user/1)

# Destroy the user with id 1
http://localhost:1337/user/destroy/1
(or send an HTTP DELETE to http://localhost:1337/user/1)
```

# Security
_TODO_

## Using https
_TODO_