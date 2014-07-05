# Locales

> TODO:
>
> Move some of the basic information from this section to the relevant page in **Anatomy**, then merge the rest in with the reference page on internationalization.


### What is this?
This is a folder that contains the language files for different locales.

### Description


#### Default stringfile

 If you're building an internationalized application that needs support for multiple languages, you'll want to pull all of the static strings out of your application, then provide a translation file for each of your target languages.

##### Example i18n usage: e.g. `/views/about.ejs`

```ejs
<h2><%= __('whatIsApp?') %></h2>
<p> <%= __('appDescription') %></p>
```

More about this implementation: https://github.com/mashpie/i18n-node

##### locales.de.js
This file is provided in the folder as an example:
Note that this is part of a campaign to rebrand our app for the German market as Bleistift Buben (or "Pencil Boys")

```javascript
module.exports = {
  
  // Key        : Value
  // e.g.

  'whatIsApp?'    : 'Was ist Bleistift Buben?',

  appDescription    : 'Bleistift Buben ist eine App für den Aufbau und die Aufrechterhaltung ' +
              'Freunde, mit denen Sie Darlehen Bleistifte. Mit Funktionen wie Bleistift '+
              'Ledger, In-App-Zahlungen, und Vintage-Foto-Filter ermöglicht PP eine schöne ' +
              'neue Welt der Rechenschaftspflicht für die 1, 2 UND 3 Bleistifte. ' +
              'Du wirst nie verlieren einen Freund über eine verlorene Bleistift nie wieder!'
};
```

#### What About i18n on the client?
The above technique works great out of the box for server-side views. But what about rich client apps?  HTML 5, SPAs, PhoneGap, Chrome Extensions and stuff? What if your HTML templates are being served from a CDN? If you are using **client-side** templates, you can reuse Sails' i18n support to help you get your translated templates to the browser.  

If you want to use Sails to internationalize your client-side templates, just put your front-end templates in a subdirectory of your app's `/views` folder.
+ In development mode, you should retranslate and precompile your templates each time the relevant stringfile or template changes using grunt-contrib-watch, which is already installed by default in new Sails projects.
+ In production mode, you'll want to translate and precompile all templates on lift(). In loadtime-critical scenarios (e.g. mobile web apps) you can even upload your translated, precompiled, minified templates to a CDN like Cloudfront for further performance gains.




<docmeta name="uniqueID" value="Locales998452">
<docmeta name="displayName" value="Locales">

