# socket.put()

Sends a virtual PUT request to a Sails server using Socket.io.


### Usage

```js
io.socket.put(url, [data], function (data, jwres){
  // ...
});
```

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | The destination URL path, e.g. "/checkout".
| 2 | `data`     | ((*))        | Optional request data- if provided, will be JSON-encoded and included as the virtual HTTP body
| 3 | `callback` | ((Function)) | Optional callback- if provided, will be called when the server responds.

##### Callback

|   | Argument  | Type         | Details |
|---|-----------|:------------:|---------|
| 1 | `data`    | ((*))        | Data received in the response from the Sails server (=== `jwres.body` === the body of an HTTP response.)
| 2 | `jwres`   | ((JWR))      | The [JSON WebSocket Response]() object.  Has `headers`, a `body`, and a `statusCode`.


### Example

```html
<script>
io.socket.put('/users/9', { occupation: 'psychic' }, function (data) {
  data; // => {id:9, name: 'Timmy Mendez', occupation: 'psychic'}
});
</script>
```



<docmeta name="uniqueID" value="socketput168503">
<docmeta name="displayName" value="io.socket.put()">

