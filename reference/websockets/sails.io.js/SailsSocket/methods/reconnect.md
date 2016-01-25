# .reconnect()

Reconnect a SailsSocket instance to a server after being disconnected (either involuntarily or via a call to [`.disconnect()`]()).

### Usage

Using the automatically-created [`io.socket`] instance:

```js
io.socket.reconnect();
```

> * This method will throw an error if the instance is already connected to a server.
> * While an instance is in a disconnected state, all of its properties may be changed.  This allows you to disconnect an instance from one server and reconnect it to another without losing its event bindings or queued requests.

<docmeta name="displayName" value=".reconnect()">

