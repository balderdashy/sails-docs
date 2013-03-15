# Captain's log

## Beta

<!--
### 0.9.0 (breaks 0.8.x projects)
+ Traces of "proper" active record .save(), .destroy(), removed.  Now when you call User.findAll(), you get a list of objects which contain just the models' data.  This prevents confusion with using .values
+ Removed CRUD synonyms
+ Config option to disable convenience API calls (model/create, model/findAll, etc.)
+ Option to generate actual files when generating blueprints
+ Removed all reference to blueprints as "scaffolds".  Blueprints are more than temporary placeholders-- they are the preferred method of serving an API from your app.
+ model validations (using https://github.com/balderdashy/anchor)
+ Redis adapter 
+ MongoDB adapter 

### 0.8.9 (upcoming release)
+ Haml template support on back-end for new projects (thanks @dcbartlett)
+ default values in models (defaultsTo)
+ Chained policies fixed
-->


### 0.8.89-1 (latest stable)
+ Front-end CoffeeScript support in AssetRack

### 0.8.88
+ Adds coffeescript support on the front-end in dev and production environments via [asset-rack](https://github.com/techpines/asset-rack) (thanks @techpines!)

### 0.8.87
_Monday, March 4, 2013_
+ Patch fixes updates sails-dirty version which fixes sorting by date

### 0.8.86
_Monday, March 4, 2013_
+ Patch to allow for easier SSL configuration.

### 0.8.85
_Sunday, March 3, 2013_
+ Check for and warn if port is currently being used on lift, with support for explicit hosts (https://github.com/balderdashy/sails/issues/197)
+ Model.stream() support over socket.io (https://github.com/balderdashy/sails/issues/196)

### 0.8.84
_Saturday, March 2, 2013_
+ Bug fixes: (explicit hosts, and included an additional file in new app generation)

### 0.8.83
_Saturday, March 2, 2013_
+ Support for streaming large datasets from models (e.g. `User.stream().pipe(res);`)
+ Bug fix for chains of multiple policies (thanks @themouette)
+ Jade template support (thanks @valinorsgatekeeper)
+ AssetRack integration for more robust css/js/template/LESS management, replaces Rigging (thanks @techpines)
+ Fixed some docs /refactored (thanks @slantzjr)
+ Bundled excruciatingly simple "authenticated" policy in new projects
+ Made "redirect" work in API scaffolds
+ Renamed waterline-* adapter modules as sails-*.  Added backwards compat.
+ Added .gitkeep in all directories when generating new projects to make sure they get committed
+ Bootstrap and log config now available in project template
+ View config now available in new projects as 'config/views.js'
+ Better error checking in the `sails` CLI
+ Docs
+ Added app.js file back in, but this time hidden as '.app.js'.  It can be run however you like, or you can use `npm debug` to debug it.  To run daemonized, you can use `forever start .app.js`
+ Added notion of `sails.explicitHost` to track whether a host was explicitly specified.  If it was not, Express takes the approach of accepting `all connections via INADDR_ANY` (see http://expressjs.com/2x/guide.html#app.listen())  Now, if you specify `sails.config.host`, `sails.explicitHost` gets set, and Express will start the server deliberately using the host you specify.  In certain PaaS deployments, this is required.  For instance, this was causing problems in an Openshift deployment environment (big thanks to @hypereive for figuring that out).


### 0.8.82
_Sunday, February 24, 2013_
+ Bootstrap function fires warning if callback not triggered after a few seconds (thanks @virpool)
+ Bug fixes w/ pubsub/model convenience methods.

### 0.8.80
+ Refactored app layout to make it a bit more straightforward.  To check out the the new folder structure, make a new project with `sails new foo`
+ Added robot.txt in new app generation
+ Bound all methods in adapter to have the right context.

### 0.8.79
+ Adapter definitions are no longer functions-- instead the direct definition object is accepted.  This makes it easier, cleaner, and more declarative to create adapters.
+ Merged waterline into main Sails repo.
+ Brought in sails-util and sails-moduleloader, moved watelrine tests into top level.
+ Attribute values in models in result sets from Waterline are now cast to numbers, if they are number-looking strings.
+ Substantial refactoring of waterline model-augmentation logic.
+ Added TODO for asynchronous module loading for future.
+ Upgraded waterline-dirty dep.


### 0.8.77
+ Patch updates the waterline-dirty dependency to deal with an issue with that adapter returning objects which map directly to the in-memory database (was causing changes made to found models to be persisted without calling .save())


### < 0.8.77
+ I wasn't keeping good notes, sorry :(
+ Check out https://github.com/balderdashy/sails/commits/master if you want to dive in.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/sails/changelog)