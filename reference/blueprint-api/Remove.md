# Remove from Collection

Removes an association between two records.

```
DELETE /:model/:record/:association/:record_to_remove
```

This action removes a reference to some other record (the "foreign" record) from a collection attribute of this record (the "primary" record).

+ If the foreign record does not exist, it is created first.
+ If the collection doesn't contain a reference to the foreign record, this action will be ignored.
+ If the association is 2-way (i.e. reflexive, with "via" on both sides) the association on the foreign record will also be updated.


### Example

Remove Dolly (employee #7) from the `employeesOfTheMonth` list of store #16, E.g. `http://localhost:1337/store/16/employeesOfTheMonth/7`

#### Route
`DELETE /store/16/employeesOfTheMonth/7`

#### Expected Response

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

> + This action is for dealing with _plural_ ("collection") associations.  If you want to set or unset a _singular_ ("model") association, just use [update](http://sailsjs.org/documentation/reference/blueprint-api/Update.html).

The example above assumes "rest" blueprints are enabled, and that your project contains at least an empty 'Employee' model as well as a `Store` model with association: `employeesOfTheMonth: {collection: 'Employee'}`.  You'll also need at least an empty `StoreController` and `EmployeeController`.  You can quickly achieve this by running:

```shell
$ sails new foo
$ cd foo
$ sails generate api store
$ sails generate api employee
```
 
...then editing `api/models/Store.js`.

```
module.exports = {
 attributes: {
   employeesOfTheMonth: {collection: 'Employee'}
 }
}
```

You will then need to create a store with an employeesOfTheMonth collection as described [here](https://github.com/jodonnell-broadsoft/sails-docs/blob/master/reference/blueprint-api/Create.md#create-new-record-while-associating-w-another-new-record-rest)

With a post payload of:
```
{
	"name": "Starbucks",
  "id": 16,
	"employeesOfTheMonth": [{
		"name": "Dolly"
	}]
}
```

To find Dolly's id: ```http://localhost:1337/store/16```

Then Remove her from the collection: `DELETE /store/16/employeesOfTheMonth/7`

<docmeta name="uniqueID" value="Remove2294521">
<docmeta name="displayName" value="remove from">
