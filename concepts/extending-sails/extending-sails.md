# Extending Sails

In keeping with the Node philosophy, Sails aims to keep its core as small as possible, delegating all but the most critical functions to separate modules[*](./#foot1).  There are currently three types of extensions that you can make to Sails:

+ [**Generators**](http://sailsjs.org/documentation/concepts/extending-sails/Generators) - for adding and overriding functionality in the Sails CLI.  *Example*: [sails-generate-model](https://www.npmjs.com/package/sails-generate-model), which allows you to create models on the command line with `sails generate model foo`.
+ [**Adapters**](http://sailsjs.org/documentation/concepts/extending-sails/Adapters) - for integrating Waterline (Sails' ORM) with new data sources, including databases, APIs, or even hardware. *Example*: [sails-postgresql](https://www.npmjs.com/package/sails-postgresql), the official [PostgreSQL](http://www.postgresql.org/) adapter for Sails.
+ [**Hooks**](http://sailsjs.org/documentation/concepts/extending-sails/Hooks) - for overriding or injecting new functionality in the Sails runtime.  *Example*: [sails-hook-autoreload](https://www.npmjs.com/package/sails-hook-autoreload), which adds auto-refreshing for a Sails project's API without having to manually restart the server.

If you&rsquo;re interested in developing a plugin for Sails, you will most often want to make a [hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks).  

<a name="foot1">*</a> <sub>_Core hooks_, like `http`, `request`, etc. are hooks which are bundled with Sails out of the box.  They can be disabled by specifying a `hooks` configuration in your `.sailsrc` file, or when lifting Sails programatically.</sub>


<docmeta name="displayName" value="Extending Sails">
