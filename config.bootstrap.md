# Bootstrap
This is an asynchronous boostrap function that runs before your Sails app gets lifted (i.e. starts up). This gives you an opportunity to set up your data model, run jobs, or perform some special logic.

```javascript
module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
```

> **Note:** Sails will warn you if the bootstrapping takes too long, in case you forgot to call `cb()`.
> You can change the default timeout of 2000ms by setting `sails.config.bootstrapTimeout`.
