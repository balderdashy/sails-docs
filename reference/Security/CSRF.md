# CSRF

Cross-site request forgery ([CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)) is a type of attack which forces an end user to execute unwanted actions on a web application backend with which he/she is currently authenticated.  In other words, without protection, cookies stored in a browser like Google Chrome can be used to send requests to Chase.com from a user's computer whether that user is currently visiting Chase.com or Horrible-Hacker-Site.com.

> Note:
>
> CSRF attacks need only be a concern in scenarios where people use the _same client application_ to send requests to multiple different web services - most notably the browser.  If your Sails application does not respond to requests from a browser client, you may not need to enable CSRF protection.


### CSRF Tokens

Like most Node applications, Sails and Express are compatibile with Connect's [CSRF protection middleware](http://www.senchalabs.org/connect/csrf.html) for guarding against such attacks.  This middleware implements the [Synchronizer Token Pattern](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#General_Recommendation:_Synchronizer_Token_Pattern).  When CSRF protection is enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified by either a header or a parameter in the query string or HTTP body.

CSRF tokens are temporary and session-specific; e.g. Imagine Mary and Muhammad are both shoppers accessing our e-commerce site running on Sails, and CSRF protection is enabled.  Let's say that on Monday, Mary and Muhammad both make purchases.  In order to do so, our site needed to dispense at least two different CSRF tokens- one for Mary and one for Muhammad.  From then on, if our web backend received a request with a missing or incorrect token, that request will be rejected. So now we can rest assured that when Mary navigates away to play online poker, the 3rd party website cannot trick the browser into sending malicious requests to our site using her cookies.


### Enabling CSRF Protection

Sails bundles optional CSRF protection out of the box.  You can enable the built-in protection in your app's [`config/csrf.js`]() file:

```js
csrf: true
```
See [sails.config.csrf](/#/documentation/reference/Configuration/CSRF.html) for more information.


### Accessing and Using the CSRF Token

Once you've enabled CSRF protection, any POST, PUT, or DELETE requests (**including** virtual requests, e.g. from Socket.io) made to your Sails app will need to send an accompanying CSRF token as a header or parameter.  Otherwise, they'll be rejected with a 403 (Forbidden) response.

For example, if you're sending an AJAX request from a webpage with jQuery:
```js
$.post('/checkout', {
  order: '8abfe13491afe',
  electronicReceiptOK: true,
  _csrf: 'USER_CSRF_TOKEN'
}, function andThen(){ ... });
```

See the docs on [CSRF configuration](/#/documentation/reference/Configuration/CSRF.html) for examples of accessing the CSRF token within both a traditional multi-page web application and a single-page-application.



<docmeta name="uniqueID" value="CSRF300312">
<docmeta name="displayName" value="CSRF">

