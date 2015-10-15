# ロケール

### 概要

i18nフックはプロジェクトの中の"locales"ディレクトリ(デフォルトでは`config/locales`にあります)の中にあるJSONフォーマットの翻訳ファイルを読み込みます。それぞれのファイルはSailsバックエンドがサポートすべき[locale](http://en.wikipedia.org/wiki/Locale)（通常は言語）に対応します。

これらのファイルはあなたがビューやコントローラの中で使えるロケール特有の文字列を（JSONのキー・バリューのペアで）含んでいます。

以下にロケールファイルの例を挙げます (`config/locales/ja.json`):
```json
{
    "Hello!": "こんにちは!",
    "Hello %s, how are you today?": "こんにちは%sさん、お元気ですか。"
}
```

文字列ファイルの中のキー(例:"Hello %s, how are you today?")は**大文字と小文字を区別し**、厳密なマッチングが必要なことにご留意ください。ここには幾つかの違ったアプローチがありますが、どれが一番いいのかはそれは翻訳ファイルとHTMLファイルに関して、だれがどのように編集することが多いかということによって変わってきます。特に、もし翻訳ファイルを手動で編集する機会が多い場合、シンプルな全て小文字のキー名にすることでメンテナンスがしやすくなるでしょう。

例えば以下が別のやり方における`config/locales/ja.json`の例です:

```json
{
    "hello": "こんにちは!",
    "hello-how-are-you-today": "こんにちは%sさん、お元気ですか。"
}
```

そしてこれが `config/locales/en.json`です。:

```json
{
    "hello": "Hello!",
    "hello-how-are-you-today": "Hello, how are you today?"
}
```

ロケール文字列をネストすることも出来ます。しかしより良いアプローチとしてはネストされた文字列を表すために`.`を使うことです。例えばuserコントローラのindexページで使うラベルのリストです。:

``` json
{
    "user.index.label.id": "User ID",
    "user.index.label.name": "User Name"
}
```


### リクエストの理想的なロケールを検出、上書きする。

現在のリクエストで使われているロケールを判断するには[`req.getLocale()`](https://github.com/mashpie/i18n-node#getlocale)を使います。

自動検出されたロケールを上書きするには[`req.setLocale()`](https://github.com/mashpie/i18n-node#setlocale)を利用し、これを新しいロケールのユニークコードとともに呼び出します。 例:

```js
// Force the language to German for the remainder of the request:
req.setLocale('de');
// (this will use the strings located in `config/locales/de.json` for translation)
```

デフォルトではnode-i18nは言語ヘッダーを見ることで望ましい言語を検出します。言語ヘッダーはユーザーのブラウザ設定で決められ、殆どの場合においてそれは正しいのでロケールの上書きに関しては柔軟な対応が可能にするべきです。

例えば、もしあなたのアプリでユーザが任意の言語を選ぶことが出来るようにする場合、まずユーザセッションにおけるカスタム言語を確認する[ポリシー](http://beta.sailsjs.org/#/documentation/concepts/Policies) ポリシーを作り、もしそれが存在する場合、その後に続くポリシーやコントローラ、ビューで使う適切なロケールをセットすることになります。:

```js
// api/policies/localize.js
module.exports = function(req, res, next) {
  req.setLocale(req.session.languagePreference);
  next();
};
```


<!--

  その他に、別の拡張したサンプルです。:
  (todo: 最新のPullでは別のガイドページに以降する。)

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


<docmeta name="displayName" value="Locales">
