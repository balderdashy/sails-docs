### Translating Dynamic Content

If your backend is storing interlingual data (e.g. product data is entered in multiple languages via a CMS), you shouldn't rely on simple JSON locale files unless you're somehow planning on editing your locale translations dynamically.  One option is to edit the locale translations programatically, either with a custom implementation or through a translation service.  Sails/node-i18n JSON stringfiles are compatible with the format used by [webtranslateit.com](https://webtranslateit.com/en).

On the other hand you might opt to store these types of dynamic translated strings in a database.  If so, just make sure and build your data model accordingly so you can store and retrieve the relevant dynamic data by locale id (e.g. "en", "es", "de", etc)  That way, you can leverage the [`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale) method to help you figure out which translated content to use in any given response, and keep consistent with the conventions used elsewhere in your app.
<docmeta name="displayName" value="Translating Dynamic Content">
