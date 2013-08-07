# Deploying your Sails.js application
> _Note: You are viewing the Sails.js v0.9.0 documentation.  If you're looking for information on v0.8.x, please visit [here](http://08x.sailsjs.org)._


## Considerations

Before you launch any web application, you should consider a few factors:
+ What is your expected traffic?
+ Are you contractually required to meet any uptime guarantees?
+ What sorts of front-end apps will be "hitting" your infrastructure?  And what kinds of things will they be requesting?
+ Will you be taking advantage of realtime pubsub features with Socket.io?



## Here's how you deploy in production mode:
*note: This is a quick start. The proper way to deploy is with [upstart](http://upstart.ubuntu.com) and [nginx](http://nginx.org/) and takes a lot more work to set up.
+ Install forever: `sudo npm install -g forever`

+ From your app directory, start the server with forever: `forever start app.js --prod`

> More about forever: https://github.com/nodejitsu/forever


## Other things you'll likely want to do in production:
+ Configure your app to run on port 80 (if not behind a proxy like nginx)
+ Put it in "production" mode so that all of your css/js gets bundled up (requires [linker](/balderdashy/sails/wiki/assets))

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

#### More on that here: 
http://www.youtube.com/watch?v=GK-tFvpIR7c

The big omission from that video is that, if you plan on keeping your app running (which you probably do!), you'll need to follow the steps mentioned above to use `forever.`

## Getting your app on the server
Is your Node.js instance already spun up?  When you have the ip address, you can go ahead and ssh onto it, then `sudo npm install -g forever` to install Sails and forever for the first time.  

Then `git clone` your project (or `scp` it onto the server if it's not in a git repo) into a new folder on the server and cd into it, and `forever start app.js`


## Deploying to NodeJitsu?
The Cloud is the future, and we want to help you get there.  To Depoloy to NodeJitsu, You'll need to make some minor modifications to your configuration.  Don't worry, It won't be like writing a new book or anything.

Open up `config/local.js` in your app folder. In here, you'll need to add the following lines.

```
    // Port this Sails application will live on
	port: 80,
	host: 'subdomain.jit.su',
```

The `host:` is new to the file and is not created by default.  You will need to add this.  Nodejitsu will ask you for the `subdomain` when you run `jitsu deploy`

<!-- TODO: heroku deploy (with grunt postinstall script) -->
