# Internationalisation

### Vue d'ensemble

Si votre application touche des personnes ou des systèmes de partout dans le monde, l'internationalisation et la localisation (i18n) peuvent être un élément important de votre stratégie internationale. Sails offre une prise en charge intégrée pour détecter les préférences de langue utilisateur et traduire les mots/phrases statiques grâce à [i18n-node](https://github.com/mashpie/i18n-node). ([NPM](https://www.npmjs.org/package/i18n)).


### Usage


Dans une vue :
```ejs
<h1> <%= __('Bonjour') %> </h1>
<h1> <%= __('Bonjour %s, comment ça va aujourd\'hui ?', 'Mike') %> </h1>
<p> <%= i18n('C\'est vrai !-- tu peux utiliser i18n() ou __()') %> </p>
```


Dans un contrôleur ou une politique :
```javascript
req.__('Hello'); // => Bonjour
req.__('Hello %s', 'Marcus'); // => Bonjour Marcus
req.__('Hello {{name}}', { name: 'Marcus' }); // => Bonjour Marcus
```


Ou si vous connaissez déjà l'identifiant de localisation, vous pouvez traduire de n'importe où dans votre application en utilisant `sails.__`
```javascript
sails.__({
  phrase: 'Hello',
  locale: 'fr'
});
// => 'Bonjour'
```

### Les paramètres régionaux

Voir [**Concepts > Internationalisation > Les paramètres régionaux**](http://sailsjs.com/documentation/concepts/internationalization/locales).


### Options additionelles

Les paramètres de localisation/internationalisation peuvent être configurés dans [`sails.config.i18n`](http://sailsjs.com/documentation/reference/sails.config/sails.config.i18n.html). La raison la plus fréquente pour laquelle vous devez modifier ces paramètres consiste à modifier la liste des paramètres régionaux pris en charge de votre application et/ou l'emplacement de vos fichiers de chaînes de traduction :

```javascript
// Quelles locales sont prises en charge?
locales: ['en', 'es'],

// Où trouver les fichiers de traduction des locales?
localesDirectory: '/config/locales'
```

### Désactivation/Personnalisation du support par défaut d'internationalisation de Sails

Bien sûr, vous pouvez toujours faire un `require()` de tous les modules node que vous aimez, n'importe où dans votre projet, et utilisez la stratégie d'internationalisation que vous voulez.

Il faut noter que Sails implémente l'intégration [node-i18n](https://github.com/mashpie/i18n-node) dans le [hook i18n](http://sailsjs.com/documentation/concepts/Internationalization), vous pouvez le désactiver complètement ou le remplacer à l'aide des options de configuration de [`loadHooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) et/ou [`hooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md).

### Conversion du contenu dynamique

Voir [**Concepts > Internationalisation > Traduction de contenu dynamique**](http://sailsjs.com/documentation/concepts/internationalization/translating-dynamic-content).


### Qu'en est-il de l'i18n côté-client?

La technique ci-dessus fonctionne très bien pour les vues côté-serveur. Mais qu'en est-il des applications client riches qui servent des templates HTML statiques à partir d'un hôte CDN ou statique? (Par exemple, les SPAs obéissant aux performances ou applications PhoneGap/extensions Chrome)

Il existe [beaucoup de différentes options disponibles](http://stackoverflow.com/questions/9640630/javascript-i18n-internationalization-frameworks-libraries-for-client-side-use) pour l'internationalisation côté client. Comme d'autres technologies côté-client, vous ne devriez avoir aucun problème à intégrer l'une d'entre elles avec Sails.

> Si vous préférez ne pas utiliser une bibliothèque d'internationalisation externe, vous pouvez réutiliser le support i18n de Sails pour vous aider à obtenir des templates traduits dans le navigateur. Si vous souhaitez utiliser Sails pour internationaliser vos templates _côté-client_, placez vos templates dans un sous-répertoire du dossier `/views` de votre application.
> + En mode développement, vous devez retransmettre et précompiler vos templates à chaque fois que le fichier stringfile ou le template change en utilisant grunt-contrib-watch, qui est déjà installé par défaut dans tout nouveau projet Sails.
> + En mode production, vous devriez traduire et précompiler tous les templates lors du démarrage de l'application. Dans les cas où vous voulez optimiser d'avantage le temps de chargement (par exemple, les applications Web pour mobile), vous pouvez uploader vos templates minifiés, précompilés et traduits vers un CDN comme Cloudfront pour avoir de plus de performances.


<docmeta name="displayName" value="Internationalisation">
