# Gruntfile.js

### Objectif

Sails utilise [Grunt](http://gruntjs.com) pour la gestion des assets. Ce fichier contient le point d'entrée pour le pipeline d'asset par défaut dans Sails; C'est-à-dire le code qui fait des choses comme la compilation de feuilles de style LESS,  scripts de minification pour la production, et la précompilation et l'injection de templates côté client.

L'intégration de Sails avec Grunt est entièrement personnalisable, mais pour la plupart des cas d'utilisation, ce fichier (`Gruntfile.js`) devrait rester inchangé. Au lieu de cela, vous pouvez installer des plugins Grunt ou ajouter votre propre logique personnalisée dans des nouveaux fichiers dans le dossier [`tasks/`] (./tasks).

> + Pour en savoir plus sur le fonctionnement des assets statiques dans Sails, consultez [Documentation conceptuelle sur les assets](http://sailsjs.com/documentation/concepts/assets).
> + Pour une introduction plus générale aux tâches Grunt en général, voir [Documentation Grunt sur la configuration des tâches](http://gruntjs.com/configuring-tasks).


<docmeta name="displayName" value="Gruntfile.js">
