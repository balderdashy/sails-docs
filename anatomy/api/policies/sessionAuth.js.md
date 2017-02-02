# api/policies/sessionAuth.js
### Objectif
Il s'agit d'un exemple de politique contre lequel toutes les routes sont vérifiées avant d'autoriser un accès client à n'importe quelle partie de votre application. Par défaut, il permet à tout le monde d'accéder à tout, mais cela peut (et devrait probablement) être modifié avant de passer en mode production.

Dans Sails, une politique est simplement un middleware express qui fait quelque chose pour authentifier les utilisateurs avant qu'ils soient autorisés à accéder à une partie de votre application. Pour plus d'informations sur la création de politique, vous devriez probablement consulter notre guide sur ce sujet.

<docmeta name="displayName" value="sessionAuth.js">

```
/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.com/documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};

```
