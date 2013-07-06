#Deployment
We are working hard to get Sails.js in ship-shape! Currently, however, we don't have a built in solution to launch a "production" server of Sails.

We hope to fix that soon... For now, though, you'll want to take advantage of a tool that "resurrects" your server if it crashes.  

## Here's how you deploy in production mode:

+ Install forever: `sudo npm install -g forever`

+ From your app directory, start the server with forever: `forever start .app.js`

> More about forever: https://github.com/nodejitsu/forever

## Other things you'll likely want to do in production:
+ configure your app to run on port 80 
+ put it in "production" mode so that all of your css/js gets bundled up
+ use SSL for connections to your application [Click here for full SSL documentation.](/balderdashy/sails/wiki/ssl)

The config below shows how to implement some of the above configurations.

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
module.exports.ssl = {
	cert: 'path/to/cert',
	key: 'path/to/key'
};
```

+ use mySQL in **config/adapters.js**

#### More on that here: 
http://www.youtube.com/watch?v=GK-tFvpIR7c

The big omission from this video is that, if you plan on keeping your app running (which you probably do!), you'll need to follow the steps mentioned above to use `forever.`

## Getting your app on the server
Is your Node.js instance already spun up?  When you have the ip address, you can go ahead and ssh onto it, then `sudo npm install -g sails forever` to install Sails and forever for the first time.  

Then, `git clone` your project (or `scp` it onto the server if it's not in a git repo) into a new folder on the server and cd into it, and `forever start .app.js`


#### Deploying to NodeJitsu?
We get it! The Cloud is the future, and we want to help you get there.  To Depoloy to NodeJitsu, You'll need to make some minor modifications to your configuration.  Don't worry, you won't have to write a novel or anything.

Open up `config/application.js` in your app folder. In here, you'll need to edit the following lines:

```
	// Port this Sails application will live on
	port: 80,
	host: 'subdomain.jit.su',
```

The `host:` is new to the file and is not created by default.  You will need to add this.  Nodejitsu will ask you for the `subdomain` when you run `jitsu deploy`

#### Heroku, Here we come!
Deploying to the cloud is a lot of fun! However, just like any other site we want to launch, we have a bit of work to do first.

To deploy to Heroku,  You'll need to have a heroku account already set up and have to the Heroku toolbelt installed.  To do this, visit this page: https://toolbelt.heroku.com/

Once that's done, we can start with the Sails specific stuff.  Create and open the file Procfile at the root of your application.  You'll need to add the following to it.

`Procfile`
```
web: node app.js
```
This instructs Heroku to create a web dyno and assign our node process to it.  To test that you did this correctly, you can type `foreman start` on your CLI.  This should start the server locally for you.

This is great and all, but it won't quite work on Heroku yet.  You need to set the port to something Heroku will understand. Lets edit the `config/application.js` file accordingly.

```
port: process.env.PORT || 1337,
```

This will tell the application to look for the port that Heroku wants you to use.  If it doesn't give one, then use port 1337.

Now you can push your Sails.js Application up to Heroku.
```
heroku create
git add .
git commit -m "First commit to heroku"
git push heroku master
```
This will clone your local repo to Heroku and do the necessary steps to install it on Heroku.  (Go grab some coffee, this will take a few minutes.)

Thats it! Now you can check out your new app: type `heroku open` on your command line.