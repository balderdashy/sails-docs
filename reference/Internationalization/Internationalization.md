# Internationalization

### Overview

If your app will touch people or systems from all over the world, internationalization and localization (i18n) may be an important part of your international strategy.  Sails provides built-in support for detecting user language preferences and translating static words/sentences thanks to [i18n-node](https://github.com/mashpie/i18n-node). ([npm](https://www.npmjs.org/package/i18n)).



<!--
  Potentially cover this:
  *(but it might be obvious and not useful/necessary to include, not sure- could also be more confusing than helpful)*
Note that this built-in support is for **dynamically-rendered** (but otherwise **static**) content.  You can only use it in responses which are pre-processed on the server.  In other words, you can use these translations in your views, controller actions, and policies, but stuff in your assets folder.)

we do not recommend translating strings in the front-end of your application (e.g. the browser or an iOS app) for a variety of reasons, the most obvious being SEO, but also fragmentation. You can of course still do so- just don't use this built-in support from the i18n hook.
-->


### Usage


In a view:
```ejs
<h1> <%= __('Hello') %> </h1>
<h1> <%= __('Hello %s, how are you today?', 'Mike') %> </h1>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```


In a controller or policy:
```javascript
req.__('Hello'); // => Hola
req.__('Hello %s', 'Marcus'); // => Hola Marcus
req.__('Hello {{name}}', { name: 'Marcus' }); // => Hola Marcus
```


Or if you already know the locale id, you can translate from anywhere in your application using `sails.__`:

```javascript
sails.__({
  phrase: 'Hello',
  locale: 'es'
});
// => 'Hola!'
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

Note that the keys in your stringfiles (e.g. "Hello %s, how are you today?") are **case sensitive** and require exact matches.  There are a few different schools of thought on the best approach here, and it really depends on who/how often you'll be editing the stringfiles vs. HTML in the future.  Especially if you'll be editing the translations by hand, simpler, all-lowercase key names may be preferable for maintainability.

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



### Translating Dynamic Content

If your backend is storing interlingual data (e.g. product data is entered in multiple languages via a CMS), you shouldn't rely on simple JSON locale files unless you're somehow planning on editing your locale translations dynamically.  One option is to edit the locale translations programatically, either with a custom implementation or through a translation service.  Sails/node-i18n JSON stringfiles are compatible with the format used by [webtranslateit.com](https://webtranslateit.com/en).

On the other hand you might opt to store these types of dynamic translated strings in a database.  If so, just make sure and build your data model accordingly so you can store and retrieve the relevant dynamic data by locale id (e.g. "en", "es", "de", etc)  That way, you can leverage the [`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale) method to help you figure out which translated content to use in any given response, and keep consistent with the conventions used elsewhere in your app.



### Additional Options

Settings for localization/internationalization may be configured in [`sails.config.i18n`]().  The most common reason you'll need to modify these settings is to edit the list of your app's supported locales and/or the location of your translation stringfiles:

```javascript
// Which locales are supported?
locales: ['en', 'es'],

// Where are your locale translations located?
localesDirectory: '/config/locales'
```




### Disabling or customizating Sails' default internationalization support

Of course you can always `require()` any Node modules you like, anywhere in your project, and use any internationalization strategy you want.

But worth noting is that since Sails implements [node-i18n]() integration in the [i18n hook](), you can completely disable or override it using the [`loadHooks`]() and/or [`hooks`]() configuration options.





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

