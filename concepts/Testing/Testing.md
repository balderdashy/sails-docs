# Testing your code

There are many options for testing JavaScript code.  With Sails and Node.js, you can use just about any of them.

As an example, we'll take a look below at one particular way you might go about testing with [mocha](http://mochajs.org/).

> ### About testing in Sails
>
> The rest of this page of the documentation is a collaborative tutorial contributed by many different members of the Sails community.  It is a good starting point and example, please bear in mind it has not been thoroughly vetted by the Sails core team.  **There is no "official" strategy for testing in Sails.  The Sails framework is completely impartial towards how you write your tests.**  The folder structure for your test suites, the NPM packages you use, and your strategy for lifting and lowering Sails are all completely up to you.


## Example: Testing with Mocha

Before you start building your test cases, start by organizing your `test/` directory structure, for example in the following way:

```batch
./myApp
├── api/
├── assets/
├── ...
├── test/
│  ├── integration/
│  │  ├── controllers/
│  │  │  └── UserController.test.js
│  │  ├── models/
│  │  │  └── User.test.js
│  │  └── ...
│  ├── fixtures/
|  ├── ...
│  ├── bootstrap.test.js
│  └── mocha.opts
└── views/

```

### bootstrap.test.js

This file is useful when you want to execute some code before and after running your tests(e.g. lifting and lowering your sails application). Since your models are converted to waterline collections on lift, it is necessary to lift your sailsApp before trying to test them (This applies similarly to controllers and other parts of your app, so be sure to call this file first).

```javascript
var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    // configuration for testing purposes
  }, function(err) {
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

In addition to command-line arguments, the `mocha.opts` file can be used for specifying [custom mocha configuration](https://mochajs.org/#mochaopts).

There is one option that is worth paying a bit of extra attention to.  The default **timeout** in Mocha is 2 seconds.  This works fine for most scenarios, but depending on how often you have your tests lifting and lowering Sails, you may need to increase the timeout value in mocha.opts to make sure Sails lifts and lowers in time to complete each test suite:

```bash
--timeout 10s
```

> **Note**: If you are writing your tests in a transpiled language such as CoffeeScript (`.coffee` files instead of `.js` files), be sure to configure Mocha accordingly.  For example, you might add these lines to your `mocha.opts`:
>
> ```bash
> --require coffee-script/register
> --compilers coffee:coffee-script/register
> ```


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

To avoid typing the mocha command, like stated before (specially when calling bootstrap.test.js) and using `npm test` instead, you can modify your package.json. On the `scripts` dictionary, add a `test` key and type this as its value `mocha test/bootstrap.test.js test/integration/**/*.test.js` like this:

```js
  // package.json
  "scripts": {
    "start": "node app.js",
    "debug": "node debug app.js",
    "test": "node ./node_modules/mocha/bin/mocha test/bootstrap.test.js test/integration/**/*.test.js"
  }
```
The `*` is a wildcard used to match any file inside the `integration/` folder that ends in `.test.js` so if it suits you, you can perfectly modify it to search for `*.spec.js` instead. In the same way you can use wildcards for your folders by using two `*` instead of one.


<docmeta name="displayName" value="Testing">
