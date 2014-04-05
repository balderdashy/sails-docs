# Security

### Overview



# Attack Vectors

### Overview

Sails and Express provide built-in, easily configurable protection against most known types of web-application-level attacks.

### DDOS

The prevention of [denial of service attacks](https://www.owasp.org/index.php/Application_Denial_of_Service) is a [complex problem](http://en.wikipedia.org/wiki/Denial-of-service_attack#Handling) which involves multiple layers of protection, up and down the networking stack.
This type of attack has achieved [notoriety](http://www.darkreading.com/vulnerabilities-and-threats/10-strategies-to-fight-anonymous-ddos-attacks/d/d-id/1102699) in the last decade thanks to wide media coverage of politically/philosophically-charged attacks by groups like Anonymous.

At the application layer, there isn't much that can be done in the way of prevention.  However, Sails offers a few settings to mitigate certain types of DDOS attacks:

+ The session in Sails can be [configured]() to use a separate session store (e.g. [Redis](http://redis.io/).)  This prevents your application from relying on the memory state of any one app server, which means that multiple copies of your Sails app can be deployed to as many servers as is necessary to handle traffic.  This is achieved by using a [load balancer](), which directs each incoming request to a server with the resources to handle it, eliminating any one app server as a single point of failure.
+ Socket.io connections can be [configured]() to use a separate [socket store]() (e.g. Redis) for managing pub/sub state and message queueing. This eliminates the need for sticky sessions at the load balancer, which prevents would-be attacks from hitting the same server again and again.

### CSRF

Cross-site request forgery ([CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)) is a type of attack which forces an end user to execute unwanted actions on a web application in which he/she is currently authenticated.

Sails and Express use Connect's [CSRF protection middleware](http://www.senchalabs.org/connect/csrf.html) for guarding against attacks.

#### Notes
+ CSRF prevention is only a concern in scenarios where people use the same client application to send requests to multiple applications (e.g. a browser like Google Chrome can be used to access both Chase.com and Horrible-Hacker-Site.com.)

### Content Security Policy

> TODO: flesh this section out
> https://www.owasp.org/index.php/Content_Security_Policy

### Clickjacking

> TODO: flesh this section out
> https://www.owasp.org/index.php/Clickjacking

### P3P

> TODO: flesh this section out
> http://support.microsoft.com/kb/290333

