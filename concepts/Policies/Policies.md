# ポリシー
### 概要

Sailsにおける「ポリシー」は認証とアクセスコントロールを行うための多機能なツールです。つまりポリシーはコントロータへのアクセスを許可したり拒否したりする動作を適切な粒度で定義できるのです。たとえばあなたがDropboxをつくろうとしているとしましょう。するとユーザにファイルをフォルダーにアップロードをさせる前にはユーザが`isAuthenticated`かどうかを確認して次に`canWrite`（フォルダへの書き込み権限を持っているか）を確認します。
最後にアップロードしようとしてるフォルダーが`hasEnoughSpace`かどうかも確認するでしょう。

ポリシーはどんなものでも利用することが出来ます。つまりHTTP BasicAuthでも、サードパーティーのシングルサインオンでも、OAuth2.0でも、あるいはあなたが書いたオリジナルの認証・認可スキーマとでも利用することが出来ます。

> 備考：ポリシーはコントローラーアクションに対して**のみ**提供され、ビューには適用されません。もしも[routes.js config file](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.routes.html) でビューを直接指定指定した場合ポリシーは一切適用されません。ポリシーが確実に適用されるようにするにはビューを表示するコントローラを作成し、ルートからはそのコントローラを呼び出すようにしてください。


### 初めてのポリシーを書く

ポリシーはSailsアプリケーションの`api/policies`で定義されます。それぞれのポリシーは一つのファンクションを持ちます。

中身を見てみると、ポリシーはまさにコントローラの**手前で**動作するConnect/Expresのミドルウエアなのです。ここでは好きなだけのチェーンを繋げることが出来ます。（そもそも、そういうふうにして使われるべきものなのですが）。理想的には一つのミドルウエアは*一つだけの*ことをチェックすべきです。

例えば先程述べた`canWrite`ポリシーは以下のようになります。

```javascript
// policies/canWrite.js
module.exports = function canWrite (req, res, next) {
  var targetFolderId = req.param('id');
  var userId = req.session.user.id;
  
  Permission
  .findOneByFolderId( targetFolderId )
  .exec( function foundPermission (err, permission) {

    // Unexpected error occurred-- skip to the app's default error (500) handler
    if (err) return next(err);

    // No permission exists linking this user to this folder.  Maybe they got removed from it?  Maybe they never had permission in the first place?  Who cares?
    if ( ! permission ) return res.redirect('/notAllowed');
    
    // OK, so a permission was found.  Let's be sure it's a "write".
    if ( permission.type !== 'write' ) return res.redirect('/notAllowed');

    // If we made it all the way down here, looks like everything's ok, so we'll let the user through
    next();
  });
};
```


### コントローラをポリシーで保護する

