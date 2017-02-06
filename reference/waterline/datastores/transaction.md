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

##### During
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | db                  | ((ref))             | The leased (transactional) database connection. |
| 2 | proceed             | ((function))        | Call this function when your `during` code is finished, or if a fatal error occurs.<br/><br/>_Usage:_<br/>&bull; `return proceed();`<br/>&bull; `proceed(new Error('Oops))`<br/>&bull; `proceed(undefined, { some: 'arbitrary result'} )`<br/><br/>_Like any Node callback, if you call `proceed(new Error('Oops'))` (i.e. with a truthy first argument; conventionally an Error instance), then Sails understands that to mean a fatal error occurred.  Otherwise, it is assumed that everything went according to plan.._

##### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.  _(The exact format of this error varies depending on the SQL query you passed in and the database adapter you're using._
| 2 |    _resultMaybe_      | ((Ref?))          | The optional result data sent back from `during`.  In other words, if, in your `during` function, you called `proceed(undefined, 'foo')`, then this will be `'foo'`. |


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
