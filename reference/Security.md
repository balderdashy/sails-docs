# Security

### Overview

Sails and Express provide built-in, easily configurable protection against most known types of web-application-level attacks.

# DDOS

The prevention of [denial of service attacks](https://www.owasp.org/index.php/Application_Denial_of_Service) is a [complex problem](http://en.wikipedia.org/wiki/Denial-of-service_attack#Handling) which involves multiple layers of protection, up and down the networking stack.
This type of attack has achieved [notoriety](http://www.darkreading.com/vulnerabilities-and-threats/10-strategies-to-fight-anonymous-ddos-attacks/d/d-id/1102699) in recent years due to widespread media coverage of groups like Anonymous.

At the API layer, there isn't much that can be done in the way of prevention.  However, Sails offers a few settings to mitigate certain types of DDOS attacks:

+ The session in Sails can be [configured]() to use a separate session store (e.g. [Redis](http://redis.io/)), allowing your application to run without relying on the memory state of any one API server.  This means that multiple copies of your Sails app may be deployed to as many servers as is necessary to handle traffic.  This is achieved by using a [load balancer](), which directs each incoming request to a free server with the resources to handle it, eliminating any one app server as a single point of failure.
+ Socket.io connections may be [configured]() to use a separate [socket store]() (e.g. Redis) for managing pub/sub state and message queueing. This eliminates the need for sticky sessions at the load balancer, preventing would-be attackers from directing their attacks against the same server again and again.

# CSRF

Cross-site request forgery ([CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)) is a type of attack which forces an end user to execute unwanted actions on a web application in which he/she is currently authenticated.

Like most Node applications, Sails and Express use Connect's [CSRF protection middleware](http://www.senchalabs.org/connect/csrf.html) for guarding against such attacks.  This middleware implements the [Synchronizer Token Pattern](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#General_Recommendation:_Synchronizer_Token_Pattern).  When CSRF protection is enabled, all non-GET requests to the Sails server must be accompanied by a special token, identified by either a header or a parameter in the query string or HTTP body.

You can prepare your Sails app against CSRF attacks by enabling the built-in protection in [`config/csrf.js`]() and ensuring that a `_csrf` token is sent with all relevant incoming requests.

#### Notes
+ CSRF prevention is only a concern in scenarios where people use the same client application to send requests to multiple web services (e.g. cookies in a browser like Google Chrome can be used to send requests to Chase.com from both Chase.com and Horrible-Hacker-Site.com.)

# Socket Hijacking

Unfortunately, cross-site request forgery attacks are not limited to the HTTP protocol.  WebSocket hijacking (sometimes known as [CSWSH](http://www.christian-schneider.net/CrossSiteWebSocketHijacking.html)) is a commonly overlooked vulnerability in most realtime applications.  Fortunately, since Sails treats both HTTP and WebSocket requests as first-class citizens, its built-in [CSRF protection]() and [configurable CORS rulesets]() apply to both protocols.

You can prepare your Sails app against CSWSH attacks by enabling the built-in protection in [`config/csrf.js`]() and ensuring that a `_csrf` token is sent with all relevant incoming socket requests.  Additionally, if you're planning on allowing sockets to connect to your Sails app cross-origin (i.e. from a different domain, subdomain, or port) you'll want to configure your CORS settings accordingly.  You can also define the `authorization` setting in [`config/sockets.js`]() as a custom function which allows or denies the initial socket connection based on your needs.

#### Notes
+ CSWSH prevention is only a concern in scenarios where people use the same client application to connect sockets to multiple web services (e.g. cookies in a browser like Google Chrome can be used to connect a socket to Chase.com from both Chase.com and Horrible-Hacker-Site.com.)




# Content Security Policy

> TODO: flesh this section out
> https://www.owasp.org/index.php/Content_Security_Policy

stuff
stuff
stuff





# Clickjacking

> TODO: flesh this section out
> https://www.owasp.org/index.php/Clickjacking

stuff
stuff
stuff




# P3P

> TODO: flesh this section out
> http://support.microsoft.com/kb/290333


stuff
stuff
stuff

