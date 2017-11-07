# Access Control and Permissions

Policies in Sails are designed for controlling binary ("yes or no") access to particular actions.  They work great for checking whether a user is logged in, or for simple "yes or no" checks like whether the logged in user is a "super admin".

To see that in action, alongside login, authentication, and password recovery, generate the expanded starter app:

```bash
sails new foo --caviar
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
      // ^^as simple or as granular as you need, e.g.
      // ['basicAccess', 'inviteRegularUsers', 'inviteOrgAdmins', 'removeRegularUsers', 'removeOrDemoteOrgAdmins']
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
    
    return exits.success(rights);
  }

}; 
```


Then in your action, for example `api/controllers/demote-org-admin.js`:

```javascript
//…
var rights = await checkPermissions({
  userId: this.req.session.userId,
  orgId: inputs.orgId
})
.intercept('orgNotFound', ()=>'notFound');

if (!_.contains(rights, 'removeOrDemoteOrgAdmins')) {
  throw 'forbidden';
}

await Organization.removeFromCollection(inputs.orgId, 'adminUsers', inputs.targetUserId);
await Organization.addToCollection(inputs.orgId, 'regularUsers', inputs.targetUserId);

return exits.success();
```


<docmeta name="displayName" value="Sails + Passport">
