# P3P

### 背景

P3Pは"Platform for Privacy Preferences"の略であり、利用者側でのより良いプライバシー制御を行うためのブラウザ/Web標準です。現在（2014年）メジャーなブラウザのうちInternet Explorerのみがサポートしています。これは主にレガシーなWebアプリケーションを扱うために使われます。

多くのモダンな組織は完全にP3Pを無視しています、以下にこのテーマについて[Facebookが言及した](https://www.facebook.com/help/327993273962160/)事を挙げておきます。:

> P3Pを立ち上げた組織であるW3Cがこの活動を何年か前にやめてしまったために多くのモダンなブラウザはP3Pをフルサポートしていません。その結果P3P標準はすでに時代遅れであり、現在Webで使われている技術を反映していません。だから多くのWebサイトが現在のところP3Pに対応していないのです。
> 
> 以下もご覧ください: http://www.zdnet.com/blog/facebook/facebook-to-microsoft-p3p-is-outdated-what-else-ya-got/9332


### SailsでP3Pに対応する

そういうことはさておき、時にはP3Pをサポートしなければならない時もあります。

幸いP3P関連のヘッダーを有効化することでSailsとExpressでP3P対応をすることのできるモジュールはいくつかあります。これらのモジュールを使ってP3Pヘッダを扱うためには以下の説明ししたがってnpmを使ってモジュールをインストールしてからプロジェクトの`config/http.js`を開いてカスタムのミドルウエアとして追加してください。これを行うにはお使いのP3Pミドルウエアを"p3p"として定義して"p3p"の文字列を`middleware.order`のミドルウエアチェーンの中の任意の場所に追加してください。（`cookieParser`の直前が良いでしょう。）:

`config/http.js`で:

```js
// .....
module.exports.http = {

  middleware: {
  
    p3p: require('p3p')(p3p.recommmended), // <==== set up the custom middleware here and named it "p3p"

    order: [
      'startRequestTimer',
      'p3p', // <============ configured the order of our "p3p" custom middleware here
      'cookieParser',
      'session',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
    // .....
  }
};
```


より詳しくは以下の例をご覧ください。また、お使いのモジュールの最新情報、互換性分析や最新のバグフィックス、高度な利用方法に関しては以下のリンク先にアクセスして各モジュールのドキュメントをご確認ください。


##### [node-p3p](https://github.com/troygoode/node-p3p)を使う

> `node-p3p`は[MIT license](https://github.com/troygoode/node-p3p/blob/master/LICENSE)で利用できるオープンソースです.

```sh
# In your sails app
npm install p3p --save
```

そして`config/http.js`の`middleware`設定オブジェクトで:

```js
  // ...
  // node-p3p provides a recommended compact privacy policy out of the box
  p3p: require('p3p')(require('p3p').recommended)
  // ...
```


##### [lusca](https://github.com/krakenjs/lusca#luscap3pvalue)を使う

> `lusca`は[Apache license](https://github.com/krakenjs/lusca/blob/master/LICENSE.txt)で利用できるオープンソースです.

```sh
# In your sails app
npm install lusca --save
```

そして`config/http.js`の`middleware`設定オブジェクトで:

```js
  // ...
  // "ABCDEF" ==> The compact privacy policy to use.
  p3p: require('lusca').p3p('ABCDEF')
  // ...
```


### 追加資料: 

+ [Description of the P3P Project (Microsoft)](http://support.microsoft.com/kb/290333)
+ ["P3P Work suspended" (W3C)](http://www.w3.org/P3P/)
+ [P3P Compact Specification (CompactPrivacyPolicy.org)](http://compactprivacypolicy.org/compact_specification.htm)

<docmeta name="uniqueID" value="P3P183449">
<docmeta name="displayName" value="P3P">

