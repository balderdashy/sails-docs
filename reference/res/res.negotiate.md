# res.negotiate()

クライアントに対して適切なエラー(`err`)を返します。[Model.create()](http://sailsjs.org/documentation/reference/waterline/models/create.html)や[Model.update()](http://sailsjs.org/documentation/reference/waterline/models/update.html)からのエラーの可能性のあるものに対応するのに特に便利です。

### 使い方

```js
return res.negotiate(err);
```

### 詳細

ほかのカスタムレスポンスモジュールと同じように。このメソッドの振る舞いはカスタマイズ可能です。

`res.negotiate()`は与えられたエラー(`err`)に対して適切なエラーハンドリングの振る舞いを以下のメソッドのうちから決定します:

+ [`res.badRequest()`](http://sailsjs.org/documentation/anatomy/myApp/api/responses/badRequest.js.html)   (400)
+ [`res.forbidden()`](http://sailsjs.org/documentation/anatomy/myApp/api/responses/forbidden.js.html)    (403)
+ [`res.notFound()`](http://sailsjs.org/documentation/anatomy/myApp/api/responses/notFound.js.html)     (404)
+ [`res.serverError()`](http://sailsjs.org/documentation/anatomy/myApp/api/responses/serverError.js.html)  (500)

判断は`err`の"status"プロパティから判断されます。詳細な診断ができない場合("status"プロパティが存在しない、または文字列の場合）、Sailsは`res.serverError()`をデフォルトで選択します。



### 例


```javascript
// Add Fido's birthday to the database:
Pet.update({name: 'fido'})
  .set({birthday: new Date('01/01/2010')})
  .exec(function (err, fido) {
    if (err) return res.negotiate(err);
    return res.ok(fido);
   });
```


### 備考
> + このメソッドは **ターミナル**であり、リクエストを処理するための一般的に最後の1行であるべきです。（そのためこれらのドキュメントの使用方法では`return`を使うと考えるべきです。）。
+ `res.negotiate()`は（ほかのユーザー側のレスポンスメソッドと同じように）編集い、上書きが可能です。単にレスポンスモジュール(`/responses/negotiate.js`)を定義しファンクションの定義をexportして下さい。
>+ このメソッドはcatch出来ないエラーに対するSailsのデフォルトのハンドラーです。これはつまり_ イベントループの最初以外の全ての _　場所でエラーがハンドラーコードに投げ込まれた時自動的に呼びだされます。非同期のコードから上げられる全てのcallbacks/promisesに関して常にエラーハンドリングを特定すべきです。







<docmeta name="uniqueID" value="resnegotiate730536">
<docmeta name="displayName" value="res.negotiate()">
