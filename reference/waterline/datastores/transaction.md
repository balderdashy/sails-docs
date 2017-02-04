# .transaction()

Fetch a preconfigured deferred object hooked up to the sails-mysql adapter (and consequently the appropriate driver)

```
someDatastore.transaction(during).exec(function(err, resultMaybe) {

});
```

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | See parameters in the "`during` usage" table below. |

##### `during` usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | db                  | ((ref))             | The leased (transactional) database connection. |
| 2 | proceed             | ((function))        | Called when `during` is finished, or if a fatal error occurs.|

##### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.  _(The exact format of this error varies depending on the SQL query you passed in and the database adapter you're using.  See examples below for links to relevant documentation.)_
| 2 |    _resultMaybe_      | ((Ref?))            |  |


### Example

Subtract the specified amount from one user's balance and add it to another.

```javascript
sails.getDatastore()
.transaction(function (db, proceed) {

  BankAccount.findOne({ owner: req.session.userId }).usingConnection(db)
  .exec(function (err, myAccount) {
    if (err) { return proceed(err); }
    if (!myAccount) { return proceed(new Error('Consistency violation: Database is corrupted-- logged in user record has gone missing')); }
    
    BankAccount.findOne({ owner: req.param('recipientId') }).usingConnection(db)
    .exec(function (err, recipientAccount) {
      if (err) { return proceed(err); }
      if (!recipientAccount) {
        err = new Error('There is no recipient with that id');
        err.code = 'E_NO_SUCH_RECIPIENT';
        return proceed(err);
      }
      
      // Do the math to subtract from the logged-in user's account balance,
      // and add to the recipient's bank account balance.
      var myNewBalance = myAccount.balance - req.param('amount');

      // If this would put the logged-in user's account balance below zero,
      // then abort.  (The transaction will be rolled back automatically.)
      if (myNewBalance < 0) {
        err = new Error('Insufficient funds');
        err.code = 'E_INSUFFICIENT_FUNDS';
        return proceed(err);
      }
      
      // Update the current user's bank account
      BankAccount.update({ owner: req.session.userId })
      .set({ 
        balance: myNewBalance
      })
      .usingConnection(db)
      .exec(function (err) {
        if (err) { return proceed(err); }
        
        // Update the recipient's bank account
        BankAccount.update({ owner: req.param('recipientId') })
        .set({ 
          balance: recipientAccount.balance + req.param('amount') 
        })
        .usingConnection(db)
        .exec(function (err) {
          if (err) { return proceed(err); }
          return proceed();
        });
      });
    });
  });

}).exec(function(err){
  // At this point, we know that, if our code above passed through
  // an error to `proceed`, Sails took care of rolling back the
  // transaction.  Otherwise, it committed it to the database.
  if (err && err.code === 'E_INSUFFICIENT_FUNDS') {
    return res.badRequest(err);
  }
  else if (err && err.code === 'E_NO_SUCH_RECIPIENT') {
    return res.notFound();
  }
  else if (err) {
    return res.serverError(err);
  }

  // All done!
  return res.ok();

});
```

<docmeta name="displayName" value=".transaction()">
<docmeta name="pageType" value="method">
