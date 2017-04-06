# Generating controllers or standalone actions

You can use [`sails-generate`](http://sailsjs.com/documentation/reference/command-line-interface/sails-generate) from the Sails command line tool to quickly generate a controller, or even just an individual action.


### Generating controllers

For example, to generate a controller:

```sh
$ sails generate controller user
```

Sails will generate `api/controllers/UserController.js`:

```javascript
/**
 * UserController.js
 *
 * @description :: Server-side controller action for manging users.
 * @help        :: See http://sailsjs.com/documentation/concepts/controllers
 */
module.exports = {

}
```

### Generating standalone actions

Run the following command to generate a standalone action:

```sh
$ sails generate action user/signup
info: Created a new action!
```

Sails will create `api/controllers/user/sign-up.js`:

```javascript
/**
 * Module dependencies
 */

// ...


/**
 * user/signup.js
 *
 * Signup user.
 */
module.exports = function signup(req, res) {

  sails.log.debug('TODO: implement');
  return res.ok();

};
```

Or, using the higher-level _actions2_ interface:

```sh
$ sails generate action user/signup --actions2
debug: Using "actions2"...
debug: (see http://sailsjs.com/docs/concepts/actions)
info: Created a new action!
```

Sails will create `api/controllers/user/sign-up.js`:

```javascript
/**
 * user/sign-up.js
 *
 * @description :: Server-side controller action for handling incoming requests.
 * @help        :: See http://sailsjs.com/documentation/concepts/controllers
 */
module.exports = {


  friendlyName: 'Sign up',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: function (inputs, exits) {

    return exits.success();

  }


};

```


<docmeta name="displayName" value="Generating actions and controllers">
