# Socket Client (`sails.io.js`)

> This section of the docs is about the Sails socket client SDK for the browser.  It is written in JavaScript and is also usable on the server.
>
> There are also a handful of community projects implementing Sails/Socket.io clients for native iOS, Android, and Windows Phone.


### Overview

The Sails socket client ([`sails.io.js`](https://github.com/balderdashy/sails.io.js)) is a tiny browser library that is bundled by default in new Sails apps.  It is a lightweight wrapper that sits on top of the Socket.IO client whose purpose is to make sending and receiving messages from your Sails backend as simple as possible.

The main responsibility of `sails.io.js` is to provide a familiar ajax-like interface for communicating with your Sails app using WebSockets/Socket.io.  That basically means providing `.get()`, `.post()`, `.put()`, and `.delete()` methods that let you take advantage of realtime features while still reusing the same backend routes you're using for the rest of your app.  In other words, running `io.socket.post('/user')` in your browser will be routed within your Sails app exactly the same as an HTTP POST request to the same route.


### Can I use this with...

Yes.  The Sails socket client can be used to great effect with any front-end framework-- no matter whether it's angular, backbone, ember, knockout, etc.


### Do I have to use this?

No. The Sails socket client is extremely helpful when building realtime/chat features in a browser-based UI, but like the rest of the `assets/` directory, it is probably not particularly useful if you are building a native Android app, or an API with no user interface.

Fortunately, like every other boilerplate file and folder in Sails, the socket client is completely optional. To remove it, just delete `assets/js/depencencies/sails.io.js`.

<!--

  TODO: add a bit more of a technical description in here at some point

Under the covers, sails.io.js emits Socket.io messages with reserved names that, when interpreted by Sails, are routed to the appropriate policies/controllers/etc. according to your app's routes and blueprint configuration.
-->




<docmeta name="uniqueID" value="BrowserSDK293544">
<docmeta name="displayName" value="Socket Client">
<docmeta name="stabilityIndex" value="3">