SailsではビルドインのACL(アクセスコントロールリスト）が `config/policies.js`に用意されています。このファイルはポリシーとコントローラを紐付けるのに使われます。  このファイルは*ディクレラテブ*です。すなわち、ここではアプリケーションにおけるパーミッションが*どのようになっているのか*を記述するのであり、*どのように動作するのか*を記述するものではありません。これは開発を始めたばかりの開発者でも何が起こっているのかを理解しやすくというメリットばかりではなく、必然的に何度も起こるであろうプログラムの変更に柔軟に対応できるようにするという狙いもあるのです

`config/policies.js`ファイルはコントローラネーム（あるいはグローバル設定する場合は`'*'`）をキーとマップすべきオブジェクト名を値とするJavascriptオブジェクトをエクスポートしなければなりません。詳しくは以下の例をご覧ください・

##### 特定のコントローラアクションにポリシーを適用する:

```js
{
  ProfileController: {
      // Apply the 'isLoggedIn' policy to the 'edit' action of 'ProfileController'
      edit: 'isLoggedIn'
      // Apply the 'isAdmin' AND 'isLoggedIn' policies, in that order, to the 'create' action
      create: ['isAdmin', 'isLoggedIn']
  }
}
```

##### コントローラ全体にポリシーを適用する:

```js
{
  ProfileController: {
    // Apply 'isLogged' in by default to all actions that are NOT specified below
    '*': 'isLoggedIn',
    // If an action is explicitly listed, its policy list will override the default list.
    // So, we have to list 'isLoggedIn' again for the 'edit' action if we want it to be applied.
    edit: ['isAdmin', 'isLoggedIn']
  }
}
```

> **備考:** デフォルトのポリシーマッピングはカスケードしたりtrickle downしません。コントローラのアクションに指定されたマッピングはデフォルトのマッピングを上書きします。

##### 明示的にマッピングされたアクション以外に対してポリシーを適用する:

```js
{
  // Apply 'isLoggedIn' to all actions by default
  '*': 'isLoggedIn',
  ProfileController: {
      // Apply 'isAdmin' to the 'foo' action.  'isLoggedIn' will NOT be applied!
      'foo': 'isAdmin'
  }
}
```

> デフォルトのポリシーは明示的にマッピングされている以外のいかなるコントローラやアクションには適用されません。

### ビルトインのポリシー
SailsにはGlobalに割り当てたり、指定したコントローラやアクションに割り当てたりすることができる２つのコントローラがあります。
  + `true`: パブリックアクセス (マップされたコントローラやアクションにはだれでもアクセスできる。)
  +  `false`: アクセス**不可**  (マップされたコントローラやアクションには**だれも**アクセスできない)

 `'*': true` はすべてのコントローラやアクションに対するデフォルトのポリシーです。本番環境では不用意にアクションやコントローラが露出してしまう事を防ぐためにこれを`false` にするといいでしょう。

##### コントローラにいくつかのポリシーを適用する:
```javascript
  // in config/policies.js
  
  // ...
  RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    '*': false,
  
    // For the action `nurture`, apply the 'isRabbitMother' policy 
    // (this overrides `false` above)
    nurture : 'isRabbitMother',
  
    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    feed : ['isNiceToAnimals', 'hasRabbitFood']
  }
  // ...
```

上で挙げた`isNiceToAnimals`はこのようになっているはです。(このファイルは`policies/isNiceToAnimals.js`に設置されます。):

```javascript
module.exports = function isNiceToAnimals (req, res, next) {
  
  // `req.session` contains a set of data specific to the user making this request.
  // It's kind of like our app's "memory" of the current user.
  
  // If our user has a history of animal cruelty, not only will we 
  // prevent her from going even one step further (`return`), 
  // we'll go ahead and redirect her to PETA (`res.redirect`).
  if ( req.session.user.hasHistoryOfAnimalCruelty ) {
    return res.redirect('http://PETA.org');
  }

  // If the user has been seen frowning at puppies, we have to assume that
  // they might end up being mean to them, so we'll 
  if ( req.session.user.frownsAtPuppies ) {
    return res.redirect('http://www.dailypuppy.com/');
  }

  // Finally, if the user has a clean record, we'll call the `next()` function
  // to let them through to the next policy or our controller
  next();
};
```

うさぎを守るということ（とても立派なことだと思います）に加え、ポリシーにはいくつかのユースケースが有ります。:
+ クッキーベースの認証
+ ロールベースのアクセス管理
+ 容量ベースでのファイルアップロード制限。
+ 考えられるその他すべての認証スキーム


### Passportを使っているんだけどどうすればいいですか。

PassportはSailsとの組み合わせでも見事に動作します。一般的な話として、SailsはConnect/ExpressをコアにしていますのであらゆるConnect/Expressオリエンテッドなものはうまく動作します。実際にSaisはsocket.ioと一緒に動作するほとんどのExpressミドルウエアに関してプログラム解釈に関連するもんだおは起きていません。

この辺りに関しては以下のものを始めとする良い利用例があります。 [Using Passport.JS with Sails.JS](http://jethrokuan.github.io/2013/12/19/Using-Passport-With-Sails-JS.html).



<docmeta name="uniqueID" value="Policies766425">
<docmeta name="displayName" value="Policies">
