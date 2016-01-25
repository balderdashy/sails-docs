# .isConnected()

Determined whether the SailsSocket instance is currently connected to a server


### Usage

Using the automatically-created [`io.socket`] instance:

```js
var connected = io.socket.isConnected();
```

#### Returns

**Type:** ((boolean))

`true` if the instance is currently connected to a server, otherwise `false`.

> Many SailsSocket properties like `url` and `transports` cannot be changed while the instance is connected to a server.


<docmeta name="displayName" value=".isConnected()">

