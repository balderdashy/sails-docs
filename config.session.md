##Session

####Session secret
Session secret is automatically generated when you create a new app. You can replace it in the session.js file.
####Redis
This file also contains lines that can be uncommented in production to set up a shared Redis session store that can be shared across multiple Sails.js servers.
####Mongo
You can uncomment lines in this file to use your Mongo adapter as a session store.
