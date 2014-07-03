# HTTP Strict Transport Security


### Enabling STS

<!-- TODO: more STS-specific stuff should go here -->


<!--
This is a generic paragraph that is probably the same between multiple documentation files.
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


##### Installing custom middleware

<!--
TODO:
Pull out this `Installing custom middleware` section into a separate place and link to it instead of including it here.
Otherwise we'll end up w/ like 1000 copies of this thing!
-->

To do that, define a key to `http.middleware` and set it to the configured middleware function, then add the string name to your `http.middleware.order` array wherever you'd like it to run in the middleware chain (a good place to put it might be right before "cookieParser"):

E.g. in `config/http.js`:

```js
// .....
module.exports.http = {

  middleware: {
  
    strictTransportSecurity: ..., // <==== set up the custom middleware here (see examples below for what to put in the `...`

    order: [
      'startRequestTimer',
      'strictTransportSecurity',  // <==== configured the order of our custom middleware here
      'cookieParser',
      'session',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
    // .....
  }
};
```




### Additional Resources
+ [HTTP Strict Transport Security (OWasp)](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
