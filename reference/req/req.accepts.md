# req.accepts()

Checks whether this request's stated list of "accepted" [media types](http://www.iana.org/assignments/media-types/media-types.xhtml) includes the specified `type`. Returns true or false.


### Usage
```javascript
req.accepts(type);
```

### Example

```javascript
req.accepts('application/json');
// -> true
req.accepts('json');
// -> true
```

### Notes
> + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.



<docmeta name="uniqueID" value="reqaccepts89101">
<docmeta name="displayName" value="req.accepts()">

