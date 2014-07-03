# HTTP Strict Transport Security


### Supporting P3P with Sails

But all that aside, sometimes you just have to support P3P anyways.

Fortunately, a few different modules exist that bring P3P support to Express and Sails by enabling the relevant P3P headers.  To use one of these modules for handling P3P headers, install it from npm using the directions below, then open `config/http.js` in your project and configure it as a custom middleware.  To do that, define your P3P middleware as "p3p", and add the string "p3p" to your `middleware.order` array wherever you'd like it to run in the middleware chain (a good place to put it might be right before `cookieParser`):

E.g. in `config/http.js`:

```js
// .....
module.exports.http = {

  middleware: {
  
    p3p: require('p3p')(p3p.recommmended), // <==== set up the custom middleware here and named it "p3p"

    order: [
      'startRequestTimer',
      'p3p', // <============ configured the order of our "p3p" custom middleware here
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


Check out the examples below for more guidance - and be sure and follow the links to see the docs for the module you're using for the latest information, comparative analysis of its features, any recent bug fixes, and advanced usage details.


##### Using [node-p3p](https://github.com/troygoode/node-p3p)

> `node-p3p` is open-source under the [MIT license](https://github.com/troygoode/node-p3p/blob/master/LICENSE).

```sh
# In your sails app
npm install p3p --save
```

Then in the `middleware` config object in `config/http.js`:

```js
  // ...
  // node-p3p provides a recommended compact privacy policy out of the box
  p3p: require('p3p')(require('p3p').recommended)
  // ...
```


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
+ [HTTP Strict Transport Security (OWasp)](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
