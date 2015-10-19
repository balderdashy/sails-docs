# myApp/assets/js/dependencies
### 目的
このディレクトリは残りのjsファイルが読み込まれる前にgruntがindex.ejsにjavascriptファイルを読みこませるためのものです。

    js/
    | main.js
    | apple.js
    | dependencies/
    | | sails.io.js

この状態では以下のようにセットアップされます。

    <!--SCRIPTS-->
    <script src="/js/dependencies/sails.io.js"></script>
    <script src="/js/apple.js"></script>
    <script src="/js/main.js"></script>
    <!--SCRIPTS END-->


<docmeta name="uniqueID" value="dependenciesmd334158">
<docmeta name="displayName" value="dependencies">

