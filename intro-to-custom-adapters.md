# Introduction to Custom Adapters for Sails / Waterline

> ##### Stability: Varies

## Reference
 
Please see the [adapter interface specification](https://github.com/balderdashy/sails-docs/blob/0.9/adapter-specification.md).




## Why would I need a custom adapter?

When building a Sails app, the sending or receiving of any asynchronous communication with another piece of hardware can be normalized into an adapter.  (viz. API integrations) 

> **From Wikipedia:**
> *http://en.wikipedia.org/wiki/Create,_read,_update_and_delete*

> Although a relational database provides a common persistence layer in software applications, numerous other persistence layers exist. CRUD functionality can be implemented with an object database, an XML database, flat text files, custom file formats, tape, or card, for example.

In other words, Waterline is not just an ORM for your database.  It is a purpose-agnostic, open standard and toolset for integrating with all kinds of RESTful services, datasources, and devices, whether it's LDAP, Neo4J, or [a lamp](https://www.youtube.com/watch?v=OmcQZD_LIAE).
I know, I know... Not everything fits perfectly into a RESTful/CRUD mold!  Sometimes the service you're integrating with has more of an RPC-style interface, with one-off method names.  That's ok-- you can define any adapter methods you like! You still get all of the trickle-down config and connection-management goodness of Waterline core.



## Why should I build a custom adapter?

To recap, writing your API integrations as adapters is **easier**, takes **less time**, and **absorbs a considerable amount of risk**, since you get the advantage of a **standardized set of conventions**, a **documented API**, and a **built-in community** of other developers who have gone through the same process.  Best of all, you (and your team) can **reuse the adapter** in other projects, **speeding up development** and **saving time and money**.

Finally, if you choose to release your adapter as open-source, you provide a tremendous boon to our little framework and our budding Sails.js ecosystem.  Even if it's not via Sails, I encourage you to give back to the OSS community, even if you've never forked a repo before-- don't be intimidated, it's not that bad!

The more high-quality adapters we collectively release as open-source, the less repetitive work we all have to do when we integrate with various databases and services.  My vision is to make building server-side apps more fun and less repetitive for everyone, and that happens one community adapter at a time.

I tip my hat to you in advance :)




## What is an Adapter Interface?

The functionality of adapters is as varied as the services they connect.  That said, there is a standard library of methods, and a support matrix you should be aware of.  Adapters may implement some, all, or none of the interfaces below, but rest assured that **if an adapter implements one method in an interface, it should implement *all* of them**.  This is not always the case due to limitations and/or incomplete implementations, but at the very least, a descriptive error message should be used to keep developers informed of what's supported and what's not.


##### Class methods
Below, `class methods` refer to the static, or collection-oriented, functions available on the model itself, e.g. `User.create()` or `Menu.update()`.  To add custom class methods to your model (beyond what is provided in the adapters it implements), define them as top-level key/function pairs in the model object.

##### Instance methods
`instance methods` on the other hand, (also known as object, or model, methods) refer to methods available on the individual result models themselves, e.g. `User.findOne(7).done(function (err, user) { user.someInstanceMethod(); });`.  To add custom instance methods to your model (beyond what is provided in the adapters it implements), define them as key/function pairs in the `attributes` object of the model's definition.

##### DDL and auto-migrations
`DDL` stands for data-definition language, and is a common fixture of schema-oriented databases.  In Sails, auto-migrations are supported out of the box.  Since adapters for the most common SQL databases support `alter()`, they also support automatic schema migration!  In your own adapter, if you write the `alter()` method, the same behavior will take effect.  The feature is configurable using the `migrate` property, which can be set to `safe` (don't touch the schema, period), `drop` (recreate the tables every time the app starts), or `alter` (the default-- merge the schema in the apps' models with what is currently in the database).






## Offcially supported adapters

Cody, Mike, and the team behind Sails.js at Balderdash support a handful of commonly used adapters.

### Disk

Write to your computer's hard disk, or a mounted network drive.  Not suitable for at-scale production deployments, but great for a small project.  Most importantly, this adapter is bundled with Sails and works out of the box.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming


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


> Under active development:
>
> + sails-redis
> + sails-s3
> + sails-local-fs






## Notable Community Adapters

> ##### Stability: Varies


Community adapters are crucial to the success and central to the philosophy of an open ecosystem for API integrations.  The more high-quality adapters you release as open-source, the less repetitive work we all have to do when we integrate with various databases and services.  My vision is to make building server-side apps more fun and less repetitive for everyone, and that happens one community adapter at a time.  We welcome your support!

> in various states of completion


### [Mandrill (email-sending service by MailChimp)](https://github.com/mikermcneil/sails-mandrill)
+ One-Way

### Heroku
> Not currently available as open-source.

### Git
> Not currently available.

### [CouchDB](https://github.com/craveprogramminginc/sails-couchdb)
+ Semantic

### [Riak](https://npmjs.org/package/sails-riak)
+ Semantic

### [Redis](https://github.com/balderdashy/sails-redis)
+ Semantic

### [REST](https://github.com/zohararad/sails-rest)
+ Semantic

### [IRC](https://github.com/balderdashy/sails-irc)
+ Pubsub

### [Twitter](https://github.com/balderdashy/sails-twitter)

### [ElasticSearch](https://github.com/UsabilityDynamics/waterline-elasticsearch)
+ Semantic

### [JSDom](https://github.com/mikermcneil/sails-jsdom)

### [Yelp](https://github.com/balderdashy/sails-adapter-boilerplate/pull/2)

> Search google and NPM for more-- there are new adapters being written all the time.
>
> Check out the docs to learn how to write your own custom adapter (whether it's a private, internal project for a proprietary API or something you can share as open-source)

