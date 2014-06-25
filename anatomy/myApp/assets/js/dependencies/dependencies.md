# myApp/assets/js/dependencies
### Purpose
This directory allows grunt to load javascript files in index.ejs before the rest of the javascript files in the js directory.

    js/
    | main.js
    | apple.js
    | dependencies/
    | | sails.io.js

This setup will create

    <!--SCRIPTS-->
    <script src="/js/dependencies/sails.io.js"></script>
    <script src="/js/apple.js"></script>
    <script src="/js/main.js"></script>
    <!--SCRIPTS END-->


<docmeta name="uniqueID" value="dependenciesmd334158">
<docmeta name="displayName" value="dependencies">

