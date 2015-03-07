# タスクの自動化

### 概要

[`tasks/`](./#!documentation/anatomy/tasks)ディレクトリには[Gruntタスク](http://gruntjs.com/creating-tasks)とその[設定ファイル](http://gruntjs.com/configuring-tasks)がまとめられて入っています。

タスクは主にフロントエンドのアセットをバンドルする(例えばスタイルシートやスクリプト、クライアントサイドマークアップテンプレートなど）のに利用されますがその他にも[browserify](https://github.com/jmreidy/grunt-browserify)のcompilationから[データベースマイグレーション](https://www.npmjs.org/package/grunt-db-migrate)に至るまで様々な開発中の細々とした仕事を自動化するためにも使えます。

Sailsは簡便のためにいくつかの[デフォルトのタスク](./#!documentation/grunt/default-tasks) をバンドルしていますが文字通り数百ものプラグインが利用でき、これによってすべての雑用を最小限の手数で完了することが出来ます。もしもあなたが使いたいタスクがなかったら自分で[Gruntのプラグインを作って](http://gruntjs.com/creating-tasks)それを[npm](http://npmjs.org)に載せることも出来ます。

> 今までに[Grunt](http://gruntjs.com/)を使ったことがない方は[Getting Started](http://gruntjs.com/getting-started)ガイドを見てください。そこには[Gruntfile](http://gruntjs.com/sample-gruntfile) の書き方やインストール方法が書かれています。


### アセットパイプライン

アセットパイプラインはビューに挿入されるアセットを整形する部分であり、`tasks/pipeline.js`ファイルに記述されます。これらのアセットを設定するにはGruntに[タスクファイル](http://gruntjs.com/configuring-tasks#files)タスクファイル設定と[wildcard/glob/splaのパターン](http://gruntjs.com/configuring-tasks#globbing-patterns)を使うだけで簡単にできます。これらは3つの部分からなります。

##### CSSファイルの挿入
ここではHTMLに`<link`>タグとして挿入されるCSSファイルを指定します。これらのタグは全てのビューの`<!--STYLES--><!--STYLES END-->`コメントの間に挿入されます。

##### Javascriptファイルの挿入
ここではHTMLに`<script`>タグとして挿入されるCSSファイルを指定します。これらのタグは全てのビューの`<!--STYLES--><!--STYLES END-->`コメントの間に挿入されます。各ファイルは配列の並び順に基づいて挿入されます。（すなわち依存するファイルのパスの前に依存されるファイルのパスを入れなければなりません）

##### テンプレートファイルの挿入
ここではjstファンクションにコンパイルされjst.jsファイルに保存されるhtmlファイルの配列を指定します。このファイルはその後`<script>`タグとしてHTMLの`<!--TEMPLATES--><!--TEMPLATES END-->`コメントの間に挿入されます。

> 同じGruntのwildcard/glob/splatとタスク設定ファイルはいくつかのタスク設定jsファイル自体でで使われていますので変更を加えたいときはそれらも同様に編集してください。

### タスクの設定

設定済みのタスクはGruntfileが実行されたとき適用されるルールをまとめたものです。これら[`tasks/config/`](/#/documentation/anatomy/myApp/tasks/config)にあり、完全にカスタマイズ可能です。あなたの使いたい用途に合わせてこれたのGruntファイルのうち全てを編集し、省略し、また置き換えることが出来ます。同様に`someTask.js`のようなファイルをこのディレクトリに追加し他の適切なタスクと一緒に登録することで(`grunt/register/*.js`のファイルを参照してください。)あなた自身のGruntファイルを作成することも出来ます。なおSailsは特段の設定なしに起動できるように便利なデフォルトのタスクのセットを持っているということも忘れずにいてください。

##### カスタムのタスクを設定する

プロジェクトにカスタムのタスクを設定するのはとてもシンプルで、Gruntの[設定](http://gruntjs.com/api/grunt.config)と[タスク](http://gruntjs.com/api/grunt.task)APIを使うことでタスクをモジュールにすることが出来ます。既存のタスクを置き換えて新しいタスクを作成する例を見てみましょう。デフォルトで設定されているunderscoreの代わりに[Handlebars](http://handlebarsjs.com/)をテンプレートエンジンとして使いたいとします。:

* まずはじめに以下のコマンドをターミナルで実行することでHandlebarsのGruntプラグインをインストールするところから始めます。:

```bash
npm install grunt-contrib-handlebars --save-dev
```

* `tasks/config/handlebars.js`に設定ファイルを作成します。これはhandlebarsの設定を入れるところです。 

```javascript
// tasks/config/handlebars.js
// --------------------------------
// handlebar task configuration.

module.exports = function(grunt) {

  // We use the grunt.config api's set method to configure an
  // object to the defined string. In this case the task
  // 'handlebars' will be configured based on the object below.
  grunt.config.set('handlebars', {
    dev: {
      // We will define which template files to inject
      // in tasks/pipeline.js 
      files: {
        '.tmp/public/templates.js': require('../pipeline').templateFilesToInject
      }
    }
  });

  // load npm module for handlebars.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
};
```

* アセットパイプラインにおけるソースファイルのパス設定を書き換えます。ここでの唯一の変更点はunderscoreのテンプレートはシンプルなHTMLファイルの中に入れれるのに対してhandelbarsは.hbs拡張子のファイルを参照するということです。

```javascript
// tasks/pipeline.js
// --------------------------------
// asset pipeline

var cssFilesToInject = [
  'styles/**/*.css'
];

var jsFilesToInject = [
  'js/socket.io.js',
  'js/sails.io.js',
  'js/connection.example.js',
  'js/**/*.js'
];

// We change this glob pattern to include all files in
// the templates/ direcotry that end in the extension .hbs
var templateFilesToInject = [
  'templates/**/*.hbs'
];

module.exports = {
  cssFilesToInject: cssFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
  }),
  jsFilesToInject: jsFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
  }),
  templateFilesToInject: templateFilesToInject.map(function(path) {
    return 'assets/' + path;
  })
};
```

* compileAssetsとsyncAssetsの登録済みタスクににhanldebarsのタスクをインクルードします。ここはjstタスクが使われるところですが、これを新しく設定したhandlebarsで置き換えます。

```javascript
// tasks/register/compileAssets.js
// --------------------------------
// compile assets registered grunt task

module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'handlebars:dev',       // changed jst task to handlebars task
    'less:dev',
    'copy:dev',
    'coffee:dev'
  ]);
};

// tasks/register/syncAssets.js
// --------------------------------
// synce assets registered grunt task

module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'handlebars:dev',      // changed jst task to handlebars task
    'less:dev',
    'sync:dev',
    'coffee:dev'
  ]);
};
```

* jstタスクの設定を削除します。我々はすでにtasks/config/jst.jsを必要としないのでこれを削除することが出来ます。単にプロジェクトから削除するだけで構いません。

> 理想的にはこれをプロジェクトとプロジェクトのnode dependenciesから削除します。これは以下のコマンドを実行することで行えます。
```bash
npm uninstall grunt-contrib-jst --save-dev
```

### Task triggers

[デベロップメントモード](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.local.html?q=environment)においてはSailsは`default`のタスク([`tasks/register/default.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register/default.js.html))を実行します。これはLESSやCoffeeScript、クライアントサイドのJSTテンプレートをコンパイルし、アプリケーションの動的なビューと静的なHTMLページにリンクします。

本番環境においてはSailsは`prod`のタスク([`tasks/register/prod.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register/prod.js.html))を実行し、これはこれは`default`のタスクに加えてアプリケーションのスタイルシートスクリプトを最小化します。これによりアプリケーションの読み込み時間と利用帯域を節約することが出来ます。

これらのタスクのトリガーは[`tasks/register/`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/tasks/register)フォルダーにある[Gruntの"basic"タスク](http://gruntjs.com/creating-tasks#basic-tasks)に有ります。以下にSailsの全てのタスクトリガーとそれぞれが走らせるコマンドのリファレンスを説明します。:

##### `sails lift`

**default**のタスクを実行します。 (`tasks/register/default.js`).

##### `sails lift --prod`

**prod**のタスクを実行します。 (`tasks/register/prod.js`).

##### `sails www`

**build**タスクを実行します。 (`tasks/register/build.js`).

##### `sails www --prod` (production)

**buildProd**タスクを実行します。 (`tasks/register/buildProd.js`).

<docmeta name="uniqueID" value="TaskAutomation282238">
<docmeta name="displayName" value="Task Automation">

