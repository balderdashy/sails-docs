# myApp/config/local.js

The `config/local.js` file contains configuration overrides for your local development environment (your laptop, for example).  Any settings you add here take precedence over most other configuration files.  See [**Concepts > Configuration > The local.js file**](http://sailsjs.org/documentation/concepts/configuration/the-local-js-file) for more information.

```javascript
/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system: for example, this would be a good place
 * to store database or email passwords that apply only to you, and shouldn't
 * be shared with others in your organization.
 *
 * These settings take precedence over all other files in `config/`, including
 * those in the env/ subfolder.
 *
 * PLEASE NOTE:
 *		By default, `config/local.js` is included in your .gitignore, so if you're
 *    using git as a version control solution for your Sails app, keep in mind that
 *		this file won't be committed to your repository!
 *
 *		Good news is, that means you can specify configuration for your local
 *		machine in this file without inadvertently committing personal information
 *		(like database passwords) to the repo.  Plus, this prevents other members
 *		of your team from commiting their local configuration changes on top of yours.
 *
 *    In a production environment, you'll probably want to leave this file out
 *    entirely and configure all of your production overrides using `env/production.js`,
 *    or environment variables, or a combination of both.
 *
 *
 * For more information, check out:
 * http://sailsjs.org/documentation/concepts/configuration/the-local-js-file
 *
 * For a reference of misc. top-level settings not covered by other config files, see:
 * http://sailsjs.org/documentation/reference/configuration/sails-config
 */

module.exports = {

  // Any configuration settings may be overridden below, including custom
  // configuration specifically for your app (e.g. Stripe, Mailgun, Twitter, etc.)


  /***************************************************************************
   * SSL/TLS (transport-layer security) is critical for preventing potential *
   * man-in-the-middle attacks.  Without a protocol like SSL/TLS, web basics *
   * like securely transmitting login credentials and credit card numbers    *
   * would be much more complicated and troublesome.                         *
   *                                                                         *
   * SSL/TLS is not only important for HTTP requests (`https://`); it's also *
   * necessary for WebSockets (over `wss://`).  Fortunately, you only need   *
   * to worry configuring SSL settings in once place: `sails.config.ssl`     *
   *                                                                         *
   * This is only relevant if you want your Sails server to manage SSL.      *
   * As your app gains traffic, you will probably want to scale to multiple  *
   * servers, and set up a load balancer.  Most of the time, you will end up *
   * terminating SSL at your load balancer for performance/simplicity.       *
   * In that case, since SSL/TLS will have already been dealt with before    *
   * packets reach your Sails app, you won't need to use this setting.       *
   * (For example, if you're terminating SSL/TLS at your load balancer, or   *
   * This is also true if you're using a PaaS or other host with a built-in  *
   * load balancer (e.g. Heroku.)                                            *
   *                                                                         *
   * > For more information about configuring SSL in Sails, see:             *
   * > http://sailsjs.org/documentation/reference/configuration/sails-config *
   ***************************************************************************/

  // ssl: undefined,

  /***************************************************************************
   * The TCP port that this Sails app listens on for incoming requests.      *
   *                                                                         *
   * If an explicit `port` config is specified, then it takes precedence.    *
   * If not, then Sails will use the `PORT` environment variable, if one is  *
   * set.  Otherwise it falls back to port 1337.                             *
   *                                                                         *
   * > For more information about configuring the port used by Sails, see:   *
   * > http://sailsjs.org/documentation/reference/configuration/sails-config *
   ***************************************************************************/

  // port: 1337,

  /***************************************************************************
   * The runtime "environment" of your Sails app is usually either           *
   * 'development' or 'production'.                                          *
   *                                                                         *
   * In development, your Sails app will go out of its way to help you       *
   * (for instance you will receive more descriptive error and               *
   * debugging output)                                                       *
   *                                                                         *
   * In production, Sails configures itself (and its dependencies) to        *
   * optimize performance. You should always put your app in production mode *
   * before you deploy it to a server.  This helps ensure that your Sails    *
   * app remains stable, performant, and scalable.                           *
   *                                                                         *
   * By default, Sails sets its environment using the `NODE_ENV` environment *
   * variable.  If NODE_ENV is not set, Sails will run in the                *
   * 'development' environment.                                              *
   *                                                                         *
   * > For more details and best practices about configuring your app's      *
   * > environment, check out:                                               *
   * > http://sailsjs.org/documentation/reference/configuration/sails-config *
   ***************************************************************************/

   // environment: 'development'

};
```


<docmeta name="displayName" value="local.js">
