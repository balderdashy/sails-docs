# req.acceptedLanguages
An array containing the "acceptable" response languages specified by the user agent in the "[Accept-Language](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4)" header of this request (`req`).

### Usage
```js
req.acceptedLanguages;
```

### Details

`req.acceptedLanguages` contains all the languages specified by the request's `Accept-Language` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4).)

This method is used by Sails internally for its implementation of internationalization and localization.  The [i18n](http://beta.sailsjs.org/#/documentation/concepts/Internationalization) hook automatically serves different content to different locales, based on the request.


### Example

```js
req.acceptedLanguages;
// -> ['en-US', 'en']
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.
> + Browsers send the "Accept-Language" header automatically based on the user's language settings.
> + You can expect the "Accept-Language" header to exist in most requests which originate from web browsers.




<docmeta name="uniqueID" value="reqacceptedLanguages311952">
<docmeta name="displayName" value="req.acceptedLanguages">

