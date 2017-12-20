# Application (`sails`)

The Sails application object contains all relevant runtime state for a Sails application.
By default it is exposed globally as `sails`, but this behavior [can be disabled](http://sailsjs.com/documentation/reference/configuration/sails-config-globals), e.g. for
use cases where multiple Sails app instances need to exist at once, or where globals
are not an option. The application object can also always be accessed on an incoming
request (`req._sails`), and inside of [model](http://sailsjs.com/documentation/concepts/models-and-orm/models) and [service](http://sailsjs.com/documentation/concepts/services) modules via `this.sails`.

> Most users of the framework will only need to know about the `sails` application object in order to access a few basic methods and their custom configuration; less commonly-used methods can be found in the [advanced usage](http://sailsjs.com/documentation/reference/application/advanced-usage) section.

### How does it work?

An application instance is automatically created the first time you `require('sails')`.
This is what is happening in the generated `app.js` file:

```javascript
var sails = require('sails');
```




### Properties

The application object has a number of methods and properties which are useful.
The officially supported methods on the `sails` object are covered by the other
pages in this section.  Here are a few of its most useful properties:

##### sails.models

A dictionary of all loaded [Sails models](http://sailsjs.com/documentation/concepts/models-and-orm/models), indexed by their _identity_.

By default, a model's identity is the lowercased version of its filename, without the **.js** extension.  For example, the default identity for a model loaded from `api/models/PowerPuff.js` would be `powerpuff`, and the model would be accessible via `sails.models.powerpuff`.  A model's identity can be customized by setting an `identity` property in its module file.


##### sails.helpers

A dictionary of all accessible [helpers](http://sailsjs.com/documentation/concepts/helpers), including organics.


##### sails.config

The full set of configuration options for the Sails instance, loaded from a combination of environment variables, `.sailsrc` files, user-configuration files and defaults.  See the [configuration concepts section](http://sailsjs.com/documentation/concepts/configuration) for a full overview of configuring Sails, and the [configuration reference](http://sailsjs.com/documentation/reference/configuration) for details on individual options.

##### sails.sockets

A set of convenience methods for low-level interaction with connected websockets.  See the [`sails.sockets.*` reference section](http://sailsjs.com/documentation/reference/web-sockets/sails-sockets) for details.


### Advanced usage

For more options and implementation details (including instructions for programmatic usage) see [Advanced usage](https://sailsjs.com/documentation/reference/application/advanced-usage).

<docmeta name="displayName" value="Application">
