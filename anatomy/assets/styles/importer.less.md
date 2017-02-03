# assets/styles/importer.less
### Objectif

Par défaut, les nouveaux projets Sails sont configurés pour compiler ce fichier de LESS à CSS. Contrairement aux fichiers CSS, les fichiers LESS ne sont pas compilés et inclus automatiquement, sauf s'ils sont importés ci-dessous.

Les fichiers LESS importés ci-dessous sont compilés et inclus dans l'ordre dans lequel ils sont répertoriés. Mixins, variables, etc. doivent être importés en premier afin qu'ils puissent être accédés par des feuilles de style LESS ultérieures.

(Tout comme le reste du pipeline d'assets dans Sails, vous pouvez toujours omettre, personnaliser ou remplacer ce comportement par SASS, SCSS ou toute autre tâche Grunt que vous aimez.)

<docmeta name="displayName" value="importer.less">

```
/**
 * importer.less
 *
 * By default, new Sails projects are configured to compile this file
 * from LESS to CSS.  Unlike CSS files, LESS files are not compiled and
 * included automatically unless they are imported below.
 *
 * The LESS files imported below are compiled and included in the order
 * they are listed.  Mixins, variables, etc. should be imported first
 * so that they can be accessed by subsequent LESS stylesheets.
 *
 * (Just like the rest of the asset pipeline bundled in Sails, you can
 * always omit, customize, or replace this behavior with SASS, SCSS,
 * or any other Grunt tasks you like.)
 */



// For example:
//
// @import 'variables/colors.less';
// @import 'mixins/foo.less';
// @import 'mixins/bar.less';
// @import 'mixins/baz.less';
//
// @import 'styleguide.less';
// @import 'pages/login.less';
// @import 'pages/signup.less';
//
// etc.

```
