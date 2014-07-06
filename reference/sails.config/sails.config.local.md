# sails.config.local


### What is this?
While you’re developing your app, this config file should include any settings specifically for your development computer or server (db passwords, etc.)  If you're using git, note that `config/local.js` is included in the `.gitignore` in new Sails apps by default, and so it won't be checked into your repository when you commit.

### Description

While you&rsquo;re developing your app, this config file should include any settings specifically for your development computer (db passwords, etc.)
When you&rsquo;re ready to deploy your app in production, you can use this file for configuration options on the server where it will be deployed.

> **Note:** This file is included in your .gitignore, so if you&rsquo;re using git as a version control solution for your Sails app, keep in mind that this file won&rsquo;t be committed to your repository!

> Good news is, that means you can specify configuration for your local machine in this file without inadvertently committing personal information (like database passwords) to the repo.  Plus, this prevents other members of your team from commiting their local configuration changes on top of yours.


#### `port`

The `port` setting determines which TCP port your app will be deployed on.
Ports are a transport-layer concept designed to allow many different networking applications to run at the same time on a single computer.

By default, if it&rsquo;s set, Sails uses the `PORT` environment variable. Otherwise it falls back to port 1337. In production, you&rsquo;ll probably want to change this setting to 80 (http://) or 443 (https://) if you have an SSL certificate.

More about ports: http://en.wikipedia.org/wiki/Port_(computer_networking)


#### `environment`

The runtime &ldquo;environment&rdquo; of your Sails app is either &lsquo;development&rsquo; or &lsquo;production&rsquo;.

In development, your Sails app will go out of its way to help you (for instance you will receive more descriptive error and debugging output).

In production, Sails configures itself (and its dependencies) to optimize performance.
You should always put your app in production mode before you deploy it to a server -- this helps ensure that your Sails app remains stable, performant, and scalable.

By default, Sails sets its environment using the `NODE_ENV` environment variable. If `NODE_ENV` is not set, Sails will run in the &lsquo;development&rsquo; environment.

#### `explicitHost`

By default, Sails will assume `localhost` as the host that will be listening for incoming requests.  This will work in the majority of hosting environments you encounter, but in some cases ([OpenShift](http://www.openshift.com) being one example) you'll need to explicitly declare the host name of your Sails app.  Setting `explicitHost` tells Sails to listen for requests on that host instead of `localhost`.

#### `proxyHost` and `proxyPort`

If your site will ultimately be served by a proxy, you may want to set `proxyHost` to ensure that calls to `sails.getBaseurl()` return the expected host.  For example, if you deploy a Sails app on [Modulus.io](http://modulus.io), the ultimate URL for your site will be something like `http://mysite-12345.onmodulus.net`.  If you were to use `sails.getBaseurl()` to construct a URL in your app code, however, it would return something like `http://localhost:8080`.  Using `proxyHost` and `proxyPort` allow you to specify the host name and port of the proxy server that will be serving your app.  This ensure that any links created using `sails.getBaseurl()` are correct.



<docmeta name="uniqueID" value="Local760410">
<docmeta name="displayName" value="sails.config.local">

