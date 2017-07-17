# sails.config.models

Your default project-wide **model settings**. Can also be overridden on a per-model basis by providing a top-level property with the same name in that model definition.  For more details, see the conceptual docs on [Model Settings](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings.html).  These options are conventionally specified in the [config/models.js](http://sailsjs.com/documentation/anatomy/myApp/config/models.js.html) configuration file.

```js
sails.config.models;
```

### Properties


  Property             | Type         | Default                         | Details
 :---------------------|:------------:|:------------------------------- |:--------
 `attributes`          | ((dictionary))   | `{}`                            | The basic pieces of information to store about a model. See [Attributes](http://sailsjs.com/documentation/concepts/models-and-orm/attributes).
 `migrate`             | ((string))   | _see [Model Settings](http://sailsjs.com/documentation/concepts/models-and-orm/model-settings.html)_        | How & whether Sails will attempt to automatically rebuild the tables/collections/etc. in your schema
 `connection`          | ((string))   | `"localDiskDb"`                 | The default database [connection](http://sailsjs.com/documentation/reference/sails.config/sails.config.connections.html) any given model will use without a configured override
 `autoPK`              | ((boolean))  | `true`             | Toggle the automatic definition of a primary key in your model
 `autoCreatedAt`       | ((boolean))  | `true`             | Toggle the automatic definition of a property createdAt in your model
 `autoUpdatedAt`       | ((boolean))  | `true`             | Toggle the automatic definition of a property updatedAt in your model
 `tableName`           | ((string))   | _identity_       | Used to specify database table name for the model
 `dynamicFinders`      | ((boolean))  | `true`             | Toggle the automatic creation of Dynamic Finders



<docmeta name="displayName" value="sails.config.models">
<docmeta name="pageType" value="property">
