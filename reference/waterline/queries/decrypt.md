# .decrypt()

Decrypt records returned for this particular query which were [encrypted at rest](TODO).


```usage
await query.decrypt();
```

### Usage

This method doesn't accept any arguments.


### Example
To retrieve a user record with `ssn` decrypted:
```javascript
await User.find().decrypt();
// =>
// [ { id: 4, fullName: 'Finn Mertens', ssn: '555-55-5555' } ]
```
If the record were retrieved without `.decrypt()`, you would get:
```javascript
await User.find();
// =>
// [ { id: 4, fullName: 'Finn Mertens', ssn: 'YWVzLTI1Ni1nY20kJGRlZmF1bHQ=$F4Du3CAHtmUNk1pn$hMBezK3lwJ2BhOjZ$6as+eXnJDfBS54XVJgmPsg' } ]
```

<docmeta name="displayName" value=".decrypt()">
<docmeta name="pageType" value="method">
