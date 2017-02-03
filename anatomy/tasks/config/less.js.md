# tasks/config/less.js

### Objectif

Ce fichier configure une tâche Grunt appelée "less".

Son travail consiste à compiler vos fichiers LESS en feuille de style CSS.

Par défaut, seul le fichier `assets/styles/importer.less` est compilé. Cela vous permet de contrôler la commande elle-même, c'est-à-dire d'importer vos dépendances, mixins, variables, réinitialisations, etc. avant vos autres styles spécifiques à l'application. C'est entièrement à vous, et basé sur l'ordre avec lequel écrivez votre `@import`s dans votre fichier LESS.

### Mais je n'utilise pas LESS ...

Pas de problème!

Si vous n'utilisez _aucun_ préprocesseur pour vos feuilles de style, ignorez simplement ce fichier.

Si vous souhaitez utiliser un pré-processeur différent comme [SASS](http://sass-lang.com/) ou [Stylus](http://stylus-lang.com/), et que vous souhaitez que Sails traite votre CSS automatiquement pendant que vous travaillez, alors vous avez dans la chance. Dans la plupart des cas, il est aussi simple que d'installer le plug-in Grunt approprié en tant que dépendance de votre application Sails, puis de la configurer pour afficher le CSS compilé sur le même chemin que dans cette tâche par défaut.

Voici quelques exemples populaires:

+ [Grunt-sass](http://npmjs.com/package/grunt-sass)
+ [Grunt-contrib-stylus](https://npmjs.com/package/grunt-contrib-stylus)

### Utilisation

Pour plus d'informations, reportez-vous à la section [`grunt-contrib-less`](https://npmjs.com/package/grunt-contrib-less).



<docmeta name="displayName" value="less.js">
