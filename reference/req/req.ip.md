# req.ip
### Purpose
The IP address of the client who sent this request (`req`).

If the `trust proxy` option is disabled, this is the "remote address".  Otherwise, if `trust proxy` is enabled, this is the "upstream address".


### Usage
```javascript
req.ip;
```

### Example
```javascript
req.ip;
// -> "127.0.0.1"
```


<docmeta name="uniqueID" value="reqip681943">
<docmeta name="displayName" value="req.ip">

