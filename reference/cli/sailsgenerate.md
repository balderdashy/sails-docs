# sails generate

Generate a code file (or multiple files) in a Sails app.

```usage
sails generate <generator>
```

Sails ships with several _generators_ to help you scaffold new projects, spit out boilerplate code for common files, and automate your development process.

### Core generators

The following _core generators_ are bundled with Sails:

|  Command                        | Details               |
|:--------------------------------|:----------------------|
| sails generate model            | Generate **api/models/Foo.js**, including attributes with the specified types if provided. 
| sails generate action           | TODO
| sails generate helper           | TODO
| sails generate controller       | Generate **api/controllers/FooController.js**, including actions with the specified names if provided.
| sails generate hook             | TODO
| sails generate generator        | Generate a **foo** folder containing the files necessary for building a new generator. 
| sails generate response         | TODO
| sails generate adapter          | Generate a **api/adapters/foo** folder containing the files necessary for building a new adapter. 
| sails generate sails.io.js      | TODO
| _sails generate api_            | _Generate **api/models/Foo.js** and **api/controllers/FooController.js**._
| _sails generate new_            | _Alias for [`sails new`](http://sailsjs.com/documentation/reference/cli/sails-new)._
| _sails generate etc_            | **Experimental.** TODO: document


> TODO: finish documenting these https://github.com/balderdashy/sails-generate/tree/e845c44a4294adf86d52b22be2211edcbd4a2fe5/lib/core-generators


### Custom generators

[Custom / 3rd party generators](http://sailsjs.com/documentation/concepts/extending-sails/generators) allow you to extend or override the default functionality of `sails generate` (for example, by creating a generator that outputs view files for your favorite [view engine](http://sailsjs.com/documentation/concepts/views/view-engines).

You can also use custom generators to automate frequent tasks or generate app-specific files.  For example, if you are using React, you might wire up a quick custom generator to allow you to generate [React components](https://facebook.github.io/react/docs/react-component.html) in the appropriate folder in your project (`sails generate react component`).

<!--

TODO: move this into the coffeescript tutorial

### Coffeescript support

If you want to use Coffeescript to write your controllers, models or config files, just follow these steps:
 1. Install Coffeescript locally and save it in your `package.json` file: <br/>`npm install --save coffee-script`
 2. Install the generators for Coffeescript (optional): <br/>`npm install --save-dev sails-generate-controller-coffee sails-generate-model-coffee`
 3. To generate scaffold code, add `--coffee`:
```bash
sails generate api <foo> --coffee
# Generate api/models/Foo.coffee and api/controllers/FooController.coffee
sails generate model <foo> --coffee
# Generate api/models/Foo.coffee
sails generate controller <foo> --coffee
# Generate api/controllers/FooController.coffee
```

That's it, now you can write your code using Coffeescript!
-->

<docmeta name="displayName" value="sails generate">
<docmeta name="pageType" value="command">

