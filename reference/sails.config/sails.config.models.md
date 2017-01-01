# sails.config.models

Your default project-wide **model settings**, conventionally specified in the [config/models.js](http://sailsjs.com/documentation/anatomy/myApp/config/models-js) configuration file.

Most of the settings below can also be overridden on a per-model basis-- just edit the appropriate model definition file.  There are also some additional model settings, not listed below, which can _only_ be specified on a per-model basis.  For more details, see [Concepts > Model Settings](http://sailsjs.com/documentation/concepts/orm/model-settings).

### Properties


  Property             | Type            | Default                         | Details
 :---------------------|:---------------:|:------------------------------- |:--------
  `attributes`         | ((dictionary))  | _see [Attributes](http://sailsjs.com/documentation/concepts/models-and-orm/attributes)_ | Default [attributes](http://sailsjs.com/documentation/concepts/models-and-orm/attributes) to implicitly include in all of your app's model definitions.  (Can be overridden on an attribute-by-attribute basis.)
 `migrate`             | ((string))   | _see [Model Settings](http://sailsjs.com/documentation/concepts/orm/model-settings)_        | The [auto-migration strategy](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?migrate) for your Sails app.  How & whether Sails will attempt to automatically rebuild the tables/collections/etc. in your schema every time it lifts.
 `schema`              | ((boolean))     | `false`                      | Only relevant for models hooked up to a schemaless database like MongoDB.  If set to `true`, then the ORM will switch into "schemaful" mode.  For example, if properties passed in to `.create()`, `.createEach()`, or `.update()` do not correspond with recognized attributes, then they will be stripped out before saving.
 `datastore`           | ((string))   | `'default'`                     | The default [datastore configuration](http://sailsjs.com/documentation/reference/sails-config/sails-config-datastores) any given model will use without a configured override.  Avoid changing this.
 `primaryKey`          | ((string))   | `'id'`             | The name of the attribute that every model in your app should use as its primary key by default.  Can be overridden here, or on a per-model basis-- but there's [usually a better way](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?primarykey).

<docmeta name="displayName" value="sails.config.models">
<docmeta name="pageType" value="property">
