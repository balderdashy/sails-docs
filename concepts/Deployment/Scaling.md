# Scaling

If you have the immediate expectation of lots of traffic to your application (or better yet, you already have it!), 
you'll want to set up a scalable architecture that your app can scale as more and more people use it.

### Benchmarks

For the most part, Sails benchmarks exactly like any Connect, Express or Socket.io app.  This has been validated on a few different occasions, most [recently here](http://serdardogruyol.com/?p=111).  If you have your own benchmark you'd like to share, please send a pull request to this page on Github.


### Example architecture

```
                       Sails.js server
                             ....                 
                    /  Sails.js server  \      /  Database (e.g. Mongo, Postgres, etc)
Load Balancer  <-->    Sails.js server    <-->    Socket store (Redis)
                    \  Sails.js server  /      \  Session store (Redis)
                             ....                 
                       Sails.js server
```


### Configuring your app for a clustered deployment

+ Make sure the database(s) for your models (e.g. MySQL, Postgres, Mongo) is scalable (e.g. sharding/cluster) 
+ Configure your app to use a shared session store
  + Support for redis is built in (see the `adapter` options in `config/session.js`)
+ IF YOU'RE USING SOCKETS: 
  + Configure your app to use a shared socket store
    + Support for redis is built in (see the `adapter` options in `config/sockets.js`)
    + Note: If you'd rather not set up a socket store, a workable solution for your use case may be enabling sticky sessions at your load balancer.
+ Ensure none of the other dependencies you might be using in your app rely on shared memory.

### Deploying a Sails cluster on multiple servers

+ Deploy multiple instances (aka servers running a copy of your app) behind a load balancer
  + Start up Sails on each instance using `forever`
  + More on load balancers: http://en.wikipedia.org/wiki/Load_balancing_(computing)
+ Configure your load balancer to terminate SSL requests
  + Because of this, you won't need to use the SSL configuration in Sails-- the traffic will already be decrypted


<docmeta name="uniqueID" value="Scaling291270">
<docmeta name="displayName" value="Scaling">

