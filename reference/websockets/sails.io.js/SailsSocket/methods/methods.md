# SailsSocket Methods

This section describes the methods available on each SailsSocket instance.  Most of these methods can be called even before the socket connects to the server.  In the case of request methods like `.get()` and `.request()`, calls will be queued up until the socket connects, at which time they will be replayed in order.

<docmeta name="displayName" value="Methods">

