# tasks/register/prod.js


<docmeta name="displayName" value="prod.js">

La liste de tâches grunt de production. Sails exécutera cette opération si aucun fichier de liste de tâches ne correspond à NODE_ENV (par exemple, NODE_ENV=QA et QA.js existent).

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
