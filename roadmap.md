# Roadmap


Wondering how you can help?  Here's what's next.

> The notes below are a broad summary-- to get details, and the most up-to-date information, subscribe to the [sails-js-roadmap Trello board](https://trello.com/b/cGzNVE0b/sails-js-feature-requests).

## Sails Core

#### Streaming File Uploads/Downloads (v0.10.x)

> Update: This is [mostly finished](https://github.com/mikermcneil/file-parser), just needs some testers, It shouldn't go into core until Connect v3 is released.
>         (tweet @mikermcneil for more info on that)

Connect's current default support for file uploads via bodyParser is fantastically easy to use, but is not suitable for production apps with large file uploads.

Goals:
  + Built-in, friendly support for streaming file uploads using Waterline's adapters which implements the binary-stream interface
  + (i.e. you can't buffer 100GB uploads to disk)
  + Use formidable's onPart event to process file uploads
  + Everything else should be handled by formidable's built-in parser
  + Make it just as easy to use as the current Connect bodyParser.  You shouldn't have to understand node streams to do a basic file upload.  (everyone should learn about streams though.  streams2 ftw!)

See the adapters section below for information on targeted blob store adapters.


#### Sessions  (v0.?.0)
+ Create generic connect session adapter to allow any sails/waterline CRUD adapter to be used as a session store. Requires changes to config.

#### Plugins  (v0.?.0)
+ Document how to override core hooks and add new custom hooks.
+ Document how to override core generators and add new custom generators.
+ Document how to override adapters and add new custom adapters.



## Waterline (ORM)
> [Associations] are coming along nicely.

+ Associations
  + v0.10.0
    + See trello

+ Aggregations/GROUP BY (~v0.11.0)
  + Support for most aggregations and the `GROUP BY` operator has existed since v0.9
  + Needs to be documented and more thoroughly tested.
  + Needs better usage errors.
  + Needs to exist as a shim implementation in waterline core when it's not implemented at the adapter level.
  + Need a way for adapters to conditionally implement aggregations/groupBy/having.

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
  + ~v0.11.0
    + Make `alter` strategy work w/ associations-- probably should be pushed down to the adapter level in the `alter` method.
  + ~v0.12.0
    + Manual migration feature.
  + ~v2.0.0?
    + Cross-adapter migrations.


+ Transactions
  + ~v0.11.0
    + Transactions are currently supported by using the native/query API
    + However we want to make this easier to work with.
  + v0.12.0
    + Transaction shim in waterline core for adapters w/o native transaction support
    + Cross-adapter transactions



+ Everything is a Stream (~v2.0.0?)
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

> ###### Also see:
> + [Mike's thoughts on usage for upcoming features](https://gist.github.com/mikermcneil/8328832) (please feel free to comment!)
> + [Interface specification](http://links.sailsjs.org/docs/plugins/adapters)

+ Semantic interface:
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
  + Microsoft SkyDrive
  + Apple iCloud
  + Dropbox
  + Google Drive
  + OpenStack Swift
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
  + Segment.io (exists, needs testers)
  + Facebook




## Community
+ Examples / articles / answering Google Group discussions / answering stack overflow questions
+ Backbone works with Sails out of the box with Sails blueprints (no code required), but let's create a Backbone.sync override for taking advantage of comet messaging (based on the existing Backbone -> Socket.io SDK)
  + Check out [backbone-to-sails](https://github.com/mikermcneil/backbone-to-sails)
+ Improve the Angular -> Socket.io SDK
+ Create an example of a TemplateController which allows you to load your templates asynchronously from the client.
+ Sublime Text 2 snippets
+ Chrome Sniffer detector (@uncletammy is workingon this)
