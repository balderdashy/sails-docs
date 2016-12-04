# sails.config.models

Your default project-wide **model settings**, conventionally specified in the [config/models.js](http://sailsjs.com/documentation/anatomy/myApp/config/models-js) configuration file.

Most of these settings can also be overridden on a per-model basis-- just edit the appropriate model definition file.  For more details, see [Concepts > Model Settings](http://sailsjs.com/documentation/concepts/orm/model-settings).

### Properties


  Property             | Type         | Default                         | Details
 :---------------------|:------------:|:------------------------------- |:--------
 `migrate`             | ((string))   | _see [Model Settings](http://sailsjs.com/documentation/concepts/orm/model-settings)_        | The auto-migration strategy for your Sails app.  How & whether Sails will attempt to automatically rebuild the tables/collections/etc. in your schema every time it lifts.
 `datastore`           | ((string))   | `'localDiskDb'`                 | The default [datastore configuration](http://sailsjs.com/documentation/reference/sails-config/sails-config-datastores) any given model will use without a configured override.
 `tableName`           | ((string))   | _the model\'s identity_  | The name of the underlying database table/collection/etc that this model should use.  By default, this is the same as the model's identity.  This is a recommended convention, and shouldn't need to be changed in most cases.  But if you find yourself integrating with a shared/legacy database, the ability to customize `tableName` this way can save you a lot of time.
 `primaryKey`          | ((string))   | `'id'`             | The name of the attribute that every model in your app should use as its primary key by default.  Can be overridden here, or on a per-model basis-- but there's [usually an easier way](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?primarykey).

<docmeta name="displayName" value="sails.config.models">
<docmeta name="pageType" value="property">
