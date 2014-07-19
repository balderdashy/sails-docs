# Request (`req`)

### Overview

Sails is built on [Express](), and uses [Node's HTTP server]() conventions.  Because of this, you can access all of the Node and Express methods and properties on the `req` object whereever it is accessible (i.e. in your controllers, policies, and custom responses.)

A nice side effect of this compatibility is that, in many cases, you can paste existing Node.js code into a Sails app and it will work.  And since Sails implements a transport-agnostic request interpreter, the code in your Sails app is WebSocket-compatible as well.

Sails adds a few methods and properties of its own to the `req` object, like [`req.wantsJSON`]() and [`req.params.all()`]().  These features are syntactic sugar on top of the underlying implementation, and also support both HTTP and WebSockets.

The [Features](./features) overview at [www.sailsjs.org](http://www.sailsjs.org) includes a chart summarizes which methods and properties are available for each transport.


<docmeta name="uniqueID" value="req35837">
<docmeta name="displayName" value="Request (`req`)">
<docmeta name="stabilityIndex" value="3">

