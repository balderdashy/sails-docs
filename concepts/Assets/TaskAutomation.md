# Automatisation des tâches

### Vue d'ensemble

Le répertoire [`tasks/`](http://sailsjs.com/documentation/anatomy/tasks) contient une suite de [tâches Grunt](http://gruntjs.com/creating-tasks) et leurs [configurations]( Http://gruntjs.com/configuring-tasks).

Les tâches sont principalement utiles pour regrouper des ressources frontales (comme les feuilles de style, les scripts et les templates côté-client), mais elles peuvent également être utilisées pour automatiser toutes sortes de tâches de développement répétitives, de [browserify](https://github.com/jmreidy/grunt-browserify) jusqu'à la [migration de base de données](https://www.npmjs.org/package/grunt-db-migrate).

Sails regroupe certaines [tâches par défaut](http://sailsjs.com/documentation/grunt/default-tasks) pour plus de commodité, mais avec la disponibilité d'une centaine de [plugins](http://gruntjs.com/plugins), Vous pouvez utiliser des tâches pour automatiser toute chose avec un effort minimal. Si quelqu'un n'a pas déjà développé ce dont vous avez besoin, vous pouvez toujours [créer](http://gruntjs.com/creating-tasks) et [publier votre propre plugin Grunt](http://gruntjs.com/creating-plugins ) À [npm](http://npmjs.org)!

> Si vous n'avez pas utilisé [Grunt](http://gruntjs.com/) avant, assurez-vous de consulter ce guide [Grunt] (http://gruntjs.com/getting-started), car il explique comment créer un [Gruntfile](http://gruntjs.com/sample-gruntfile), l'installer et utiliser les plugins Grunt.

### Pipeline d'assets

Le pipeline d'assets est l'endroit où vous allez organiser les éléments qui seront injectés dans vos vues et qui se trouvent dans le fichier `tasks/pipeline.js`. La configuration de ces éléments est simple et utilise la [configuration des tâches grunt](http://gruntjs.com/configuring-tasks#files) et [wildcard/glob/splat patterns] (http://gruntjs.com/configuring-tasks# Globbing-patterns). Ils sont répartis en trois sections.

##### Fichiers CSS à injecter
Il s'agit d'un tableau des fichiers css à injecter dans votre html en tant que balises `<link>`. Ces balises seront injectées entre les commentaires de `<!--STYLES--><!--STYLES END-->` dans n'importe quelle vue dans laquelle ils apparaissent.

##### Fichiers Javascript à injecter
Il s'agit d'un tableau des fichiers Javascript à injecter dans votre html en tant que balises `<script>`. Ces balises seront injectées entre les commentaires `<!--SCRIPTS--><!--SCRIPTS END-->` dans n'importe quelle vue dans laquelle ils apparaissent. Les fichiers sont injectés dans l'ordre dans lequel ils se trouvent dans le tableau (c'est-à-dire que vous devez placer le chemin des dépendances avant le fichier qui en dépend).

##### Fichiers de templates à injecter
Il s'agit d'un tableau des fichiers html qui sera compilé dans une fonction jst et placé dans un fichier `jst.js`. Ce fichier est alors injecté comme une balise `<script>` entre les commentaires de `<!--TEMPLATES--><!--TEMPLATES END-->` dans votre html.

> Vous pouvez modifier également ces wildcard/glob/splat Grunt et le fichier de configuration des tâches qui sont utilisés eux même dans certains fichiers js de la configuration des tâches.

### Configuration des tâches

Les tâches configurées sont l'ensemble de règles que votre fichier Gruntfile suivra lors de l'exécution. Ils sont entièrement personnalisables et se trouvent dans le répertoire [`tasks/config/`](http://sailsjs.com/documentation/anatomy/my-app/tasks/config). Vous pouvez modifier, omettre ou remplacer n'importe quelle tâche Grunt pour répondre à vos besoins. Vous pouvez également ajouter vos propres tâches Grunt - il suffit d'ajouter un fichier `maTache.js` dans ce répertoire pour configurer la nouvelle tâche, puis de l'enregistrer avec la/les tâche(s) parentale(s) appropriée(s) (voir les fichiers dans` tasks/register/*.js`). Rappelez-vous, Sails est livré avec un ensemble de tâches par défaut utiles qui sont conçus pour vous aider à travailler sans configuration requise.

##### Configuration d'une tâche personnalisée.

Configurer une tâche personnalisée dans votre projet est très simple et utilise Grunt & [config](http://gruntjs.com/api/grunt.config) et [task](http://gruntjs.com/api/grunt.) pour vous permettre de rendre votre tâche modulaire. Voici un petit exemple de création d'une nouvelle tâche qui remplace une tâche existante. Disons que nous voulons utiliser le moteur de template [Handlebars](http://handlebarsjs.com/) au lieu du moteur de template Underscore qui est configuré par défaut:

* La première étape consiste à installer le plugin grunt Handlebars en utilisant la commande suivante dans votre terminal :

```bash
npm install grunt-contrib-handlebars --save-dev
```

* Créer un fichier de configuration dans `tasks/config/handlebars.js`. C'est là que nous allons mettre la configuration Handlebars.

```javascript
// tasks/config/handlebars.js
// --------------------------------
// configuration de la tâche handlebar.

module.exports = function(grunt) {

  // Nous utilisons la méthode `set` de l'api grunt.config pour configurer un
  // objet de la chaîne définie. Dans ce cas la tâche 'handlebars' 
  //  sera configurée en se basant sur l'objet ci-dessous.
  grunt.config.set('handlebars', {
    dev: {
      // Nous allons définir quel fichier de template à injecter
      // dans tasks/pipeline.js
      files: {
        '.tmp/public/templates.js': require('../pipeline').templateFilesToInject
      }
    }
  });

  // Charger le module npm pour handlebars.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
};
```

* Remplacer le chemin aux fichiers sources dans le pipeline d'assets. Le seul changement ici sera que handelbars recherche les fichiers avec l'extension .hbs tandis que les templates Underscore peuvent être dans des simples fichiers html.

```javascript
// tasks/pipeline.js
// --------------------------------
// pipeline d'assets

var cssFilesToInject = [
  'styles/**/*.css'
];

var jsFilesToInject = [
  'js/socket.io.js',
  'js/sails.io.js',
  'js/connection.example.js',
  'js/**/*.js'
];

// On change le modèle de chemin pour inclure tous les fichiers dans
// le dossier templates/ dont l'extension est .hbs
var templateFilesToInject = [
  'templates/**/*.hbs'
];

module.exports = {
  cssFilesToInject: cssFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
  }),
  jsFilesToInject: jsFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
  }),
  templateFilesToInject: templateFilesToInject.map(function(path) {
    return 'assets/' + path;
  })
};
```

* Inclure la tâche handlebars dans les tâches compileAssets et syncAssets. C'est là que la tâche jst a été utilisée et nous allons la remplacer par la nouvelle tâche Handlebars.

```javascript
// tasks/register/compileAssets.js
// --------------------------------
// compiler les assets enregistrés comme tâche grunt

module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'handlebars:dev',       // changer la tâche jst pour handlebars
    'less:dev',
    'copy:dev',
    'coffee:dev'
  ]);
};

// tasks/register/syncAssets.js
// --------------------------------
// Synchroniser les assets enregistrés comme tâche grunt

module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'handlebars:dev',      // changer la tâche jst pour handlebars
    'less:dev',
    'sync:dev',
    'coffee:dev'
  ]);
};
```

* Supprimer le fichier de configuration de la tâche jst. Nous n'allons pas l'utiliser, donc nous pouvons nous débarrasser de `tasks/config/jst.js`. Il suffit de le supprimer de votre projet.

> Idéalement, vous devez le supprimer de votre projet et de ses dépendances. Cela peut être fait en exécutant cette commande dans votre terminal.
```bash
npm uninstall grunt-contrib-jst --save-dev
```
### Déclencheurs de tâches

Dans [le mode développement](http://sailsjs.com/documentation/reference/sails.config/sails.config.local.html?q=environment), Sails exécute la tâche `default` ([`tasks/register/default.js`](http://sailsjs.com/documentation/anatomy/tasks/register/default.js.html)). Ceci compile le LESS, CoffeeScript et les templates JST (côté-client), puis les lie automatiquement à partir des vues dynamiques et des pages HTML statiques de votre application.

En production, Sails exécute la tâche `prod` ([`tasks/register/prod.js`](http://sailsjs.com/documentation/anatomy/tasks/register/prod.js.html)) qui agit comme `default`, mais minifie en plus les scripts et les feuilles de style de votre application. Cela réduit le temps de chargement de votre application et l'utilisation de la bande passante.

Ces déclencheurs de tâches sont [des tâches grunt basiques](http://gruntjs.com/creating-tasks#basic-tasks) situées dans le répertoire [`tasks/register/`](http://sailsjs.com/documentation/anatomy/tasks/register). Vous trouverez ci-dessous la référence complète de tous les déclencheurs de tâches dans Sails et la commande qui les exécute:

##### `sails lift`

Exécute la tâche **default** (`tasks/register/default.js`).

##### `sails lift --prod`

Exécute la tâche **prod** (`tasks/register/prod.js`).

##### `sails www`

Exécute la tâche **build** (`tasks/register/build.js`) qui compile tous les assets dans le sous-dossier `www` au lieu de `.tmp/public` en utilisant des chemins relatifs dans les références. Cela permet de diffuser des contenus statiques avec Apache ou Nginx au lieu de s'appuyer sur ['middleware'] (http://sailsjs.com/documentation/concepts/Middleware).

##### `sails www --prod` (production)

Exécute la tâche **buildProd** (`tasks/register/buildProd.js`) qui effectue la même tâche que **build** mais optimise également les ressources.

Vous pouvez exécuter d'autres tâches en spécifiant le NODE_ENV et en créant une liste de tâches dans `tasks/register/` souss le même nom. Par exemple, si NODE_ENV est QA, sails exécutera `tasks/register/QA.js` si le fichier existe.


<docmeta name="displayName" value="Task Automation">
