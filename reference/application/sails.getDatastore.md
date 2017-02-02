# sails.getDatastore()
Access the datastore instance.

```javascript
sails.getDatastore(dataStoreName);
```

### Usage


|   |          Argument           | Type                | Details
|---|---------------------------- | ------------------- |:-----------
| 1 |        dataStoreName        | ((string?))         | Defaults to `'default'`.

#### Returns

**Type:** ((Dictionary))

The registered datastore instance (RDI)

### Notes
> This can be used as an easy alias for when you don't know the name of the datastore and thus cannot simply do `sails.datastore('foo')`

<docmeta name="displayName" value="sails.getDatastore()">
<docmeta name="pageType" value="method">
