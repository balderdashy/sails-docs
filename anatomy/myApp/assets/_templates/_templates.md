# myApp/assets/templates
### 目的 - クライアントサイドテンプレート

HTMLテンプレートはモダンなリッチクライアントアプリケーションにとっての必須の機能です。
それらの魔法を使ってBackbone、Angular、Ember、Knockoutといったフレームワークを使うには
それらのテンプレートクライアントサイドに読み込まなければいけません。

デフォルトでGruntfileファイルは`assets/templates`クライアントサイドのJSTテンプレートを
自動的に読み込み、プレコンパイルし、その後
自動的にここに（TEMPLATESとTEMPLATES ENDの間に）読み込みます。

    <!--TEMPLATES-->
        
    <!--TEMPLATES END-->

この振る舞いを必要に応じて変えるには単にGruntfileをご覧ください。
例えば、以下が出来ることの一部です:

- 別のディレクトリからテンプレートを読み込む
- 別のテンプレートエンジンを使う(handlebars、jade、dustなど)
- サーバサイドのstringfileを使ってクライアントサイドコードを提供前に国際化する

<docmeta name="uniqueID" value="templatesmd846667">
<docmeta name="displayName" value="templates">

