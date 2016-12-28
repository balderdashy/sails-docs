### An example helper

A common use of helpers is to encapsulate some repeated database queries.  For example, suppose our app had a `User` model which included a field `lastActiveAt` which tracked the time of their last login.  A common task in such an app might be to retrieve the list of most-recently-online users.  Rather than hard-coding this query into multiple locations, we could write a helper instead:

```javascript
// api/helpers/get-recent-users.js
module.exports = {


  friendlyName: 'Get recent users',


  description: 'Retrieve a list of users who were online most recently.',


  extendedDescription: 'Use `activeSince` to only retrieve users who logged in since a certain date/time.'


  inputs: {
    numUsers: {
      friendlyName: 'Number of users',
      description: 'The maximum number of users to retrieve.',
      type: 'number',
      defaultsTo: 5
    },
    activeSince: {
      description: 'Cut-off time to look for logins after.',
      type: 'number'
      defaultsTo: 0
    }
  },


  exits: {

    noUsersFound: {
      description: 'No users were found who logged in during the specified time frame.'
    }

  },


  fn: function (inputs, exits) {

    // Run the query
    User
      .find({ active: true, lastLogin: { '>': inputs.activeSince } })
      .sort({ lastLogin: 'DESC' })
      .limit(inputs.numUsers)
      .exec(function(err, users) {

        // If an error occurred, return through the `error` exit.
        if (err) {return exits.error(err);}

        // If no users were found, trigger the `noUsersFound()` exit.
        if (users.length === 0) {
          return exits.noUsersFound();
        }

        // Otherwise return the users through the `success` exit.
        return exits.success(users);

      });

  }


};
```

To call this helper from app code using the default options, we would use:

```javascript
sails.helpers.getRecentUsers().exec({
   error: function(err) {...handle the error...},
   noUsersFound: function() {...handle the case of no users found...},
   success: function(users) {...use the return `users` list...}
});
```

To alter the criteria for the returned users, we would set the options in the initial call to the helper, before `exec()`:

```javascript
// Get ten most recent users since St. Patrick's Day, 2014:
sails.helpers.getRecentUsers({ numUsers: 10, activeSince: (new Date('2014-03-17')).getTime() }).exec(...)
```

A key advantage to using helpers comes from the ability to update functionality that touches many parts of an app, all by changing code in one place.  For example, by changing the default value of `numUsers` from `5` to `15`, we update the size of the default list returned in _any_ place that uses the helper.  Also, by using well-defined inputs like `numUsers` and `activeSince`, we guarantee we&rsquo;ll get helpful errors if we accidentally use an invalid (i.e. non-numeric) value.

A few more notes about the example `get-recent-users` helper above:

* Many of the fields such as `description` and `friendlyName` are not strictly required, but are immensely helpful in keeping the code maintainable, especially when sharing the helper across multiple apps.
* The `noUsersFound` exit may or may not be helpful, depending on your app.  If you always wanted to perform some specific action whenever no users were returned (for example, redirecting to a different page), the exit would be a good idea.  If on the other hand you simply wanted to tweak some text in a view based on whether or not users were returned, it might be better to just have the `success` exit and check the `length` of the returned array in your action or view code.

<docmeta name="displayName" value="Example helper">
