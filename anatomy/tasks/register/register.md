# tasks/register/

### Objectif

Ce dossier contient les tâches Grunt que Sails exécute par défaut.

Pour plus d'informations, voir [Assets > Automatisation des tâches > Déclencheurs de tâches](http://sailsjs.com/documentation/concepts/assets/task-automation#?task-triggers).

> Pour exécuter une liste de tâches personnalisée, créez un fichier dans ce répertoire et définissez [`sails.config.environment`](http://sailsjs.com/documentation/reference/configuration/sails-config#?sailsconfigenvironment) pour faire correspondre au nom celui-ci. Par exemple, si la configuration `environment` de Sails est configurée sur "qa", alors quand vous relancez, au lieu de `tasks/register/default.js` ou `tasks/register/prod.js`, Sails va _nstead_ exécuter` tasks / Register / qa.js`. (S'il n'existe pas, `default.js` sera exécuté à la place.)

<docmeta name="displayName" value="register">

