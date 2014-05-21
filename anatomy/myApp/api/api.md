# myApp/api
### Purpose
This folder contains the vast majority of your app's back-end logic.  It is home to the 'M' and 'C' in [MVC Framework](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

In it you will find the following.

- Controllers: Controllers contain most of the back-end logic for your app.
- Models: Models are the structures that contain data for your Sails App.
- Policies: Policies are typically used to authenticate clients and restrict access to certain parts of your app.
- Responses: Server response logic (404 - Not Found, 500 - Server Error, etc)
- Services: Services are similar to controller actions.  They contain logic that used by your app that doesn't necessarily rely on `.req()` and `.res()`.  


<docmeta name="uniqueID" value="apimd840000">
<docmeta name="displayName" value="api">

