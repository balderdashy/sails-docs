# findOrCreate

- Checks for the existence of the record in the first parameter.  If it can't be found, the record in the second parameter is created.
- If no parameters are passed, it will return the first record that exists.
- If no `record` is provided, it will either find a record with matching `criteria` or create the record if the object can not be found.

Eg. `Model.findOrCreate( findCriteria , recordToCreate , [callback] )`

### Overview

#### Parameters

Parameter                          | Type                                    | Details
---------------------------------- | --------------------------------------- |:---------------------------------
findCriteria<br/>*(required)*                |  `{}`,`[{}]`, `string`, `int`    | The criteria used to find the record. If not found and no recordToCreate is provided, it is also the record that will be created.
recordToCreate                      | `{}`, `[{}]`                              | The object, or array of objects, that you would like to create
callback                           | `function(error, createdOrFoundRecords)`                             |  The function that will be called after the command is executed


#### Callback Parameters
Parameter                          | Type                                    | Details
---------------------------------- | --------------------------------------- |:---------------------------------
error                              |  `Error'                                 | An error is returned if the request is unsuccessful
createdOrFoundRecords              | `{}`, `[{}]`                              | The object, or array of objects, that were found or created

### Example Usage

```javascript
User.findOrCreate({name:'Walter'}, {name:'Jessie'}).exec(function createFindCB(error, createdOrFoundRecords){
  console.log('What\'s cookin\' '+record.name+'?');
});
```

### Notes
> Any string arguments passed must be the ID of the record.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.



<docmeta name="displayName" value=".findOrCreate()">
<docmeta name="pageType" value="method">
