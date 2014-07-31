# Services

## Overview

Services can be thought of as libraries which contain functions that you might want to use in many places of your application.  For example, you might have an EmailService which wraps some default email message boilerplate code that you would want to use in many parts of your application. The main benefit of using services in Sails is that they are *globalized*--you don't have to use `require()` to access them.


## How do I create a service?

Simply save a Javascript file containing a function or object into your **api/services** folder.  The filename will be used as the globally-accessible variable name for the service.  For example, an email service might look something like this:

```javascript
// EmailService.js - in api/services
module.exports = {

    sendInviteEmail: function(options) {
    
        var opts = {"type":"messages","call":"send","message":
            {
                "subject": "YourIn!",
                "from_email": "info@balderdash.co",
                "from_name": "AmazingStartupApp",
                "to":[
                    {"email": options.email, "name": options.name}
                ],
                "text": "Dear "+options.name+",\nYou're in the Beta! Click <insert link> to verify your account"
            }
        };
    
        myEmailSendingLibrary.send(opts);
        
    }
};
```

You can then use `EmailService` anywhere in your app:

```javascript
// Somewhere in a controller
  EmailService.sendInviteEmail({email: 'test@test.com', name: 'test'});
```

<docmeta name="uniqueID" value="Services157331">
<docmeta name="displayName" value="Services">

