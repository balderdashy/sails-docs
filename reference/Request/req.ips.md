# req.ips
If "trust proxy" is enabled, this variable contains the IP addresses in this request's "X-Forwarded-For" header as an array of the IP address strings. Otherwise an empty array is returned.

### Usage
```js
req.ips;
```

### Example
If a request contains a header: "X-Forwarded-For: client, proxy1, proxy2":

```js
req.ips;
// -> ["client", "proxy1", "proxy2"]`

// ("proxy2" is the furthest "down-stream" IP address)
```









<docmeta name="uniqueID" value="reqips78262">
<docmeta name="displayName" value="req.ips">

