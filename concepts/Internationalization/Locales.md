# Locales

### Overview

The i18n hook reads JSON-formatted translation files from your project's "locales" directory (`config/locales` by default).  Each file corresponds with a [locale](http://en.wikipedia.org/wiki/Locale) (usually a language) that your Sails backend will support.

These files contain locale-specific strings (as JSON key-value pairs) that you can use in your views, controllers, etc.

Here is an example locale file (`config/locales/es.json`):
```json
{
    "Hello!": "Hola!",
    "Hello %s, how are you today?": "¿Hola %s, como estas?"
}
```

Note that the keys in your stringfiles (e.g. "Hello %s, how are you today?") are **case sensitive** and require exact matches.  There are a few different schools of thought on the best approach here, and it really depends on who/how often you'll be editing the stringfiles vs. HTML in the future.  Especially if you'll be editing the translations by hand, simpler, all-lowercase key names may be preferable for maintainability.

For example, here's another pass at `config/locales/es.json`:

```json
{
    "hello": "Hola!",
    "hello-how-are-you-today": "Hola %s, ¿cómo estás?"
}
```

And here's `config/locales/en.json`:

```json
{
    "hello": "Hello!",
    "hello-how-are-you-today": "Hello, how are you today?"
}
```

You can also nest locale strings. But a better approach would be to use `.` to represent nested strings. For example, here's the list of labels for the index page of a user controller:

``` json
{
    "user.index.label.id": "User ID",
    "user.index.label.name": "User Name"
}
```


### Detecting and/or overriding the desired locale for a request

To determine the current locale used by the request, use [`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale).

To override the auto-detected language/localization preference for a request, use [`req.setLocale()`](https://github.com/mashpie/i18n-node#setlocale), calling it with the unique code for the new locale, e.g.:

```js
// Force the language to German for the remainder of the request:
req.setLocale('de');
// (this will use the strings located in `config/locales/de.json` for translation)
```

By default, node-i18n will detect the desired language of a request by examining its language headers.  Language headers are set in your users' browser settings, and while they're correct most of the time, you may need the flexibility to override this detected locale and provide your own.

For instance, if your app allows users to pick their preferred language, you might create a [policy](http://sailsjs.org/documentation/concepts/Policies) which checks for a custom language in the user's session, and if one exists, sets the appropriate locale for use in subsequent policies, controller actions, and views:

```js
// api/policies/localize.js
module.exports = function(req, res, next) {
  req.setLocale(req.session.languagePreference);
  next();
};
```


<!--

  Alternatively, here's another extended example:
  (todo: at the very least pull this into a separate guide)

```js
// config/routes.js
module.export.routes = {
  '/:lang/': 'MyController.index',
  '/:lang/help': 'MyController.help',
  '/:lang/contact': 'MyController.contact',
  // ...etc...
}

// config/policies.js
module.exports.policies = {
  '*' : 'localize'
}

// api/policies/localize.js
module.exports = function(req, res, next) {
   req.setLocale(req.param('lang'));
   next();
};
```
-->


<docmeta name="displayName" value="Locales">
