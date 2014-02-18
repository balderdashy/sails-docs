# Model Properties

### Overview

#### Model Attributes

Here you will find information about defining models in your Sails project as well as the data types supported by those models.

#### Lifecycle Callbacks

Sails exposes a number of functions that can be called at various times during your query.  Look here for information on how to use custom logic at a specific time relative to your query. 

#### Validations

Look here for information on validating data.  It describes what types of validations are available and gives some examples on how to use them.

#### Associations Between Models

This is where you will look in order to learn how to make associations between models.  If you have a model named `User` and a model named `Pet`, you can do things like finding a `Pet` based on the the `User` that owns it. Look here to find out how it all works. 


# tableName

### Overview

> TODO

### Example

> TODO

# *.primaryKey

### Overview

> TODO

### Example

> TODO


# *.columnName

### Overview

Inside an attribute definition, you can specify a `columnName` to force Sails/Waterline to store data for that attribute in a specific column.  Useful for working with existing/legacy databases.


### Example

For example, let's say you have a `User` model in your Sails app that looks like this:

```javascript
// api/models/User.js
module.exports = {
  connection: 'shinyNewMySQLDatabase',
  attributes: {
    name: 'string',
    password: 'string',
    email: {
      type: 'email',
      unique: true
    }
  }
};
```


Everything works great, but instead of using an existing MySQL database sitting on a server somewhere that happens to house your app's intended users:

```javascript
// config/connections.js
module.exports = {
  // ...
  
  // Existing users are in here!
  rustyOldMySQLDatabase: {
    adapter: 'sails-mysql',
    user: 'bofh',
    host: 'db.eleven.sameness.foo',
    password: 'Gh19R!?had9gzQ#Q#Q#%AdsghaDABAMR>##G<ADMBOVRH@)$(HTOADG!GNADSGADSGNBI@(',
    database: 'jonas'
  },
  // ...
};
```

Let's say there's a table called `our_users` in the old MySQL database that looks like this:

| the_primary_key | email_address | full_name | seriously_encrypted_password |
|------|---|----|---|
7 | mike@sameness.foo | Mike McNeil | ranchdressing |
14 | nick@sameness.foo | Nick Crumrine | thousandisland |


In order to use this from Sails, you'd change your `User` model to look like this:

```javascript
// api/models/User.js
module.exports = {
  connection: 'rustyOldMySQLDatabase',
  tableName: 'our_users',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'the_primary_key'
    },
    name: {
      type: 'string',
      columnName: 'full_name'
    },
    password: {
      type: 'string',
      columnName: 'seriously_encrypted_password'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email_address'
    }
  }
};
```

