# Associations

Avec Sails et Waterline, vous pouvez associer des modèles à plusieurs bases de données. Cela signifie que même si vos utilisateurs sont stockés dans [PostgreSQL](http://www.postgresql.org/) et leurs photos dans [MongoDB](http://www.mongodb.com/), vous pouvez interagir avec le données comme si elles étaient dans la même base de données. Vous pouvez également avoir des associations qui couvrent différentes [connexions](http://sailsjs.com/documentation/reference/sails.config/sails.config.connections.html) (c'est-à-dire bases de données / magasins de données) en utilisant le même adaptateur. Cela est pratique si, par exemple, votre application doit accéder ou mettre à jour les données de recettes héritées stockées dans une base de données MySQL (http://www.mysql.com/) dans le centre de données de votre entreprise, mais également stocker/récupérer des données d'une nouvelle base de données MySQL dans sur le Cloud.

> **NOTE IMPORTANTE**
>
> Notez que, dans les exemples utilisés dans le guide des concepts d'associations, toutes les références aux classes de modèle Sails sont en _minuscule_. Par exemple, dans:
```
// Utilisteur.js
module.exports = {
  connection: 'notreMySQL',
  attributes: {
    email: 'string',
    wishliste: {
      collection: 'produit',
      via: 'whiltelistePar'
    }
  }
};
```
La clé `collection` est définie sur `produit` - c'est _l'identité_ du modèle Sails appelé `Produit`. Chaque fois que les modèles sont référencés dans les clés `collection`, `via`, `model` ou `through`, vos noms d'identité doivent être en minuscules.

<docmeta name="displayName" value="Associations">
