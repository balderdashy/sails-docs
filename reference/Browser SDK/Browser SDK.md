# Browser SDK
### Overview
Not only does Sails have Socket.IO built right into the framework, it also adds a few extra methods that makes using Socket.io with Sails very powerful.  The file '/assets/js/sails.io.js' is where those methods can be found.

They basically allow you to emit custom socket.io messages that when interpreted by Sails, mimic Express HTTP request. This means you can use `socket.post('/user/')` in your client side javascript to effectively create an HTTP Post Request.  Check out the methods and their examples below.


<docmeta name="uniqueID" value="BrowserSDK293544">
<docmeta name="displayName" value="Browser SDK">

