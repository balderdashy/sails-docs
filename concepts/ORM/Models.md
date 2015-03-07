# モデル

モデルは構造化されたデータの集合を表し、通常はデータベースの中のひとつのテーブルまたはコレクションを含みます。モデルは通常`api/models/`フォルダの中にファイルを作成することで定義します。

![screenshot of a Waterline/Sails model in Sublime Text 2](http://i.imgur.com/8uRlFi8.png)


<!--

// api/models/Product.js
module.exports = {
  attributes: {
    nameOnMenu: { type: 'string' },
    price: { type: 'string' },
    percentRealMeat: { type: 'float' },
    numCalories: { type: 'integer' }
  }
}
-->


### モデルを使う

モデルはコントローラ、ポリシー、サービス、レスポンス、テスト及びカスタムモデルからアクセス可能です。モデルにはいくつものメソッドが自動で用意されておりそのうち最も大切なのは[find](http://beta.sailsjs.org/#/documentation/reference/waterline/models/find.html)、[create](http://beta.sailsjs.org/#/documentation/reference/waterline/models/create.html)、[update](http://beta.sailsjs.org/#/documentation/reference/waterline/models/update.html)、[destroy](http://beta.sailsjs.org/#/documentation/reference/waterline/models/destroy.html)です。これらのメソッドは[非同期](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)で処理されます。（裏側ではWaterlineがクエリーをデータベースに投げ、レスポンスを待ちます。）

最終的にはクエリメソッドはクエリオブジェクトを返します。実際にクエリを実行するには`.exec(cb)`をこのクエリオブジェクト上でコールしなければなりません。（`cb`はクエリが完了後に呼び出されるコールバックです。）

Waterlineはpromiseのためのオプトインサポートも用意しています。クエリオブジェクトで`.exec()`を呼び出す代わりに[Q promise](https://github.com/kriskowal/q)を返す`.then()`、`.spread()`や `.fail()`をコールすることも出来ます。





### モデルメソッド（Static/classメソッド）

モデルのクラスメソッドはモデルのインスタンス（つまりレコード）に対して特定のタスクを実行するためにモデル内に書かれるものです。これは`.create()`, `.update()`, `.destroy()`,や`.find()`などのおなじみの、データペース操作のためのCRUDメソッドが記述されているところです。


###### カスタムのモデルメソッド

Waterlineではモデル内にカスタムのモデルメソッドを作成することが出来ます。この機能はWaterlineが認識できないキーを無視するという特性を利用して作られているので最初から用意されているメソッドやダイナミックメソッドをうっかり書き換えてしまわないように注意が必要です。（つまりcreateというメソッドを定義したりしてはいけません）カスタムモデルメソッドは特定のモデルに関連したコントローラコードを切り分けるのに便利です。つまりこれはコントローラコードを取り出し、再利用可能なコードにすることが出来ます。（更に言うと`req`と`res`に依存しなくなります）

モデルメソッドは通常、非同期動作です。慣例に従って非同期のモデルメソッドでは最初の引数にオブジェクトインプット（`opts`または`options`呼ばれる）を、2つ目の引数にNodeのコールバックを入れたファンクションを実行し、最初のファンクションとコールバックファンクションの2段階での実行を行う必要があります。代わりにpromiseを返すということも選択できます。（両方の方法ともうまく動きますので、これは好みによるものです。もし特定の好みがなければNodeのコールバックを選んでください。）

カスタムのスタティックモデルメソッドを作成する上でのベストプラクティスはメソッドがレコードとそのプライマリキーの両方を受け入れられるようにすることです。 _複数_ のレコードを処理可能なメソッドにおいてはレコードの配列または主キーの配列を受け入れられるようにします。このコードを書くには少し時間がかかりますがメソッドをよりパワフルなものにします。それにもともとの作業はよく使われる作業を切り出す目的で行っているものですので、通常これをやる価値はあります。

例えば:

```js
// in api/models/Monkey.js...

// 特定の人と同じ名前の猿を探す
findWithSameNameAsPerson: function (opts, cb) {

  var person = opts.person;

  // すべての作業を行う前にレコードが渡されたのか主キーが渡されたのかを確認する。
  //
  // もし主キーが渡された場合はその人の情報をLookupする。:
  (function _lookupPersonIfNecessary(afterLookup){
    // (this self-calling function is just for concise-ness)
    if (typeof person === 'object')) return afterLookup(null, person);
    Person.findOne(person).exec(afterLookup);
  })(function (err, person){
    if (err) return cb(err);
    if (!person) {
      err = new Error();
      err.message = require('util').format('Cannot find monkeys with the same name as the person w/ id=%s because that person does not exist.', person);
      err.status = 404;
      return cb(err);
    }

    Monkey.findByName(person.name)
    .exec(function (err, monkeys){
      if (err) return cb(err);
      cb(null, monkeys);
    })
  });

}
```

そして、以下のように実行できます。:

```js
Monkey.findWithSameNameAsPerson(albus, function (err, monkeys) { ... });
// -or-
Monkey.findWithSameNameAsPerson(37, function (err, monkeys) { ... });
```

> さらなるTipsに関しては[Timothy the Monkey]()に関してのincidentを御覧ください。

その他の例:

```javascript
// api/models/User.js
module.exports = {

  attributes: {

    name: {
      type: 'string'
    },
    enrolledIn: {
      collection: 'Course', via: 'students'
    }
  },

  /**
   * ユーザは一つまたは複数のコースに加入する
   * @param  {Object}   options
   *            => courses {Array} list of course ids
   *            => id {Integer} id of the enrolling user
   * @param  {Function} cb
   */
  enroll: function (options, cb) {

    User.findOne(options.id).exec(function (err, theUser) {
      if (err) return cb(err);
      if (!theUser) return cb(new Error('User not found.'));
      theUser.enrolledIn.add(options.courses);
      theUser.save(cb);
    });
  }
};
```


#### ダイナミックファインダー

Sailsの起動時に自動的に動的に作成される特別なクラスメソッドです。たとえばPersonもでるに"firstName"があるとすると以下のメソッドが生成されます。:

```js
Person.findByFirstName('emma').exec(function(err,people){ ... });
```


#### Resourceful Pubsub Methods

pubsubのhookに接続された特別なクラスメソッドです。詳細は[resourceful pubsubの項目](http://sailsjs.org/#/documentation/reference/websockets/resourceful-pubsub)をご覧ください。


<!--
another special type of class method.  It stands for 'Publish, Subscribe' and that's just what they do. These methods play a big role in how Sails integrates and utilizes Socket.IO.  They are used to subscribe clients to and publish messages about the creation, update, and destruction of models.  If you want to build real-time functionality in Sails, these will come in handy.
-->

#### アトリビュートメソッド（レコード/インスタンスメソッド）

アトリビュートメソッドはWaterlineクエリーから帰ってきたレコード（つまりモデルインスタンス）で利用可能なファンクションです。例えばStudentモデルからGPAの高い10人の生徒を探してきた場合、それぞれ生徒のレコードはカスタムアトリビュートメソッドや既存のアトリビュートメソッドにアクセスできます。

###### ビルトインのアトリビュートメソッド
すべてのWaterlineモデルにはいくつかのアトリビュートメソッドが自動的に含まれています。例えば:

+ [`.toJSON()`]()
+ [`.save()`]()
+ [`.destroy()`]()
+ [`.validate()`]()


<!-- note to self- we should bundle a getPrimaryKeyValue() attribute method on every model in waterline core (or maybe just getId() since "id" is simpler to understand) ~mike - aug2,2014 -->


###### カスタムアトリビュートメソッド

Waterlineではカスタムのアトリビュートメソッドを定義することも出来ます。他のアトリビュートと同じように定義しますが、右辺にはオブジェクトを代入する代わりにファンクションを代入します。


```js
// api/models/Person.jsより

module.exports = {
  attributes: {
    // Primitive attributes
    firstName: {
      type: 'string',
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    // Associations (aka relational attributes)
    spouse: { model: 'Person' },
    pets: { collection: 'Pet' },

    // Attribute methods
    getFullName: function (){
      return this.firstName + ' ' + this.lastName;
    },
    isMarried: function () {
      return !!this.spouse;
    },
    isEligibleForSocialSecurity: function (){
      return this.age >= 65;
    },
    encryptPassword: function () {

    }
  }
};
```

> 備考　ビルトインの`.save()`と`.destroy()`を除いて（これらは特筆すべき例外です）慣例上、アトリビュートメソッドはほとんど _同期動作_ です。


###### どんな時にアトリビュートメソッドを書いたらいいですか

カスタムアトリビュートは一部の情報をレコードから除外する場合にとくに便利です。すなわち取得した一つまたは複数のレコードの情報を削減する時です。（つまり、「婚姻状況」を抜き出したいときなど）

```js
if ( rick.isMarried() ) {
  // ...
}
```



###### アトリビュートメソッドを書くべきではない時

** _非同期の_ アトリビュートメソッドを書くべきではありません**。`.save()`や`.destroy()`のようなビルトインの非同期のアトリビュートメソッドは便利ですが、 _オリジナルの_ 非同期のアトリビュートメソッドは予期せぬ結果をもたらすことが有ります。また、その方法はアプリケーションの開発上効率のいい方法ではありません。

例えば、婚姻状況を管理するアプリケーションを挙げます。Personモデルにおいてそれぞれの人の`spouse`アトリビュートを更新するアトリビュートメソッドを書くかもしれえません。そうすればこのようなコントローラコードを書くことが出来ます。:

```js
personA.marry(personB, function (err) {
  if (err) return res.negotiate(err);
  return res.ok();
})
```

これは一見大丈夫に見えます。もっとも、personAに実際のレコードがないときに実行する別のアクションを作る必要が出るまでの間ですが。。。

もっと良いストラテジーはカスタムのモデルメソッドを書くことです。こうすることで実際のレコードインスタンスがない場合にでも隠せす可能になるのでファンクションをもっと再利用可能にし、もっと有用なものにすることが出来ます。上記のコードを以下のようにリファクタしましょう。 :

```js
Person.marry([joe,raquel], function (err) {
  if (err) return res.negotiate(err);
  return res.ok();
})
```



###### アトリビュートメソッドに命名する
アトリビュートメソッドに命名するときにはあなたの作業中のモデルに最初からある**アトリビュートバリュー**とあなたが作った _アトリビュートメソッド_ との間で競合を起こさないために一定の命名規則で行ってください。良いプラクティスとしては"get*" (例えば`getFullName()`)の形式でプレフィックスを付けるということとレコードそのものを改編するアトリビュートメソッドを書くのを避けるということです。

<!--

Imagine you have a small monkey named Timothy that rides on your shoulders and styles your hair when you are scheduled to speak at a conference.  In this scenario, you are a record of the `Person` model and Timothy is a record of the `Monkey` model. The `Person` model has primitive attributes like "name", "email", and "phoneNumber", and relational attributes like "petMonkey" (points to an individual `Monkey`) and "mom" (points to an individual `Person`).  Meanwhile the `Monkey` model has primitive attributes "name", "age", and "demeanor", as well as an relational attribute: "petOfPerson" (which points to an individual person).


Everyone knows that a person can style her own hair, but it is more efficient if her pet monkey does it.  We can represent this by definining `styleHair: function (cb){ return cb(); }` as an attribute method on Person and `styleOwnersHair: function (cb){ return cb();}` as an attribute method on Monkey.


If your app involves multigenerational hair-styling, you might think it would make sense to write an attribute method on the Monkey model called "getOwnersGrandma()" which would call a callback with the monkey's owner's mom's mom.
-->

<!--

###### an aside about promises

Promises are most effective when used to handle asynchronous, but referentially transparent ("nullipotent") operations; i.e. logic without any side-effects.
-->




<docmeta name="uniqueID" value="Models413907">
<docmeta name="displayName" value="Models">
