# sails.config.custom

### What is this?

The custom configuration for your app. This is useful for one-off settings specific to your application-- things like the domain to use when sending emails, or 3rd party API keys for Stripe, Mailgun, Twitter, Facebook, etc. These values may also be overridden in `config/env/production.js`.

To access these values from your actions and helpers, use `sails.config.custom`.

### For example:

```javascript
module.exports.custom = {
  mailgunDomain: 'transactional-mail.example.com',
  mailgunApiKey: 'key-testkeyb183848139913858e8abd9a3'
};
```

```javascript
// In your controller/service/model/hook/whatever:
// ...
var mailgunApiKey = sails.config.custom.mailgunApiKey;
var mailgunDomain = sails.config.custom.mailgunDomain;
// ...
```
### Notes
> Custom configuration can be set using the [`config/custom.js`](http://sailsjs.com/documentation/anatomy/config/custom-js) file, via environment variables, or using any of the other [configuration mechanisms](http://sailsjs.com/documentation/concepts/configuration) provided by Sails.


<docmeta name="displayName" value="sails.config.custom">
