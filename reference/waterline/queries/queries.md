# クエリーを扱う

`.find()`や`.create()`と同じようにチェーン可能なdeferredオブジェクトがWaterlineから返されます

```js
var query = Stuff.find();
```

おそらく、すでにSailsアプリケーションでクエリオブジェクトを扱ったことがあると思います。多くの場合、そのオブジェクト _それ自体_　に関してはデータベースと通信するシンタックスの一部ということ以上に考えてこなかったと思います。

Waterlineクエリインスタンスの第一の目的はモデル操作に関して便利で、チェーン可能なシンタックスを提供することです。`.populate()`や`.where()`、`.sort()`のようなメソッドはデータベースの呼び出しをそれが送られる _前に_ 洗練することが出来ます。クエリをデータベースに送信する準備ができた時には単に[`.exec()`](http://sailsjs.org/documentation/reference/waterline/queries/exec.html)を呼び出すことが出来ます。


### Promises

`.exec()`メソッドに加え、Waterlineクエリーは[Bluebird](https://github.com/petkaantonov/bluebird) promiseライブラリの部分的なサポートを実装しており、`.then()`と`.catch()`メソッドを露出しています。

```js
Stuff.find()
.then(function (allTheStuff) {...})
.catch(function (err) {...});
```


あなたがpromisesのファンであって、それに対しての十分な経験があればそのインタフェースを扱うのに問題はないと思います。しかしながらもしpromisesにそれほど慣れていない場合やそんなことを気にしないなどの場合、おそらくNodeのコールバックの慣習を採用した`.exec()`ほうが物事を簡単に進められます。

```js
Stuff.find()
.exec(function (err, allTheStuff) {...})
```


### クエリの実行

クエリを **実行** すると、たくさんのことが起こります:

```js
Zookeeper.find().exec(function (err, zookeepers){
  // would you look at all those zookeepers?
});
```

まず、Waterlineのコアからノーマライズされた[criteria object](http://sailsjs.org/documentation/concepts/ORM/Querylanguage.html?q=query-language-basics)が送り出されます。それから、それから、使っているデータベース(例:Redis、Mongoや多種のSQLの方言など) に対応した生のクエリに変換されるために関連するWaterlineのアダプタに渡されます。最後にそれぞれの関連するアダプタがそのネイティブのNode.jsデータベースドライバが物理的なデータベースに対してネットワークを通じてクエリを発行します。

アダプタがレスポンスを受け取った時には、Waterlineインタフェースのスペックに誘導され、その他のアダプタからの生のレスポンスと統合して整合性ある結果セットに変換されるためにWaterlineのコアに送り返されます。この時点で、アプリケーションで利用されるコールバックに渡される直前の最後のノーマライゼーションが行われます。


### 備考

> + Waterlineのモデルメソッドは最後の引数にコールバックが直接渡されていた場合、クエリインスタンスを **返しません**。代わりに、クエリが完了した際にはそのコールバックがトリガーされます。


<docmeta name="uniqueID" value="query820682">
<docmeta name="displayName" value="Queries">
