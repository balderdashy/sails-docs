# Les callbacks du cycle de vie

### Vue d'ensemble

Les callbacks (appelés aussi fonctions de rappel) du cycle de vie sont des fonctions qui sont appelées auto-magiquement avant ou après certaines actions du _modèle_. Par exemple, nous utilisons parfois des callbacks de cycle de vie pour hacher automatiquement un mot de passe avant de créer ou de mettre à jour un modèle `Compte`.

Sails met à disposition par défaut plusieurs de callbacks du cycle de vie.


##### Callbacks à l'événement `create` (au moment de la création)

  - Avant la validation des données : `beforeValidate: fn(values, cb) {}`
  - Après la validation des données : `afterValidate: fn(values, cb) {}`
  - Avant la création               : `beforeCreate: fn(values, cb) {}`
  - Après la création               : `afterCreate: fn(newlyInsertedRecord, cb) {}`

##### Callbacks à l'événement `update`(au moment de la mise à jour)

  - Avant la validation des données : `beforeValidate: fn(valuesToUpdate, cb) {}`
  - Après la validation des données : `afterValidate: fn(valuesToUpdate, cb) {}`
  - Avant la mise à jour            : `beforeUpdate: fn(valuesToUpdate, cb) {}`
  - Après la mise à jour            : `afterUpdate: fn(updatedRecord, cb) {}`

##### Callbacks à l'événement `destroy` (au moment de la suppression)

  - Avant la suppression            : `beforeDestroy: fn(criteria, cb) {}`
  - Après la suppression            : `afterDestroy: fn(destroyedRecords, cb) {}`


### Exemple

Si vous souhaitez hacher un mot de passe avant d'enregistrer dans la base de données, vous pouvez utiliser le callback de cycle de vie `beforeCreate`.

```javascript
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    identifiant: {
      type: 'string',
      required: true
    },

    motDePasse: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'mot_de_passe_encrypte'
    }

  },


  // Les callbacks de cycle de vie
  beforeCreate: function (values, cb) {

    // Hacher le mot de passe
    bcrypt.hash(values.motDePasse, 10, function(err, hash) {
      if(err) return cb(err);
      values.motDePasse = hash;
      // Appeler cb() avec un argument retourne une erreur. 
      // Utile pour annuler l'opération entière si certains critères échouent.
      cb();
    });
  }
};
```



<docmeta name="displayName" value="Les callbacks du cycle de vie">
