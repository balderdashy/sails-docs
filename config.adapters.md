## Global adapter config
The `adapters` configuration object lets you create different global &ldquo;saved settings&rdquo; that you can mix and match in your models.  The `default` option indicates which saved setting should be used if a model doesn't have an adapter specified.

Keep in mind that options you define directly in your model definitions will override these settings.

For example, to use the in-memory adapter (for DEVELOPMENT ONLY), first install the module with `npm install sails-memory`, then define it in `adapters.js`:
```javascript
  memory: {
    module: 'sails-memory'
  },
```
then in your model definition, add `adapter: 'memory'`:

```javascript
  module.exports = {
     adapter: 'memory',
     attributes: {
       // some attributes
     }
  }
```

Sails adapters have been written for a variety of popular databases such as MySQL, Postgres and Mongo.  You can find a list of supported adapters <a href="https://github.com/balderdashy/sails-wiki/blob/0.9/Database-Support.md">here</a>.
