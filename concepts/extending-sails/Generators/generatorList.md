# Available generators

### Core Generators

Certain generators are built in to Sails by default.

| Commands that generate a new Sails app
|:-----------------------------------|
| sails new _name_
| sails new _name_ --fast
| sails new _name_ --caviar
| sails new _name_ --without=grunt
| sails new _name_ --without=lodash,async,grunt,blueprints,i18n
| sails new _name_ --no-frontend --without=sockets,lodash
| sails new _name_ --minimal


| Generators for spitting out new files in an existing Sails app
|:-----------------------------------|
| sails generate model _identity_
| sails generate action _name_
| sails generate action view-_name_
| sails generate action _some/path/_view-_name_
| sails generate page _name_
| sails generate helper _name_
| sails generate helper view-_name_
| sails generate script _name_
| sails generate script get-_name_


| Commands
|:-----------------------------------|
| sails generate response _name_
| sails generate generator _name_
| sails generate adapter _name_
| sails generate hook _name_
| sails generate controller _name_
| sails generate api _name_

| Other generators available by default
|:-----------------------------------|
| sails generate sails.io.js
| sails generate parasails
| sails generate etc


_Since Sails v1.0, built-in generators are now [bundled](https://npmjs.com/package/sails-generate) in Sails core, rather than in separate NPM packages.  All generators can still be overridden the same way.  For advice setting up overrides for core generators in your environment, [click here](https://sailsjs.com/support)._


### Community Generators

There are over 100 community-supported generators [available on NPM](https://www.npmjs.com/search?q=sails+generate):

+ [sails-inverse-model](https://github.com/juliandavidmr/sails-inverse-model)
+ [sails-generate-new-gulp](https://github.com/Karnith/sails-generate-new-gulp)
+ [sails-generate-archive](https://github.com/jaumard/sails-generate-archive)
+ [sails-generate-scaffold](https://github.com/irlnathan/sails-generate-scaffold)
+ [sails-generate-directive](https://github.com/balderdashy/sails-generate-directive)
+ [sails-generate-bower](https://github.com/smies/sails-generate-bower)
+ [sails-generate-angular-gulp](https://github.com/Karnith/sails-generate-angular-gulp)
+ [sails-generate-ember-blueprints](https://github.com/mphasize/sails-generate-ember-blueprints)
+ And [many more](https://www.npmjs.com/search?q=sails+generate)...


<docmeta name="displayName" value="Available generators">
