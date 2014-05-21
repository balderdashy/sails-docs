# FAQ


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


<docmeta name="uniqueID" value="FAQ475097">
<docmeta name="displayName" value="FAQ">

