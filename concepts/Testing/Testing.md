# Testing your code

## Preparation

For our test suite, we use [mocha](http://mochajs.org/).
Before you start building your test cases, you should first organise your `test/` directory structure, for example in the following way:
```batch
./myApp
├── api
├── assets
├── ...
├── test
│  ├── integration
│  │  ├── controllers
│  │  │  └── UserController.test.js
│  │  ├── models
│  │  │  └── User.test.js
│  │  └── ...
│  ├── fixtures
│  ├── ...
│  ├── bootstrap.test.js
│  └── mocha.opts
└── views

```

### bootstrap.test.js

This file is useful when you want to execute some code before and after running your tests(e.g. lifting and lowering your sails application). Since your models are converted to waterline collections on lift, it is necessary to lift your sailsApp before trying to test them (This applies similarly to controllers and other parts of your app, so be sure to call this file first).

```javascript
var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
```

### mocha.opts

This file should contain mocha configuration as described here: [mocha.opts](http://mochajs.org/#mocha-opts)

**Note**: If you are writing your test in CoffeeScript be sure to add these lines to your `mocha.opts`.
```
--require coffee-script/register
--compilers coffee:coffee-script/register
```
**Note**: The default test-case timeout in Mocha is 2 seconds. Increase the timeout value in mocha.opts to make sure the sails lifting completes before any of the test-cases can be started. For example:
```
--timeout 5s
```

## Writing tests

Once you have prepared your directory you can start writing your integration tests.

./test/integration/models/User.test.js
```js
describe('UserModel', function() {

  describe('#find()', function() {
    it('should check find function', function (done) {
      User.find()
      .then(function(results) {
        // some tests
        done();
      })
      .catch(done);
    });
  });

});
```

#### Testing controllers

To test controller responses you can use [Supertest](https://github.com/visionmedia/supertest) library which provides several useful methods for testing HTTP requests.

./test/integration/controllers/UserController.test.js
```js
var request = require('supertest');

describe('UserController', function() {

  describe('#login()', function() {
    it('should redirect to /mypage', function (done) {
      request(sails.hooks.http.app)
        .post('/users/login')
        .send({ name: 'test', password: 'test' })
        .expect(302)
        .expect('location','/mypage', done);
    });
  });

});
```
## Running tests

In order to run your test using mocha, you'll have to use `mocha` in the command line and then pass as arguments any test you want to run, be sure to call bootstrap.test.js before the rest of your tests like this `mocha test/bootstrap.test.js test/integration/**/*.test.js`

#### Using `npm test` to run your test

To avoid typing the mocha command, like stated before (specially when calling bootstrap.test.js) and using `npm test` instead, you'll need to modify your package.json. On the scripts obj, add a `test` key and type this as its value `mocha test/bootstrap.test.js test/integration/**/*.test.js` like this:

```js
 // package.json
 scripts": {
    "start": "node app.js",
    "debug": "node debug app.js",
    "test": "mocha test/bootstrap.test.js test/integration/**/*.test.js"
  },
 // More config
```
The `*` is a wildcard used to match any file inside the `integration/` folder that ends in `.test.js` so if it suits you, you can perfectly modify it to search for `*.spec.js` instead. In the same way you can use wildcards for your folders by using two `*` instead of one.


<docmeta name="displayName" value="Testing">
