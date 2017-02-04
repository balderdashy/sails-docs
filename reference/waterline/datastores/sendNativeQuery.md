# .sendNativeQuery()

```
someDatastore.sendNativeQuery(nativeQuery).exec(function(err, resultMaybe) {

});
```

### Usage
|   |     Argument        | Type                | Details
|---|---------------------|---------------------|:------------|
| 1 | nativeQuery         | ((string))          |  |

##### Callback
|   |     Argument        | Type                | Details |
|---|:--------------------|---------------------|:---------------------------------------------------------------------------------|
| 1 |    _err_            | ((Error?))          | The error that occurred, or a falsy value if there were no errors.  _(The exact format of this error varies depending on the SQL query you passed in and the database adapter you're using.  See examples below for links to relevant documentation.)_
| 2 |    _rawResult_      | ((Ref?))            |  |

<docmeta name="displayName" value=".sendNativeQuery()">
<docmeta name="pageType" value="method">
