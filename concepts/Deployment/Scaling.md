# Scaling

If you have the immediate expectation of lots of traffic to your application (or better yet, you already have the traffic),
you'll want to set up a scalable architecture that will allow you to add servers as more and more requests hit your app.

### Performance

In production, Sails performs like any Connect, Express or Socket.io app ([example](http://serdardogruyol.com/?p=111)).  If you have your own benchmark you'd like to share, please write a blog post or article and tweet [@sailsjs](http://twitter.com/sailsjs).  But benchmarks aside, keep in mind that most performance and scalability metrics are application-specific.  The actual performance of your app will have a lot more to do with the way you implement your business logic and model calls than it will about the underlying framework you are using.



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
    + The default Socket.io configuration initially attempts to connect to the server using [long-polling](http://en.wikipedia.org/wiki/Push_technology#Long_polling).  In order for this to work, your server environment [must support](http://socket.io/blog/introducing-socket-io-1-0/#scalability) sticky load-balancing (aka sticky sessions), otherwise the handshake will fail until the connection is upgraded to use Websockets (and only if Websockets are available).
      On **Heroku**, you must have the sticky load-balancing beta feature [explicitly enabled](https://devcenter.heroku.com/articles/session-affinity).
      In an environment without stickky load balancing, you will need to set the `transports` setting in [config/sockets.js](https://github.com/balderdashy/sails-docs/blob/v0.11/reference/sails.config/sails.config.sockets.md) to `['websocket']`, forcing it to use websockets only and avoid long-polling.  You'll also need to set the transports in your socket client--if you're using `sails.io.js`, this is as easy as adding a `<script>io.sails.transports=['websocket']</script>` immediately after the `sails.io.js` script include.  For a rather dramatic read on the issue, see [this thread](https://github.com/Automattic/engine.io/issues/261).
+ Ensure none of the other dependencies you might be using in your app rely on shared memory.


### Deploying a Node/Sails app to a PaaS

Deploying your app to a PaaS like Heroku or Modulus is dead simple. Depending on your situation, there may still be a few devils in the details, but Node support with hosting providers has gotten _really good_ over the last couple of years.  Take a look at [Hosting](http://sailsjs.org/documentation/concepts/deployment/Hosting) for more platform-specific information.

### Deploying your own Sails cluster on multiple servers

+ Deploy multiple instances (aka servers running a copy of your app) behind a load balancer
  + Start up Sails on each instance using `forever`
  + More on load balancers: <https://en.wikipedia.org/wiki/Load_balancing_(computing)>
+ Configure your load balancer to terminate SSL requests
  + Because of this, you won't need to use the SSL configuration in Sails-- the traffic will already be decrypted by the time they reach Sails.


### Optimization

Optimizing an endpoint in your Node/Sails app is exactly like optimizing an endpoint in any other server-side application; e.g. identifying and manually optimizing slow queries, reducing the number of queries, etc.  Specifically for Node apps, if you find you have a heavily trafficked endpoint that is eating up CPU, look for synchronous (blocking) model methods, services, or machines that might be getting called over and over again in a loop or recursive dive.

But remember:

> Premature optimization is the root of all evil.  -[Donald Knuth](http://c2.com/cgi/wiki?PrematureOptimization)

No matter what tool you're using, it is important to spend your focus and time on writing high quality, well documented, readable code.  That way, when you need to optimize some code path in your application, you'll find it is much easier to do so.



<docmeta name="displayName" value="Scaling">
