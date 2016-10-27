# Generating controllers

You can use the [Sails command line tool](http://sailsjs.org/documentation/reference/command-line-interface) to quickly generate a controller, by typing:

```sh
$ sails generate action <action identity>
```

For example, if you run the following command:

```sh
$ sails generate action user/signup
info: Created a new action!
```

Sails will generate `api/controllers/user/sign-up.js`:

```javascript
/**
 * user/sign-up.js
 *
 * @description :: Server-side controller action for handling incoming requests.
 * @help        :: See http://sailsjs.com/docs/concepts/controllers
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


<docmeta name="displayName" value="Generating Actions">
