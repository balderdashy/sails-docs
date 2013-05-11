We are working hard on deck to get sails into ship shape.  Currently, we don't have a built in solution to launching a "production" server of sails.  We will be correcting that though.

For now, You'll want to take advantage of a tool that 'resurrects' your server if it crashes.  

#### Here's how you deploy in production mode:

+ Install forever: `sudo npm install -g forever`

+ From your app directory, start the server with forever: `forever start .app.js`

> More about forever: https://github.com/nodejitsu/forever

#### Other things you'll likely want to do in production:
+ configure your app to run on port 80 
+ put it in "production" mode so that all of your css/js gets bundled up

**config/local.js**
```javascript
// Local configuration
// 
// Included in the .gitignore by default,
// this is where you include configuration overrides for your local system
// or for a production deployment.
//
// For example, to use port 80 on the local machine, override the `port` config

module.exports.port = 80;
module.exports.environment = 'production';

```
+ use mySQL in **config/adapters.js**

#### More on that here: 
http://www.youtube.com/watch?v=GK-tFvpIR7c

The big omission from that video is that, if you plan on keeping your app running (which you probably do!), you'll need to follow the steps mentioned above to use `forever.`

#### Getting your app on the server
Is your Node.js instance already spun up?  When you have the ip address, you can go ahead and ssh onto it, then `sudo npm install -g sails forever` to install Sails and forever for the first time.  

Then `git clone` your project (or `scp` it onto the server if it's not in a git repo) into a new folder on the server and cd into it, and `forever start .app.js`


#### Deploying to NodeJitsu?


Open up `config/application.js` in your app folder. In here, you'll need to edit the following lines.

```
	// Port this Sails application will live on
	port: 80,
	host: 'subdomain.jit.su',
```

The `host:` is new to the file and is not created by default.  You will need to add this.  Nodejitsu will ask you for the `subdomain` when you run `jitsu deploy`