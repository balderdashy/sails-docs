# socket.delete()

Sends a virtual DELETE request to a Sails server using Socket.io.


### Usage

```js
io.socket.delete(url, [data], function (data, jwres){
  // ...
});
```

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | `data`     | ((*))        | Optional request data- if provided, will be URL encoded and appended to `url` (existing query string params in url will be preserved)
| 3 | `callback` | ((Function)) | Optional callback- if provided, will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `data`    | ((*))        | Data received in the response from the Sails server (=== `jwres.body` === the body of an HTTP response.)
| 2 | `jwres`   | ((JWR))      | The [JSON WebSocket Response]() object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.delete('/users/9', function (data) {
  data; // => {id:9, name: 'Timmy Mendez', occupation: 'psychic'}
});
</script>
```



<docmeta name="uniqueID" value="socketdelete671580">
<docmeta name="displayName" value="io.socket.delete()">

