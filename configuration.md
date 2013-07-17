# Configuration
> _Note: These docs are now for version 0.9.0 of Sails.  Please visit [here](http://08x.sailsjs.org) for 0.8.x documentation._

So, now you have Sails.js installed and it's loading up your awesome new project.  What? Thats not good enough? Okay, lets see what we can configure to make it better suit your needs!

## Overview of configuration files
One of the major advantages of Sails.js is its flexibility.  As with most MVC frameworks, Sails.js assumes standard conventions, but also allows you to change its configuration to fit your needs.  Below is a list and short explanation of each.

* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.404.md">404.js</a>         (This file handles the default behavior for 404 pages)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.500.md">500.js</a>         (This file handles the default behavior for 500 pages)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.adapters.md">adapters.js</a>         (This file handles database/datasource adapters)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.bootstrap.md">bootstrap.js</a>       (This file holds code that needs to be run before the app launches)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.controllers.md">controllers.js</a>
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.csrf.md">csrf.js</a>
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.local.md">local.js</a>               (This file is included in the `.gitignore` and won't be pushed up to your git repository.  It handles any LOCAL overrides needed)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.locales.md">locales</a>          (Folder that holds locale specific settings)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.log.md">log.js</a>
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.policies.md">policies.js</a>         (This file defines policies that are used to grant or deny access to users)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.routes.md">routes.js</a>             (This file contains all the user specified routes for the system.  The system will attempt dynamic routing if this is blank)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.session.md">session.js</a>
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.sockets.md">sockets.js</a>                     (This file handles the Socket.IO Configuration options.)
* <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/config.views.md">views.js</a>               (This file handles all view related settings, such as the view engine and layout)
