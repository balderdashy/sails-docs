# Creating a Service?

Simply save a Javascript file containing a function or object into your **api/services** folder.  The filename will be used as the globally-accessible variable name for the service.  For example, an email service might look something like this:

```javascript
// EmailService.js - in api/services
module.exports = {

    sendInviteEmail: function(options) {
    
        var opts = {"type":"messages","call":"send","message":
            {
                "subject": "You're In!",
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

<docmeta name="displayName" value="Creating a Service">
