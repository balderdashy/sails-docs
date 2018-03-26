# Access Control and Permissions

Policies in Sails are designed for controlling binary ("yes or no") access to particular actions.  They work great for checking whether a user is logged in, or for other simple "yes or no" checks, like whether the logged in user is a "super admin".

To see an example of access control in action, alongside login, authentication, and password recovery, generate the starter web app:

```bash
sails new foo

# Then choose "Web App"
```

### Dynamic permissions

For more complex permission schemes, where a requesting user agent's access rights depend on _who they are_ and _what they're trying to do_, you'll want to involve the database.  While you can use policies to accomplish this, it's usually more straightforward and maintainable to use a [helper](https://sailsjs.com/documentation/concepts/helpers).

For example, you might create `api/helpers/check-permissions.js`:

```javascript
module.exports = {


  friendlyName: 'Check permissions',


  description: 'Look up a user\'s "rights" within a particular organization.',


  inputs: {
    userId: { type: 'number', required: true },
    orgId: { type: 'number', required: true }
  },

  exits: {
    success: {
      outputFriendlyName: 'Rights',
      outputDescription: `A user's "rights" within an org.`,
      outputType: ['string']
    },
    orgNotFound: {
      description: 'No such organization exists.'
    }
  },

  fn: async function(inputs, exits) {
    var org = await Organization.findOne(inputs.orgId)
    .populate('adminUsers', { id: inputs.userId })
    .populate('regularUsers', { id: inputs.userId });

    if (!org) { throw 'orgNotFound'; }

    var rights = [];
    if (org.regularUsers.length !== 0) {
      rights = ['basicAccess', 'inviteRegularUsers'];
    } else if (org.adminUsers.length !== 0) {
      rights = ['basicAccess', 'inviteRegularUsers', 'removeRegularUsers', 'inviteOrgAdmins'];
    } else if (org.owner === inputs.userId) {
      rights = ['basicAccess', 'inviteRegularUsers', 'removeRegularUsers', 'inviteOrgAdmins', 'removeOrDemoteOrgAdmins'];
    }
    // ^^This could be as simple or as granular as you need, e.g.
    // ['basicAccess', 'inviteRegularUsers', 'inviteOrgAdmins', 'removeRegularUsers', 'removeOrDemoteOrgAdmins']

    return exits.success(rights);
  }

};
```


Then in your action, for example `api/controllers/demote-org-admin.js`:

```javascript
//…
var rights = await checkPermissions(this.req.session.userId, inputs.orgId)
.intercept('orgNotFound', 'notFound');

if (!_.contains(rights, 'removeOrDemoteOrgAdmins')) {
  throw 'forbidden';
}

await Organization.removeFromCollection(inputs.orgId, 'adminUsers', inputs.targetUserId);
await Organization.addToCollection(inputs.orgId, 'regularUsers', inputs.targetUserId);

return exits.success();
```


> ### Note
> Remember that, while we used `checkPermissions.with(…,…)` here, we could have
> also used `.with()` and switched to named parameters:
>
> ```js
> await checkPermissions.with({
>   userId: this.req.session.userId,
>   orgId: inputs.orgId
> });
> ```
>
> The style you choose when calling a helper should depend on readability-- i.e.
> the number of different values you need to pass in, the complexity of those
> values, etc.  When in doubt, a good best practice is to optimize first for
> explicitness, then for readability, and only then for conciseness.  But the
> more confident/familiar you are with the usage of a helper, and the more frequently
> you use it, the more those priorities flip-flop.


<docmeta name="displayName" value="Access Control and Permissions">
