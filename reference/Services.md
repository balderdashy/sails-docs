# Services
> _**Note:** You are viewing the Sails.js v0.10.x documentation.  If you're looking for information on v0.9.x, please visit [here](http://09x.sailsjs.org)._

Alright. Close your eyes, and take a deep breath. You are on a beautiful tropical island, in the middle of the ocean.
The sun bathes you in its warm glow as you stare out at the horizon. The waves splash calmly on the shore, just inches
away from where you stand. You feel the warm soft sand under your feet. The ocean beeze washes over you, as you then realize that you need services.

## What are services?

Services are basically libraries, which contain functions that you might want to use in many places of your application. 
For example, you might have an EmailService which wraps some default email message boilerplate code that you would want to use in many parts of your application. 

## How to I create a service?
An email service might look something like this:

```javascript
// EmailService.js - in api/services
exports.sendInviteEmail = function(options) {
    
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
};
```
Services are automatically exposed by Sails to the rest of your application.
```javascript
// Somewhere in a conroller
  EmailService.sendInviteEmail({email: 'test@test.com', name: 'test'});
```
