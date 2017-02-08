# Les messages de log personnalisés

Il est souvent utile d'émettre des messages ou des événements de log personnalisés à partir du code de votre application; Si vous traquez le statut des e-mails outbound envoyés ou si vous cherchez simplement une alternative configurable à l'appel de [`console.log ()`](https://nodejs.org/api/console.html#console_console_log_data) dans votre code d'application.

Pour plus de commodité, Sails expose son interface de log interne `sails.log`. Son utilisation est très similaire à `console.log ()` celui de Node, mais avec une poignée de fonctionnalités supplémentaires; À savoir la prise en charge de plusieurs niveaux de log et d'un affichage coloré et préfixé de la console.

Pour plus d'informations et exemples sur les options de configuration, voir [sails.log()](http://sailsjs.com/documentation/reference/application/sails-log) ou [sails.config.log](http://sailsjs.com/documentation/reference/configuration/sails-config-log).

## Les méthodes disponibles

Chacune des méthodes de log ci-dessous accepte un nombre infini d'arguments de n'importe quel type de données, séparés par des virgules. Tout comme `console.log`, les données passées en argument au logger Sails sont automatiquement préconfigurées pour la lisibilité à l'aide de [`util.inspect()`](http://nodejs.org/api/util.html#util_util_inspect_object_options) de Node. Par conséquent, les conventions Node.js standard s'appliquent; _tous les_ dictionnaires, les erreurs, les dates, les tableaux ou d'autres types de données sont bien imprimés en utilisant la logique intégrée de [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options) (Par exemple, vous voyez `{chat: {nom: 'kitty'}}` au lieu de `[object Object]`.) De plus, si vous enregistrez un objet qui a une méthode `inspect()` personnalisée, le logger exécutera cette méthode automatiquement et écrira la chaîne qu'il retourne à la console.


### sails.log.error()

Cette méthode écrit dans `stderr` (sortie d'erreur standard) au niveau "error". C'est utile pour le suivi des erreurs majeures.

```js
sails.log.error('Envoie d\'une réponse d\'erreur 500 ("Erreur serveur").');
// -> Envoie d'une réponse d'erreur 500 ("Erreur serveur").
```

### sails.log.warn()

Cette méthode écrit dans `stderr` (sortie d'erreur standard) au niveau "warn". C'est utile pour suivre les informations sur les opérations qui ont échoué silencieusement.

```js
sails.log.warn('Le quota d\'upload de fichier a été dépassé pour l\'utilisateur #%d. Requête annulée.', utilisateur.id);
// -> warn: Le quota d\'upload de fichier a été dépassé pour l'utilisateur #94271. Requête annulée.
```


### sails.log()

_aka sails.log.debug()_

Cette méthode écrit dans `stderr` (sortie d'erreur standard) au niveau "debug". C'est utile pour partager une information technique importante avec votre équipe; Ou comme une alternative générale à `console.lo ()`.

```js
sails.log('La route (`POST /accounts`) sera dépréciée dans les prochains jours. Utiliser `POST /signup` à la place.');
// -> debug: La route (`POST /accounts`) sera dépréciée dans les prochains jours. Utiliser `POST /signup` à la place.
```


### sails.log.info()

Cette méthode écrit dans `stdout` (sortie standard) au niveau "info". C'est utile pour capturer des informations sur la logique métier de votre application.

```js
sails.log.info('Un nouvel utilisateur (', utilisateur.email, ') vient de s\'inscrire !');
// -> info: Un nouvel utilisateur (robert@mail.com) vient de s\'inscrire !
```


### sails.log.verbose()


Cette méthode écrit dans `stdout` (sortie standard) au niveau "verbose". C'est utile pour capturer des informations détaillées sur votre application dont vous avez rarement besoin.

```js
sails.log.verbose('Un utilisateur (adresse IP: `%s`) a lancé un transfert de compte ...', req.ip);
// -> verbose: Un utilisateur (adresse IP: `10.48.1.191`) a lancé un transfert de compte ...
```


### sails.log.silly()


Cette méthode écrit dans `stdout` (sortie standard) au niveau "silly". C'est utile pour capturer des détails techniques sur votre application qui ne sont utiles que pour le diagnostic et/ou le dépannage.

```js
sails.log.silly(
'Récupération d\'un enregistrement de compte de l\'utilisateur authentifié (`%d`).',
'Temps %dms.', req.param('id'), msElapsed);
// -> silly: Récupération d'un enregistrement de compte de l'utilisateur authentifié (`49722`). Temps 41ms.
```




<docmeta name="displayName" value="Les messages de log personnalisés">

