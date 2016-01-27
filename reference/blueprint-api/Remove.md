# Remove (Blueprint)

Remove a foreign record (e.g. a comment) from one of this record's collection associations (e.g. "comments").

```
DELETE /:model/:id/:association/:fk
```

This action removes a reference to some other record (the "foreign" record) from a collection attribute of this record (the "primary" record).  Note that this does not actually destroy the foreign record-- it just removes it.

+ If the foreign record does not exist, it is created first.
+ If the collection doesn't contain a reference to the foreign record, this action will be ignored.
+ If the association is 2-way (i.e. reflexive, with "via" on both sides) the association on the foreign record will also be updated.

### Parameters

 Parameter                          | Type                                    | Details
 ---------------------------------- | --------------------------------------- |:---------------------------------
 id                | ((number))<br/>*-or-*<br/>((string))    | The desired record's primary key value<br/><br/>e.g. `16`
 association       | ((string))                              | The name of the collection association<br/><br/>e.g. `'employeesOfTheMonth'`
 fk  | ((number))<br/>*-or-*<br/>((string))    | The id of the foreign record to remove from the collection association.<br/><br/>e.g. `7`
 _callback_                         | ((string))                              | If specified, a JSONP response will be sent (instead of JSON). This is the name of the client-side javascript function to call, passing results as the first (and only) argument<br/> <br/> e.g. `?callback=myJSONPHandlerFn`

### Example

Remove Dolly (employee #7) from the `employeesOfTheMonth` list of store #16:

```
DELETE /store/16/employeesOfTheMonth/7
```

##### Expected Response

```json
{
  "employeesOfTheMonth": [],
  "name": "Dolly",
  "createdAt": "2014-08-03T01:16:35.440Z",
  "updatedAt": "2014-08-03T01:51:41.567Z",
  "id": 16
}
```


### Notes

> + If you'd like to spend some more time with Dolly, a more detailed walkthrough for the example above is available [here](https://gist.github.com/mikermcneil/e5a20b03be5aa4e0459b).
> + This action is for dealing with _plural_ ("collection") associations.  If you want to set or unset a _singular_ ("model") association, just use [update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html).

<docmeta name="displayName" value="remove from">
