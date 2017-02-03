# tasks/config/coffee.js

### Objectif

Ce fichier configure une tâche Grunt appelée "coffee".

Par défaut, il compile les fichiers CoffeeScript situés dans [`assets/js/`](http://sailsjs.com/anatomy/assets/js/) en JavaScript, puis génère de nouveaux fichiers `.js` dans `.tmp/public/Js/`.


### Mais je n'utilise pas CoffeeScript ...

Pas de problème!

Si vous n'utilisez aucun type de prétraitement pour votre client côté JavaScript, veuillez tout simplement ignorer ce fichier.

Si vous souhaitez utiliser un pré-processeur _différent_ comme [TypeScript](https://www.typescriptlang.org/) ou [Babel](https://babeljs.io/), et que vous souhaitez que Sails traite vos assets JavaScript (côté-client) automatiquement pendant que vous travaillez, alors vous avez de la chance. Dans la plupart des cas, c'est aussi simple que d'installer le plug-in Grunt approprié en tant que dépendance de votre application Sails, puis de la configurer pour générer du JavaScript compilé dans le même chemin que cette tâche par défaut.

Voici quelques exemples populaires:

+ [Grunt-ts](https://www.npmjs.com/package/grunt-ts)
+ [Grunt-babel](https://www.npmjs.com/package/grunt-babel)


### Utilisation

Pour plus d'informations, reportez-vous à la section [`grunt-contrib-coffee`] (https://npmjs.com/package/grunt-contrib-coffee).



<docmeta name="displayName" value="coffee.js">
