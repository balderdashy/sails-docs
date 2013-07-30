# Sails.js Adapter Interface
#### A reference and support document for developers creating adapters for Sails/Waterline

---------------------------------------------------------------------------

> ### A quick personal note:
> The more high-quality adapters we collectively release as open-source, the less repetitive work we all have to do when we integrate with various databases and services.  My vision is to make building server-side apps more fun and less repetitive for everyone, and that happens one community adapter at a time.
>
> ~ Mike

---------------------------------------------------------------------------



## Why would I need a custom adapter?

When building a Sails app, the sending or receiving of any asynchronous communication with another piece of hardware can be normalized into an adapter.  (viz. API integrations) 

> **From Wikipedia:**
> *http://en.wikipedia.org/wiki/Create,_read,_update_and_delete*
>
>
> Although a relational database provides a common persistence layer in software applications, numerous other persistence layers exist. CRUD functionality can be implemented with an object database, an XML database, flat text files, custom file formats, tape, or card, for example.

In other words, Waterline is not just an ORM for your database.  It is a purpose-agnostic, open standard and toolset for integrating with all kinds of RESTful services, datasources, and devices, whether it's LDAP, Neo4J, or [a lamp](https://www.youtube.com/watch?v=OmcQZD_LIAE).
I know, I know.. Not everything fits perfectly into a RESTful/CRUD mold!  Sometimes the service you're integrating with has more of an RPC-style interface, with one-off method names.  That's ok-- you can define any adapter methods you like! You still get all of the trickle-down config and connection-management goodness of Waterline core.

To recap, writing your API integrations as adapters is **easier**, takes **less time**, and **absorbs a considerable amount of risk**, since you get the advantage of a **standardized set of conventions**, a **documented API**, and a **built-in community** of other developers who have gone through the same process.  Best of all, you (and your team) can **reuse the adapter** in other projects, **speeding up development** and **saving time and money**.

Finally, if you choose to release your adapter as open-source, you provide a tremendous boon to our little framework and our budding Sails.js ecosystem.  Even if it's not via Sails, I encourage you to give back to the OSS community, even if you've never forked a repo before-- don't be intimidated, it's not that bad!

I tip my hat to you in advance :)


## Interfaces

The functionality of adapters is as varied as the services they connect.  That said, there is a standard library of methods, and a support matrix you should be aware of.  Adapters may implement some, all, or none of the interfaces below, but rest assured that **if an adapter implements one method in an interface, it should implement *all* of them**.  This is not always the case due to limitations and/or incomplete implementations, but at the very least, a descriptive error message should be used to keep developers informed of what's supported and what's not.


##### Class methods
Below, `class methods` refer to the static, or collection-oriented, functions available on the model itself, e.g. `User.create()` or `Menu.update()`.  To add custom class methods to your model (beyond what is provided in the adapters it implements), define them as top-level key/function pairs in the model object.

##### Instance methods
`instance methods` on the other hand, (also known as object, or model, methods) refer to methods available on the individual result models themselves, e.g. `User.findOne(7).done(function (err, user) { user.someInstanceMethod(); });`.  To add custom instance methods to your model (beyond what is provided in the adapters it implements), define them as key/function pairs in the `attributes` object of the model's definition.

##### DDL and auto-migrations
`DDL` stands for data-definition language, and is a common fixture of schema-oriented databases.  In Sails, auto-migrations are supported out of the box.  Since adapters for the most common SQL databases support `alter()`, they also support automatic schema migration!  In your own adapter, if you write the `alter()` method, the same behavior will take effect.  The feature is configurable using the `migrate` property, which can be set to `safe` (don't touch the schema, period), `drop` (recreate the tables every time the app starts), or `alter` (the default-- merge the schema in the apps' models with what is currently in the database).



## Semantic (interface)

Implementing the basic semantic interface (CRUD) is really a step towards a complete implementation of the Queryable interface, but with some services/datasources, about as far as you'll be able to get using native methods.

By supporting the Semantic interface, you also get the following:
+ if you write a `find()` function, developers can also use all of its synonyms, including dynamic finders and `findOne()`.  When they're called, they'll automatically be converted into the appropriate criteria object for the basic `find()` definition in your adapter.
+ as long as you implement basic `where` functionality (see `Queryable` below), Waterline can derive a simplistic version of associations support for you.  To optimize the default assumptions with native methods, override the appropriate methods in your adapter.
+ automatic socket.io pubsub support is provided by Sails-- it manages "rooms" for every class (collection) and each instance (model)
  + As soon as a socket subscribes to the "class room" using `Foo.subscribe()`, it starts receiving `Foo.publishCreate()` notifications any time they're fired for `Foo`.
  + When a socket subscribes to one or more "instance room(s)" (usually the results of a `find()`), it will receive `Foo.publishUpdate()` and `Foo.publishDestroy()` notifications for the relevant instances.
  + If a socket is subscribed to an "instance room", it will also be subscribed for "updates" and "destroys" to all instances of other models with a 1:* association with `Foo`.  The socket will also be notified of and subscribed to new matching instances of the associated model.

> All officially supported Sails.js database adapters implement this interface.

###### Class methods
+ `Model.create()`
+ `Model.find()`
+ `Model.findOne()`
+ `Model.update()`
+ `Model.destroy()`

###### Instance methods
+ `henry.save()`
+ `henry.destroy()`



## Queryable (interface)

> All officially supported Sails.js database adapters implement this interface.

Query building features are common in traditional ORMs, but not at all a guarantee when working with Waterline.  Since Waterline adapters can support services as varied as Twitter, SMTP, and Skype, traditional assumptions around structured data don't always apply.

