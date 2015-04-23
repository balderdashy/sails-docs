# Through Associations
### Overview

Many-to-Many through associations behave the same way as many-to-many associations with the exception
of the join table being automatically created for you. This allows you to attach additional attributes
onto the relationship inside of the join table.

This is achieved using the `through` attribute on an association.

Below is an example showing `Apps` that can be owned by many `Users` and those `Users` can own many `Apps` through the `teams model`.

`myApp/api/models/app.js`

```js
module.exports = {
 
	attributes: {
  
    [ ... ]
	
		owners: {
			collection: "user",
			via: "apps",
			through: "team"
		}
		
		[ ... ]
 
	}
};
```

`myApp/api/models/team.js`
```js
module.exports = {
 
	tableName: 'team',
	tables: [ 'user', 'app' ],
	junctionTable: true,
 
	attributes: {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: 'integer'
		},
		user: {
			columnName: 'user',
			type: 'integer',
			foreignKey: true,
			references: 'user',
			on: 'id',
			via: 'app',
			groupBy: 'user'
		},
		app: {
			columnName: 'app',
			type: 'integer',
			foreignKey: true,
			references: 'app',
			on: 'id',
			via: 'user',
			groupBy: 'app'
		},
		role: {
			type: "string"
		}
	}
};

```

`myApp/api/models/user.js`
```js
module.exports = {
 
	attributes: {
  
    [ ... ]
 
		apps: {
			collection: "app",
			via: "owners",
			through: "team"
		}
		
	}
};

```







<docmeta name="uniqueID" value="ThroughAssociations740718">
<docmeta name="displayName" value="Through Associations">

