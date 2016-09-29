# sails.config.bootstrap

### What is this?
`sails.config.bootstrap` is a customizable, asynchronous bootstrap function that runs before your Sails app gets lifted (i.e. starts up).

The bootstrap can be used for all sorts of stuff, but here are a few particularly common use cases:
  + setting up baseline data
    + _e.g. find or create an admin user_
  + running sanity checks on the status of your database
    + _e.g. count hand records that don't have any fingers. If any are found, then refuse to lift until the database is fixed)_
  + seeding your database with stub data
    + _e.g. create & associate a few fake "Clinic", "Pet", and "Veterinarian" records to make it easier to test your animal adoption app)_


### Example

> Remember: Since the bootstrap is an asynchronous function, it's very important to trigger this callback method when you are finished!
> (otherwise your server will never lift, and eventually just time out, since it's waiting on the bootstrap)

```javascript
module.exports.bootstrap = function (done) {

  // Don't seed fake data when running in production.
  if (process.env.NODE_ENV === 'production') {
    return done();
  }
  
  //--•
  // Check to see if we already have a fake clinic in the database.
  Clinic.count({
    slug: 'lost-snakes'
  }).exec(function (err, existingFakeClinics) {
    if (err) { return done(err); }
    
    if (existingFakeClinics.length >= 2) {
      return done(new Error('Consistency violation: Database is in invalid state: There should never be more than one fake clinic!'));
    }
    
    if (existingFakeClinics.length === 1) {
      // If the clinic already exists, then we're done.
      // That means we must have already run the bootstrap and seeded the fake data.
      return done();
    }
    
    // --•
    // But otherwise, we'll seed some fake data.
    Clinic.create({
      friendlyName: 'Lost Snakes Clinic',
      slug: 'lost-snakes',
      address: '158 Lost Snakes Blvd\nAustin, TX  78759'
    }).exec(function (err){
      if (err) { return done(err); }

      // ...etc...
      return done();
      
    });//</Clinic.create()>
  });//</Clinic.findOne()>

};
```



<docmeta name="displayName" value="sails.config.bootstrap()">
<docmeta name="pageType" value="property">