If query modifiers are enabled, the adapter must support `Model.find()`, as well as the **complete** query interface, or, where it is impossible to do so, at least provide helper notices.  If coverage of the interace is unfinished, it's still not a bad idea to make the adapter available, but it's important to clearly state the unifinished parts, and consequent limitations, up front.  This helps prevent the creation of off-topic issues in Sails/Waterline core, protects developers from unexpected consequences, and perhaps most importantly, helps focus contributors on high-value tasks.

###### Query modifiers
Query modifiers include filters:
+ `where`
+ `limit`
+ `skip`
+ `sort`
+ `select`
+ `distinct`

Boolean logic:
+ `and`
+ `or`
+ `not`

As well as `groupBy` and the aggregators:
+ `count`
+ `sum`
+ `min`
+ `max`
+ `average`

`IN` queries:
Adapters which implement `where` should recognize a list of values (e.g. `name: ['Gandolph', 'Merlin']`) as an `IN` query.  In other words, if `name` is either of those values, a match occured.  

Sub-attribute modifiers:
You are also responsible for sub-attribute modifiers, (e.g. `{ age: { '>=' : 65 } }`) with the notable exception of `contains`, `startsWith`, and `endsWith`, since support for those modifiers can be derived programatically by leveraging your definition of  `like`.
+ `like`    (SQL-style, with % wildcards)
+ `'>' `    (you can also opt to use the more verbose `.greaterThan()`, etc.)
+ `'<' `
+ `'>='`
+ `'<='`



## Migratable (interface)

Adapters which implement the Migratable interface are usually interacting with SQL databases.  This interface enables the `migrate` configuration option on a per-model or adapter-global basis, as well as access to the prototypal/class-level CRUD operations for working with tables.

###### Adapter methods
+ `Adaper.define()`
+ `Adaper.describe()`
+ `Adaper.alter()`
+ `Adaper.drop()`

###### Auto-migration strategies
+ `"alter"` (default)
+ `"drop"`
+ `"safe"`



## Streaming (interface)

> Traditionally, communicating to a server via HTTP is like wading across a river with a big bag of rocks.  Streaming is like skipping them across the water one by one.

A huge advantage of using Node.js is the ease with which you can parse and manipulate streams of data.  Instead of pulling an entire dataset into RAM, you can inspect it a little at a time.  This unlocks a level of performance that is unachievable using conventional approaches.  

The most common use case is taking advantage of the available HTTP response stream to pipe the output byte stream from the database directly back to the user.  i.e. to generate a dynamic sitemap, you might need to respond with a huge set of data (far too large to fit in memory on a commodity server) and simultaneously transform it into XML.

Implementing the Streaming CRUD interface is actually pretty simple-- you just need to get comfortable with Node.js streams.  You can mutate streams as they come in-- you just need to find or design a mapping function designed for streams, where you don't have all the data at once.  



## Blob (interface)

Implementing the Blob interface allows you to upload and download binary data (aka files) to the service/database.  These "blobs" might be MP3 music files (~5MB) but they could also be data-center backups (~50TB).  Because of this, it's crucial that adapters which implement this interface use streams for uploads (incoming, into data source from Sails) and downloads (outgoing, from data source to Sails).

###### Class methods
+ `upload()`
+ `download()`



## One-Way (interface)

Adapters which implement one-way messages should do so using `send()` or a prefixed `send*()` method.  This lets developers know that it's not safe to assume that these operations are reversible.  An example of one such adapter is SMTP, for sending email, or APNS for sending Apple push notifications.

###### Class methods
+ `send()`



## Pubsub (interface)
Adapters implementing the pubsub interface use a MQ to report changes from the service/database back up to the app.

They should call Sails' `Model.publishUpdate()`, `Model.publishCreate()`, and `Model.publishDestroy()` to publish changes and take advantage of automatic room management functionality.
`Model.subscribe()` should still be called at the app layer, not in our adapter.
We don't want to force users to handle realtime events-- we don't know the specific goals and requiements of their app, and since the broadcasts are volatile, pubsub notifications is a feature that should be opt-in anyway.

Examples:
+ Twitter streaming API (see new tweets as they come in)
+ IRC (see new chats as they come in)
+ Stock prices (visualize the latest market data as soon as it is available)
+ Hardware scanners (see new data as it comes in)


## Transactional (interface)
Atomic, consistent, isolated, and durable.
###### TODO



## Offcially supported adapters

Mike and the team behind Sails.js at Balderdash support a handful of commonly used adapters.

### Disk

Write to your computer's hard disk, or a mounted network drive.  Not suitable for at-scale production deployments, but great for a small project.  Most importantly, this adapter is bundled with Sails and works out of the box.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming
+ Blob


### Memory

Just like Disk, but doesn't actually write to disk, so it's not persistent.  Not suitable for at-scale production deployments, but useful when developing on systems with little or no disk space.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming


### MySQL

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming
+ Migratable


### PostgreSQL

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming
+ Migratable


### MongoDB

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming


> Coming soon...
> + S3 (Blob, Streaming)
> + OpenStack Swift / Rackspace CloudFiles (Blob, Streaming)






## Notable Community Adapters

Community adapters are crucial to the success and central to the philosophy of an open ecosystem for API integrations.  The more high-quality adapters you release as open-source, the less repetitive work we all have to do when we integrate with various databases and services.  My vision is to make building server-side apps more fun and less repetitive for everyone, and that happens one community adapter at a time.  We welcome your support!

> in various states of completion

### Mandrill (email-sending service by MailChimp)
+ One-Way

### Github
None

### Git
None

### CouchDB
+ Semantic

### Riak
+ Semantic

### Redis
+ Semantic

### REST
+ Semantic

### IRC
+ Pubsub

### Twitter
None

### ElasticSearch
+ Semantic

### JSDom
None
