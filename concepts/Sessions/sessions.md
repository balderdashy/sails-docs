# Understanding Sessions in Sails

For our purposes **sessions** are synonymous with a few components that together allow you to store information about a user agent between requests.

>A **user agent** is the software (e.g. browser or native application) that represents you on a device (e.g. a browser tab on your computer, a smartphone application, or your refrigerator).  It is associated one-to-one with a cookie or access token.

Sessions can be very useful because the request/response cycle is **stateless**. The request/response cycle is considered stateless because neither the client nor the server inherently stores any information between different requests about a particular request.  Therefore the lifecycle of a request/response ends when a response is made to the requesting user agent (e.g. `res.send()`).

Note, we’re going to discuss sessions in the context of a browser user agent. While you can use sessions in Sails for whatever you like, it is generally a best practice to use it purely for storing the state of user agent authentication. Authentication is a process that allows a user agent to prove that they have a certain identity.  For example, in order to access some protected functionality, I might need to prove that my browser tab actually corresponds with a particular user record in a database.  If I provide you with a unique name and a password, you can look up the name and compare my password with a stored (hopefully hashed) password.  If there's a match, I'm authenticated. But how do you store that "authenticated-ness" between requests? That's where sessions come in.

### What sessions are made of
There are three main components to the implementation of sessions in Sails:
1. the **session store** where information is retained
2. the middleware that manages the session
3. a cookie that is sent along with every request and stores a session id (by default, `sails.sid`)

The **session store** can either be in memory (e.g. the default Sails session store) or in a database (e.g. Sails has built-in support for using Redis for this purpose).  Sails builds on top of Connect middleware to manage the session; which includes using a **cookie** to store a session id (`sid`) on theuser agent.

### A day in the life of a *request*, a *response*, and a *session* 
When a `request` is sent to Sails, the request header is parsed by the session middleware.  

##### Scenario 1: The request header has no *cookie property*

If the header does not contain a cookie property, a `sid` is created in the session and a default session dictionary is added to `req` (e.g. `req.session`).  At this point you can make changes to the session property (usually in a controller/action).  For example, let's look at the following *login* action.

```javascript
module.exports = {
  
  login: function(req, res) {

    // Authentication code here

    // If successfully authenticated

    req.session.userId = foundUser.id;   // returned from a database

    return res.json(foundUser);

  }
}
```

Here we added a `userId` property to `req.session`.  

> **Note:** The property will not be stored in the *session store* nor available to other requests until the response is sent.

Once the response is sent, any new requests will have access to `req.session.userId`. Since we didn't have a cookie *property* in the request header a cookie will be established for us.  

##### Scenario 2: The request header has a cookie *property* with a `Sails.sid`

Now when the user agent makes the next request, the `Sails.sid` stored on the cookie is checked for authenticity and if it matches an existing `sid` in the session store, the contents of the session store is added as a property on the `req` dictionary (e.g. `req.session`).  We can access properties on `req.session` (e.g. `req.session.me`) or add properties to it (e.g. `req.session.me == someValue`).  The values in the session store might change but generally the `Sails.sid` and `sid` do not change.

### When does the `Sails.sid` change?
By default, the Sails session store is *in memory*.  Therefore, when you close the Sails server, the current session store moves on to session heaven (e.g. the session store disappears).  When Sails is restarted, although a user agent request contains a `Sails.sid` in the cookie, the `sid` is no longer in the session store.  Therefore, a new `sid` will be generated and replaced in the cookie.  The `Sails.sid` will also change if the user agent cookie expires or is removed.

>The lifespan of a Sails cookie can be changed from its default setting (e.g. never expires) to a new setting by accessing the `cookie.maxAge` property in `projectName/config/session.js`.


### Using *Redis* as the session store 

Redis is a key-value database package that can be used as a session store that is separate from the Sails instance.  This configuration for sessions has two benefits.  The first is that the session store will remain viable between Sails restarts.  The second is that if you have multiple Sails instances behind a load balancer, all of the instances can point to a single consolidated session store.

To enable Redis as a session store open `projectName/config/session.js` in your favorite text editor and uncomment the `adapter` property.  That's it.  During development as long as you have a Redis instance running on the same machine as your Sails instance your session store will use Redis.  You can point to a different Redis instance by configuring the following optional properties in `projectName/config/session.js`:

```
  // host: 'localhost',
  // port: 6379,
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>,
  // prefix: 'sess:',

```

For more information on configuring these properties go to [https://github.com/tj/connect-redis](https://github.com/tj/connect-redis).

#### Nerdy details of how the session cookie is created
The value for the cookie is created by first hashing the `sid` with a configurable *secret* which is just a long string.

>You can change the session `secret` property in `projectName/config/session.js`. 

The Sails `sid` (e.g. `Sails.sid`) then becomes a combination of the plain `sid` followed by a hash of the `sid` plus the `secret`.  To take this out of the world of abstraction, let's use an example.  Sails creates a `sid` of `234lj232hg234jluy32UUYUHH` and a `session secret` of `9238cca11a83d473e10981c49c4f`. These values are simply two strings that Sails combine and hash to create a `signature` of `AuSosBAbL9t3Ev44EofZtIpiMuV7fB2oi`.  So the `Sails.sid` becomes `234lj232hg234jluy32UUYUHH.AuSosBAbL9t3Ev44EofZtIpiMuV7fB2oi` and is stored in the user agent cookie by sending a `set-cookie` property in the response header. 

**What does this prevent?** It prevents a user from guessing the `sid` as well as prevents a evil doer from spoofing a user into making an authetication request with a `sid` that the evil doer knows.  This could allow the evil doer to use the `sid` to do bad things while the user is authenticated via the session.

<docmeta name="displayName" value="Sessions">
