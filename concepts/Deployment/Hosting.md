# Hosting

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

##### Deploying to OpenShift?
To deploy to OpenShift, you'll need to make some minor modifications to your configuration:
Open up `config/local.js` in your app folder. In here, you'll need to add the following lines.

```
	port: process.env.OPENSHIFT_NODEJS_PORT,
	host: process.env.OPENSHIFT_NODEJS_IP,
```

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



<docmeta name="uniqueID" value="Hosting276234">
<docmeta name="displayName" value="Hosting">

