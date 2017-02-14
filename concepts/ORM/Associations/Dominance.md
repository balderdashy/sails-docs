# Dominance
## Exemple d'ontologie


```javascript
// Utilisateur.js
module.exports = {
  connection: 'notreMySQL',
  attributes: {
    email: 'string',
    wishliste: {
      collection: 'produit',
      via: 'whitelistePar'
    }
  }
};
```


```javascript
// Produit.js
module.exports = {
  connection: 'notreRedis',
  attributes: {
    nom: 'string',
    whitelistePar: {
      collection: 'utilisateur',
      via: 'wishliste'
    }
  }
};
```

### Le problème

Il est facile de voir ce qui se passe dans cette relation d'adaptateur croisé. Il existe une relation many-to-many (`N -> ...`) entre utilisateurs et produits. En fait, vous pouvez imaginer quelques autres relations (par exemple les achats) qui pourraient exister, mais comme celles-ci sont probablement mieux représentées à l'aide d'un modèle intermédiaire, je suis allé chercher quelque chose de simple dans cet exemple.

Quoi qu'il en soit, c'est génial ... mais où est-ce que la ressource relation va être définie ? "ProduitUtilisateur", avec la nomenclature orientée SQL. Nous savons que cela finira d'un côté ou de l'autre, mais que faire si nous voulons contrôler la base de données dans laquelle elle se retrouve ?

> **NOTE IMPORTANTE**
>
> Il s'agit là d'un problème _seulement parce que les deux côtés de l'association ont un modificateur `via` spécifié_ !!
> En l'absence de `via`, un attribut de collection se comporte toujours comme `dominant: true`.
> Consultez la FAQ ci-dessous pour plus d'informations.


## La solution

Finalement, il peut même être possible de spécifier une troisième connexion/adaptateur à utiliser pour la table de jointure. Pour l'instant, nous allons nous concentrer sur le choix d'un côté ou de l'autre.


Nous abordons cette question à travers le concept de "dominance". Dans toute relation de modèle d'adaptateur croisé, un côté est supposé être dominant. Il peut être utile de penser à l'analogie d'un enfant avec des parents multinationaux qui doivent choisir un pays ou l'autre pour sa citoyenneté (http://en.wikipedia.org/wiki/Japanese_nationality_law)


Voici l'ontologie à nouveau, mais cette fois, nous allons indiquer la base de données MySQL comme le "dominant". Cela signifie que la "ProduitUtilisateur" relation "table" sera stocké comme une table MySQL.


```javascript
// Utilisateur.js
module.exports = {
  connection: 'notreMySQL',
  attributes: {
    email: 'string',
    wishliste: {
      collection: 'produit',
      via: 'whitelistePar',
      dominant: true
    }
  }
};
```

```javascript
// Produit.js
module.exports = {
  connection: 'notreRedis',
  attributes: {
    nom: 'string',
    whitelistePar: {
      collection: 'utilisateur',
      via: 'wishliste'
    }
  }
};
```

## Choisir un "dominant"

Plusieurs facteurs peuvent influencer votre décision :

+ Si un côté est une base de données SQL, placer la table de relation de ce côté permettra à vos requêtes d'être plus efficaces, puisque la table de relation peut être jointe avant que l'autre ne communique avec. Cela réduit le nombre total de requêtes requises de 3 à 2.
+ Si une connexion est beaucoup plus rapide que l'autre, toutes choses égales par ailleurs, il est probablement logique de mettre la connexion de ce côté.
+ Si vous savez qu'il est beaucoup plus facile de migrer une des connexions, vous pouvez choisir de définir ce côté comme "dominant". De même, les règlements ou les questions de conformité peuvent influer sur votre décision. Si la relation contient des informations sensibles du patient (par exemple, une relation entre «Patient» et «Medicament»), vous voulez être sûr que toutes les données pertinentes sont enregistrées dans une base de données particulière et non l'autre (dans ce cas, «Patient» est probable être "dominante").
+ Dans le même ordre d'idées, si l'une de vos connexions est en lecture seule (peut-être que "Medicament" dans l'exemple précédent est connecté à une base de données en lecture seule), vous ne pourrez pas y écrire, alors veillez à ce que vos données relationnelles puissent être conservées en toute sécurité de l'autre côté.


## FAQ


##### Que se passe-t-il si une des collections n'a pas `via` ?

> Si une association `collection` n'a pas de propriété `via`, elle est automatiquement `dominante: true`.


##### Et si les deux collections n'ont pas `via`?

> Si les deux `collections` n'ont pas `via`, alors elles ne sont pas liées. Les deux sont "dominants", car elles sont des tables séparée !

##### Qu'en est-il des associations `model` ?

> Dans tous les autres types d'associations, la propriété "dominant" est interdite. La définition d'un côté à `dominant` n'est nécessaire que pour les associations entre deux modèles qui ont un attribut comme : `{via: '...', collection: '...'}` des deux côtés.


##### Un modèle peut-il être dominant pour un attribut et pas pour un autre?

> Gardez à l'esprit qu'un modèle n'est "dominant" que dans le contexte d'une relation particulière. Un modèle peut être dominant dans une ou plusieurs relations (attributs) tout en n'étant PAS dominant dans d'autres relations (attributs).
> Par exemple, si un `Utilisateur` a une collection de jouets appelée `Jouetsfavoris` via `jouetsFavorisDe` dans le modèle `Jouet` et `Jouetsfavoris` dans `Utilisateur` est "dominant: true", `Jouet` peut encore être dominant en d'autres façons. Donc, `Jouet` pourrait également être associé à `Utilisateur` à travers son attribut, `construitPar`, pour lequel il est `dominant: true`.


##### Les deux modèles peuvent-ils être dominants?

> Non. Si les deux modèles sont dans une association croisée/interconnexion, l'association many-to-many définit "dominant: true", une erreur est lancée lors du démarrage.


##### Est-il possible qu'aucun des modèles ne soit dominant ?

> Oui, en quelque sorte... Si ni l'un ni l'autre des modèles d'un adaptateur/connection croisé(e), l'association many-to-many définit "dominant: true", un avertissement s'affiche lors du démarrage et une estimation sera faite automatiquement en fonction des caractéristiques de la relation. Pour l'instant, cela signifie simplement une décision arbitraire basée sur l'ordre alphabétique :)

##### Qu'en est-il des associations d'adaptateur non-croisé?

> La propriété `dominant` est silencieusement ignorée dans les associations d'adaptateur/connection non-croisé(e). Nous supposons que vous pourriez envisager de briser éventuellement le schéma à travers plusieurs connexions, et il n'y a aucune raison de vous empêcher d'être proactif. De plus, cela réserve une utilité supplémentaire pour l'option "dominante".



<docmeta name="displayName" value="Dominance">

