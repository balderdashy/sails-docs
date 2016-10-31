# sails new

`sails new <path/to/folder>` creates a new Sails project in a folder called **folder**.

`sails new .` create a new Sails project in current folder.

##### Options:

  * `--appName` - Application name (will be used as `name` in `package.json`). By default it is the same as the specified `folder`.
  * `--no-frontend` - Useful when generating a new Sails app that will not be used to serve any front-end assets.  Disable the generation of the `assets/` folder, `tasks/` folder, and related files. 

> `sails new` is really just a special [generator](http://sailsjs.org/documentation/concepts/extending-sails/Generators) which runs [`sails-generate-new`](http://github.com/balderdashy/sails-generate-new).  In other words, running `sails new foo` is an alias for running `sails generate new foo`, and like any Sails generator, the actual generator module which gets run can be overridden in your global `~/.sailsrc` file.



<docmeta name="displayName" value="sails new">
<docmeta name="pageType" value="command">
