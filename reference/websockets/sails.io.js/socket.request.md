# io.socket.request()

Sends a virtual request to a Sails server using Socket.io.

This function is very similar to [`.get()`](), [`io.socket.post()`](), etc. except that it provides lower-level access to the request headers, parameters, method, and URL of the request.

### Usage

Using the automatically-created [`io.socket`] instance:

```js
io.socket.request(options, function (data, jwr)){
  // ...
  // jwr.headers
  // jwr.statusCode
  // jwr.body === data
  // ...
});
```


### Example

```javascript
io.socket.request({
  method: 'get',
  url: '/user/3/friends',
  headers: {
    'x-csrf-token': 'ji4brixbiub3'
  }
})
```



<docmeta name="displayName" value="io.socket.request()">

