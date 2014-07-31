# sails generate

Sails ships with several *generators* to help you scaffold new projects.  You can also [create your own generators](http://beta.sailsjs.org/#/documentation/concepts/extending-sails/Generators/customGenerators.html) to handle frequent tasks, or extend functionality (for example, by creating a generator that outputs view files for your [favorite templating language](https://github.com/balderdashy/sails-generate-views-jade)).

The following generators are bundled with Sails:

#### `sails generate new <appName>`
Create a new Sails project in a folder called **appName**.  See [`sails new`](http://beta.sailsjs.org/#/documentation/reference/cli/sailsnew.html) for usage options.

#### `sails generate api <foo>`
Generate **api/models/Foo.js** and **api/controllers/FooController.js**

#### `sails generate model <foo> [attribute1:type1, attribute2:type2 ... ]`
Generate **api/models/Foo.js**, optionally include attributes with the specified types.

#### `sails generate controller <foo> [action1, action2, ...]`
Generate **api/controllers/FooController.js**, optionally include actions with the specified names.

#### `sails generate adapter <foo>`
Generate a **api/adapters/foo** folder containing the files necessary for building a new adapter.

#### `sails generate generator <foo>`
Generate a **foo** folder containing the files necessary for building a new generator.



<docmeta name="uniqueID" value="sailsgenerate197041">
<docmeta name="displayName" value="sails generate">

