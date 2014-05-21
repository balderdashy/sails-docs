# Usage

Locales can be accessed through either `res.i18n()`, or in views through the `i18n()` function.
Remember that the keys are case sensitive and require exact key matches.
e.g.:
```ejs
<h1> <%= i18n('Hello!') %> </h1>
<h1> <%= i18n('Hello %s, how are you today?', 'Mike') %> </h1>
```

### config
Locale config can be found in `config/i18n.js`, from which you can set your supported locales:
```javascript
// Which locales are supported?
locales: ['en', 'es'],

// Where are your locale translations located?
localesDirectory: '/config/locales'
```

You can change the locale in a controller action by setting ```req.locale``` like so:

```
// config/routes.js

module.export.routes = {

  '/:lang/': 'MyController.index',
  '/:lang/help': 'MyController.help',
  '/:lang/contact': 'MyController.contact',
  ...etc...

}
```

```
// config/policies.js

module.exports.policies = {

   '*' : 'localize'

}
```

```
// api/policies/localize.js

module.exports = function(req, res, next) {

   req.locale=req.param('lang');
   next();

};
```



<docmeta name="uniqueID" value="Usage689913">
<docmeta name="displayName" value="Usage">

