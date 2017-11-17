# Miscellaneous (`sails.config.*`)

For a conceptual overview of configuration in Sails, see http://sailsjs.com/documentation/concepts/Configuration.

This page is a quick reference of assorted configuration topics that don't fit elsewhere, namely top-level properties on the sails.config object.  Many of these properties are best set on a [per-environment basis](http://sailsjs.com/documentation/anatomy/my-app/config/env), or in your [config/local.js](http://sailsjs.com/documentation/concepts/configuration/the-local-js-file).  To set them globally for your app, create a new file in the `config` folder (e.g. `config/misc.js`) and add them there.

### `sails.config.port`

The `port` setting determines which <a href="http://en.wikipedia.org/wiki/Port_(computer_networking)">TCP port</a> your Sails app will use to listen for incoming requests.  Ports are a [transport-layer](https://en.wikipedia.org/wiki/Transport_layer) concept designed to allow many different networking applications to run at the same time on a single computer.

By default, if it&rsquo;s set, Sails uses the port configured in your app (`sails.config.port`).  If not, it checks to see if the `PORT` environment variable is set, and uses that if possible.  Otherwise it falls back to port 1337.

> In production, you will probably want Sails to listen on port 80 (or 443, if you have an SSL certificate and are serving your site via `https://`.)  But depending on where your app is deployed, you may or may not need to actually modify this setting.  For example, if you are deploying to a PaaS like [Heroku](http://heroku.com), [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/), or [Deis](http://deis.io/), you may not need to configure `sails.config.port`, since in most cases it is handled automatically.  For more guidance and tips related to deploying, scaling, and maintaining Sails in production, see [Concepts > Deployment](http://sailsjs.com/documentation/concepts/deployment).


### `sails.config.explicitHost`

By default, Sails will assume `localhost` as the host that will be listening for incoming requests.  This will work in the majority of hosting environments you encounter, but in some cases ([OpenShift](http://www.openshift.com) being one example) you'll need to explicitly declare the host name of your Sails app.  Setting `explicitHost` tells Sails to listen for requests on that host instead of `localhost`.

### `sails.config.proxyHost` and `sails.config.proxyPort`

If your site will ultimately be served by a proxy, you may want to set `proxyHost` to ensure that calls to `sails.getBaseurl()` return the expected host.  For example, if you deploy a Sails app on [Modulus.io](http://modulus.io), the ultimate URL for your site will be something like `http://mysite-12345.onmodulus.net`.  If you were to use `sails.getBaseurl()` to construct a URL in your app code, however, it would return something like `http://localhost:8080`.  Using `proxyHost` and `proxyPort` allow you to specify the host name and port of the proxy server that will be serving your app.  This ensure that any links created using `sails.getBaseurl()` are correct.



### `sails.config.environment`

The runtime &ldquo;environment&rdquo; of your Sails app is usually either &lsquo;development&rsquo; or &lsquo;production&rsquo;.

In development, your Sails app will go out of its way to help you (for instance you will receive more descriptive error and debugging output).

In production, Sails configures itself (and its dependencies) to optimize performance.  You should always put your app in production mode before you deploy it to a server -- this helps ensure that your Sails app remains stable, performant, and scalable.

#### Using the "production" environment

By default, Sails determines its environment using the `NODE_ENV` environment variable. If `NODE_ENV` is not set, Sails will look to see if you provided a `sails.config.environment` setting, and use it if possible.  Otherwise, it runs in the &lsquo;development&rsquo; environment.

When you lift your app with the NODE_ENV environment variable to "production", Sails automatically sets `sails.config.environment` to "production" too.  In fact, the reccommended way of switching to production mode is by _setting the NODE_ENV environment variable_ to "production".  This is usually a better idea than configuring `sails.config.environment` manually, since the NODE_ENV environment variable is relied upon by some of Sails' dependencies, and automatically set by most Sails/Node.js hosting services.

> Prior to Sails v1.0, the opposite was also true (Sails set the NODE_ENV environment variable to "production" automatically when lifting with `sails.config.environment` set to "production).  In Sails v1.0, that [is changing](https://github.com/balderdashy/sails/blob/c4d6991ef1e63d1cab984bc635289d208e602b23/ROADMAP.md#v10) to provide better support for custom staging and sandbox environments.

> For more background on configuring your Sails app for production, see [Concepts > Deployment](http://sailsjs.com/documentation/concepts/deployment).


### `sails.config.hookTimeout`

Set a global timeout for Sails hooks, in milliseconds.  Sails will give up trying to lift if any hook takes longer than this to load.  Defaults to `20000`.

> The most common use for this setting is to tolerate slow production Grunt tasks.  For example, if your app is using uglify, and you have lots and lots of client-side JavaScript files in your assets folder, then you might need Sails to wait longer than 20 seconds to compile all of those client-side assets.  For more tips about the production asset pipeline, see [Concepts > Deployment](http://sailsjs.com/documentation/concepts/deployment).


### `sails.config.keepResponseErrors`

By default, convenience functions `badRequest`, `forbidden`, `notFound`, and `serverError` will clear the response body when the environment is "production".  This behavior may be undesirable in certain cases, such as exposing underlying Waterline validation errors to clients while responding through `badRequest`.

Set `keepResponseErrors` to `true` to ensure Sails preserves the response body for these functions.

> The default behavior of responses will be [changing a bit in Sails v1.0](https://github.com/balderdashy/sails/blob/c4d6991ef1e63d1cab984bc635289d208e602b23/ROADMAP.md#v10).

### `sails.config.ssl`

SSL/TLS (transport-layer security) is critical for preventing potential man-in-the-middle attacks.  Without a protocol like SSL/TLS, web basics like securely transmitting login credentials and credit card numbers would be much more complicated and troublesome.  SSL/TLS is not only important for HTTP requests (`https://`); it's also necessary for WebSockets (over `wss://`).  Fortunately, you only need to worry about configuring SSL settings in one place: `sails.config.ssl`.

> #### SSL and Load Balancers
>
> The `sails.config.ssl` setting is only relevant if you want your _Sails process_ to manage SSL.  This isn't always true.  For example, if you plan for your Sails app to get more and more traffic, it will need to scale to multiple servers, which means you'll need a load balancer.  Most of the time, for performance and simplicity, it is a good idea to terminate SSL at your load balancer.  If you do that, then since SSL/TLS will have already been dealt with _before packets reach your Sails app_, you actually won't need to use the `sails.config.ssl` setting at all.  (This is also true if you're using a PaaS like Heroku, or almost any other host with a built-in load balancer.)
> 
> If you're satisfied this configuration setting applies to your app, then please continue below for more details.

Use `sails.config.ssl` to set up basic SSL server options, or to indicate that you will be specifying more advanced options in [sails.config.http.serverOptions](http://sailsjs.com/documentation/reference/configuration/sails-config-http#?properties).

If you specify a dictionary, it should contain both `key` _and_ `cert` keys, _or_ a `pfx` key. The presence of those options indicates to Sails that your app should be lifted with an HTTPS server.  If your app requires a more complex SSL setup (for example by using [SNICallback](https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener)), set `sails.config.ssl` to `true` and specify your advanced options in [sails.config.http.serverOptions](http://sailsjs.com/documentation/reference/configuration/sails-config-http#?properties).

#### SSL Configuration Example

For this example, we'll assume you created a folder in your project, `config/ssl/` and dumped your certificate/key files inside.  Then, in one of your config files, include the following:

```javascript
// Assuming this is in `config/env/production.js`, and your folder of SSL cert/key files is in `config/ssl/`:

ssl: {
  ca: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-gd-bundle.crt')),
  key: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-ssl.key')),
  cert: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-ssl.crt'))
}
```

<docmeta name="displayName" value="sails.config.*">
