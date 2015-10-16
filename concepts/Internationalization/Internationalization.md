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



### 追加のオプション

国際化とローカライゼーションの設定は [`sails.config.i18n`](http://sailsjs.org/documentation/reference/sails.config/sails.config.i18n.html)で設定されています。このファイルを編集する典型的な例はあなたのアプリケーションのサポートする言語や翻訳ファイルの位置を変更する時です。:

```javascript
// どのロケールがサポートされますか?
locales: ['en', 'es'],

// 翻訳がいるはどこに置かれていますか?
localesDirectory: '/config/locales'
```




### Sailのデフォルトの国際化サポートを無効化、もしくはカスタマイズする。

もちろんプロジェクトの中のどこでも好きなNodeモジュールを`require()`して、好きな国際化の方法を取ることが出来ます。

しかし、ここで理解するに値すべきことはSailsは[node-i18n](https://github.com/mashpie/i18n-node)の実装を[i18n hook](http://sailsjs.org/documentation/concepts/Internationalization)で行っているので[`loadHooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md)や[`hooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) の設定を使ってこれを完全に無効化したり、オーバライドすることが出来ます。


### クライアントでの国際化に関して

ここに上げたテクニックはサーバーサイドのビューではとてもうまく動きます。しかし、静的なテンプレートをCDNや静的ホストから提供するリッチクライアント、（例えばパフォーマンス重視のSPAやPhonegapアプリやGoogleエクステンションなど）ではどうでしょうか。

実はSailsのi18nサポートは翻訳済みのテンプレートをブラウザに届ける際にも再利用することが出来ます。もしSailの国際化機能を_クライアントサイドテンプレート_で使いたいときはフロントエンドテンプレートを`/views`のサブディレクトリに配置してください。
+ 開発モードでは、Sailsプロジェクトですでにデフォルトでインストールされているgrunt-contrib-watchによってテンプレートファイルが編集されたり、文字列ファイルが編集されるたびに、テンプレートアイルを翻訳してプレコンパイルしなおさなければなりません。
+ プロダクションモードではlift()を行う時点で全てのテンプレートが翻訳され、プレコンパイルされることになります。読み込み時間を気にする用途（例えばモバイルWebアプリケーション）では翻訳され、プレコンパイルされ、最小化されたテンプレートをCloudfrontのようなCDNにアップロードして更なるパフォーマンスの追求を行うことが出来ます。


<docmeta name="displayName" value="Internationalization">
