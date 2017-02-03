# tasks/config/sync.js

### Objectif

Ce fichier configure une tâche Grunt appelée "sync".

Cette tâche synchronise un répertoire avec un autre (comme rsync). Dans le pipeline des assets de Sails par défaut, il joue un rôle très similaire à `grunt-contrib-copy`, mais copie uniquement les fichiers qui ont effectivement été modifiés depuis la dernière exécution de la tâche.

Plus précisément, son travail consiste à synchroniser les fichiers du dossier `assets/` vers `.tmp/public`, en écrasant tout ce qui existe déjà.


### Utilisation

Pour plus d'informations sur l'utilisation, consultez [`grunt-sync`](https://www.npmjs.com/package/grunt-sync).


<docmeta name="displayName" value="sync.js">
