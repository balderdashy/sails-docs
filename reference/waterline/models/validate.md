# .validate()

Verify that a value would be valid for a given attribute, then return it, loosely coerced.

```javascript
Something.validate(attrName, value);
```

#### Usage

| # | Description   | Accepted Data Types          | Required ? |
|---|---------------|------------------------------|------------|
| 1 | Find Criteria | `{}`, `string`, `int`        | No         |
| 2 | Callback      | `function`                   | No         |


### Example

Check the given string and return a normalized version.
> Note that if normalization is not possible, this throws an error.

```javascript
try {
  var normalizedBalance = BankAccount.validate('balance', '$349.86');
} catch (e) {
  switch (e.code) {
    case 'E_VALIDATION':
      console.log(e);
      // => '[Error: Invalid `bankAccount`]'
      _.each(e.all, function(woe){
        console.log(woe.attrName+': '+woe.message);
      });
      break;
    default: throw e;
  }
}



<docmeta name="displayName" value=".validate()">
<docmeta name="pageType" value="method">
