# Scaling

If you have the immediate expectation of lots of traffic to your application (or better yet, you already have the traffic),
you'll want to set up a scalable architecture that will allow you to add servers as more and more requests hit your app.

### Performance

In production, Sails performs like any Connect, Express or Socket.io app ([example](http://serdardogruyol.com/?p=111)).  If you have your own benchmark you'd like to share, please write a blog post or article and tweet [@sailsjs](http://twitter.com/sailsjs).  But benchmarks aside, keep in mind that most performance and scalability metrics are application-specific.  The actual performance of your app will have a lot more to do with the way you implement your business logic and model calls than it will about the underlying framework you are using.



### Example architecture

```
                             ....                 
                    /  Sails.js server  \      /  Database (e.g. Mongo, Postgres, etc)
Load Balancer  <-->    Sails.js server    <-->    Socket.io message queue (Redis)
                    \  Sails.js server  /      \  Session store (Redis, Mongo, etc.)
                             ....                 
```


### Preparing your app for a clustered deployment

The most important thing to remember about scaling a server-side application is that it should be **stateless**.  That means you should be able to deploy the same code to _n_ different servers, expecting any given incoming request handled by any given server, and everything should still work.  Luckily, Sails apps come ready for this kind of deployment almost right out of the box.  But before deploying your app to multiple servers, there are a few things you need to do:

+ Ensure none of the other dependencies you might be using in your app rely on shared memory.
+ Make sure the database(s) for your models (e.g. MySQL, Postgres, Mongo) are scalable (e.g. sharding/cluster)
+ **If your app uses sessions:**
  + Configure your app to use a shared session store such as Redis (simply uncomment the `adapter` option in `config/session.js`) and install the connect-redis adapter as a dependency of your app (e.g. `npm install connect-redis@~3.0.2 --save --save-exact`).
+ **If your app uses sockets:**
  + Configure your app to use Redis as a shared message queue for delivering socket.io messages (uncomment the `adapter` option in `config/sockets.js`)
  + Install the socket.io-redis adapter as a dependency of your app (e.g. `npm install socket.io-redis@~1.0.0 --save --save-exact`)


### Deploying a Node/Sails app to a PaaS

Deploying your app to a PaaS like Heroku or Modulus is dead simple. Depending on your situation, there may still be a few devils in the details, but Node support with hosting providers has gotten _really good_ over the last couple of years.  Take a look at [Hosting](http://sailsjs.org/documentation/concepts/deployment/Hosting) for more platform-specific information.

### Deploying your own cluster

+ Deploy multiple instances (aka servers running a copy of your app) behind a [load balancer](https://en.wikipedia.org/wiki/Load_balancing_(computing)) (e.g. nginx)
  + Configure your load balancer to terminate SSL requests
  + But remember that you won't need to use the SSL configuration in Sails-- the traffic will already be decrypted by the time it reaches Sails.
  + Lift your app on each instance using a daemon like `forever` or `pm2` (see http://sailsjs.org/documentation/concepts/deployment for more about daemonology)


### Optimization

Optimizing an endpoint in your Node/Sails app is exactly like optimizing an endpoint in any other server-side application; e.g. identifying and manually optimizing slow queries, reducing the number of queries, etc.  Specifically for Node apps, if you find you have a heavily trafficked endpoint that is eating up CPU, look for synchronous (blocking) model methods, services, or machines that might be getting called over and over again in a loop or recursive dive.

But remember:

> Premature optimization is the root of all evil.  -[Donald Knuth](http://c2.com/cgi/wiki?PrematureOptimization)

No matter what tool you're using, it is important to spend your focus and time on writing high quality, well documented, readable code.  That way, if/when you are forced to optimize a code path in your application, you'll find it is much easier to do so.



### Notes

> + You don't have to use Redis for your sessions-- you can actually use any Connect or Express-compatible session store.  See [sails.config.session](sailsjs.org/documentation/reference/configuration/sails-config-session) for more information.
> + The default Socket.io configuration initially attempts to connect to the server using [long-polling](http://en.wikipedia.org/wiki/Push_technology#Long_polling).  In order for this to work, your server environment [must support](http://socket.io/blog/introducing-socket-io-1-0/#scalability) sticky load-balancing (aka sticky sessions), otherwise the handshake will fail until the connection is upgraded to use Websockets (and only if Websockets are available).
>   + On **Heroku**, you must have the sticky load-balancing beta feature [explicitly enabled](https://devcenter.heroku.com/articles/session-affinity).
>   + In an environment without stickky load balancing, you will need to set the `transports` setting in [config/sockets.js](https://github.com/balderdashy/sails-docs/blob/v0.11/reference/sails.config/sails.config.sockets.md) to `['websocket']`, forcing it to use websockets only and avoid long-polling.  You'll also need to set the transports in your socket client--if you're using `sails.io.js`, this is as easy as adding a `<script>io.sails.transports=['websocket']</script>` immediately after the `sails.io.js` script include.  For a rather dramatic read on the issue, see [this thread](https://github.com/Automattic/engine.io/issues/261).


<docmeta name="displayName" value="Scaling">
