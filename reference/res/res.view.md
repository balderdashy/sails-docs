# res.view()

HTMLページでレスポンスする。


### 使い方

```js
return res.view(pathToView, locals);
```

_あるいは:_
+ `return res.view(pathToView);`
+ `return res.view(locals);`
+ `return res.view();`


[設定されたビューエンジン](http://sailsjs.org/documentation/concepts/Views/ViewEngines.html)を使って`pathToView`にある[view template](http://sailsjs.org/documentation/concepts/Views/Partials.html)をHTMLにコンパイルします。`pathToView`が与えられない場合、現在のコントローラとアクションに応じて慣習的にビューを提供します。

与えられた、[`locals`](http://sailsjs.org/documentation/reference/Views/Locals.html) はアプリケーション横断的なローカルやSailsやビューエンジンによって挿入されたローカルと統合された後にdataとしてビューエンジンに渡されます。


### 引数

|   | 引数       | 型        | 詳細 |
|---|----------------|:-----------:|---------|
| 1 | `pathToView`   | ((string))  | 目的のビューファイルに対する[`views` フォルダ](http://sailsjs.org/documentation/anatomy/myApp/views) (usually `views/`)に相対的なパスを拡張子(例:`.ejs`)と最後のスラッシュ無しで。<br/>デフォルトは"identityOfController/nameOfAction".
| 2 | `locals`       | ((object))  | ビューテンプレートに渡すデータ。ここで明示的に渡されたローカルがSailsの[ビルドインのlocal](http://sailsjs.org/documentation/concepts/Views/Locals.html)とアプリケーションの[アプリ内で全体的に使えると設定したlocal](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)と統合されます。<br/>デフォルトは`{}`です。



### 例

慣習通りに設定されたSailsアプリケーションの`OvenController.js`の`cook()`アクションで`res.view()`を呼び出すとします。

`pathToView`引数なしには`res.view()`はコントローラの識別子(`oven`)とアクションの名前(`cook`)を合わせて判断します:

```js
return res.view();
// -> responds with `views/oven/cook.ejs`
```

以下は明示的な`pathToView`を使って同じビューをロードする方法です:

```js
return res.view('oven/cook');
// -> responds with `views/oven/cook.ejs`
```

最後に`res.view`がどのようにWaterlineと組み合わさるのか関してのもう少し踏み込んだデモです。:

```js
// Find the 5 hottest oven brands on the market
Oven.find().sort('heat ASC').exec(function (err, ovens){
  if (err) return res.serverError(err);

  return res.view('oven/top5', {
    hottestOvens: ovens
  });
  // -> responds using the view at `views/oven/top5.ejs`,
  // and with the oven data we looked up as view locals.
  //
  // e.g. in the view, we might have something like:
  // ...
  // <% _.each(hottestOvens, function (aHotOven) { %>
  //  <li><%= aHotOven.name %></li>
  // <% }) %>
  // ...
});

```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
> + `res.view()`はビューファイルをディスクから読み出し、HTMLにコンパイルし、クライアントに返送します。ビューがすでにメモリ上にある場合や直接クライアントにコンパイルされたHTMLを送信したくない場合、代わりに`sails.hooks.views.render()`を使って下さい。
> + `res.view()` は常にビューファイル名の _小文字版_ 探します。例えばコントローラが`FooBarController`でアクションが`Baz`なら`res.view()`は`views/foobar/baz.ejs`を見つけようとします。_大文字と小文字を区別する_ ファイルシステム(例:Ubuntu Linux)では大文字を入れてこれらが命名されていた場合、思わぬエラーを発生させる場合があります。この理由からビューとビューフォルダは常に小文字で命名することをおすすめします。









<docmeta name="uniqueID" value="resview916814">
<docmeta name="displayName" value="res.view()">
