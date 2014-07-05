# Response (`res`)


### Overview

Sails is built on [Express](), and uses [Node's HTTP server]() conventions.  Because of this, you can access all of the Node and Express methods and properties on the `res` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods of its own to the `res` object, like [`res.view()`]().  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.

The [Supported Features]() section includes a chart summarizes which methods and properties are available for each transport.




<docmeta name="uniqueID" value="res550242">
<docmeta name="displayName" value="Response (`res`)">

