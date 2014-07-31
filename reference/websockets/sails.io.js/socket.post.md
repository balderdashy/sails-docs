# socket.post()

Sends a virtual POST request to a Sails server using Socket.io.


### Usage

```js
io.socket.post(url, data, function (data, jwres){
  // ...
});
```

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | `data`     | ((*))        | Optional request data- if provided, will be JSON-encoded and included as the virtual HTTP body
| 3 | `callback` | ((function)) | Optional callback- if provided, will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `resData` | ((*))        | Data received in the response from the Sails server (=== `jwres.body`, equivalent to the HTTP response body.)
| 2 | `jwres`   | ((JWR))      | The [JSON WebSocket Response](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.post('/users', { name: 'Timmy Mendez' }, function (resData) {
  resData; // => {id:9, name: 'Timmy Mendez'}
});
</script>
```


<docmeta name="uniqueID" value="socketpost175407">
<docmeta name="displayName" value="io.socket.post()">

