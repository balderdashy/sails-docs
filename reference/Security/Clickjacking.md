# Clickjacking


[Clickjacking](https://www.owasp.org/index.php/Clickjacking) (aka "UI redress attacks") are where an attacker manages to trick your users into triggering "unintended" UI events (e.g. DOM events.)

<!--
This is a generic paragraph that is probably the same between multiple documentation files:
-->
A few different open-source modules exist that bring support for this feature to Express and Sails.  To use one of these modules, install it from npm using the directions below, then open `config/http.js` in your project and [configure it as a custom middleware]().  The example(s) below cover basic usage and configuration.  For more guidance and advanced usage details, be sure and follow the link to the docs.


##### Using [lusca](https://github.com/krakenjs/lusca#luscahstsoptions)

> `lusca` is open-source under the [Apache license](https://github.com/krakenjs/lusca/blob/master/LICENSE.txt)

```sh
# In your sails app
npm install lusca --save
```

Then in the `middleware` config object in `config/http.js`:

```js
  // ...
  // maxAge ==> Number of seconds strict transport security will stay in effect.
  strictTransportSecurity: require('lusca').hsts({ maxAge: 31536000 })
  // ...
```



### Additional Resources
+ [Clickjacking (OWasp)](https://www.owasp.org/index.php/Clickjacking)



<docmeta name="uniqueID" value="Clickjacking879453">
<docmeta name="displayName" value="Clickjacking">
<docmeta name="tags" value="clickjacking,ui redress attack">
