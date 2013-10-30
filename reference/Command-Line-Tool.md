Command Line Tool
=====================

### sails console
This command will quietly lift your sails app, web server and all.  At this point, it sends the <link>global sails object</link> to the node.js shell.  This means you can access all of your model instances, their methods, and much more, all by using javascript commands.

This might come in handy when you want to quickly add a record to a model and can't be bothered installing PostMAN.  It's also a good tool for diagnosing problems in your app.  If you can't access something over console, neither can your app.  

Example Usage
```
catGuy@catGuy:~/node/sails/blogApp$ sails console

debug: Welcome to the Sails console (v0.9.7)
debug: ( to exit, type <CTRL>+<C> )

sails> Blog.find( { } ).done(function(err,myRecord){console.log(myRecord)})
[ { blogName: 'First Blog',
    description: 'Hey, my first blog entry.',
    keywords: 'first new blog lol',
    createdAt: '2013-10-08T18:37:37.719Z',
    updatedAt: '2013-10-13T01:11:45.364Z',
    id: 1,
    seenBy: 'everyone' }]
```
### sails generate


### sails lift


### sails version


### sails new

