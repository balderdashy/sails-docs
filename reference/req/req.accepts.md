# req.accepts()

Checks whether this request's stated list of "accepted" [media types](http://www.iana.org/assignments/media-types/media-types.xhtml) includes the specified `type`. Returns true or false.


### Usage
```usage
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
> + See the [`accepts` package](https://www.npmjs.com/package/accepts) for the finer details of the header parsing algorithm used in Sails/Express.


<docmeta name="displayName" value="req.accepts()">
<docmeta name="pageType" value="method">

<!--
  # req.accepted

  Contains an array of the "media types" this request (`req`) can accept (e.g. `text/html` or `application/json`), ordered from highest to lowest quality.

  ### Usage
  ```usage
  req.accepted;
  ```

  ### Example

  ```javascript
  req.accepted;

  /*
    [ { value: 'application/json',
        quality: 1,
        type: 'application',
        subtype: 'json' },
    { value: 'text/html',
         quality: 0.5,
         type: 'text',
         subtype: 'html' } ]
  */
  ```

  ### Notes
  > + See the [`accepts` module](https://github.com/expressjs/accepts) for the finer details of the header parsing algorithm used in Sails/Express/Koa/Connect.





  <docmeta name="displayName" value="req.accepted">
  <docmeta name="pageType" value="property">
 -->
