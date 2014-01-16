# Model Properties

### Overview

Models have properties.  Here's some info about them.


# Attributes

### Overview

Attributes are basic pieces of information about a model. For instance, a model called `Person`
might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.
The model definition for `Person` might look like this:

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

#### Available Attribute Types:

The following attribute types are currently available:

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

### Notes
> To learn more about what methods are available to you, check out the Model Methods section of Reference


# Lifecycle Callbacks

### Overview

Lifecycle callbacks are functions you can define to run at certain times in a query. They are useful for mutating data before creating or generating properties before they are validated.

### Callbacks on `create`

  - beforeValidation / *fn(values, cb)*
  - afterValidation / *fn(values, cb)*
  - beforeCreate / *fn(values, cb)*
  - afterCreate / *fn(newlyInsertedRecord, cb)*

### Callbacks on `update`

  - beforeValidation / *fn(valuesToUpdate, cb)*
  - afterValidation / *fn(valuesToUpdate, cb)*
  - beforeUpdate / *fn(valuesToUpdate, cb)*
  - afterUpdate / *fn(updatedRecord, cb)*

### Callbacks on `destroy`

  - beforeDestroy / *fn(criteria, cb)*
  - afterDestroy / *fn(cb)*

### Overview


# Validation

### Validation Rules

Validations are handled by [Anchor](https://github.com/balderdashy/anchor) which is based off of [Node Validate](https://github.com/chriso/node-validator) and supports most of the properties in node-validate. For a full list of validations see: [Anchor Validations](https://github.com/balderdashy/anchor/blob/master/lib/rules.js).

Validations are defined directly in you Collection attributes. In addition you may set the attribute `type` to any supported Anchor type and Waterline will build a validation and set the schema type as a string for that attribute.

Validation rules may be defined as simple values or functions (both sync and async) that return the value to test against.

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
