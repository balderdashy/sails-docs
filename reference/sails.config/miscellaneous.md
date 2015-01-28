# Miscellaneous (`sails.config.*`)

For a conceptual overview of configuration in Sails, see http://sailsjs.org/#/documentation/concepts/Configuration.

This page is a quick reference of assorted configuration topics that don't fit elsewhere, namely top-level properties on the sails.config object.

### `sails.config.port`

The `port` setting determines which TCP port your app will be deployed on.
Ports are a transport-layer concept designed to allow many different networking applications to run at the same time on a single computer.

By default, if it&rsquo;s set, Sails uses the `PORT` environment variable. Otherwise it falls back to port 1337. In production, you&rsquo;ll probably want to change this setting to 80 (http://) or 443 (https://) if you have an SSL certificate.

More about ports: http://en.wikipedia.org/wiki/Port_(computer_networking)



### `sails.config.explicitHost`

By default, Sails will assume `localhost` as the host that will be listening for incoming requests.  This will work in the majority of hosting environments you encounter, but in some cases ([OpenShift](http://www.openshift.com) being one example) you'll need to explicitly declare the host name of your Sails app.  Setting `explicitHost` tells Sails to listen for requests on that host instead of `localhost`.

### `proxyHost` and `proxyPort`

If your site will ultimately be served by a proxy, you may want to set `proxyHost` to ensure that calls to `sails.getBaseurl()` return the expected host.  For example, if you deploy a Sails app on [Modulus.io](http://modulus.io), the ultimate URL for your site will be something like `http://mysite-12345.onmodulus.net`.  If you were to use `sails.getBaseurl()` to construct a URL in your app code, however, it would return something like `http://localhost:8080`.  Using `proxyHost` and `proxyPort` allow you to specify the host name and port of the proxy server that will be serving your app.  This ensure that any links created using `sails.getBaseurl()` are correct.



### `sails.config.environment`

> **Important**
>
> The NODE_ENV environment variable is usually a better idea than setting `sails.config.environment` manually, since it's a generic Node convention.  The `sails.config.environment` setting may be deprecated in Sails v1.0.

The runtime &ldquo;environment&rdquo; of your Sails app is either &lsquo;development&rsquo; or &lsquo;production&rsquo;.

In development, your Sails app will go out of its way to help you (for instance you will receive more descriptive error and debugging output).

In production, Sails configures itself (and its dependencies) to optimize performance.
You should always put your app in production mode before you deploy it to a server -- this helps ensure that your Sails app remains stable, performant, and scalable.

By default, Sails sets its environment using the `NODE_ENV` environment variable. If `NODE_ENV` is not set, Sails will run in the &lsquo;development&rsquo; environment.





<docmeta name="displayName" value="sails.config.*">
