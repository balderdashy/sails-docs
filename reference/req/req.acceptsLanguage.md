# req.acceptsLanguage()

Returns whether this request (`req`) considers a certain `language` "acceptable".


### Usage

```js
req.acceptsLanguage(language);
```

### Details

`req.acceptsLanguage()` returns true if a request has specified the given `language` as "acceptable" its `Accept-Language` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4).)

This method is used by Sails internally for its implementation of internationalization and localization.  The [i18n](http://beta.sailsjs.org/#/documentation/concepts/Internationalization) hook automatically serves different content to different locales, based on the request.


### Example

If a request is sent with a `"Accept-Charset: utf-8"` header:

```js
req.acceptsCharset('utf-8');
// -> true
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.
> + Browsers send the "Accept-Language" header automatically based on the user's language settings.
> + You can expect the "Accept-Language" header to exist in most requests which originate from web browsers.














<docmeta name="uniqueID" value="reqacceptsLanguage170988">
<docmeta name="displayName" value="req.acceptsLanguage()">

