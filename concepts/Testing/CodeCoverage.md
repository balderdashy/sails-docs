## Code coverage

Another popular method for testing your code is [Code Coverage](http://en.wikipedia.org/wiki/Code_coverage).

You can use [mocha](http://mochajs.org/) and [istanbul](https://github.com/gotwarlost/istanbul) to check your code and prepare various coverage reports (HTML, Cobertura) which can be used in continuous integration services such as [Jenkins](http://jenkins-ci.org).

To test your code and prepare a simple HTML report run the following commands:
```bash
istanbul cover _mocha -- test/bootstrap.test.js test/**/*.js
istanbul report html
```

<docmeta name="displayName" value="Code Coverage">
