# req.acceptsCharset()

Returns whether this request (`req`) is able to handle a specified `characterSet`.


### Usage

```js
req.acceptsCharset(characterSet);
```

### Details

Useful for advanced content negotiation where a client may or may not support certain character sets, such as unicode (utf-8.)  This method determines whether or not a request has specified the given `characterSet` as "acceptable" its `Accept-Charset` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2).)



### Example

If a request is sent with a `"Accept-Charset: utf-8"` header:

```js
req.acceptsCharset('utf-8');
// -> true
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.














<docmeta name="uniqueID" value="reqacceptsCharset303007">
<docmeta name="displayName" value="req.acceptsCharset()">

