# Configuration
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

So, now you have Sails.js installed and it's loading up your awesome new project.  What? Thats not good enough? Okay, lets see what we can configure to make it better suit your needs!

# Overview of configuration files
One of the major advantages of Sails.js is its flexibility.  As with most MVC frameworks, Sails.js assumes standard conventions, but also allows you to change its configuration to fit your needs.  Below is a list and short explanation of each.

* <a href="#adapters.js">adapters.js</a>         (This file handles database/datasource adapters)
* <a href="#application.js">application.js</a>   (This file handles General settings for your application)
* <a href="#bootstrap.js">bootstrap.js</a>       (This file holds code that needs to be run before the app launches)
* <a href="#controllers.js>controllers.js</a>
* <a href="#io.js">io.js</a>                     (This file handles the Socket.IO Configuration options.)
* * <a href="#locales">locales</a>          (Folder that holds locale specific settings)
	* <a href="#english.js">english.js</a>   (This file handles translated strings for Locale use)
* <a href="#local.js">local.js</a>               (This file is included in the `.gitignore` and won't be pushed up to your git repository.  It handles any LOCAL overrides needed)
	* <a href="#local.ex.js">local.ex.js</a>     (This is an example file of local.js)
* <a href="#log.js">log.js</a>
* <a href="#policies.js">policies.js</a>         (This file defines policies that are used to grant or deny access to users)
* <a href="#routes.js">routes.js</a>             (This file contains all the user specified routes for the system.  The system will attempt dynamic routing if this is blank)
* <a href="#session.js>session.js</a>
* <a href="#views.js">views.js</a>               (This file handles all view related settings, such as the view engine and layout)
