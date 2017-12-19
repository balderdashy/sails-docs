# .transaction()

Fetch a preconfigured deferred object hooked up to the sails-mysql or sails-postgresql adapter (and consequently the appropriate driver)

```usage
await datastore.transaction(during);
```

_Or_

+ `var result = await datastore.transaction(during);`

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | during              | ((function))        | See parameters in the "`during` usage" table below. |

##### During
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | db                  | ((ref))             | The leased (transactional) database connection. |
| 2 | proceed             | ((function))        | Call this function when your `during` code is finished, or if a fatal error occurs.<br/><br/>_Usage:_<br/>&bull; `return proceed();`<br/>&bull; `proceed(new Error('Oops))`<br/>&bull; `proceed(undefined, { some: 'arbitrary result'} )`<br/><br/>_Like any Node callback, if you call `proceed(new Error('Oops'))` (i.e. with a truthy first argument; conventionally an Error instance), then Sails understands that to mean a fatal error occurred.  Otherwise, it is assumed that everything went according to plan.._

##### Result
| Type                | Details |
|---------------------|:---------------------------------------------------------------------------------|
|  ((Ref?))            | The optional result data sent back from `during`.  In other words, if, in your `during` function, you called `proceed(undefined, 'foo')`, then this will be `'foo'`. |

##### Errors

|     Name        | Type                | When? |
|:----------------|---------------------|:---------------------------------------------------------------------------------|
| UsageError      | ((Error))           | Thrown if something invalid was passed in.
| AdapterError    | ((Error))           | Thrown if something went wrong in the database adapter.
| Error           | ((Error))           | Thrown if anything else unexpected happens.

See [Concepts > Models and ORM > Errors](https://sailsjs.com/documentation/concepts/models-and-orm/errors) for examples of negotiating errors in Sails and Waterline.


### Example

Subtract the specified amount from one user's balance and add it to another.

```javascript
await sails.getDatastore()
.transaction(async (db, proceed)=> {

  var myAccount = await BankAccount.findOne({ owner: req.session.userId })
  .usingConnection(db);
  if (!myAccount) {
    return proceed(new Error('Consistency violation: Database is corrupted-- logged in user record has gone missing'));
  }

  var recipientAccount = await BankAccount.findOne({ owner: req.param('recipientId') }).usingConnection(db)
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
  await BankAccount.update({ owner: req.session.userId })
  .set({
    balance: myNewBalance
  })
  .usingConnection(db);

  // Update the recipient's bank account
  await BankAccount.update({ owner: req.param('recipientId') })
  .set({
    balance: recipientAccount.balance + req.param('amount')
  })
  .usingConnection(db);

  return proceed();
})
.intercept('E_INSUFFICIENT_FUNDS', (err)=> {
  return res.badRequest(err);
})
.intercept('E_NO_SUCH_RECIPIENT', ()=> {
  return res.notFound();
});

return res.ok();
```

<docmeta name="displayName" value=".transaction()">
<docmeta name="pageType" value="method">
