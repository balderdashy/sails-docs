# .create( `values`, [`callback`] )
### Purpose
Creates a new instance of this model in the database.

### Overview

#### Parameters
|   |     Description     | Accepted Data Types | Required ? |
|---|---------------------|---------------------|------------|
| 1 |  Record(s) to Create  |      `{}`, `[{}]`   | Yes      |
| 2 |     Callback        | `function`          | No         |

#### Callback Parameters

|   |     Description     | Possible Data Types |
|---|---------------------|---------------------|
| 1 |  Error              | `Error`             |
| 2 |  Records Created    | `{}`, `[{}]`        |



### Example Usage

```javascript
User.create({ name:'Walter Jr' }).exec(function (err, newUser){
  if (err) { return res.serverError(err); }
  
  console.log('Created user with name ' + created.name);
  return res.ok(); 
});
```


##### Negotiating validation errors

> Originally posted in [#3459](https://github.com/balderdashy/sails/issues/3459#issuecomment-170155680)

```javascript
var Passwords = require('machinepack-passwords');


module.exports = {

  signup: function (req, res) {
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      // An unexpected error occurred encrypting the password.
      error: function (err){
        return res.serverError(err);
      },
      // OK.
      success: function (encryptedPassword) {
    
        // Create a user record in the database.
        User.create({
          email: req.param('email'),
          password: encryptedPassword
        }).exec(function (err, newUser) {
          // If there was an error, we negotiate it.
          if (err) {
    
            // If this is NOT a waterline validation error, it is a mysterious error indeed.
            var isWLValidationErr = _.isObject(err) && _.isObject(err.invalidAttributes);
            if (!isWLValidationErr) {
              return res.serverError(err);
            }
    
            // Otherwise, it must be a waterline validation error.
    
            // If it doesn't contain a problem with the password, then just handle is
            // using `res.badRequest()` like normal.
            if (!_.isArray(err.invalidAttributes.password)) {
              return res.badRequest(err);
            }
    
            // Otherwise, something was wrong with the provided encrypted password.
            // So in this case, we'll modify the validation error in place to improve the error output
            // and so that we don't inadvertently reveal info about the encrypted password.
            // (specifically, we loop over the array of attribute errors and modify them).
            err.invalidAttributes.password = _.map(err.invalidAttributes.password, function eachPasswordErr (passwordError) {
              return _.reduce(passwordError, function (memo, val, key) {
                var allOccurrencesOfEncryptedPassMatcher = new RegExp(_.escapeRegExp(encryptedPassword),'g');
                memo[key] = val.replace(allOccurrencesOfEncryptedPassMatcher, '****');
                return memo;
              }, {});
            });
            
            // Finally, respond with the modified waterline validation error and a 400 status code.
            return res.badRequest(err);
    
          }//</if (err)>
    
          // Otherwise, `err` was falsy, so it worked!  The user was created.
          // (maybe do other stuff here, or just send a 200 OK response)
          return res.ok();
    
        });//</User.create>
      }
    });//</Passwords.encryptPassword>
  }//</UserController.signup>
});
```



<docmeta name="displayName" value=".create()">
<docmeta name="pageType" value="method">
