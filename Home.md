See https://github.com/balderdashy/sails/wiki/_pages

<!--
Building Your Own Adapters
Changelog
Contributing to Sails
Controllers
Database Support
examples
Guide: Login Example
Guide: Passport auth example
Guide: Sockets
Home
Models
Policies
Routes
Services
Views
What Is Sails
-->
[New to NodeJS](/balderdashy/sails/wiki/configuration)
[Configuration](/balderdashy/sails/wiki/configuration)
[Deployment](/balderdashy/sails/wiki/deployment)

<!--
# Getting Started With Sails

![image_squidhome@2x.png](http://i.imgur.com/m1vTk.png) 

# Installation

> New to Node.js?  Get started by following the directions here: http://nodejs.org/

Once you have Node.js up and running, installing Sails is pretty dern easy.  Just type:
```sh
sudo npm install -g sails
```


# Creating a New Sails Project

Here's how you get off the ground:

```sh
# Create the app
sails new testProject

# cd into the new project
cd testProject

# Fire up the server	
# (you have to run this from the root of your project)
sails lift
```


# Creating a Model
Creating a model is very easy with the command line tool. You can even define attributes and their
type by adding arguments at the end of the command. To generate a User model, enter the following:
```
sails generate model User
```

You will see that this creates a user model at **/api/models/User.js**.  Let's give her a name-- try uncommenting the name attribute so it looks more or less like this:

```javascript
module.exports = {
        attributes      : {
                name: 'STRING'
        }

};
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
You can control access to your application's endpoints using policies.  See: https://github.com/balderdashy/sails/wiki/Policies

## Using https
HTTPS works the same way in Sails as it does in Express.  Drop your certificate and key file into your project, then configure the path to them.  For example, if you put your cert and key in a directory called `ssl` in the root of your project, you'd want to add the following to your `config/application.js` file:

```javascript
module.exports.ssl = {
  cert : fs.readFileSync(sails.config.appPath+'/ssl/combined.crt'),
  key  : fs.readFileSync(sails.config.appPath+'/ssl/yoursite.com.key')
};
```


# Learn more
https://github.com/balderdashy/sails/wiki/_pages


-->

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/wiki/home)