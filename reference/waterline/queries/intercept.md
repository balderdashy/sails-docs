# .intercept()

Capture and intercept the specified error, automatically modifying and re-throwing it, or specifying a new Error to be thrown instead.    (Still throws.)

```usage
.intercept(filter, handler)
```

_Or:_
+ `.intercept(handler)` _(to intercept all errors)_



### Usage
|   |     Argument    | Type                | Details    |
|---|-----------------|---------------------|:-----------|
| 1 | _filter_        | ((string)) or ((dictionary)) | The code of the error that you want to intercept, or a dictionary of criteria for identifying the error to intercept.  (If not provided, ALL errors will be intercepted.) |
| 2 | handler         | ((function))        | A [procedural parameter](https://en.wikipedia.org/wiki/Procedural_parameter) which Sails will call automatically if the anticipated error is thrown.  It will receive the argument specified in the "Handler" usage table below. The handler should return the modified Error, a new Error, or (if applicable) a [special exit signal](https://sailsjs.com/documentation/concepts/actions-and-controllers#?exit-signals). |

##### Handler
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------------------|
| 1 | err                 | ((Error))           | The anticipated Error being intercepted. |

Return an Error instance or (if applicable) a [special exit signal](https://sailsjs.com/documentation/concepts/actions-and-controllers#?exit-signals) that will be thrown from the original logic instead of throwing the intercepted error.

> .intercept() is for intercepting a certain kind of error (or all errors). If you chain on .intercept(), and it matches the error that occurs, then the underlying logic will throw. But what it throws is up to you -- it's whatever you return from the function you passed in to .intercept()



### Example

If every user record in an app needs to have a unique email address, you may want to ensure that error is formatted in a specific way so the appropriate message can be displayed to the end user. To intercept that error:
```javascript
var newUserRecord = await User.create({
  emailAddress: inputs.emailAddress,
  fullName: inputs.fullName,
})
.intercept('E_UNIQUE', ()=>{ return new Error('There is already an account using that email address!') })
.fetch();
```

Or, to handle the same error inside of an [actions2 action](https://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2), using a [special exit signal](https://sailsjs.com/documentation/concepts/actions-and-controllers#?exit-signals); instead of an Error instance:
```javascript
var newUserRecord = await User.create({
  emailAddress: inputs.emailAddress,
  fullName: inputs.fullName,
})
.intercept('E_UNIQUE', ()=>'emailAlreadyInUse')
.fetch();
```

For some more examples and explanation of how `.intercept()` works, [check this out](https://gitter.im/balderdashy/sails?at=5ab44f512b9dfdbc3a113e2f).


<docmeta name="displayName" value=".intercept()">
<docmeta name="pageType" value="method">
