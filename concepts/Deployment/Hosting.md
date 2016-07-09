# Hosting

Here is a non-comprehensive list of Node/Sails hosting providers and available community tutorials.

##### Deploying to Modulus?

+ http://blog.modulus.io/sails-js

##### Deploying to OpenShift?
To deploy to OpenShift, you'll need to make some minor modifications to your configuration:
Open up `config/local.js` in your app folder. In here, you'll need to add the following lines.

```
	port: process.env.OPENSHIFT_NODEJS_PORT,
	host: process.env.OPENSHIFT_NODEJS_IP,
```

You will also need to install `grunt-cli` with `npm i --save grunt-cli`.

After doing that, create the file `.openshift/action_hooks/pre_start_nodejs` with the following contents. ([source](https://gist.github.com/mdunisch/4a56bdf972c2f708ccc6))
This action_hook tells OpenShift's supervisor to run all 'prod' grunt tasks, before Sails lifted.


```
#!/bin/bash
export NODE_ENV=production

if [ -f "${OPENSHIFT_REPO_DIR}"/Gruntfile.js ]; then
    (cd "${OPENSHIFT_REPO_DIR}"; node_modules/grunt-cli/bin/grunt prod)
fi
```
Then disable Sails Grunt integration hook. 
To do this set the `grunt` property to `false` in `.sailsrc` hooks like this:

```json
{
    "hooks": {
        "grunt": false
    }
}
```
### NOTE:
Do not remove Gruntfile.js to disable Grunt hook, this file still using by OpenShift's supervisor.


Then create the file `/supervisor_opts` with the following contents. This tells OpenShift's supervisor to ignore Sails' `.tmp` directory for the hot reload functionality. ([source](https://gist.github.com/mdunisch/4a56bdf972c2f708ccc6#comment-1318102))

```
-i .tmp
```
### NOTE:
This deployment guide work only on Openshift`s "SCALABLE" gears, nodejs v0.10 
If you using non-scalable gear `/supervisor_opts` file will be ignored and Sails will not lift on it. 

You can now `git add . && git commit -a -m "your message" && git push` to deploy to OpenShift.

##### Using DigitalOcean?

+ https://www.digitalocean.com/community/articles/how-to-create-an-node-js-app-using-sails-js-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps
+ https://www.digitalocean.com/community/articles/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab

##### Deploying to Heroku?

+ [SailsCasts: Deploying a Sails App to Heroku](http://irlnathan.github.io/sailscasts/blog/2013/11/05/building-a-sails-application-ep26-deploying-a-sails-app-to-heroku/)
+ [Sails.js on Heroku](http://vort3x.me/sailsjs-heroku/)
+ https://groups.google.com/forum/#!topic/sailsjs/vgqJFr7maSY
+ https://github.com/chadn/heroku-sails
+ http://dennisrongo.com/deploying-sails-js-to-heroku
+ http://stackoverflow.com/a/20184907/486547

##### Deploying to AWS?

+ http://blog.grio.com/2014/01/your-own-mini-heroku-on-aws.html
+ http://serverfault.com/questions/531560/creating-an-sails-js-application-on-aws-ami-instance
+ http://bussing-dharaharsh.blogspot.com/2013/08/creating-sailsjs-application-on-aws-ami.html
+ http://cloud.dzone.com/articles/how-deploy-nodejs-apps-aws-mac

##### Using PM2?

+ http://devo.ps/blog/goodbye-node-forever-hello-pm2/


##### Deploying to CloudControl?

+ https://www.cloudcontrol.com/dev-center/Guides/NodeJS/Sailsjs





<docmeta name="displayName" value="Hosting">

