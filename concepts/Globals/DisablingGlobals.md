# Désactiver les variables globales

Sails détermine quelles variables globales à exposer en vérifiant [`sails.config.globals`](http://sailsjs.com/documentation/reference/sails.config/sails.config.globals.html), qui est conventionnellement configuré dans [`config/globals.js`](http://sailsjs.com/documentation/anatomy/config/globals.js.html).

Pour désactiver toutes les variables globales, il suffit de définir le paramètre `false`:

```js
// config/globals.js
module.exports.globals = false;
```

Pour désactiver _quelques_ variables globales, spécifiez un objet à la place, par exemple:

```js
// config/globals.js
module.exports.globals = {
  _: false,
  async: false,
  models: false,
  services: false
};
```

### Remarques

> + Gardez à l'esprit qu'aucun des variables globales, y compris `sails`, n'est accessible jusqu'à ce que sails soit chargé. En d'autres termes, vous ne pourrez pas utiliser `sails.models.utilisateur` ou `Utilisateur` en dehors d'une fonction (puisque `sails` n'aura pas encore fini de charger.)

<!-- Ce n'est plus le cas:
La plupart de cette section de la documentation se concentre sur les méthodes et les propriétés de `sails`, l'objet singleton représentant votre application.
-->

<docmeta name="displayName" value="Désactiver les variables globales">
