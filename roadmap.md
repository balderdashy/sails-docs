# Roadmap

What's next?

## Sails Core

#### Streaming File Uploads/Downloads

> Update: This is finished and packaged as separate modules, just not in core yet.

Express's default support for file uploads via formidable is not suitable for production apps with large file uploads (>100MB)
  + Built-in, friendly support for streaming file uploads using Waterline's adapters which implements the binary-stream interface
  + (i.e. you can't buffer 100GB uploads to disk)
  + Use formidable's onPart event to process file uploads
  + Everything else should be handle by formidable's built-in parser

#### Logging
Pull out Sails.log (winston wrapper) as a separate module so it can be used by waterline

#### Sessions
Create generic sails-session adapter to allow any sails CRUD adapter to be used as a session store. then add config

#### Plugins
Document the plugin (hook) system

## CLI / Generators
Pull out CLI as a separate module so that it can develop in parallel- investigate `yo` integration for generators

## Gruntfile
+ Pull out Gruntfile as a separate module so that it can develop in parallel- investigate integration with CLI for so that the proper generators `yo` integration for generators
+ Provide public access to templates for async loading by default (it's totally possible to do this now, but let's make it easier)



## Waterline (ORM)

> Associations are coming along nicely

+ Associations (cross-model, cross-adapter)
+ Transactions (cross-model, cross-adapter)



## Adapters
+ Document the adapter interface support matrix for Disk, MySQL, PostgreSQL, Mongo, and Redis
+ SMTP Adapter (`send`)
+ S3 Adapter (`upload`, `download`)

## Community
+ Examples / articles
+ Backbone works with Sails out of the box with Sails blueprints (no code required), but let's create a Backbone.sync override for taking advantage of comet messaging (based on the existing Backbone -> Socket.io SDK)
+ Improve the Angular -> Socket.io SDK
+ Create an example of a TemplateController which allows you to load your templates asynchronously from the client.
