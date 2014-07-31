# socket.get()

Sends a virtual GET request to a Sails server using Socket.io.


### Usage

```js
io.socket.get(url, data, function (data, jwres){
  // ...
});
```

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | `data`     | ((*))        | Optional request data- if provided, will be URL encoded and appended to `url` (existing query string params in url will be preserved)
| 3 | `callback` | ((function)) | Optional callback- if provided, will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `resData` | ((*))        | Data received in the response from the Sails server (=== `jwres.body`, equivalent to the HTTP response body.)
| 2 | `jwres`   | ((JWR))      | The [JSON WebSocket Response](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.get('/users/9', function (resData) {
  resData; // => {id:9, name: 'Timmy Mendez'}
});
</script>
```


<docmeta name="uniqueID" value="socketget480208">
<docmeta name="displayName" value="io.socket.get()">

