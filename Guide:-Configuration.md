So you got Sails.JS installed now and its loading up your awesome new project.  What? thats not good enough? OK, lets see what we can configure to make it better for your needs!!!

# Overview of Configurations
One of the major advantages of Sails.JS that makes it such a powerhouse MVC is the fact that is incredibly flexable.  As with most porgrams now days, Sails.JS has configurations files.  Below is a list and short explination of each.

* adapters.js      (This file handles database/datasource adapters)
* application.js   (This file handles General settings for your application)
* assets.js        (This file handles the asset settings for CSS/Js/styles and other resources)
* bootstrap.js     (This file holds code that needs to be run before the app launches)
* locales          (Folder that holds locale specific settings)
	* english.js   (This file handles translated strings for Locale use)
* local.ex.js      (This is an example file of local.js)
* local.js         (This file handles any LOCAL overrides needed)
* policies.js      (This file defines policies that are used to grant or deny access to users)
* routes.js        (This file contains all the user specified routes for the system.  The system will attempt dynamic routing if this is blank)
* views.js         (This file handles all view related settings, such as the view engine and layout)

# adapters.js
