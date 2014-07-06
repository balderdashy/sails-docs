# Internationalization

### Overview

Sails provides built-in internationalization and localization support in the [i18n hook](), using [i18n-node](https://github.com/mashpie/i18n-node). ([npm](https://www.npmjs.org/package/i18n)).

Additional options for localization/internationalization may be configured in [`sails.config.i18n`](), including the list of your app's supported locales.


### Translating

strings

in controllers, policies (`res.i18n()` , or in views through the `i18n()` function.


e.g.:
```ejs
<h1> <%= i18n('Hello!') %> </h1>
<h1> <%= i18n('Hello %s, how are you today?', 'Mike') %> </h1>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```

In your views:

```ejs
<h1> <%= __('Welcome to PencilPals!') %> </h1>
<h2> <%= i18n('Hello %s, how are you today?', 'Pencil Maven') %> </h2>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```

In an action or policy:
```js

```

Locales may be accessed from anywhere in your application.

Locales can be accessed in controllers/policies through `res.i18n()`, or in views through the `__(key)` or `i18n(key)` functions.
Remember that the keys are case sensitive and require exact key matches, e.g.

```ejs

```


### Locales
The i18n hook reads JSON-formatted translation files from your project's "locales" directory (`config/locales` by default).  Each file corresponds with a [locale](http://en.wikipedia.org/wiki/Locale) (usually a language) that your Sails backend will support.

These files contain locale-specific strings (as JSON key-value pairs) that you can use in your views, controllers, etc.

Here is an example locale file (`config/locales/es.json`):
```json
{
    "Hello!": "Hola!",
    "Hello %s, how are you today?": "¿Hola %s, como estas?",
}
```

Note that the keys in your stringfiles (e.g. "Hello %s, how are you today?") are **case sensitive** and require exact matches.  There are a few different schools of thought on the best approach here, and it really depends on who/how often you'll be editing the stringfiles vs. HTML in the future.  Especially if you'll be editing the translations by hand, simpler, all-lowercase key names are often preferable for maintainability.

For example, here's another pass at `config/locales/es.json`:

```json
{
    "hello": "Hola!",
    "hello-how-are-you-today": "¿Hola %s, como estas?",
}
```

And here's `config/locales/en.json`:

```json
{
    "hello": "Hello!",
    "hello-how-are-you-today": "Hello, how are you today?",
}
```


### Detecting and/or overriding the desired locale for a request

To override the auto-detected language/localization preference for a request, use [`req.setLocale()`](https://github.com/mashpie/i18n-node#setlocale), calling it with the unique code for the new locale, e.g.:

```js
// Force the language to German for the remainder of the request:
req.setLocale('de');
// (this will use the strings located in `config/locales/de.json` for translation)
```

By default, node-i18n will detect the desired language of a request by examining its language headers.  Language headers are set in your users' browser settings, and while they're correct most of the time, you may need the flexibility to override this detected locale and provide your own.

For instance, if your app allows users to pick their preferred language, you might create a [policy]() which checks for a custom language in the user's session, and if one exists, sets the appropriate locale for use in subsequent policies, controller actions, and views:

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



<!--
  TODO: add section explaining this is really only for **backend** translations of **static** content!

  **backend**
  we do not recommend translating strings in the front-end of your application (e.g. the browser or an iOS app) for a variety of reasons, the most obvious being SEO, but also fragmentation. You can of course still do so- just don't use this built-in support from the i18n hook.

  **static**
  if your backend is storing interlingual data (e.g. product data is entered in multiple languages via a CMS, then stored in a database), you obviously can't use the locales files  to support that use case, since you don't even know what the content will be until it's in your database.  Instead, build your data model accordingly so you can store and retrieve relevant data by language.
  You *CAN* however leverage this built-in support



-->

### Disabling or customizating Sails' default internationalization support

Your app can replace or extend this baseline implementation as needed.  You can always `require()` any Node modules you like, anywhere in your project.  And like any hook, you can completely disable or override the i18n hook in Sails using the [`loadHooks`]() and/or [`hooks`]() configuration options.





<!--
  TODO: add more sections here to summarize the contents of the node-i18n repo.

Sails decides which language to use by
 + detect users' language preferences on a per-request basis using HTTP headers
 + conventional locales per-request
-->


<!--
#### Notes
+  -->

<docmeta name="uniqueID" value="internationalization245343">
<docmeta name="displayName" value="Internationalization">

