# req.acceptedCharsets
This property is an array that contains the acceptable charsets specified by the user agent in the request.



### Usage

```js
req.acceptedCharsets;
```

### Details

Useful for advanced content negotiation where a client may or may not support certain character sets, such as unicode (utf-8.)  This returns all of the "acceptable" charsets specified in this request's `Accept-Charset` header (see [RFC-2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.2).)



### Example

```js
req.acceptedCharsets;
// -> ['utf-8', 'utf-16']
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.












<docmeta name="uniqueID" value="reqacceptedCharsets230309">
<docmeta name="displayName" value="req.acceptedCharsets">

