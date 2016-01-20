# Validations

Sails bundles support for automatic validations of your models' attributes. Any time a record is updated, or a new record is created, the data for each attribute will be checked against all of your predefined validation rules. This provides a convenient failsafe to ensure that invalid entries don't make their way into your app's database(s).

### When to Use Validations

Validations can be a huge time-saver, preventing you from writing many hundreds of lines of repetitive code.  But keep in mind that model validations are run for _every create or update_ in your application.  Before using a validation rule in one of your attribute definitions, make sure you are OK with it being applied _every time_ your application calls `.create()` or `.update()` to specify a new value for that attribute.  If that is _not_ the case, you should instead write a custom function in one of your [services]() or a [model class method]() and call that manually.

As a general rule, your decision about whether or not to use validations for a particular attribute (and about your data model in general) should depend on your app's requirements. It is a very good idea to fully consider your application's user interface _first_ before setting up validations on your model attributes.

For example, let's say that your Sails app allows users to sign up for an account by either (A) entering an email address and password and then confirming that email address or (B) signing up with LinkedIn.  Now let's say your `User` model has one attribute called `linkedInEmail` and another attribute called `manuallyEnteredEmail`.  Even though _one_ of those email address attributes is required, _which one_ is required depends on how a user signed up.  So in that case, your `User` model cannot use the `required: true` validation-- instead you'll need to validate that one email or the other was provided and is valid by manually checking these values before the relevant `.create()` and `.update()` calls in your code, e.g.:

```javascript
if ( !_.isString( req.param('email') ) ) {
  return res.badRequest();
}
```

To take this one step further, now let's say your application accepts payments.  During the sign up flow, if a user signs up with a paid plan, he or she must also provide an email address for billing purposes (`billingEmail`).  If a user signs up with a free account, he or she skips that step.  On the account settings page, users on a paid plan do see a "Billing Email" form field where they can customize their billing address.  This is different from users on the free plan, who see a call to action which links to the "Upgrade Plan" page.

Even with these requirements, which seem quite specific, there are unanswered questions:  

- Do we update the billing email automatically when the other email address from which it was defaulted changes?
- What if the billing email had been changed at least once? 
- What happens to the billing email after a user downgrades to the free plan? If a user upgrades to a paid plan again, do we infer his or her billing email address anew or use the old one?
- What happens to the billing email when an existing user connects his or her LinkedIn account and a new `linkedInEmail` is saved?
- What happens to the billing email if a monthly invoice email cannot be delivered?
- What happens to the billing email if a member of your support team logs into the admin interface and changes it manually?
- What happens to the billing email if a POST request is received on the callback URL we provided to the LinkedIn API to notify our app that the user changed her email address on http://linkedin.com, and so a new `linkedInEmail` is saved?
- What happens to the billing email when an existing user disconnects her LinkedIn account?
- Are two user accounts in the database allowed to have the same billing email?  What about the email from LinkedIn?  Or the one they entered manually?

Depending on the answers to questions like these, we might end up keeping the `required` validation on `billingEmail`, adding new attributes (like `hasBillingEmailBeenChangedManually`), or even changing whether or not to use a `unique` constraint.



You could ensure the `billingEmail` attribute _always_ exists and is up to date, whether or not a user is on a paid plan.  In this case you can take advantage of the `required: true` validation in the `billingEmail` attribute definition, but you have to manually keep the billing email address up to date in your actions which change related data, e.g. when:
  - a new user signs up
  - an existing user connects his or her LinkedIn account
  - a POST request is received on the callback URL we provided to the LinkedIn API to notify our app that the user changed her email address on http://linkedin.com
  - an existing user disconnects her LinkedIn account
  - an existing user upgrades/downgrades her payment plan
  - an existing user changes her `billingEmail` on the account settings page



The problem with a requirement like this is that, unless they are accompanied with thorough wireframes of the desired user interface, they overlook important details which are necessary for making the right implementation decisions.  In particular, deferring these kinds of details can dramatically affect validation rules we choose to use in our app.



You could update the `billingEmail` the first time a user becomes a paying customer.  In this case, your controller action that performs the initial plan upgrade would need code that updates the User record to set its `billingEmail` attribute to `linkedInEmail` or `manuallyEnteredEmail`, whichever is available.  From then on out
Imagine your account settings page allows users to customize their billing email address.

For free accounts, you could show a billing email form field as disabled.  For paid accounts, you    `billingEmail` as a the first time a user becomes a paying customer.  In this case, your controller action that performs the initial plan upgrade would need code that updates the User record to set its `billingEmail` attribute to `linkedInEmail` or `manuallyEnteredEmail`, whichever is available.  From then on out

You could ensure the `billingEmail` attribute _always_ exists and is up to date, whether or not a user is on a paid plan.  In this case you can take advantage of the `required: true` validation in the `billingEmail` attribute definition, but you have to manually keep the billing email address up to date in your actions which change related data, e.g. when:
  - a new user signs up
  - an existing user connects his or her LinkedIn account
  - a POST request is received on the callback URL we provided to the LinkedIn API to notify our app that the user changed her email address on http://linkedin.com
  - an existing user disconnects her LinkedIn account
  - an existing user upgrades/downgrades her payment plan
  - an existing user changes her `billingEmail` on the account settings page

