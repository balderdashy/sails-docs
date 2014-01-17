# Model Properties

### Overview

Models have properties.  Here's some info about them.


# Model Attributes

### Overview

Model attributes are basic pieces of information about a model. A model called `Person`
might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.

### Attribute Types

The following attribute types are currently supported by Sails via [Waterline](https://github.com/balderdashy/waterline) :

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
var Person = {
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

Sails can also validate your data before it is saved.  To be fair, our ORM Waterline does all the heavy lifting. Below is the same example with some validations applied.    


```javascript

// Person.js
var Person = {
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

  - beforeValidation / *fn(values, cb)*
  - afterValidation / *fn(values, cb)*
  - beforeCreate / *fn(values, cb)*
  - afterCreate / *fn(newlyInsertedRecord, cb)*

#### Example



```javascript


```


### Callbacks on `update`

  - beforeValidation / *fn(valuesToUpdate, cb)*
  - afterValidation / *fn(valuesToUpdate, cb)*
  - beforeUpdate / *fn(valuesToUpdate, cb)*
  - afterUpdate / *fn(updatedRecord, cb)*

#### Example

```javascript


```

### Callbacks on `destroy`

  - beforeDestroy / *fn(criteria, cb)*
  - afterDestroy / *fn(cb)*

#### Example

```javascript


```


### Overview


# Validation

Validations are handled by [Anchor](https://github.com/balderdashy/anchor) which is based off of [Node Validate](https://github.com/chriso/node-validator) and supports most of the properties in node-validate. For a full list of validations see: [Anchor Validations](https://github.com/balderdashy/anchor/blob/master/lib/rules.js).


### Validation Rules

| Name of validator | What does it check? | Notes on usage |
------------------------------------------------------------
|after| check if `string` date in this record is after the specified `Date` | must be valid javascript `Date` |
|alpha| check if `string` in this record contains only letters (a-zA-Z) | |
|alphadashed|| does this `string` contain only numbers and/or dashes? |

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
