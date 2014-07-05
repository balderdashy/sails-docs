# req.protocol
The protocol used to send this request (`req`).

### Usage
```javascript
req.protocol;
```

### Example

```js
switch (req.protocol) {
  case 'http':
    // this is an HTTP request
    break;
  case 'https':
    // this is a secure HTTPS request
    break;
}
```



<docmeta name="uniqueID" value="reqprotocol732076">
<docmeta name="displayName" value="req.protocol">

