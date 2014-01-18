# Model Properties

### Overview

Models have properties.  Here's some info about them.


# Model Attributes

### Overview

Model attributes are basic pieces of information about a model. A model called `Person`
might have attributes called `firstName`, `lastName`, `phoneNumber`, `age`, `birthDate` and `emailAddress`.

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

Sails can also validate your data before it is saved.  To be fair, our ORM [Waterline](https://github.com/balderdashy/waterline) does all the heavy lifting. Below is the same example with some validations applied.    


```javascript


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

Sometimes you want to 

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
|email| check if `string` in this record likes like an email address | |
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
