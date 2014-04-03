# Deploying your Sails.js application
> _**Note:** You are viewing the Sails.js v0.10.x documentation.  If you're looking for information on v0.9.x, please visit [here](http://09x.sailsjs.org)._


### Overview

#### Before You Deploy

Before you launch any web application, you should ask yourself a few questions:

+ What is your expected traffic?
+ Are you contractually required to meet any uptime guarantees, e.g. a Service Level Agreement (SLA)?
+ What sorts of front-end apps will be "hitting" your infrastructure?
  + Android apps
  + iOS apps
  + desktop web browers
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

Node.js is pretty dern fast.  For many apps, one server is enough to handle the expected traffic-- at least at first.

##### Configure

+ Configure your app to run on port 80 (if not behind a proxy like nginx)
+ Configure the 'production' environment so that all of your css/js gets bundled up, and the internal servers are switched into the appropriate environment (requires [linker](https://github.com/balderdashy/sails-wiki/blob/0.9/assets.md))
+ Enable CSRF protection for your POST, PUT, and DELETE requests
+ Enable SSL
+ IF YOU'RE USING SOCKETS: 
  + Configure `config/sockets.js` to use socket.io's recommended production settings [here](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO#recommended-production-settings)
    + e.g. enable the `flashsocket` transport

##### Deploy

In production, instead of `sails lift`, you'll want to use forever to make sure your app will keep running, even if it crashes.

+ Install forever: `sudo npm install -g forever`
  + More about forever: https://github.com/nodejitsu/forever
+ From your app directory, start the server with forever: `forever start app.js --prod`
  + This is the same thing as using `sails lift --prod`, but if the server crashes, it will be automatically restarted.
 


### Scaling

If you have the immediate expectation of lots of traffic to your application (or better yet, you already have it!), 
you'll want to set up a scalable architecture that your app can scale as more and more people use it.

##### Example architecture
```
                       Sails.js server
                             ....                 
                    /  Sails.js server  \      /  Database (e.g. Mongo, Postgres, etc)
Load Balancer  <-->    Sails.js server    <-->    Socket store (Redis)
                    \  Sails.js server  /      \  Session store (Redis)
                             ....                 
                       Sails.js server
```


#### Configuring your app for a clustered deployment

+ Make sure the database(s) for your models (e.g. MySQL, Postgres, Mongo) is scalable (e.g. sharding/cluster) 
+ Configure your app to use a shared session store
  + Support for redis is built in (see the `adapter` options in `config/session.js`)
+ IF YOU'RE USING SOCKETS: 
  + Configure your app to use a shared socket store
    + Support for redis is built in (see the `adapter` options in `config/sockets.js`)
    + Note: If you'd rather not set up a socket store, a workable solution for your use case may be enabling sticky sessions at your load balancer.
+ Ensure none of the other dependencies you might be using in your app rely on shared memory.

#### Deploying a Sails cluster on multiple servers

+ Deploy multiple instances (aka servers running a copy of your app) behind a load balancer
  + Start up Sails on each instance using `forever`
  + More on load balancers: http://en.wikipedia.org/wiki/Load_balancing_(computing)
+ Configure your load balancer to terminate SSL requests
  + Because of this, you won't need to use the SSL configuration in Sails-- the traffic will already be decrypted


### FAQ


##### Can I use environment variables?

You can also configure the `port` and `environment` settings in Sails using environment variables.
`NODE_ENV=production sails lift`
`PORT=443 sails lift`

##### Where do I put my production database credentials?  Other settings?

For your other deployment/machine-specific settings, namely any kind of credentials, you should use `config/local.js`.  
It's included in your `.gitignore` file by default so you don't inadvertently commit your credentials to your code repository.

**config/local.js**
```javascript
// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.
//
// For example, to use port 80 on the local machine, override the `port` config
module.exports = {
    port: 80,
    environment: 'production',
    adapters: {
        mysql: {
            user: 'root',
            password: '12345'
        }
    }
}
```

##### How do I get my Sails app on the server?
Is your Node.js instance already spun up?  When you have the ip address, you can go ahead and ssh onto it, then `sudo npm install -g forever` to install Sails and forever for the first time.  

Then `git clone` your project (or `scp` it onto the server if it's not in a git repo) into a new folder on the server and cd into it, and `forever start app.js`


### Performance Benchmarks

Performance in Sails is comparable to what you'd expect from a standard Node.js/Express application.  In other words, fast!  We've done some optimizations ourselves in Sails and Waterline, but primarily, our focus has been on not messing up what was already really fast.  Above all, we have @ry, @visionmedia, @isaacs, #v8, @joyent and the rest of the Node.js core team to thank.

+ http://serdardogruyol.com/?p=111


### Hosting

Here is a non-comprehensive list of Sails.js hosting providers.

##### Deploying to Modulus?

+ http://blog.modulus.io/sails-js

##### Deploying to NodeJitsu?
To deploy to NodeJitsu, you'll need to make some minor modifications to your configuration:

Open up `config/local.js` in your app folder. In here, you'll need to add the following lines.

```
    // Port this Sails application will live on
	port: 80,
	host: 'subdomain.jit.su',
```

The `host:` is new to the file and is not created by default.  You will need to add this.  Nodejitsu will ask you for the `subdomain` when you run `jitsu deploy`

+ https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/
+ https://github.com/balderdashy/sails/issues/455


##### Using DigitalOcean?

+ https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab

##### Deploying to Heroku?

+ [SailsCasts: Deploying a Sails App to Heroku](http://irlnathan.github.io/sailscasts/blog/2013/11/05/building-a-sails-application-ep26-deploying-a-sails-app-to-heroku/)
+ https://groups.google.com/forum/#!topic/sailsjs/vgqJFr7maSY
+ https://github.com/chadn/heroku-sails
+ http://dennisrongo.com/deploying-sails-js-to-heroku/#.UxQKPfSwI9w
+ http://stackoverflow.com/a/20184907/486547

##### Deploying to AWS?

+ http://blog.grio.com/2014/01/your-own-mini-heroku-on-aws.html
+ http://serverfault.com/questions/531560/creating-an-sails-js-application-on-aws-ami-instance
+ http://bussing-dharaharsh.blogspot.com/2013/08/creating-sailsjs-application-on-aws-ami.html
+ http://cloud.dzone.com/articles/how-deploy-nodejs-apps-aws-mac

##### Using PM2?

+ http://devo.ps/blog/2013/06/26/goodbye-node-forever-hello-pm2.html


##### Deploying to CloudControl?

+ https://www.cloudcontrol.com/dev-center/Guides/NodeJS/Sailsjs



##### Getting professional help

These days, it's getting easier and easier to deploy powerful applications at scale.  That said, there isn't always time to do these things yourself.
Sails.js is maintained by my company, [Balderdash](http://balderdash.co), a Node.js consultancy in Austin, TX. If your company needs professional support, reach out and we're happy to help.  The deployment part really isn't that hard, and in most cases, it shouldn't take more than a couple of hours tops.

