### Usage
```js
req.headers;
```
### Details
Often we want to check the headers of the current request, so this can be done easily in the sails.

### Example
```javascript
{ host: 'localhost:1337',
  connection: 'keep-alive',
  'cache-control': 'no-cache',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
  accept: '*/*',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'en-US,en;q=0.8,hi;q=0.6',
  cookie: 'sdfkslddklfk; sails.sid=s%3skdlfjkj1231lsdfnsc,m' }
  ```
  
  And if you want to access any custom or pre-defined header, you only need to access it like a hash.
  
### Accessing a header
  ```javascript
  console.log(req.headers['custom-header']
  ```
