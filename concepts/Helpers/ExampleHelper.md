# An example helper

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
      description: 'Cut-off time to look for logins after, expressed as a JS timestamp.',
      extendedDescription: 'Remember: A _JS timestamp_ is the number of **milliseconds** since [that fateful night in 1970](https://en.wikipedia.org/wiki/Unix_time).',
      type: 'number'
      defaultsTo: 0
    }
  },


  exits: {

    noUsersFound: {
      description: 'Could not find any users who logged in during the specified time frame.'
    }

  },


  fn: function (inputs, exits) {

    // Run the query
    User.find({
      active: true,
      lastLogin: { '>': inputs.activeSince }
    })
    .sort('lastLogin DESC')
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

To call this helper from app code using the default options (in an action, for example), we would use:

```javascript
sails.helpers.getRecentUsers().exec(function (err, users){
  if (err) { return res.serverError(err); }
  return res.json(users);
});
```

To alter the criteria for the returned users, we would set the options in the initial call to the helper, before `exec()`:

```javascript
// Get ten most recent users since St. Patrick's Day, 2014:
sails.helpers.getRecentUsers({ numUsers: 10, activeSince: (new Date('2014-03-17')).getTime() }).exec(/*...*/)
```

And finally, to handle the `noUsersFound` exit explicitly, rather than simply treating it like any other error, we can just pass in a switchback:

```javascript
sails.helpers.getRecentUsers(/*...*/).exec({
  error: function(err) { /* ... handle any misc. unexpected errors, e.g.: */ return res.serverError(err); },
  noUsersFound: function() {
    /* ... handle the case where no users were found, e.g.:*/
    sails.log.verbose(
      'Worth noting: Just handled a request for active users during a time frame '+
      'where no users were found.  Anyway, I didn\'t think this was possible, because '+
      'our app is so cool and popular.  But there you have it.'
    );
    return res.json([]);
  },
  success: function(users) {
    /* ... handle the usual, expected outcome, e.g.: */
    return res.json(users);
  }
});
```

A key advantage to using helpers comes from the ability to update functionality that touches many parts of an app, all by changing code in one place.  For example, by changing the default value of `numUsers` from `5` to `15`, we update the size of the default list returned in _any_ place that uses the helper.  Also, by using well-defined inputs like `numUsers` and `activeSince`, we guarantee we&rsquo;ll get helpful errors if we accidentally use an invalid (i.e. non-numeric) value.


### Notes

A few more notes about the example `get-recent-users` helper above:

> * Many of the fields such as `description` and `friendlyName` are not strictly required, but are immensely helpful in keeping the code maintainable, especially when sharing the helper across multiple apps.
> * The `noUsersFound` exit may or may not be helpful, depending on your app.  If you always wanted to perform some specific action whenever no users were returned (for example, redirecting to a different page), the exit would be a good idea.  If on the other hand you simply wanted to tweak some text in a view based on whether or not users were returned, it might be better to just have the `success` exit and check the `length` of the returned array in your action or view code.

<docmeta name="displayName" value="Example helper">
