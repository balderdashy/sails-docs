# Shell scripts

Sails comes bundled with [Whelk](https://github.com/sailshq/whelk), which lets you run JavaScript functions as shell scripts. This can be useful for running jobs (from cron, Heroku scheduler), automating repetitive tasks (Grunt, gulp), writing one-off scripts (NPM, Chef), and building production-ready tools with command-line interfaces (e.g. `sails`, `machinepack`).


#### Example

To add a new script, just create a file in the `scripts/` folder of your app. For example:

```js
// scripts/send-email-proof-reminders.js
module.exports = {

  description: 'Send a reminder to any recent users who haven\'t confirmed their email address yet.',

  inputs: {
    template: {
      description: 'The name of another email template to use as an optional override.',
      type: 'string',
      defaultsTo: 'reminder-to-confirm-email'
    }
  },

  fn: async function (inputs, exits) {

    await User.stream({
      emailStatus: 'pending',
      emailConfirmationReminderAlreadySent: false,
      createdAt: { '>': Date.now() - 1000*60*60*24*3 }
    })
    .eachRecord(async(user, proceed)=>{
      await sails.helpers.sendTemplateEmail({
        to: user.emailAddress,
        template: 'reminder-to-confirm-email',
        templateData: {
          user: user
        }
      });
      return proceed();
    });//∞

    return exits.success();

  }
};
```

Then you can run:

```sh
$ sails run send-email-proof-reminders
```

For more information on usage, see the [whelk README](https://github.com/sailshq/whelk/blob/master/README.md).

<docmeta name="displayName" value="Shell Scripts">
<docmeta name="nextUpLink" value="/documentation/concepts/models-and-orm/models">
<docmeta name="nextUpName" value="Models">
