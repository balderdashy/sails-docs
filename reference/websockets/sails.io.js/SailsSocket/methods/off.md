# .off()

Unbind the specified `eventIdentity` from the given handler (opposite of [`.on()`]())

### Usage

Using the automatically-created [`io.socket`] instance:

```js
io.socket.off(eventIdentity, callback);
```

|   | Argument   | Type         | Details |
|---|------------|:------------:|---------|
| 1 | `eventIdentity`      | ((string))   | The unique identity of a server-sent event, e.g. "recipe"
| 2 | `callback` | ((function)) | Function to unbind from the specified event.

> In order to use `.off()`, you will need to store the callback argument sent to [`.on()`]() in a variable.

<docmeta name="displayName" value=".off()">
