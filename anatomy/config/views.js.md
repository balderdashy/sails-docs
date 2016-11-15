# config/views.js
### Purpose
This file is where Sails looks to find out which templating engine to use when rendering server side HTML templates.  By default Sails uses ejs, but any view engine can be used by changing the `extension` and supplying a `getRenderFn` value (see the [view engine documentation](http://sailsjs.org/documentation/concepts/Views/ViewEngines.html) for more info).

<docmeta name="displayName" value="views.js">

```
/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 *
 * For details on available options for configuring server-side views, check out:
 * http://sailsjs.com/docs/reference/configuration/sails-config-views
 *
 * For more background information on views and partials in Sails, check out:
 * http://sailsjs.com/docs/concepts/views
 */

module.exports.views = {

  /***************************************************************************
  *                                                                          *
  * Extension to use for your views. When calling `res.view()` in an action, *
  * you can leave this extension off. For example, calling                   *
  * `res.view('homepage')` will (using default settings) look for a          *
  * `views/homepage.ejs` file.                                               *
  *                                                                          *
  ***************************************************************************/

  // extension: 'ejs',

  /***************************************************************************
  *                                                                          *
  * The path (relative to the views directory, and without extension) to the *
  * layout file to use, or `false` to disable layouts entirely.              *
  *                                                                          *
  * Note that layouts only work with the built-in view engine!               *
  *                                                                          *
  ***************************************************************************/

  // layout: 'layout'

};
```
