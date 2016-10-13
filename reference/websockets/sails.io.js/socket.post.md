# io.socket.post()

Send a socket request (virtual POST) to a Sails server using Socket.io.

```js
io.socket.post(url, data, function (resData, jwres){
  // ...
});
```

### Usage


|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | _`data`_     | ((json?))        | Optional request data- if provided, will be JSON-encoded and included as the virtual HTTP body.
| 3 | _`callback`_ | ((function?)) | Optional callback- if provided, will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `resData` | ((json))        | Data received in the response from the Sails server (=== `jwres.body`, and also equivalent to the HTTP response body.)
| 2 | `jwres`   | ((dictionary))      | A [JSON WebSocket Response](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.post('/users', { name: 'Timmy Mendez' }, function (resData, jwRes) {
  jwRes.statusCode; // => 200
});
</script>
```


### Notes
> + Remember that you can communicate with _any of your routes_ using socket requests.
> + Need to customize request headers?  Check out the slightly lower-level [`io.socket.request()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-request) method, or to set custom headers for _all_ outgoing requests, check out [`io.sails.headers`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails).


<docmeta name="displayName" value="io.socket.post()">
<docmeta name="pageType" value="method">

