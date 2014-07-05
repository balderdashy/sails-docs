# req.accepted

Contains an array of the "media types" this request (`req`) can accept (e.g. `text/html` or `application/json`), ordered from highest to lowest quality.

### Usage
```javascript
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




<docmeta name="uniqueID" value="reqaccepted334477">
<docmeta name="displayName" value="req.accepted">

