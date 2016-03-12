# Validations

Sails bundles support for automatic validations of your models' attributes. Any time a record is updated, or a new record is created, the data for each attribute will be checked against all of your predefined validation rules. This provides a convenient failsafe to ensure that invalid entries don't make their way into your app's database(s).

Except for `unique` (which is implemented as a database-level constraint; [see "Unique"](#unique)), all validations below are implemented in JavaScript and run in the same Node.js server process as Sails.  Also keep in mind that, no matter what validations are used, an attribute must _always_ specify one of the built in data types ('string', 'integer', json', etc).

```javascript
// User
module.exports = {
  attributes: {
    emailAddress: {
      type: 'string',
      unique: true,
      required: true
    }
  }
};
```

### Built-in Data Types

Every attribute definition must have a built-in data type (or _typeclass_) specified.  This is used for logical validation and coercion of results and criteria.


| Data Type        | Usage                         | Description                                                  |
|:----------------:|:----------------------------- |:------------------------------------------------------------ |
| ((string))       | `type: 'string'`              | Any string (tolerates `null`).
| ((number))       | `type: 'number'`              | Any number (tolerates `null`)
| ((boolean))      | `type: 'boolean'`             | `true` or `false` (also tolerates `null`)
| ((json))         | `type: 'json'`                | Any JSON-serializable value, including numbers, booleans, strings, arrays, dictionaries, and `null`.
| ((array))        | `type: 'array'`               | Any array consisting solelyof JSON-serializable contents.   |

Different databases vary slightly in the way they handle edge cases and special values such as `Infinity`, `null`, strings of varying lengths, etc.  Sails' ORM (Waterline) and its adapters perform loose validation to ensure that the values provided in criteria dictionaries and as values to `.create()` or `.update()` match the expected typeclass.

> Note that auto-migration also relies on the attribute's declared `type`. This is mainly relevant for schemaful databases (like MySQL or PostgreSQL), since the relevant adapter needs to use this information in order to alter/define tables during auto-migration.  Remember that in production, `migrate: 'safe'` will be enabled and auto-migration will be skipped.



### Validation Rules

The following validation rules are handled by [Anchor](https://github.com/sailsjs/anchor), a robust validation library for Node.js.

In the table below, the "Compatible Attribute Type(s)" column shows what data type(s) (i.e. for the attribute definition's `type` property) are appropriate for each validation rule.  In many cases, a validation rule can be used with more than one type.  Note that coincidentally, the table below takes a shortcut:  If compatible with ((string)), ((number)), ((boolean)), or ((array)), then the validation rule is also compatible with ((json)).


| Name of Rule      | What It Checks For                                                                                                  | Notes On Usage               | Compatible Attribute Type(s) |
|:------------------|:--------------------------------------------------------------------------------------------------------------------|:-----------------------------|:----------------------------:|
|after              | A value that, when parsed as a date, refers to moment _after_ the configured JavaScript `Date` instance.            | `after: new Date('Sat Nov 05 1605 00:00:00 GMT-0000')` | ((string)) |
|alpha              | A value that contains only uppercase and/or lowercase letters.                                                      | `alpha: true`                | ((string)) |
|alphadashed        | A value that contains only letters and dashes.                                                                      |  | ((string)) |
|alphanumeric       | A value that contains only letters and numbers.                                                                     | | ((string)) |
|alphanumericdashed | A value that is a string consisting of only letters, numbers, and/or dashes.                                        | | ((string)) |
|before             | A value that, when parsed as a date, refers to a moment _before_ the configured JavaScript `Date` instance.         | `before: new Date('Sat Nov 05 1605 00:00:00 GMT-0000')` | ((string)) |
|contains           | A value that contains the specified substring.                                                                      | `contains: 'needle'`   | ((string)) |
|creditcard         | A value that is a credit card number.                                                                               | **Do not store credit card numbers in your database unless your app is PCI compliant!**  If you want to allow users to store credit card information, a safe alternative is to use a payment API like [Stripe](https://stripe.com). | ((string)) |
|datetime           | A value that can be parsed as a timestamp; i.e. would construct a JavaScript Date with `new Date()`                 |    | ((string)) |
|_decimal_          | _Alias for `float`._ | | _alias_ |
|email              | A value that looks like an email address. | | ((string)) |
|finite             | A value that is, or can be coerced to, a finite number. | This is not the same as native isFinite which will return true for booleans and empty strings | ((number)) or ((string)) |
|float              | A value that is, or can be coerced to, a floating point (aka decimal) number. | | ((number)) or ((string)) |
|hexadecimal        | A value that is a hexadecimal number. | | ((number)) or ((string)) |
|hexColor           | A value that is a hexadecimal color. | | ((string)) |
|in                 | A value that is in the specified array of allowed strings. | | ((string)) |
|_int_              | _Alias for `integer`._       |  | _alias_ |
|integer            | A value that is an integer, or a string that looks like one. | | ((number)) or ((string)) |
|ip                 | A value that is a valid IP address (v4 or v6) | | ((string)) |
|ipv4               | A value that is a valid IP v4 address. | | ((string)) |
|ipv6               | A value that is a valid IP v6 address. | | ((string)) |
|_is_               | _Alias for `regex`._                               | | _alias_ |
|lowercase          | A value that consists only of lowercase characters. | | ((string)) |
|max                | A value that is less than the configured number. | | ((number)) |
|maxLength          | A value that has no more than the configured number of characters. |  | ((string)) |
|min                | A value that is greater than the configured number. | | ((number)) |
|minLength          | A value that has at least the configured number of characters. | | ((string)) |
|notRegex           | A value that **does not** match the configured regular expression. | | ((string)) |
|notContains        | A value that does not contain the configured substring. | e.g. `'-haystack-needle-haystack-'` would fail validation against `notContains: 'needle'` | ((string)) |
|notIn              | A value that **is not in** the configured array. | | ((string)) |
|notNull            | A value that **is not** equal to `null` | | ((json)) |
|numeric            | A value that is a string which is parseable as a number. | Note that [while `NaN` is considered a number in JavaScript](https://www.destroyallsoftware.com/talks/wat), that is not true for the purposes of this validation. | ((string)) |
|required           | A value that is defined; that is, **not `undefined`**. | | ((json)) |
|regex              | A value that matches the configured regular expression. | | ((string)) |
|truthy             | A value that would be considered truthy if used in a JavaScript `if` statement. | | ((json)) |
|uppercase          | A value that is uppercase. | | ((string)) |
|url                | A value that is a URL. | | ((string)) |
|urlish             | A value that looks vaguely like a URL of some kind. | `/^\s([^\/]+\.)+.+\s*$/g` | ((string)) |
|uuid               | A value that is a UUID (v3, v4, or v5) | | ((string)) |
|uuidv3             | A value that is a UUID (v3) | | ((string)) |
|uuidv4             | A value that is a UUID (v4) | | ((string)) |




### Unique

`unique` is different from all of the validation rules listed above.  In fact, it isn't really a validation at all: it is a **database-level constraint**.  More on that in a second.

If an attribute declares itself `unique: true`, then Sails ensures no two records will be allowed with the same value.  The canonical example is an `emailAddress` attribute on a `User` model:

```javascript
// api/models/User.js
module.exports = {

  attributes: {
    emailAddress: {
      type: 'string',
      unique: true,
      required: true
    }
  }

};
```

##### Why is `unique` different from other validations?

Imagine you have 1,000,000 user records in your database.  If `unique` was implemented like other validations, every time a new user signed up for your app, Sails would need to search through _one million_ existing records to ensure that no one else was already using the email address provided by the new user.  Not only would that be slow, but by the time we finished searching through all those records, someone else could have signed up!

Fortunately, this type of uniqueness check is perhaps the most universal feature of _any_ database.  To take advantage of that, Sails relies on the [database adapter](http://sailsjs.org/documentation/concepts/models-and-orm#?adapters) to implement support for the `unique` validation-- specifically, by adding a **uniqueness constraint** to the relevant field/column/attribute in the database itself during [auto-migration](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?migrate).  That is, while your app is set to `migrate:'alter'`, Sails will automatically generate tables/collections in the underlying database with uniqueness constraints built right in.  Once you switch to `migrate:'safe'`, updating your database constraints is up to you.

##### What about indexes?

When you start using your production database, it is always a good idea to set up indexes to boost your database's performance.  The exact process and best practices for setting up indexes varies between databases, and is out of the scope of the documentation here.  That said if you've never done this before, don't worry-- it's [easier than you might think](http://stackoverflow.com/a/1130/486547).

Just like everything else related to your production schema, once you set your app to use `migrate: 'safe'`, Sails leaves database indexes entirely up to you.

> Note that this means you should be sure to update your indexes alongside your uniqueness constraints when performing [manual migrations](https://github.com/BlueHotDog/sails-migrations).


### When to Use Validations

Validations can be a huge time-saver, preventing you from writing many hundreds of lines of repetitive code.  But keep in mind that model validations are run for _every create or update_ in your application.  Before using a validation rule in one of your attribute definitions, make sure you are OK with it being applied _every time_ your application calls `.create()` or `.update()` to specify a new value for that attribute.  If that is _not_ the case, write code that validates the incoming values inline in your controller; or call out to a custom function in one of your [services](http://sailsjs.org/documentation/concepts/services), or a [model class method](http://sailsjs.org/documentation/concepts/models-and-orm/models#?model-methods-aka-static-or-class-methods).

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

### Best Practices

Finally, here are a few tips:
- Your initial decision about whether or not to use validations for a particular attribute should depend on your app's requirements and how you are calling `.update()` and `.create()`. Don't be afraid to forgo built-in validation support and check values by hand in your controllers or in a helper function.  Oftentimes this is the cleanest and most maintainable approach.
- There's nothing wrong with adding or removing validations from your models as your app evolves. But once you go to production, there is one **very important exception**: `unique`.  During development, when your app is configured to use [`migrate: 'alter'`](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings#?migrate), you can add or remove `unique` validations at will.  However, if you are using `migrate: safe` (e.g. with your production database), you will want to update constraints/indices in your database, as well as [migrate your data by hand](https://github.com/BlueHotDog/sails-migrations).
- It is a very good idea to spend the time to fully understand your application's user interface _first_ before setting up complex validations on your model attributes.

> As much as possible, it is a good idea to obtain or flesh out your own wireframes of your app's user interface _before_ you spend any serious amount of time implementing _any_ backend code.  Of course, this isn't always possible- and that's what the [blueprint API](http://sailsjs.org/documentation/concepts/blueprints) is for.  Applications built with a UI-centric, or "front-end first" philosophy are easier to maintain, tend to have fewer bugs and, since they are built with full knowledge of the user interface from the get-go, they often have more elegant APIs.



### Custom Validation Rules

> **Warning:** Support for custom validation rules as documented here will very likely be ending in Waterline 1.0.  To future-proof your app, use a function from one of your [services](http://sailsjs.org/documentation/concepts/services) or a [model class method](http://sailsjs.org/documentation/concepts/models-and-orm/models#?model-methods-aka-static-or-class-methods) for custom validation instead.

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

Note that custom validation rules are not namespaced from built-in validations and types-- they are all merged together. So be careful not to define a custom validation that collides with any of the base types or validations in Waterline (e.g. don't name your custom validation rule `string` or `minLength`).



##### Custom Validation Messages

Out of the box, Sails.js does not support custom validation messages.  Instead your code should look at validation errors in the callback from your `create()` or `update()` calls and take the appropriate action; whether that's sending a particular error code in your JSON response or rendering the appropriate message in an HTML error page.

> If you are using Sails v0.11.0+, you may want to take advantage of [`sails-hook-validation`](https://github.com/lykmapipo/sails-hook-validation), a [custom hook](http://sailsjs.org/documentation/concepts/extending-sails/Hooks) by [@lykmapipo](http://github.com/lykmapipo).  Details regarding its installation and usage can be found in the [`sails-hook-validation` repository on GitHub](https://github.com/lykmapipo/sails-hook-validation).



<docmeta name="displayName" value="Validations">
