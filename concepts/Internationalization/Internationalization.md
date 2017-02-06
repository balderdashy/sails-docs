# Internationalisation

### Vue d'ensemble

Si votre application touche des personnes ou des systèmes de partout dans le monde, l'internationalisation et la localisation (i18n) peuvent être un élément important de votre stratégie internationale. Sails offre une prise en charge intégrée pour détecter les préférences de langue utilisateur et traduire les mots/phrases statiques grâce à [i18n-node](https://github.com/mashpie/i18n-node). ([NPM](https://www.npmjs.org/package/i18n)).


### Usage


Dans une vue :
```ejs
<h1> <%= __('Bonjour') %> </h1>
<h1> <%= __('Bonjour %s, comment ça va aujourd'hui ?', 'Mike') %> </h1>
<p> <%= i18n('C\'est vrai !-- tu peux utiliser i18n() ou __()') %> </p>
```


Dans un contrôleur ou une politique :
```javascript
req.__('Hello'); // => Bonjour
req.__('Hello %s', 'Marcus'); // => Bonjour Marcus
req.__('Hello {{name}}', { name: 'Marcus' }); // => Bonjour Marcus
```


Ou si vous connaissez déjà l'identifiant de localisation, vous pouvez traduire de n'importe où dans votre application en utilisant `sails .__`
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

### Disabling or customizing Sails' default internationalization support

Of course you can always `require()` any Node modules you like, anywhere in your project, and use any internationalization strategy you want.

But worth noting is that since Sails implements [node-i18n](https://github.com/mashpie/i18n-node) integration in the [i18n hook](http://sailsjs.com/documentation/concepts/Internationalization), you can completely disable or override it using the [`loadHooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) and/or [`hooks`](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) configuration options.


### Translating dynamic content

See [**Concepts > Internationalization > Translating dynamic content**](http://sailsjs.com/documentation/concepts/internationalization/translating-dynamic-content).


### What about i18n on the client?

The above technique works great out of the box for server-side views. But what about rich client apps that serve static HTML templates from a CDN or static host? (e.g. performance-obsessed SPAs or PhoneGap apps/Chrome extensions)

There are [lots of different options available](http://stackoverflow.com/questions/9640630/javascript-i18n-internationalization-frameworks-libraries-for-client-side-use) for client-side internationalization.  Like other client-side technologies, you should have no problem integrating any of them with Sails.

> If you'd prefer not to use an external internationalization library, you can actually reuse Sails' i18n support to help you get your translated templates to the browser.  If you want to use Sails to internationalize your _client-side templates_, put your front-end templates in a subdirectory of your app's `/views` folder.
> + In development mode, you should retranslate and precompile your templates each time the relevant stringfile or template changes using grunt-contrib-watch, which is already installed by default in new Sails projects.
> + In production mode, you'll want to translate and precompile all templates on lift(). In loadtime-critical scenarios (e.g. mobile web apps) you can even upload your translated, precompiled, minified templates to a CDN like Cloudfront for further performance gains.


<docmeta name="displayName" value="Internationalization">
