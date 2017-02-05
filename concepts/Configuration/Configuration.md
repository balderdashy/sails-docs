# Configuration

### Vue d'ensemble

Alors que Sails adhère scrupuleusement à la philosophie de [la convention plutôt que la configuration](https://fr.wikipedia.org/wiki/Convention_plut%C3%B4t_que_configuration), il est important de comprendre comment personnaliser ces valeurs par défaut de temps en temps. Dans Sails, il existe pratiquement dans toutes les conventions un ensemble d'options de configuration qui vous permettent d'ajuster ou de surcharger les choses en fonction de vos besoins.

> Vous êtes ici à la recherche d'un configuration particuliére ? Rendez-vous sur [Référence > Configuration](sailsjs.com/docs/reference/configuration) pour afficher un guide complet de toutes les options de configuration disponibles dans Sails.

Les applications Sails peuvent être [configurées par codage](https://github.com/mikermcneil/sails-generate-new-but-like-express/blob/master/templates/app.js#L15), en spécifiant [des variables d'environnement](https://fr.wikipedia.org/wiki/Variable_d%27environnement) ou des arguments de ligne de commande, en changeant les fichiers locaux ou globaux [`.sailsrc`](http://sailsjs.com/documentation/anatomy/sailsrc.html ), ou (le plus souvent) à l'aide des fichiers de configuration classiques situés dans le dossier [`config/`](http://sailsjs.com/documentation/anatomy/config) des nouveaux projets. La configuration finale (fusionnée) utilisée dans votre application est disponible comme variable globale `sails.config` pendant l'exécution de votre application Sails.

### Les fichiers de configuration standard (`config/*`)

Par défaut, un certain nombre de fichiers de configuration sont générés dans toute nouvelle application Sails. Ces fichiers boilerplate incluent un certain nombre de commentaires, qui sont là pour vous servir de référence rapide et vous éviter à avoir à sauter entre les documents et votre éditeur de texte.

Dans la plupart des cas, les clés de niveau supérieur de l'objet `sails.config` (par exemple,` sails.config.views`) correspondent à un fichier de configuration particulier de votre application (par exemple `config/views.js`); Cependant les paramètres de configuration peuvent être arrangés comme vous le souhaitez dans les fichiers de votre répertoire `config/`. La partie importante est le nom (c'est-à-dire la clé) du paramètre, et non le fichier dont il provient.

Par exemple, disons que vous ajoutez un nouveau fichier, `config/foo.js`:

```js
// config/foo.js
// L'objet ci-dessous sera fusionné en `sails.config.blueprints`:
module.exports.blueprints = {
  shortcuts: false
};
```
Pour obtenir une référence exhaustive des options de configuration individuelles et du fichier dans lequel elles se trouvent par défaut, consultez les pages de référence de cette section ou consultez ["`config/`"](http://sailsjs.com/documentation/anatomy/config) dans [L'anatomie d'une application Sails](http://sailsjs.com/documentation/anatomy) pour avoir une vue d'ensemble.

### Fichiers spécifiques à l'environnement (`config/env/*`)

Les paramètres spécifiés dans les fichiers de configuration standard sont généralement disponibles dans tous les environnements (développement, production, test, etc.). Si vous souhaitez que certains paramètres prennent effet uniquement dans certains environnements, vous pouvez utiliser les fichiers spéciaux et les dossiers spécifiques à l'environnement:

* Tous les fichiers sous le dossier `/config/env/<environment-name>` seront chargés *uniquement* lorsque Sails est démarrée dans l'environnement `<environment-name>`. Par exemple, les fichiers sauvegardés sous `config/env/production` ne seront chargés que lorsque Sails est démarrée en mode production.
* Tous les fichiers sous `config/env/<environment-name>.js` seront chargés *uniquement* lorsque Sails est démarrée dans l'environnement `<environment-name>` et seront fusionnés au-dessus de tous les paramètres chargés depuis le sous-dossier spécifique à l'environnement. Par exemple, les paramètres de `config/env/production.js` auront une priorité sur ceux des fichiers du dossier `config/env/production`.

Par défaut, votre application s'exécute dans l'environnement de développement. L'approche recommandée pour modifier l'environnement de votre application consiste à utiliser la variable d'environnement `NODE_ENV`:
```
NODE_ENV=production node app.js
```

> L'environnement de `production` est spécial-- selon votre configuration, il permet la compression, la mise en cache, la minification, etc.
>
> Notez également que si vous utilisez `config/local.js`, la configuration exportée dans ce fichier a priorité sur les fichiers de configuration spécifiques à l'environnement.

### Le fichier `config / local.js`

Vous pouvez utiliser le fichier `config/local.js` pour configurer une application Sails pour votre environnement local (votre ordinateur portable, par exemple). Les paramètres de ce fichier ont priorité sur tous les autres fichiers de configuration à l'exception de [.sailsrc](http://sailsjs.com/documentation/concepts/Configuration/usingsailsrcfiles.html). Comme ils sont destinés uniquement à une utilisation locale, ils ne doivent pas être mis sous contrôle de version (et sont inclus dans le fichier `.gitignore` par défaut pour cette raison). Utilisez `local.js` pour stocker les paramètres de la base de données locale, modifier le port utilisé lors du démarrage d'une application sur votre ordinateur, etc.

Pour plus d'informations, voir [http://sailsjs.com/documentation/concepts/Configuration/localjsfile.html](http://sailsjs.com/documentation/concepts/Configuration/localjsfile.html).

### Accès à `sails.config` dans votre application

L'objet `config` est disponible sur l'instance de l'application Sails (`sails`). Par défaut, il est exposé sur [une portée globale](http://sailsjs.com/documentation/concepts/Globals) au cours du démarrage et, par conséquent, disponible partout dans votre application.

##### Example
```javascript
// Cet exemple vérifie que, si nous sommes en mode production, csrf est activé.
// Il lance une erreur et bloque l'application sinon.
if (sails.config.environment === 'production' && !sails.config.csrf) {
  throw new Error('STOP ! CSRF doit toujours être activé en production !');
}
```

### Définition des valeurs `sails.config` directement à l'aide de variables d'environnement

Outre l'utilisation des _fichiers_ de configuration, vous pouvez définir des valeurs de configuration individuelles en ligne de commande lorsque vous lancez Sails en préfixant les noms des clés de configuration avec `sails_` et en séparant les noms de clés imbriquées par des doubles soulignements (`__`). Par exemple, vous pouvez effectuer les opérations suivantes pour définir l'origine [CORS](http://sailsjs.com/documentation/concepts/security/cors) (`sails.config.cors.origin`) à "http://mondomaine.com" en ligne de commande :

```javascript
sails_cors__origin="http://mondomaine.com" sails lift
```
Cette valeur sera effective _seulement_ pendant la durée de vie de cette instance Sails en particulier et surchargera toutes les valeurs dans les fichiers de configuration.

> Il existe quelques exceptions spéciales à la règle: `NODE_ENV` et` PORT`.
> + `NODE_ENV` est une convention pour toute application Node.js. Lorsqu'elle est définie sur `'production'`, elle définit [`sails.config.environment`](http://sailsjs.com/documentation/reference/configuration/sails-config#?sailsconfigenvironment).
> + De même, `PORT` est juste une autre façon de définir [`sails.config.port`](http://sailsjs.com/documentation/reference/configuration/sails-config#?sailsconfigport). C'est strictement pour la commodité et la retro-compatibilité.
>
> Voici un exemple relativement courant où vous pouvez utiliser ces deux variables d'environnement en même temps :
>
> ```bash
> PORT=443 NODE_ENV=production sails lift
> ```

### Configuration personnalisée
Sails reconnaît de nombreux paramètres différents, les espaces de noms étant placés sous différentes clés de niveau supérieur (par exemple, `sails.config.sockets` et `sails.config.blueprints`). Cependant, vous pouvez également utiliser `sails.config` pour votre propre configuration personnalisée (par exemple, `sails.config.someProprietaryAPI.secret`).

##### Exemple

```javascript
// config/linkedin.js
module.exports.linkedin = {
  apiKey: '...',
  apiSecret: '...'
};
```

```javascript
// Dans votre controller/service/model/hook/whatever:
// ...
var apiKey = sails.config.linkedin.apiKey;
var apiSecret = sails.config.linkedin.apiSecret;
// ...
```

### Configuration de l'interface de ligne de commande `sails` (CLI)

Lorsqu'il s'agit de configuration, la plupart du temps, vous vous concentrez sur la gestion des paramètres d'exécution d'une application particulière: le port, les connexions à la base de données, etc. Cependant, il peut également être utile de personnaliser la CLI Sails elle-même; Pour simplifier votre flux de travail, réduire les tâches répétitives, effectuer l'automatisation de la construction personnalisée, etc. Heureusement, Sails v0.10 a ajouté un nouvel outil puissant pour le faire.

Le fichier [`.sailsrc`](http://sailsjs.com/documentation/anatomy/sailsrc.html) est différent des autres fichiers de configuration de Sails car il peut également être utilisé pour configurer la CLI de Sails, soit pour le système en totalité, pour un groupe de répertoires, ou seulement lorsque vous êtes dans un dossier particulier. La raison principale pour cela est de personnaliser les [générateurs](http://sailsjs.com/documentation/concepts/extended-sails/Generators) qui sont utilisés lorsque `sails generate` et `sails new` sont exécutés, mais il peut également être utile d'installer vos propres générateurs personnalisés ou appliquer des surcharges de configuration codés en dur.

Et puisque Sails recherchera le `.sailsrc` le plus proche dans les répertoires parents, vous pouvez utiliser ce fichier en toute sécurité pour configurer des paramètres sensibles que vous ne pouvez pas enregistrer dans votre référentiel de code (comme votre **mot de passe de base de données**_.) Il suffit d'inclure un fichier `.sailsrc` dans votre répertoire "$HOME". Pour plus d'informations, voir [la documentation de `.sailsrc`] (http://sailsjs.com/documentation/anatomy/sailsrc.html.

### Remarques
> Les paramètres de `sails.config` ne sont, dans certains cas, interprétés que par Sails lors du processus "lift". En d'autres termes, la modification de certaines options au moment de l'exécution n'aura aucun effet. Pour changer le port sur lequel votre application s'exécute, par exemple, vous ne pouvez pas simplement changer `sails.config.port` - vous devrez modifier ou remplacer le paramètre dans un fichier de configuration ou en argument de ligne de commande, etc., puis redémarrez le serveur.

<docmeta name="displayName" value="Configuration">
