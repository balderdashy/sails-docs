# 既定のタスク

### 概要

Sailsにバンドルされているアセットパイプラインはあなたのプロジェクトをより矛盾がなくより生産的に設計するために一般的なデフォルトを使って実装されたGruntタスクのセットになっています。フロントエンドのアセットワークフローはすべてデフォルトのタスクの枠にとらわれずにカスタマイズすることが出来ます。Sailsはあなたのニーズに合わせて簡単に[新しいタスクを作る](/#/documentation/concepts/Assets/TaskAutomation.html?q=task-configuration) ことが出来ます。

例えば以下の様な機能がSailsのデフォルトのGrunt設定として使うことが出来ます。:
- LESSの自動コンパイル
- JITの自動コンパイル
- Coffescriptの自動コンパイル
- その他のアセットの自動注入、最小化、連結
- Web上へアップするためのファイルの作成
- ファイスの監視や同期化
- プロダクション環境でのアセットの最適化

### デフォルトのGruntタスクの振る舞い

以下にSailsプロジェクトに含まれているGruntタスク関して何をするのかを簡潔に記しました。また、それぞれのタスクの説明に関しての詳細な説明ページヘのリンクも用意しました。

##### clean

> このGruntタスクはプロジェクトの`.tmp/public/`ディレクトリにある内容を消去します。

> [使い方](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> `assest/js/`にあるcoffeeScriptファイルをJavascriptにコンパイルし`.tmp/public/js/`に移動します。

> [使い方](https://github.com/gruntjs/grunt-contrib-coffee)

##### concat

> javascriptとcssをそれぞれ連結し`.tmp/public/concat/`ディレクトリに保存します。

> [使い方](https://github.com/gruntjs/grunt-contrib-concat)

##### copy

> **dev task 設定の時**
> coffescriptとlessファイル以外のすべてのファイルとディレクトリーをSailsのアセットフォルダーから`.tmp/public/`ディレクトリにコピします。

> **build task 設定の時**
> 全てのファイルとディレクトリを`.tmp/public`ディレクトリからwwwディレクトリにコピーします。

> [使い方](https://github.com/gruntjs/grunt-contrib-copy)

##### cssmin

> CSSファイルを最小化し`.tmp/public/min/`ディレクトリに保管します。

> [使い方](https://github.com/gruntjs/grunt-contrib-cssmin)

##### jst

> Underscoreテンプレートをプレコンパイルし`.jst`ファイルにします。(つまり、HTMLテンプレートを小さなJavascriptのFunctionに変換します。）これによってテンプレートレンダリングを高速化させ帯域利用を減少させることが出来ます。

> [使い方](https://github.com/gruntjs/grunt-contrib-jst)

##### less

> LESSファイルをCSSにコンパイルします。`assets/styles/importer.less`のみがコンパイルされます。これにより順序を任意に設定することが出来るようになります。（つまり他のスタイルシートの前にdependencies, mixins, variables, resetsなどをインポートすることが出来ます）

> [使い方](https://github.com/gruntjs/grunt-contrib-less)

##### sails-linker

Javascriptのタグには`<script>`を、CSSファイルには`<link>`を自動的に挿入します。また、`<script>`を使ってプレコンパイル済みのテンプレートに対してリンクを行います。これらに対する詳細な説明は[こちら](https://github.com/balderdashy/sails-generate-frontend/blob/master/docs/overview.md#a-litte-bit-more-about-sails-linking)で確認することが出来ますが、おさえておきたい大切なことはスクリプトとスタイルシートの挿入は`<!--SCRIPTS--><!--SCRIPTS END-->`や`<!--STYLES--><!--STYLES END-->`のタグを含むファイル*のみ*で行われるということです。また、これらは新しく作成したSailsプロジェクトの**views/layout.ejs**にデフォルトで自動的に組み込まれています。もしあなたのプロジェクトでリンカーを使いたくない時は単にこれ他のタグを削除してください

> [使い方](https://github.com/Zolmeister/grunt-sails-linker)

##### sync

> ディレクトリを同期済みにするタスクです。このタスクはgrunt-contrib-copyにとても良く似ていますが、本当に変更されたもののみをコピーしようとします。これは`assets/`フォルダーから`.tmp/public/`へのコピーのみを行い、コピー先に既存のすべてのファイルを上書きします。

> [使い方](https://github.com/tomusdrw/grunt-sync)

##### uglify

> クライントサイドのjavascriptアセットを最小化します。

> [使い方](https://github.com/gruntjs/grunt-contrib-uglify)

##### watch

> ファイルパターンが追加され、編集され、削除された時に毎回予め設定されたスクリプトを実行します。`assets/`フォルダに配置されたファイルを監視し、（例えばLESSやJSTのコンパイルのような）適切なタスクを再実行します。これにより行った編集の結果をSailsを再起動することなく確認することが出来ます。

> [使い方](https://github.com/gruntjs/grunt-contrib-watch)

<docmeta name="uniqueID" value="DefaultTasks764297">
<docmeta name="displayName" value="Default Tasks">

