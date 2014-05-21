# CSRF

Cross-site request forgery ([CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)) is a type of attack which forces an end user to execute unwanted actions on a web application in which he/she is currently authenticated.

Like most Node applications, Sails and Express use Connect's [CSRF protection middleware](http://www.senchalabs.org/connect/csrf.html) for guarding against such attacks.  This middleware implements the [Synchronizer Token Pattern](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#General_Recommendation:_Synchronizer_Token_Pattern).  When CSRF protection is enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified by either a header or a parameter in the query string or HTTP body.

You can prepare your Sails app against CSRF attacks by enabling the built-in protection in [`config/csrf.js`]() and ensuring that a `_csrf` token is sent with all relevant incoming requests.

#### Notes
+ CSRF prevention is only a concern in scenarios where people use the same client application to send requests to multiple web services (e.g. cookies in a browser like Google Chrome can be used to send requests to Chase.com from both Chase.com and Horrible-Hacker-Site.com.)

<docmeta name="uniqueID" value="CSRF300312">
<docmeta name="displayName" value="CSRF">

