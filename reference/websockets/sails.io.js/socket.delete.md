# io.socket.delete()

Send a virtual DELETE request to a Sails server using Socket.io.

```js
io.socket.delete(url, data, function (data, jwres){
  // ...
});
```


### Usage

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | `data`     | ((json?))    | Optional request data- if provided, will be URL encoded and appended to `url` (existing query string params in url will be preserved)
| 3 | _`callback`_ | ((function?)) | Optional callback- if provided, will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `resData` | ((*))        | Data received in the response from the Sails server (=== `jwres.body`, equivalent to the HTTP response body.)
| 2 | `jwres`   | ((JWR))      | The [JSON WebSocket Response](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.delete('/users/9', function (resData) {
  resData; // => {id:9, name: 'Timmy Mendez', occupation: 'psychic'}
});
</script>
```


### Notes
> + Need to customize request headers?  Check out the slightly lower-level [`io.socket.request()`](http://sailsjs.org/documentation/reference/web-sockets/socket-client/io-socket-request) method, or to set custom headers for _all_ outgoing requests, check out [`io.sails.headers`](http://next.sailsjs.org/documentation/reference/web-sockets/socket-client/io-sails).


<docmeta name="displayName" value="io.socket.delete()">

