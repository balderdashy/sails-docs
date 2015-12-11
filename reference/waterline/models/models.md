# モデルを扱う

ドキュメントのこのセクションはWaterlineですぐに使えるモデルメソッドに焦点を当てます。それに加えてフックからもたらされる追加的なメソッド(すなわち[resourceful pubsub methods]())、カスタムの機能を提供するために下のアダプタから露出されるもの、実在するコードを上書きするためのアプリケーション内で手作りするコードのメソッドがあります。
 
> Sails/Waterlineのモデルに関してのより深い説明は<a href="http://sailsjs.org/documentation/concepts/ORM/Models.html">http://sailsjs.org/documentation/concepts/ORM/Models.html</a>を御覧ください。

![screenshot of a Waterline/Sails model in Sublime Text 2](http://i.imgur.com/8uRlFi8.png)


### ビルトインのモデルメソッド

一般的にモデルのメソッドは _非同期_ であり、これが意味するところはただ、これを呼び出してその返り値を使うことは出来ないということです。そのかわりにコールバックまたはpromisesを使わなければなりません。
多くのビルトインのモデルはコールバックを1つ目の引数として受け取りますっ。コールバックが与えられなければチェーン可能なクエリーオブジェクトが返され、それは`.where()` and `.exec()`のようなメソッドを持ちます。詳しくは[Working with Queries](http://sailsjs.org/documentation/reference/waterline/queries)を御覧ください。


 メソッド                | 概要
 --------------------- | ------------------------------------------------------------------------
 `.create()`           | 与えられたオブジェクトからなるレコードを作成する。
 `.find()`             | 与えられた検索条件に合うレコードの配列を探す。
 `.findOne()`          | 与えられた検索条件に合うレコードを1件探し、それがなければ`null`を返す。
 `.update()`           | 与えられた検索条件に合うレコードに`attrName:value`のペアからなるオブジェクトの値をセットする。
 `.destroy()`          | 与えられた検索条件に合うレコードを削除する。
 `.findOrCreate()`     | 与えられた検索条件に合うレコードを1件探し、あるいはそれが存在しなけば作成する。
 `.count()`            | 与えられた検索条件に合うレコードの総件数を取得する。
 `.native()`/`query()` | 元になっているデータベースドライバを直接呼び出す。
 `.stream()`           | 与えられた検索条件に合うレコードの読み出し可能な（オブジェクトモード）ストリームを返す。



<!-- ![screenshot of the api/models/ folder in a text editor](http://i.imgur.com/xdTZpKT.png) -->





### `sails.models`

もしSailsのグローバル変数を無効にしなかればならない時でも、`sails.models.<model_identity>`を使ってモデルへのアクセスが出来ます。

モデルの`identity`はその`globalId`とは異なります。`globalId`はモデルの名前から自動的に判断され、`identity`はその全てが小文字になった版です。例えば、`api/models/Kitten.js`で定義されたモデルは`Kitten`のglobalIdを持ちますが、そのidentityは`kitten`です。例えば:

```javascript
// Kitten === sails.models.kitten
sails.models.kitten.find().exec(function (err, allTheKittens) {
  // We also could have just used `Kitten.find().exec(...)`
  // if we'd left the global variable exposed.
});
```


<docmeta name="uniqueID" value="Models537291">
<docmeta name="displayName" value="Models">
