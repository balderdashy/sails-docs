# req.ip
### Purpose
The IP address of the client who sent this request (`req`).

> **Note:**
>
> If the `trust proxy` option is disabled in Express, this is the "remote address". Otherwise, if `trust proxy` is enabled, this is the "upstream address".
> See Express docs for [app.set()](http://expressjs.com/api.html#app.set) - in Sails
> this can be accomplished by adding the line `sails.hooks.http.app.set('trust proxy', true);` to `config/bootstrap.js`.

### Usage
```javascript
req.ip;
```

### Example
```javascript
req.ip;
// -> "127.0.0.1"
```



<docmeta name="displayName" value="req.ip">
<docmeta name="pageType" value="property">
