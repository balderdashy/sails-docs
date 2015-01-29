# io.socket.request()

Sends a virtual request to a Sails server using Socket.io.

This function is very similar to `io.socket.get()`, `io.socket.post()`, etc. except that it provides lower-level access to the request headers, parameters, method, and URL of the request.

> This function is provided by the `sails.io.js` JavaScript client, and is accessible in the **browser**.


### Usage

```js
io.socket.request(url, reqData, function (resData, jwr)){
  // ...
  // jwr.headers
  // jwr.statusCode
  // jwr.body === data
  // ...
}, method);
```


### Example

```javascript
io.socket.request('/user/3/friends', {"friends":"4"}, function (resData, jwr)){
  // ...
  // jwr.headers
  // jwr.statusCode
  // jwr.body === data
  // ...
}, 'post');
```

```js
io.socket._request(options, function (data, jwr)){
  // ...
  // jwr.headers
  // jwr.statusCode
  // jwr.body === data
  // ...
});
```


### Example

```javascript
io.socket._request({
  method: 'get',
  url: '/user/3/friends',
  data: {},
  headers: {}
})
```


<docmeta name="uniqueID" value="socketrequest682488">
<docmeta name="displayName" value="io.socket.request()">

