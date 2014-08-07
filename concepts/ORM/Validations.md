# Validations

Sails bundles support for automatic validations of your models' attributes. Any time a record is updated, or a new record is created, the data for each attribute will be checked against all of your predefined validation rules. This provides a convenient failsafe to ensure that invalid entries don't make their way into your app's database(s).

### Validation Rules

Validations are handled by [Anchor](https://github.com/balderdashy/anchor), a thin layer on top of [Validator](https://github.com/chriso/validator.js), one of the most robust validation libraries for Node.js.  Sails supports most of the validations available in Validator, as well as a few extras that require database integration, like `unique`.


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
|notEmpty| |  |
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
|unique| Checks to see if a new record model attribute is unique.  | |
|uppercase| checks if `string` in this record is uppercase | |
|url| checks if `string` in this record is a URL | |
|urlish| Does the `string` in this record contain something that looks like a route, ending with a file extension? | /^\s([^\/]+\.)+.+\s*$/g |
|uuid| checks if `string` in this record is a UUID (v3, v4, or v5) | |
|uuidv3| checks if `string` in this record is a UUID (v3) | |
|uuidv4| checks if `string` in this record is a UUID (v4) | |




### Custom Validation Rules

You can define your own types and their validation with the types object. It's possible to access and compare values to other attributes (with "this"). This allows you to move validation business logic into your models and out of your controller logic.

> Note that your own type always have to be a variant of the basic data-types ("string", "int", "json", ...)

#### Example Model

```javascript
// api/models/foo
module.exports = {

  types: {
    is_point: function(geoLocation){
      return geoLocation.x && geoLocation.y
    },
    password: function(password) {
      return password === this.passwordConfirmation;
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
      //note, that the base type (json) still has to be defined
      type: 'json',
      is_point: true
    },
    password: {
      type: 'string',
      password: true
    },
    passwordConfirmation: {
      type: 'string'
    }

  }
}
 ```




<docmeta name="uniqueID" value="Validations576587">
<docmeta name="displayName" value="Validations">

