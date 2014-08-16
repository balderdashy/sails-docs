# Testing your code

## Preparation

For our test suite, we use [mocha](http://visionmedia.github.com/mocha/).
Before you start building your test cases, you should first prepare your `./test` directory, for example in the following way:
```batch
./myApp
├── api
├── assets
├── batch
├── config
├── node_modules
├── test
│  ├── unit
│  │  ├── controllers
│  │  │  └── UsersController.test.js
│  │  ├── models
│  │  │  └── Users.test.js
│  │  └── ...
│  ├── fixtures
│  ├── ...
│  ├── bootstrap.test.js
│  └── mocha.opts
└── views

```

### bootstrap.test.js

This file is useful when you want to execute some code before and after running your tests (e.g. lifting and lowering your sails application):

```javascript
var Sails = require('sails');

before(function(done) {
  Sails.lift({
    // configuration for testing purposes
  }, function(err, sails) {
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

This file should contain mocha configuration as described here: [mocha.opts] (http://visionmedia.github.io/mocha/#mocha.opts)

## Writing tests

Once you have prepared your directory you can start writing your unit tests.

./test/unit/models/Users.test.js
```js
describe.only('UsersModel', function() {

  describe('#find()', function() {
    it('should check find function', function (done) {
      Users.find().then(function(results) {
        // some tests
        done();
      }).fail(done);
    });
  });

});
```

#### Testing controllers

To test controller responses you can use [Supertest](https://github.com/visionmedia/supertest) library which provides several useful methods for testing HTTP requests.

./test/unit/controllers/UsersController.test.js
```js
var request = require('supertest');

describe.only('UsersController', function() {

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

## Code coverage

Another popular method for testing your code is [Code Coverage](http://en.wikipedia.org/wiki/Code_coverage).

You can use [mocha](http://visionmedia.github.io/mocha/) and [istanbul](https://github.com/gotwarlost/istanbul) to check your code and prepare various coverage reports (HTML, Cobertura) which can be used in continuous integration services such as [Jenkins](http://jenkins-ci.org).

To test your code and prepare a simple HTML report run the following commands:
```bash
istanbul cover -x "**/config/**" _mocha -- --timeout 5000
istanbul report html
```

<docmeta name="uniqueID" value="Testing765149">
<docmeta name="displayName" value="Testing">