> You might have noticed that we also used the `tableName` property in this example.  This allows us to control the name of the table that will be used to house our data.  More on that [here](http://beta.sailsjs.org/#!documentation/reference/ModelProperties/tableName.html).



# attributes

### Overview

Model attributes are basic pieces of information about a model. A model called `Person`
might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.

> Note, this section applies only if you are using [Waterline](https://github.com/balderdashy/waterline) as your ORM.  If you're not sure what this means, ignore this message.

### Attribute Types

The following attribute types are currently supported by Sails via [Waterline](https://github.com/balderdashy/waterline)

- string
- text
- integer
- float
- date
- time
- datetime
- boolean
- binary
- array
- json


### Examples

The model definition for `Person` might look like this:

```javascript

// Person.js

module.exports = {
  attributes: {
    firstName: 'STRING',
    lastName: 'STRING',
    age: 'INTEGER',
    birthDate: 'DATE',
    phoneNumber: 'STRING',
    emailAddress: 'EMAIL'
  }
};

```

Sails can also validate your data before it is saved!  Below is the same example with some validations applied.    


```javascript

// Person.js

module.exports = {
  attributes: {
    firstName: 'STRING',
    lastName: 'STRING',
    age: {
      type: 'INTEGER',
      max: 150,
      required: true
    },
    birthDate: 'DATE',
    phoneNumber: {
      type: 'STRING',
      defaultsTo: '111-222-3333'
    },
    emailAddress: {
      type: 'email', // Email type will get validated by the ORM
      required: true
    }
  }
};

module.exports = Person;

```


### Notes
> To learn more about what methods are available to you, check out the Model Methods section of Reference


# Lifecycle Callbacks

### Overview

Lifecycle callbacks are functions you can define to run at certain times in a query. They are useful for mutating data before records are saved as well as helping with timing events in your app.

### Callbacks on `create`

  - beforeValidation: fn(values, cb)
  - afterValidation: fn(values, cb)
  - beforeCreate: fn(values, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

#### Example

Sometimes you want to remove fields from a newly created record before they get published and sent back to the client.  You can use the afterCreate lifecycle callback.

```javascript

// User.js

module.exports = {

	attributes: {
		name: 'STRING',
		profession: 'STRING',
		gps_location_of_buried_drug_money: 'JSON'
	},
	afterCreate: function(newlyInsertedRecord, cb){
		delete newlyInsertedRecord.gps_location_of_buried_drug_money;
		cb();
	}

};

```


### Callbacks on `update`

  - beforeValidation: fn(valuesToUpdate, cb)
  - afterValidation: fn(valuesToUpdate, cb)
  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

#### Example

Youre the NSA and you need to update the record of a person who might try to hurt America!  First though, you need to make sure that the record concerns a person of interest.  You might want to use the `beforeValidation` lifecycle callback to see if the record's `citizen_id` exists in your `Probable_terrorist` model.  


```javascript

// Record.js

module.exports = {

	attributes: {
		citizen_name: 'STRING',
		phone_records: 'ARRAY',
		text_messages: 'ARRAY',
		friends_and_family: 'ARRAY',
		geo_location: 'JSON',
		loveint_rating: 'INTEGER',
		citizen_id: 'INTEGER'
	},
	beforeValidation: function(citizen_record, cb){
		var terroristLookupCB = function(err,terroristRecord){
		
			var runCallback = cb;

			if (err) return err;
			
			if (terroristRecord)
				runCallback();
			else
				return;
		};
		

		Probable_terrorist.findOneById(citizen_record.citizen_id).exec(terroristLookupCB);

	}
};


```

### Callbacks on `destroy`

  - beforeDestroy: fn(criteria, cb)
  - afterDestroy: fn(cb)

#### Example

Let's pretend you're Myspace and your last user has just deleted their account.  You are now irrelevant.  You can use the afterDestroy lifecycle callback to help close up shop.

```javascript

module.exports = {

	attributes: {
		name: 'STRING',
		top_8_friends: 'ARRAY',
		favorites_things: 'JSON'
	},
	afterDestroy: function(cb){

		process.exit(1);

	}

};



```


### Overview


# Validation

Validations are handled by [Anchor](https://github.com/balderdashy/anchor) which is based off of [Node Validate](https://github.com/chriso/node-validator) and supports most of the properties in node-validate. 

### Validation Rules

| Name of validator | What does it check? | Notes on usage |
|-------------------|---------------------|----------------|
|after| check if `string` date in this record is after the specified `Date` | must be valid javascript `Date` |
|alpha| check if `string` in this record contains only letters (a-zA-Z) | |
|alphadashed|| does this `string` contain only numbers and/or dashes? |
|alphanumeric| check if `string` in this record contains only letters and numbers. | |
|alphanumericdashed| does this `string` contain only numbers and/or letters and/or dashes? | |
|array| is this a valid javascript `array` object? | strings formatted as arrays won't pass |
|before| check if `string` in this record is a date that's before the specified date | |
|binary| is this binary data? | If it's a string, it will always pass |
|boolean| is this a valid javascript `boolean` ? | `string`s will fail |
|contains| check if `string` in this record contains the seed | |
|creditcard| check if `string` in this record is a credit card | |
|date| check if `string` in this record is a date | takes both strings and javascript |
|datetime| check if `string` in this record looks like a javascript `datetime`| |
|decimal| | contains a decimal or is less than 1?|
|email| check if `string` in this record looks like an email address | |
|empty| Arrays, strings, or arguments objects with a length of 0 and objects with no own enumerable properties are considered "empty" | lo-dash _.isEmpty() |
|equals| check if `string` in this record is equal to the specified value | `===` ! They must match in both value and type |
|falsey| Would a Javascript engine register a value of `false` on this? | |
|finite| Checks if given value is, or can be coerced to, a finite number | This is not the same as native isFinite which will return true for booleans and empty strings |
|float| check if `string` in this record is of the number type float | |
|hexadecimal| check if `string` in this record is a hexadecimal number | |
|hexColor| check if `string` in this record is a hexadecimal color | |
|in| check if `string` in this record is in the specified array of allowed `string` values | |
|int|check if `string` in this record is an integer | |
|integer| same as above | Im not sure why there are two of these. |
|ip| check if `string` in this record is a valid IP (v4 or v6) | |
|ipv4| check if `string` in this record is a valid IP v4 | |
|ipv6| check if `string` in this record is aa valid IP v6 | |
|is| | something to do with REGEX|
|json| does a try&catch to check for valid JSON. | |
|len| is `integer` > param1 && < param2 | Where are params defined? |
|lowercase| is this string in all lowercase? | |
|max| | |
|maxLength| is `integer` > 0 && < param2 |  |
|min| | |
|minLength| | |
|not| | Something about regexes |
|notContains| | |
|notEmpty| | WTF |
|notIn| does the value of this model attribute exist inside of the defined validator value (of the same type) | Takes strings and arrays |
|notNull| does this not have a value of `null` ? | |
|notRegex| | |
|null| check if `string` in this record is null | |
|number| is this a number? | NaN is considered a number |
|numeric| checks if `string` in this record contains only numbers | |
|object| checks if this attribute is the language type of Object | Passes for arrays, functions, objects, regexes, new Number(0), and new String('') ! |
|regex| | |
|required| Must this model attribute contain valid data before a new record can be created? | |
|string| is this a `string` ?| |
|text| okay, well is <i>this</i> a `string` ?| |
|truthy| Would a Javascript engine register a value of `false` on this? | |
|undefined| Would a javascript engine register this thing as have the value 'undefined' ? | |
|uppercase| checks if `string` in this record is uppercase | |
|url| checks if `string` in this record is a URL | |
|urlish| Does the `string` in this record contain something that looks like a route, ending with a file extension? | /^\s([^\/]+\.)+.+\s*$/g |
|uuid| checks if `string` in this record is a UUID (v3, v4, or v5) | |
|uuidv3| checks if `string` in this record is a UUID (v3) | |
|uuidv4| checks if `string` in this record is a UUID (v4) | |

### Custom Validation Rules

You can define your own types and their validation with the types hash. It's possible to access and compare values to other attributes.

#### Example Model


```javascript
module.export = {

	types: {
		point: function(geoLocation){
					return geoLocation.x && geoLocation.y
				}
			},
	attributes: {
		firstName: {
			type: 'string',
			required: true,
			minLength: 5,
			maxLength: 15
		},
		location: {
			//note, that the base type (json) still has to be define
			type: 'json',
			point: true
		}
	}
}

 ```
