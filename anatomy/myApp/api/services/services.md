# myApp/api/services
### Purpose
This folder contains your services.  'Services' are similar to controller actions but are typically used for things that don't nessecarily have to happen between the time when the user sends a request and when the server sends back a response.  Any logic that doesn't rely on `.req()` and `.res()` can be turned into a service if for no other reason than to keep your controllers clean and managable.  

Hypothetically, one could create a service for

- Sending emails
- Automating tweets to celebrities
- Retreiving data from a third party API then pushing that data to your client WHEN IT'S READY (over websockets)

Services are written in one or more .js file within this directory. 


### Example Email.js

```
module.exports = {
	send: function(to,from,body){
		// fancy code that sends an email
	}
}

```

You would call this service with ` Email.send('rick','bill','lol') `


> Mind your case.  Email.send !== email.send


<docmeta name="uniqueID" value="servicesmd572453">
<docmeta name="displayName" value="services">

