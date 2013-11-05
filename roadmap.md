# Roadmap


Wondering how you can help?  Here's what's next.

## Sails Core

#### Streaming File Uploads/Downloads (v0.11.0)

> Update: This is [mostly finished](https://github.com/mikermcneil/file-parser), just needs some testers, It shouldn't go into core until Connect v3 is released.
>         (tweet @mikermcneil for more info on that)

Connect's default support for file uploads via bodyParser is not suitable for production apps with large file uploads.

Goals:
  + Built-in, friendly support for streaming file uploads using Waterline's adapters which implements the binary-stream interface
  + (i.e. you can't buffer 100GB uploads to disk)
  + Use formidable's onPart event to process file uploads
  + Everything else should be handled by formidable's built-in parser

See the adapters section below for information on targeted blob store adapters.


#### Logging (v0.?.0)
+ Pull out "CaptainsLog" (i.e. `sails.log`) as a separate module so it can be used by waterline (this is mostly done- it's really just a partially applied function around winston)

#### Sessions  (v0.?.0)
+ Create generic connect session adapter to allow any sails/waterline CRUD adapter to be used as a session store. Requires changes to config.

#### Plugins  (v0.?.0)
+ Document the plugin (hook) system.

## CLI / Generators (v0.?.0)
+ Pull out CLI as a separate module so that it can develop in parallel- investigate `yo` integration for generators.
+ Figure out a good way to make the CLI tool stateful (store configured settings for `sails new`, `sails generate`, etc.)

## Gruntfile (v0.?.0)
+ Pull out Gruntfile as a separate module so that it can develop in parallel- investigate integration with CLI so that the proper generators `yo` integration for generators
+ Provide public access to templates for async loading by default (it's totally possible to do this now, but let's make it easier)



## Waterline (ORM)
> [Associations] are coming along nicely.

+ Associations
  + v0.10.0
    + multiple associations to the same model (e.g. `to`, `cc`, `bcc`)
    + Pull NoSQL join behavior into core- allow it to be overriden in adapters as an optimization.

+ Aggregations/GROUP BY (~v0.11.0)
  + Support for most aggregations and the `GROUP BY` operator has existed since v0.9
  + Needs to be documented and more thoroughly tested.
  + Needs better usage errors.
  + 

+ Error Messages
  + ~v0.10.0
    + More meaningful messages on fatal, lift-time/schema errors
    + More meaningful messages on runtime errors, prevent server crashing (allows you to be a little less careful when you write your user code)
  + ~v0.11.0
    + Error codes which differentiate distinct types of errors.
    + Ensure all callbacks are optional.
    + Then they can be automatically classified as either a "badRequest" or "serverError" scenario in Sails
      + 
      + Invalid usage of Waterline methods at runtime should result in a server error.

+ Auto-migrations
  + v0.10.0
    + Docs on auto-migration strategies (alter, drop, safe)
    + Refuse to run `drop` and `alter` strategies when `NODE_ENV="production"`.
  + ~v0.11.0
    + Make `alter` strategy work w/ associations-- probably should be pushed down to the adapter level in the `alter` method.
  + ~v0.12.0
    + Manual migration feature.


+ Transactions (~v0.12.0)
  + Transactions are currently supported by using the native/query API
  + However we want to make this easier to work with.

+ Everything is a Stream (~v0.13.0)
  + Internally, everything is a stream by default.
  + Datastores which support the semantic streaming interface (e.g. `User.stream()`) should replace the deferred object with a compatible stream, i.e.
    ```javascript
    // Traditional usage still works:
    User.findByDepartment(315).exec(function gotTheUsers(err, users){
      if (err) return res.serverError(err);
      res.json(users);
    });

    // But you can also access the stream
    User.findByDepartment(315).pipe(res);
    ```



## Adapters

+ Semantic interfcace:
  + Redis (there are a couple of implementations of this that exist-- just needs to be finalized)
  + Riak (exists, needs to be updated)
  + ElasticSearch (exists, needs testers)
  + CouchDB (exists, needs testers)
  + REST (exists, needs testers)

+ One-way adapters:
  + [Mandrill](https://github.com/mikermcneil/sails-mandrill) (Email)
    + This one is actually done, but it would be nice to include additional support for templates and analytics APIs
  + SMTP (Email)
  + Twillio (SMS)
  + UrbanAirship (Cross-platform mobile push notifications)
  + APNS (iOS push notifications)
  + GCM (Android push notifications)
  + WNS (Windows push notifications)

+ Streaming blob adapters:
  + Local filesystem/network mount ([done](https://github.com/balderdashy/sails-local-fs)-- this will be the default when `file-parser` is used in Sails core)
  + Amazon S3 ([done](https://github.com/mikermcneil/sails-s3)-- uses knox)
  + Joyent Manta
  + OpenStack Swift
  + Dropbox
  + Amazon EBS
  + Azure Storage
  + Box.net
  + Barracuda

+ Misc
  + Twitter (exists, needs testers)
  + Yelp (exists, needs testers)
  + JSDom (exists, needs testers)
  + IRC (exists, needs testers)
  + Heroku (exists, needs testers)
  + Git (exists, needs testers)
  + Facebook




## Community
+ Examples / articles / answering Google Group discussions / answering stack overflow questions
+ Better documentation for database support (matrix for Disk, MySQL, PostgreSQL, Mongo, and Redis)
+ Backbone works with Sails out of the box with Sails blueprints (no code required), but let's create a Backbone.sync override for taking advantage of comet messaging (based on the existing Backbone -> Socket.io SDK)
+ Improve the Angular -> Socket.io SDK
+ Create an example of a TemplateController which allows you to load your templates asynchronously from the client.
+ Sublime Text 2 snippets
+ Chrome Sniffer detector
