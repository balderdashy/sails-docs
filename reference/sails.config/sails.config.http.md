# sails.config.http

Configuration for your app's underlying HTTP server.  These properties are conventionally specified in the [`config/http.js`](/#/documentation/anatomy/myApp/config/http.js.html) configuration file.


### Properties

  Property          | Type       | Default   | Details
 ------------------ |:----------:| --------- | -------
 `middleware`       | ((object)) | See [conventional defaults for HTTP middleware](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=conventional-defaults) | A configuration object of all HTTP middleware functions your app will run on every incoming HTTP request.  All [Express](https://github.com/expressjs/) or Connect middleware is supported.<br/>[Example](https://gist.github.com/mikermcneil/9cbd68c95839da480e97)
 `middleware.order` | ((array))  | See [conventional defaults for HTTP middleware order](https://github.com/balderdashy/sails/blob/master/lib/hooks/http/index.js#l51-66) | The order in which middleware should be run for HTTP request (the Sails router, which runs the appropriate explicit routes, policies, controllers, etc. from your app is invoked by the "router" middleware).
 `cache`            | ((number)) | `cache: 31557600000` | The number of seconds to cache flat files on disk being served by Express static middleware (by default, these files are in `.tmp/public`)<br/>The HTTP static cache is only active in a 'production' environment (default 1 year), since that's the only time Express will cache flat-files.
 `serverOptions`    | ((object)) | TODO      | TODO



### Notes

> + Note that this HTTP middleware stack configured in `sails.config.http.middleware` is only applied to true HTTP requests-- it is ignored when handling virtual requests (e.g. sockets)
>
> + You cannot define a custom middleware function with the key `order` (since `sails.config.http.middleware.order` has special meaning)



<docmeta name="uniqueID" value="sailsconfighttp178274">
<docmeta name="displayName" value="sails.config.http">






<!--
# Express
### What is this?
If you want to use custom middleware or add local variables and helpers to templates you can do so by configuring express in this config file.

### Description


This configuration file lets you easily add [Express](https://github.com/expressjs/) middleware, local variables and helpers for templates and directly access the application instance before it starts.

 -->








