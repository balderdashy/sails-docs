Command Line Tool
=====================

### sails console
This command will quietly lift your sails app, web server and all.  At this point, it sends the <link>global sails object</link> to the node.js shell.  This means you can access all of your model instances, their methods, and much more, all by using javascript commands.

This might come in handy when you want to quickly add a record to a model and can't be bothered installing PostMAN.  It's also a good tool for diagnosing problems in your app.  If you can't access something over console, neither can your app.  

#####Example Usage
```sh
catGuy@catGuy:~/node/sails/blogApp$ sails console

debug: Welcome to the Sails console (v0.9.7)
debug: ( to exit, type <CTRL>+<C> )

sails> Blog.find( { } ).done(function(err,myRecord){console.log(myRecord)});

[ { blogName: 'First Blog',
    description: 'Hey, my first blog entry.',
    keywords: 'first new blog lol',
    createdAt: '2013-10-08T18:37:37.719Z',
    updatedAt: '2013-10-13T01:11:45.364Z',
    id: 1,
    seenBy: 'everyone' }]
```

Once inside sails console, two consecutive CTRL+C will close the app and exit back to shell.

For more information, see node REPL docs @ http://nodejs.org/api/repl.html

### sails generate
Once inside your app's root directory, the generate argument can be used to create models and controllers for the app.  There are three ways to do this.
##### Generate new controller
```sh
catGuy@catGuy:~/node/sails/blogApp$ sails generate newmodel
info: Generating model and controller for newmodel...
```
##### Generate new model
```sh
catGuy@catGuy:~/node/sails/blogApp$ sails generate model newmodel
warn: For the record :: to serve the blueprint API for this model,
warn: you'll also need to have an empty controller.
info: Generated model for newmodel!

```
##### Generate both!
```sh
catGuy@catGuy:~/node/sails/blogApp$ sails generate controller newmodel
info: Generated controller for newmodel!
```

### sails lift
The lift argument launches your app.  You can also add the folowing flags behind lift for more control.

- \-\-verbose
this be verbose bro
- \-\-port=
- \-\-environment=


### sails version


### sails new
````
ichabod@ichabod:~/node/sails$ sails new myApp
debug: Building new Sails.js app in ./myApp...

info: New app created!
````
