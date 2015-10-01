# 国際化

### 概要

もしあなたのアプリケーションが世界中の人やシステムとふれあうとしたら国際化とローカライゼーションはあなたの国際戦略の中で大切な位置を占めるでしょう。Sailsは[i18n-node](https://github.com/mashpie/i18n-node)のおかげでユーザの言語プリファレンスの検知及び静的ワードの翻訳のサポートを内蔵しています。([npm](https://www.npmjs.org/package/i18n)).



<!--
  もしかしたらカバーすべきかも:
  *(ただ、これを含むのは明確でそれほど有用だったり大切だったししないかもしれません。自信はありませんが便利というよりややこしいかも。*
このビルトインのサポートは**動的にレンダリングされる**（**スタティック**でない）コンテントに対してです。予めサーバで処理されたレスポンスに対してのみこれを使うことが出来ます。別の言い方をすればこの翻訳機能はビューやコントローラ、ポリシーでは使えますがassetフォルダの中身に関しては使えません。

幾つかの原因（明らかな例としてはSEO対策やフラグメンテーションの理由など）から文字列の翻訳をフロントエンド（例えば：ブラウザやiOSアプリなど）で行うことは推奨されません。もちろん、それでもやれないことはないですがこのビルトインサポートをi18nのフックからは使わないでください。
-->


### 利用方法


ビューで:
```ejs
<h1> <%= __('Hello') %> </h1>
<h1> <%= __('Hello %s, how are you today?', 'Mike') %> </h1>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```


コントローラやポリシーで:
```javascript
req.__('Hello'); // => Hola
req.__('Hello %s', 'Marcus'); // => Hola Marcus
req.__('Hello {{name}}', { name: 'Marcus' }); // => Hola Marcus
```


あるいはもしロケールIDがわかっているとしたら`sails.__`を使うことでアプリケーションの中のどこからでも翻訳できます。:

```javascript
sails.__({
  phrase: 'Hello',
  locale: 'es'
});
// => 'Hola!'
```



### ロケール
i18nフックはプロジェクトの中の"locales"ディレクトリ(デフォルトでは`config/locales`にあります)の中にあるJSONフォーマットの翻訳ファイルを読み込みます。それぞれのファイルはSailsバックエンドがサポートすべき[locale](http://en.wikipedia.org/wiki/Locale)（通常は言語）に対応します。

これらのファイルはあなたがビューやコントローラの中で使えるロケール特有の文字列を（JSONのキー・バリューのペアで）含んでいます。

以下にロケールファイルの例を挙げます (`config/locales/ja.json`):
```json
{
    "Hello!": "こんにちは!",
    "Hello %s, how are you today?": "こんにちは%sさん、お元気ですか。",
}
```

文字列ファイルの中のキー(例:"Hello %s, how are you today?")は**大文字と小文字を区別する**ことにご留意ください。個々に幾つかの違ったアプローチがありますが、どれが一番いいのかはそれは翻訳ファイルとHTMLファイルに関して、だれがどのように編集することが多いかということによって変わってきます。特に、もし翻訳ファイルを手動で編集する機会が多い場合、シンプルな全て小文字のキー名にすることでメンテナンスがしやすくなるでしょう。

例えば`config/locales/ja.json`での別のやり方は:

```json
{
    "hello": "こんにちは!",
    "hello-how-are-you-today": "こんにちは%sさん、お元気ですか。",
}
```

そしてこれが `config/locales/en.json`です。:

```json
{
    "hello": "Hello!",
    "hello-how-are-you-today": "Hello, how are you today?",
}
```


###  リクエストのロケールを検出、上書きする。

自動検出されたロケールを上書きするには[`req.setLocale()`](https://github.com/mashpie/i18n-node#setlocale)を利用し、これを新しいロケールのユニークコードとともに呼び出します。 例:

```js
// リクエストのリマインダー表示にドイツ語を強制する:
req.setLocale('de');
// (これで翻訳には`config/locales/de.json`に配置された文字列が利用されます。)
```

デフォルトではnode-i18nは言語ヘッダーを見ることで望ましい言語を検出します。言語ヘッダーはユーザーのブラウザ設定で決められ、殆どの場合においてそれは正しいのでロケールの上書きに関しては柔軟な対応が可能にするべきです。

例えば、もしあなたのアプリでユーザが任意の言語を選ぶことが出来るようにする場合、まずユーザセッションにおけるカスタム言語を確認する[ポリシー](http://beta.sailsjs.org/#/documentation/concepts/Policies) ポリシーを作り、もしそれが存在する場合、その後に続くポリシーやコントローラ、ビューで使うロケールをセットすることになります。:

```js
// api/policies/localize.js
module.exports = function(req, res, next) {
  req.setLocale(req.session.languagePreference);
  next();
};
```


<!--

  その他に、別の拡張したサンプルです。:
  (todo: 別のガイドページに以降する。)

```js
// config/routes.js
module.export.routes = {
  '/:lang/': 'MyController.index',
  '/:lang/help': 'MyController.help',
  '/:lang/contact': 'MyController.contact',
  // ...etc...
}

// config/policies.js
module.exports.policies = {
  '*' : 'localize'
}

// api/policies/localize.js
module.exports = function(req, res, next) {
   req.setLocale(req.param('lang'));
   next();
};
```
-->



### 動的コンテンツを翻訳する

もしあなたバックエンドが複数言語のデータを保している場合、（例えば、商品名がCMSから複数の言語で入力されているなど）（何らかの方法でローカルの翻訳ファイルを動的に編集することを意図しないかぎりは）シンプルなJSONロケールファイルに依存するべきではないでしょう。ここで取りうる一つの方法は翻訳サービスのカスタムな実装によりロケールファイルをプログラム的に編集する方法です。Sails/node-i18nのJSON文字列ファイルは[webtranslateit.com](https://webtranslateit.com/en)で利用されるフォーマットと互換性があります。

一方で、データベースに保管されたこれらの動的翻訳文字列を利用したいこともあるでしょう。もしそうなら、それに従ったデータモデルを作成し、ロケールID(例えば"en", "es", "de"など)によって関連するデータを動的に取得する方法を用意しなければいけません。こうすることで、[`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale) メソッドを利用してそれぞれのレスポンスで使うべき翻訳ファイルを取得することができ、アプリケーションの中の他の場所で使われるやり方との整合性を保つことが出来るでしょう。



### 追加のオプション

国際化とローカライゼーションの設定は [`sails.config.i18n`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.i18n.html)で設定されています。このファイルを編集する典型的な例はあなたのアプリケーションのサポートする言語や翻訳ファイルの位置を変更する時です。:

```javascript
// どのロケールがサポートされますか?
locales: ['en', 'es'],

// 翻訳がいるはどこに置かれていますか?
localesDirectory: '/config/locales'
```




### Sailのデフォルトの国際化サポートを無効化、もしくはカスタマイズする。

もちろんプロジェクトの中のどこでも好きなNodeモジュールを`require()`して、好きな国際化の方法を取ることが出来ます。

しかし、ここで理解するに値すべきことはSailsは[node-i18n](https://github.com/mashpie/i18n-node)の実装を[i18n hook](http://beta.sailsjs.org/#/documentation/concepts/Internationalization)で行っているので[`loadHooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)や[`hooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) の設定を使ってこれを完全に無効化したり、オーバライドすることが出来ます。


### クライアントでの国際化に関して

ここに上げたテクニックはサーバーサイドのビューではとてもうまく動きます。しかし、静的なテンプレートをCDNや静的ホストから提供するリッチクライアント、（例えばパフォーマンス重視のSPAやPhonegapアプリやGoogleエクステンションなど）ではどうでしょうか。

実はSailsのi18nサポートは翻訳済みのテンプレートをブラウザに届ける際にも再利用することが出来ます。もしSailの国際化機能を_クライアントサイドテンプレート_で使いたいときはフロントエンドテンプレートを`/views`のサブディレクトリに配置してください。
+ 開発モードでは、Sailsプロジェクトですでにデフォルトでインストールされているgrunt-contrib-watchによってテンプレートファイルが編集されたり、文字列ファイルが編集されるたびに、テンプレートアイルを翻訳してプレコンパイルしなおさなければなりません。
+ プロダクションモードではlift()を行う時点で全てのテンプレートが翻訳され、プレコンパイルされることになります。読み込み時間を気にする用途（例えばモバイルWebアプリケーション）では翻訳され、プレコンパイルされ、最小化されたテンプレートをCloudfrontのようなCDNにアップロードして更なるパフォーマンスの追求を行うことが出来ます。



<docmeta name="uniqueID" value="internationalization245343">
<docmeta name="displayName" value="Internationalization">

