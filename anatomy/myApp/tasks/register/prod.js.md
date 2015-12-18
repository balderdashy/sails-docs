# myApp/tasks/register/prod.js


```
module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    'sails-linker:devTpl',
    'sails-linker:prodJsJade',
    'sails-linker:prodStylesJade',
    'sails-linker:devTplJade'
  ]);
};

```
<docmeta name="displayName" value="prod.js">