###### If your account settings page **does** allow users to customize their billing email address as a separate field:


These examples are just a quick

might change if he or she decides to unlink their LinkedIn account or add a LinkedIn account down the road.

_either one or the other_ is required, you should not use `required: true` If It would be tempting to add `required: true` to both attributes  validation rule 


In addition, users can choose to provide a public email address that will be shown to other people viewing their profile on the website or mobile app.





The following miscellaneous validation rules are handled by [Anchor](https://github.com/sailsjs/anchor), a thin layer on top of [node-validator](https://github.com/chriso/validator.js), a robust validation libraries for Node.js.

before doing  Also remember that regardless of the validation rules being used, an attribute must _always_ specify one of the built in data types ('string', 'integer', json', etc), no matter what validations are used.



The following miscellaneous validation rules are handled by [Anchor](https://github.com/sailsjs/anchor), a thin layer on top of [node-validator](https://github.com/chriso/validator.js), a robust validation libraries for Node.js.


### Required

Sails supports most of the validations available in `Node-Validator`, as well as a few extras that require database integration, like `unique`.


### Unique

Sails supports most of the validations available in `Node-Validator`, as well as a few extras that require database integration, like `unique`.


### Validation Rules

The following miscellaneous validation rules are handled by [Anchor](https://github.com/sailsjs/anchor), a thin layer on top of [node-validator](https://github.com/chriso/validator.js), a robust validation libraries for Node.js.


| Name of validator | What does it check? | Notes on usage |
|-------------------|---------------------|----------------|
|after| check if `string` date in this record is after the specified `Date` | must be valid javascript `Date` |
|alpha| check if `string` in this record contains only letters (a-zA-Z) | |
|alphadashed|| does this `string` contain only letters and/or dashes? |
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
|ipv6| check if `string` in this record is a valid IP v6 | |
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
|protected| Should this attribute be removed when `toJSON` is called on a model instance?  | |
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

> **Warning:** Support for custom validation rules as documented here will very likely be ending in Waterline 1.0.  To future-proof your app, use a function from one of your services or a model class method for custom validation instead.

You can define your own custom validation rules by specifying a `types` dictionary as a top level property of your model, then use them in your attribute definitions just like you could any other validation rule above:

```javascript
// api/models/User.js
module.exports = {

  // Values passed for creates or updates of the User model must obey the following rules:
  attributes: {

    firstName: {
      // Note that a base type (in this case "json") still has to be defined, even though validation rules are in use.
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 15
    },
    
    location: {
      type: 'json',
      isPoint: true // << defined below
    },
    
    password: {
      type: 'string',
      password: true // << defined below
    }

  },

  // Custom types / validation rules
  // (available for use in this model's attribute definitions above)
  types: {
    isPoint: function(value){
      // For all creates/updates of `User` records that specify a value for an attribute
      // which declares itself `isPoint: true`, that value must:
      // • be a dictionary with numeric `x` and `y` properties
      // • both `x` and `y` must be neither `Infinity` nor `-Infinity`
      return _.isObject(value) &&
      _.isNumber(value.x) && _.isNumber(value.y) &&
      value.x !== Infinity && value.x !== -Infinity &&
      value.y !== Infinity && value.y !== -Infinity;
    },
    password: function(value) {
      // For all creates/updates of `User` records that specify a value for an attribute
      // which declares itself `type: 'password'`, that value must:
      // • be a string
      // • be at least 6 characters long
      // • contain at least one number
      // • contain at least one letter
      return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
    }
  }
}
```

Custom validation functions receive the incoming value being validated as their first argument, and are expected to return `true` if it is valid, `false` otherwise.  Once set up, these custom validation rules can be used in one or more attributes in the model where they are defined by setting an extra property with the same name in relevant attribute definitions; e.g. `someCustomValidationRuleOrType: true`.

Note that custom validation rules are not namespaced from built-in validations and types-- they are all merged together. So be careful not to define a custom validation that collides with any of the base types or validations in Waterline (e.g. don't name your custom validation rule `json` or `minLength`).



### Custom Validation Messages
Out of the box, Sails.js does not support custom validation messages.  Instead your code should look at validation errors in the callback from your `create()` or `update()` calls and take the appropriate action.
[sails-hook-validator](https://github.com/lykmapipo/sails-hook-validation)
> If you are using Sails v0.11.0+, you may want to take advantage of [`sails-hook-validation`](https://github.com/lykmapipo/sails-hook-validation), a [custom hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks) by [@lykmapipo](http://github.com/lykmapipo).  Details regarding its installation and usage can be found in the [`sails-hook-validator` repository on GitHub](https://github.com/lykmapipo/sails-hook-validation).



<docmeta name="displayName" value="Validations">
