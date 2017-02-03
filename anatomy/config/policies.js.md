# config/policies.js
### Objectif
Ce fichier contient les politiques par défaut de votre application.

Les politiques sont simplement des fonctions middleware Express qui s'exécutent avant vos contrôleurs. Vous pouvez appliquer une ou plusieurs politiques à un contrôleur donné ou protéger une seule de ses actions. Tout fichier de politique (par exemple `api/policies/sessionAuth.js`) peut être supprimé dans le dossier `api/policies/`, et peut être invoqué par son nom de fichier (par exemple` sessionAuth`).


<docmeta name="displayName" value="policies.js">

```
/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.com/documentation/
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access)
  '*': true,

  // Here's an example of mapping some policies to run before
  // a controller and its actions
  // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture  : 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }
};

```
