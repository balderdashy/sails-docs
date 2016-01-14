# Application (`sails`)

The `sails` application object contains all relevant runtime state for a Sails application.
By default it is exposed globally, but this behavior [can be disabled](), e.g. for
use cases where multiple Sails app instances need to exist at once, or where globals
are not an option. The application object can also always be accessed on an incoming
request (`req._sails`).



### Properties

The application object has a number of methods and properties which are useful.
The officially supported methods on the `sails` object are covered by the other
pages in this section.  Here are a few of its most useful properties:

##### sails.models

> (TODO: finish this section)

##### sails.config

> (TODO: finish this section - mainly just link to "Configuration" section)

##### sails.sockets

> (TODO: finish this section - mainly just link to "sails.sockets" reference section)

##### sails.hooks

> (TODO: finish this section - mainly just link to "Extending Sails/Hooks" conceptual section)



### How does it work?

An application instance is automatically created the first time you `require('sails')`.
This is what is happening in the generated `app.js` file:

```javascript
var sails = require('sails');
```



### Creating a new application object (advanced)

Alternatively, if you are implementing something unconventional (e.g. writing tests for Sails core)
where you need to create more than one Sails application instance in a process, you _should not_ use
the instance returned by `require('sails')`, as this can cause unexpected behavior.  Instead, you should
obtain application instances can be created by using the Sails constructor:

```
var Sails = require('sails').constructor;
var sails0 = Sails();
var sails1 = Sails();
var sails2 = Sails();
```

Each app instance (`sails0`, `sails1`, `sails2`) can be loaded/lifted separately,
using different configuration.  For more on using Sails programatically, see the
conceptual overview on [programatic usage in Sails]().

<docmeta name="displayName" value="Application">
