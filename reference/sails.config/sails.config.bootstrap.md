# sails.config.bootstrap

### What is this?
`sails.config.bootstrap` is a customizable seed function that runs before your Sails app gets lifted (i.e. starts up).

By convention, this function is used for:
  + setting up baseline data
    + _e.g. find or create an admin user_
  + running sanity checks on the status of your database
    + _e.g. count hand records that don't have any fingers. If any are found, then refuse to lift until the database is fixed)_
  + seeding your database with stub data
    + _e.g. create & associate a few fake "Clinic", "Pet", and "Veterinarian" records to make it easier to test your animal adoption app)_

For an example bootstrap function, generate a new Sails app and have a look at [`config/bootstrap.js`](https://sailsjs.com/documentation/anatomy/config/bootstrap.js).

### Notes

> - Sails will log a warning if the bootstrap function is "taking too long".  You can change the default timeout of 5 seconds by setting `sails.config.bootstrapTimeout`.

<docmeta name="displayName" value="sails.config.bootstrap()">
<docmeta name="pageType" value="property">
