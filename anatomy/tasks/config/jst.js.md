# tasks/config/jst.js

### Objectif

Ce fichier configure une tâche Grunt appelée "jst".

Il précompile des templates HTML en utilisant la notation Underscore/Lodash dans les fonctions, créant un fichier `.jst`. Cela peut être introduit dans votre HTML via une balise `<script>` afin d'exposer vos template comme `window.JST` à utiliser dans votre JavaScript côté-client.

En d'autres termes, cela prend des fichiers HTML dans `assets/templates/` et les transforme en petites fonctions javascript qui renvoient des chaînes HTML lorsque vous leur passez un dictionnaire de données. Cette approche est appelée "précompilation", et elle peut considérablement accélérer le rendu du template pour le client, et même réduire l'utilisation de la bande passante et les dépenses connexes.)

> Notez que, par défaut, la notation Underscore/Lodash/JST est _l'opposé_ de EJS (`<% =` est `<% -`, et vice versa).
> Si cela vous dérange, il peut être facilement configuré dans ce fichier. (Voir les commentaires en ligne pour plus de détails.)

### Mais je n'utilise pas les modèles Lodash/Underscore/JST ...

Pas de problème!

Si vous n'utilisez pas de template précompilés côté-client, ignorez ce fichier.

Si vous souhaitez utiliser un pré-processeur _différent_ comme [Handlebars](http://handlebarsjs.com/) ou [Dust](http://www.dustjs.com/), et que vous souhaitez que Sails traite vos template côté-client automatiquement pendant que vous travaillez, alors vous avez de la chance. Dans la plupart des cas, c'est aussi simple que d'installer le plug-in Grunt approprié en tant que dépendance de votre application Sails, puis de le configurer pour sortir les templates précompilés (condensés en un seul fichier JavaScript) sur le même chemin que dans cette tâche par défaut.

Voici quelques exemples populaires:

+ [Grunt-contrib-handlebars](https://www.npmjs.com/package/grunt-contrib-handlebars)
+ [Grunt-dust](https://www.npmjs.com/package/grunt-dust)


### Utilisation

Pour plus d'informations, consultez [`grunt-contrib-jst`](https://www.npmjs.com/package/grunt-contrib-jst).



<docmeta name="displayName" value="jst.js">

