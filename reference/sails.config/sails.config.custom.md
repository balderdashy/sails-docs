# sails.config.custom

### What is this?

Your custom configuration file. This is useful for one-off settings specific to your application-- things like the domain to use when sending emails, or 3rd party API keys for Stripe, Mailgun, Twitter, Facebook, etc. These values may also be overridden in `config/env/production.js`.

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
> The contents of this file can be overridden via environment variables, or using any of the other configuration mechanisms provided by Sails.     


<docmeta name="displayName" value="sails.config.custom">
