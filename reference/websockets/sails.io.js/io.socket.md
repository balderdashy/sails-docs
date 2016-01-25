# `io.socket`

### Overview

When used in the browser, `sails.io.js` will create a global instance of the [SailsSocket]() class as soon as it loads, and attempt to connect it to the server after waiting one event loop cycle (to allow for configuration options to be changed).  As with any [SailsSocket](), you can start using its properties and methods even before it connects to the server--any requests or event bindings will be queued up and replayed once the connection is established.

### Configuration Options

Like any [SailsSocket]() instance, `io.socket` is affected by the global [`io.sails`]() settings.  The `sails.io.js` library waits for one event loop cycle before attempting to connect `io.socket` to the server, giving you a chance to change any settings first.

##### Example

Changing the server that `io.socket` connects to

```html
<script type"text/javascript" src="/js/dependencies/sails.io.js"></script>
<script type"text/javascript">
io.sails.url = "http://somesailsapp.com";
</script>
```

### Methods and properties

See the [SailsSocket methods reference] for a full list of methods and properties available on `io.socket`.
