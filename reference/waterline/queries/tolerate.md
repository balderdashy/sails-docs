# .tolerate()

Tolerate (swallow) the specified error, and return a new result value (or `undefined`) instead.  (Don't throw.)

```usage
.tolerate(filter, handler)
```

_Or:_
+ `.tolerate(filter)`
+ `.tolerate(handler)` _(to tolerate all errors)_


### Usage
|   |     Argument    | Type                | Details    |
|---|-----------------|---------------------|:-----------|
| 1 | filter          | ((string)) or ((dictionary)) | The code of the error that you want to intercept, or a dictionary of criteria for identifying the error to intercept. |
| 2 | _handler_       | ((function?))        | An optional [procedural parameter](https://en.wikipedia.org/wiki/Procedural_parameter) which Sails will call automatically if the anticipated error is thrown.  It will receive the argument specified in the "Handler" usage table below. If specified, the handler should return a value that will be used as the result. If omitted, the anticipated error will be swallowed and the result of the query will be `undefined`. |

##### Handler
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------------------|
| 1 | err                 | ((Error))           | Your anticipated Error. |

Return a value that will be used as the return value from the original logic instead of throwing the tolerated error.

> .tolerate() is useful for tolerating a kind of error (or all errors). If you chain on .tolerate(), and it matches the error that occurs, then the underlying logic won't throw. It'll return instead. What it returns is up to you -- it's whatever you return from the function you passed in to .tolerate()




### Example

Say you're building an address book, and don't allow records with duplicate email addresses. To swallow the error caused by entering a non-unique email address, and update the existing contact instead:

```javascript
var newOrExistingContact = await Contact.create({
  emailAddress: inputs.emailAddress,
  fullName: inputs.fullName
})
.fetch()
.tolerate('E_UNIQUE');

if(!newOrExistingContact) {
  newOrExistingContact = (
    await Contact.update({ emailAddress: inputs.emailAddress })
    .set({ fullName: inputs.fullName })
    .fetch()
  )[0];
}
```



<docmeta name="displayName" value=".tolerate()">
<docmeta name="pageType" value="method">
