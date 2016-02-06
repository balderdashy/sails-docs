# Deployment

### Overview

#### Before You Deploy

Before you launch any web application, you should ask yourself a few questions:

+ What is your expected traffic?
+ Are you contractually required to meet any uptime guarantees, e.g. a Service Level Agreement (SLA)?
+ What sorts of front-end apps will be "hitting" your infrastructure?
  + Android apps
  + iOS apps
  + desktop web browsers
  + mobile web browsers (tablets, phones, iPad minis?)
  + tvs, watches, toasters..?
+ And what kinds of things will they be requesting?
  + JSON?
  + HTML?
  + XML?
+ Will you be taking advantage of realtime pubsub features with Socket.io?
  + e.g. chat, realtime analytics, in-app notifications/messages
+ How are you tracking crashes and errors?
  + Take a look at Sails' log config



#### Deploying On a Single Server

Node.js is pretty darn fast.  For many apps, one server is enough to handle the expected traffic-- at least at first.

##### Configure

+ All your production environment settings are stored in `config/env/production.js`
+ Configure your app to run on port 80 (if not behind a proxy like nginx). If you're using nginx, be sure to configure it to relay websockets to your app. You can find guidance here in nginx docs [WebSocket proxying](http://nginx.org/en/docs/http/websocket.html).
+ Configure the 'production' environment so that all of your css/js gets bundled up, and the internal servers are switched into the appropriate environment (requires [linker](https://github.com/balderdashy/sails-wiki/blob/0.9/assets.md))
+ Make sure your database is set-up on the production server. This is especially important if you are using a relational database such as MySQL, because sails sets all your models to `migrate:safe` when run in production, which means no auto-migrations are run on starting up the app. You can set your database up the following way:
  + Create the database on the server and then run your sails app with `migrate:alter` locally, but configured to use the production server as your db. This will automatically set things up.
  +  In case you can't connect to the server remotely, you'll simply dump your local schema and import it into the database server.
+ [Enable CSRF protection](http://sailsjs.org/documentation/concepts/Security/CSRF.html?q=enabling-csrf-protection) for your POST, PUT, and DELETE requests
+ Enable SSL
+ IF YOU'RE USING SOCKETS:
  + Configure `config/sockets.js`
    + e.g. enable the `flashsocket` transport

##### Deploy

In production, instead of `sails lift`, you'll want to use forever or PM2 to make sure your app will keep running, even if it crashes.

+ Install forever: `sudo npm install -g forever`
  + More about forever: https://github.com/nodejitsu/forever
+ Or install PM2: `sudo npm install pm2 -g --unsafe-perm`
  + More information about that: https://github.com/Unitech/pm2
+ From your app directory, start the server either with `forever start app.js --prod` or `pm2 start app.js -x -- --prod`
  + This is the same thing as using `sails lift --prod`, but if the server crashes, it will be automatically restarted.




<docmeta name="displayName" value="Deployment">
