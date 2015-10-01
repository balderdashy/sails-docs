# コードをテストする

## 準備

テストスイートとして我々は[mocha](http://visionmedia.github.com/mocha/)を採用しています。
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

このテストファイルはテストコードの前後に何らかのコードを実行したい時に便利です。（例：Sailアプリケーションを立ち上げたり止めたりするなど。）:

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

このファイルにはい以下に書かれたmochaの設定ファイルを記述する必要があります。: [mocha.opts] (http://visionmedia.github.io/mocha/#mocha.opts)

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

## コードカバレッジ

コードをテストするのに人気のもう一つの方法は[Code Coverage](http://en.wikipedia.org/wiki/Code_coverage)です。

[mocha](http://visionmedia.github.io/mocha/)と[istanbul](https://github.com/gotwarlost/istanbul)を使うことで、コードをテストし、様々なコードカバレッジレポートを用意し、[Jenkins](http://jenkins-ci.org)のような継続的CIサービスで利用することが出来ます。

コードをテストしてシンプルなHTMLレポートを生成するには以下のコマンドを使います。
```bash
istanbul cover -x "**/config/**" _mocha -- --timeout 5000
istanbul report html
```

<docmeta name="uniqueID" value="Testing765149">
<docmeta name="displayName" value="Testing">
