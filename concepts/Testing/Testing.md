# コードをテストする

## 準備

テストスイートとして我々は[mocha](http://mochajs.org/)を採用しています。
テストケースを構築する前にまずは`./test`を構成する必要があります。例えばこのようになるでしょう:
```batch
./myApp
├── api
├── assets
├── ...
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

このテストファイルはテストコードの前後に何らかのコードを実行したい時に便利です。（例：Sailアプリケーションを立ち上げたり止めたりするなど。）. Since your models are converted to waterline collections on lift, it is necessary to lift your sailsApp before trying to test them (This applies similarly to controllers and other parts of your app, so be sure to call this file first).

```javascript
var Sails = require('sails'),
  sails;

before(function(done) {

+  // Increase the Mocha timeout so that Sails has enough time to lift.
+  this.timeout(5000);
+
  Sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
```

### mocha.opts

このファイルにはい以下に書かれたmochaの設定ファイルを記述する必要があります。: [mocha.opts] (http://mochajs.org/#mocha-opts)

**Note**: If you are writing your test in CoffeeScript be sure to add these lines to your `mocha.opts`.
```
--require coffee-script/register
--compilers coffee:coffee-script/register
```
**Note**: The default test-case timeout in Mocha is 2 seconds. Increase the timeout value in mocha.opts to make sure the sails lifting completes before any of the test-cases can be started. For example:
```
--timeout 5s
```

## テストを書く

ディレクトリの準備か完了すればユニットテストを書き始めることが出来ます。

./test/unit/models/Users.test.js
```js
describe.only('UsersModel', function() {

  describe('#find()', function() {
    it('should check find function', function (done) {
      Users.find()
        .then(function(results) {
          // some tests
          done();
        })
        .catch(done);
    });
  });

});
```

#### コントローラをテストする

[Supertest](https://github.com/visionmedia/supertest)ライブラリはHTMLリクエストをテストするための幾つかの便利なメソッドを提供しており、コントローラのレスポンスをテストするために利用することが出来ます。

./test/unit/controllers/UsersController.test.js
```js
var request = require('supertest');

describe('UsersController', function() {

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
## テストを実行する

mochaを使ってテストを行うためには`mocha`をマンドラインで実行し、実行したいテストを引数で与えなければならなく、その際 `mocha test/bootstrap.test.js test/unit/**/*.test.js`のように全てのテストをコールする前にbootstrap.test.jsをコールしなければなりません。

#### テストの実行に`npm test`を利用する

上記のようなmochaコマンドを避け、（特にbootstrap.test.jsをコールする際に）`npm test`を代わりに使う際にはpackage.jsonを変更しなければなりません。スクリプトオブジェクトで以下のように`mocha test/bootstrap.test.js test/unit/**/*.test.js`を値とする`test`キーを追加します。:

```js
 // package.json
 scripts": {
    "start": "node app.js",
    "debug": "node debug app.js",
    "test": "mocha test/bootstrap.test.js test/unit/**/*.test.js"
  },
 // More config
```
`*`は`unit`フォルダにある全ての`.test.js`で終わるファイルをマッチさせるためのワイルドカードですのでもし`*.spec.js`のほうが使いやすければそのように変更することも出来ます。同様に１つではなく複数の`*`を使うことでワイルドカードを利用することも可能です。


<docmeta name="displayName" value="Testing">
