# Tâches par défaut
### Vue d'ensemble

Le pipeline d'assets dans Sails est un ensemble de tâches Grunt configurées avec des valeurs par défaut classiques conçues pour rendre votre projet plus cohérent et plus productif. Le workflow d'assets du frontoffice est entièrement personnalisable et fournit certaines tâches par défaut. Sails facilite la tâche de [configurer de nouvelles tâches](http://sailsjs.com/documentation/concepts/Assets/TaskAutomation.html?q=task-configuration) en fonction de vos besoins.
<!-- changez le lien vers: /documentation/concepts/assets/task-automation #? La configuration des tâches une fois que le nouveau site est en ligne -->

Voici des choses que la configuration Grunt par défaut dans Sails fait pour vous aider :
- Compilation automatique LESS
- Compilation JST automatique
- Compilation automatique Coffeescript
- Injection, minification et concaténation automatiques d'assets (optionnel)
- Création d'un répertoire web publique
- Surveillance et synchronisation de fichiers
- Optimisation des assets en production

### Tâches Grunt par défaut

Voici une liste des tâches Grunt qui sont incluses par défaut dans tout nouveau projet Sails:

##### clean

> Cette tâche grunt est configurée pour nettoyer le contenu du dossier `.tmp/public/` de votre projet.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-clean)

##### coffee

> Compile les fichiers coffeeScript de `assets/js/` en Javascript et les place dans le répertoire `.tmp/public/js/`.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-coffee)

##### concat

> Concatène les fichiers javascript et css et enregistre les fichiers concaténés dans le répertoire `.tmp/public/concat/`.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-concat)

##### copie

> **dev task config**
> Copie tous les répertoires et fichiers, à l'exception des fichiers  coffeescript et LESS, du dossier des assets vers le répertoire `.tmp / public /`.

> **build task config**
> Copie tous les répertoires et fichiers de `.tmp/public` vers le répertoire www.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-copy)

##### cssmin

> Minifie les fichiers css et les place dans le répertoire `.tmp/public/min/`.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-cssmin)

##### jst

> Précompile les templates Underscore dans un fichier `.jst`. (C'est-à-dire qu'il prend les templates HTML et les transforme en des minuscules fonctions javascript). Cela peut accélérer le rendu du template côté client et réduire l'utilisation de la bande passante.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-jst)

##### less

> Compile les fichiers LESS dans CSS. Seul `assets/styles/import.less` est compilé. Cela vous permet de contrôler vous-même l'ordre, c'est-à-dire d'importer vos dépendances, mixins, variables, réinitialisations, etc. avant  les autres feuilles de style.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-less)

##### sails-linker

> Il injecte automatiquement les balises `<script>`pour les fichiers javascript et les balises` <link> `pour les fichiers css. Il associe également de façon automatique un fichier de sortie contenant des templates précompilés à l'aide de la balise `<script>`. Vous trouverez une description plus détaillée de cette tâche [ici](https://github.com/balderdashy/sails-generate-frontend/blob/master/docs/overview.md#a-litte-bit-more-about-sails-linking). Il est important de noter que l'injection des scripts et des feuilles de style est *seulement* exécuté dans les fichiers contenant les balises `<! - SCRIPTS -> <! - SCRIPTS END ->` et/ou ` -STYLES -> <! - STYLES END -> `. Ils sont inclus dans le fichier **views/layout.ejs** par défaut dans tout nouveau projet Sails. Si vous ne souhaitez pas utiliser `sails-linker` dans  votre projet, vous pouvez simplement supprimer ces balises là.

> [Documents d'utilisation](https://github.com/Zolmeister/grunt-sails-linker)

##### sync

> Il s'agit d'une tâche grunt pour garder les répertoires syncrhonisés. Elle est très semblable à grunt-contrib-copy, mais tente de copier uniquement les fichiers qui ont effectivement changé. Il synchronise spécifiquement les fichiers du dossier `assets/` vers `.tmp/public/`, en écrasant tout ce qui existe déjà.

> [Documents d'utilisation](https://github.com/tomusdrw/grunt-sync)

##### uglify

> Minifie les ressources javascript côté client. Notez que, par défaut, cette tâche «mutile» tous vos noms de fonction et de variable (soit en les changeant à un nom beaucoup plus court, soit en les découpant entièrement). Cela est habituellement souhaitable car il rend votre code beaucoup plus petit, mais dans certains cas peut conduire à des résultats inattendus (en particulier lorsque vous attendez un constructeur d'un objet d'avoir un certain nom). Pour désactiver ou modifier ce comportement, [utilisez l'option `mangle`] (https://github.com/gruntjs/grunt-contrib-uglify#no-mangling) lors de la configuration de cette tâche.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-uglify)

##### watch

> Exécute des tâches prédéfinies chaque fois que des modèles (patterns) de fichiers sous surveillance sont ajoutés, modifiés ou supprimés. Elle surveille les modifications apportées aux fichiers du dossier `assets/` et exécute de nouveau les tâches appropriées (p. Ex., Compilation LESS et jst). Cela vous permet de voir les modifications apportées à vos assets dans votre application sans devoir redémarrer le serveur Sails.

> [Documents d'utilisation](https://github.com/gruntjs/grunt-contrib-watch)


<docmeta name="displayName" value="Default Tasks">
