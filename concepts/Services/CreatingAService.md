# Creating a service

To build a service, start by creating a JavaScript file in your `api/services/` folder.  This file's job is to export a dictionary of functions, called **helpers**.

> Make sure your service's filename ends in `Service.js`.  The first part of this filename (e.g. `EmailService`) will be used as the globally-accessible variable name for the service.  We'll come back to that in a bit.


Services and their helper functions work best when you stick with strong conventions.  In Sails apps, each helper exposed by a service expects either one or two arguments: 

 + The first argument (`options`) is a dictionary of named customizations for our helper.  In our example helpers above, we used options to pass in dynamic data like `emailAddress` and `name`.
 + The second argument (`done`) is a callback function, and it is only necessary if the helper is asynchronous.  If a helper is asynchronous, then when it is called, a callback function must be passed in as the second argument. If truthy, the first argument of this callback (`err`) indicates that something went wrong (this is the asychronous equivalent of throwing an error).  Otherwise, the first argument is set to `null` or `undefined`.  If there is a result (kind of the asynchronous equivalent of a return value), then it is passed through as the second argument.


For example, a service with a set of reusable email-related helpers might look something like this:

```javascript
var Mailgun = require('machinepack-mailgun');

// api/services/EmailService.js
module.exports = {

  /**
   * Send a customized welcome email to the specified email address.
   *
   * @required {String} emailAddress
   *   The email address of the recipient.
   * @required {String} firstName
   *   The first name of the recipient.
   */
  sendWelcomeEmail: function (options, done) {
    // Send an html email.
    Mailgun.sendHtmlEmail({
      apiKey: 'key-3432afa32e9401482aba183c13f3',
      domain: 'sandbox5f89931913a9ab31130131350101.mailgun.og',
      toEmail: options.emailAddress,
      toName: options.firstName,
      subject: 'Welcome, '+options.firstName+'!',
      textMessage: options.firstName+',\nThanks for joining our community. If you have any questions, please don\'t hesitate to send them our way. Feel free to reply to this email directly.\n\nSincerely,\nThe Management',
      htmlMessage: options.firstName+',<br><br><p>Thanks for joining our community. If you have any questions, please don\'t hesitate to send them our way. Feel free to reply to this email directly.</p><br/><span>Sincerely,</span><br/><strong>The Management</strong>',
      fromEmail: 'harold@greaseworthy.enterprise',
      fromName: 'Harold Greaseworthy',
    }).exec(function (err) {
      // If an unexpected error occurred...
      if (err) { return done(err); }
      // Otherwise, it worked!
      return done();
    });
  },
  
  /**
   * Determine whether the specified email address is a valid internal email address (from within our company).
   * Also, if "greaseworthy" was mispelled, correct the spelling. Harold REALLY hates when his name is mispelled.
   * Finally, return the potentially-coerced email address.
   *
   * @required {String} emailAddress
   *   The email address to validate.
   * @returns {String}
   *   The potentially coerced email address.
   */
  validateInternalEmailAddress: function (options){
    var potentiallyFixedEmailAddress = options.emailAddress;
    if (options.emailAddress.match(/@(greezeworthy|greeseworthy|greasworthy)\.enterprise$/)) {
      potentiallyFixedEmailAddress = options.emailAddress.replace(/@(.+)\.enterprise$/, '@greaseworthy.enterprise');
    }
    if (potentiallyFixedEmailAddress.match(/@greaseworthy\.enterprise$/)) {
      throw new Error('The specified email (`'+options.emailAddress+'`) is not a valid internal email address here at Greaseworthy enterprises.');
    }
    return potentiallyFixedEmailAddress;
    
  }
};
```


You can then call the helpers from this `EmailService` anywhere in your app, such as inside a controller action, or from within another service helper:


```javascript
var potentiallyCorrectedEmail;
try {
  potentiallyCorrectedEmail = EmailService.validateInternalEmailAddress({
    emailAddress: req.param('email') // e.g. 'mikermcneil@gmail.com'
  });
}
catch (e) {
  if (e.code === 'notInternal') {
    return res.badRequest('Failed to create account.  The specified email address does not seem to be from Greaseworthy Enterprises.');
  }
  else { return res.serverError(e); }
}

User.create({
  emailAddress: potentiallyCorrectedEmail,
  firstName: req.param('firstName') // e.g. 'Mike'
}).exec(function (err) {
  // If we made it here, we know we have a valid internal email address that satisfy all
  // of Mr. Harold's most specific desires.  So now we can send a welcome email.
  EmailService.sendWelcomeEmail({
    emailAddress: potentiallyCorrectedEmail,
    firstName: req.param('firstName') // e.g. 'Mike'
  }, function (err) {
    if (err) { return res.serverError(err); }
    
    // It worked!  The welcome email was sent.
    return res.ok();
  });//</after EmailService.sendWelcomeEmail()>
});//</after User.create()>
```

<docmeta name="displayName" value="Creating a Service">
