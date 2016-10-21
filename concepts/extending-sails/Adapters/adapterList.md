# Available Database Adapters

This file is meant to be an up to date, comprehensive list of all of the core adapters available for the Sails.js framework, and a reference of a few of the community adapters out there.  If you see out of data information on this page, or if you want to add an adapter you made, please just submit a pull request to this file, adding to the list of community adapters below.


### Officially supported database adapters

##### sails-disk

https://github.com/balderdashy/sails-disk/

Write to your computer's hard disk, or a mounted network drive.  Not suitable for at-scale production deployments, but great for a small project, and essential for developing in environments where you may not always have a database set up. This adapter is bundled with Sails and works out of the box with zero configuration.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming


##### sails-memory

https://github.com/balderdashy/sails-memory/

Pretty much like Disk, but doesn't actually write to disk, so it's not persistent.  Not suitable for at-scale production deployments, but useful when developing on systems with little or no disk space.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming


##### sails-mysql

https://github.com/balderdashy/sails-mysql/

MySQL is the world's most popular relational database.
http://en.wikipedia.org/wiki/MySQL

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming
+ Migratable


##### sails-postgres

https://github.com/balderdashy/sails-postgresql/

[PostgreSQL](http://en.wikipedia.org/wiki/PostgreSQL) is another popular relational database.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming
+ Migratable


##### sails-mongo

https://github.com/balderdashy/sails-mongo/


[MongoDB](http://en.wikipedia.org/wiki/MongoDB) is the leading NoSQL database.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming

##### sails-redis

https://github.com/balderdashy/sails-redis/

[Redis](http://redis.io/) is an open source, BSD licensed, advanced key-value store.

###### Interfaces implemented:
+ Semantic
+ Queryable




### Can I contribute to a core adapter?

Definitely!  Get started by reading [the Sails project contribution guide](http://sailsjs.com/contributing).




### Community supported database adapters

Is your database not supported by one of the core adapters?  Good news!  There are many different community database adapters for Sails.js and Waterline [available on NPM](https://www.npmjs.com/search?q=sails+adapter).

> Learn [how to install and configure community adapters](http://sailsjs.com/docs/concepts/extending-sails/adapters).

Here are a few highlights:

| Name | Maintainer | Interfaces implemented | Latest stable version |
|------|------------|------------------------|-----------------------|
| [Sails-MSsqlserver](https://github.com/misterGF/sails-mssqlserver) | [misterGF](https://github.com/misterGF)|  | [![NPM version](https://img.shields.io/npm/v/sails-sqlserver.svg?style=flat-square)](https://npmjs.org/package/sails-sqlserver) |
| [Sails-OrientDB](https://github.com/appscot/sails-orientdb) | [appscot](https://github.com/appscot) | Semantic, Queryable, Associations, Migratable | [![npm version](https://badge.fury.io/js/sails-orientdb.svg)](http://badge.fury.io/js/sails-orientdb) |
| [Sails-REST](https://github.com/zohararad/sails-rest) | [zohararad](https://github.com/zohararad) | | |
| [Sails-Oracle](https://github.com/atiertant/sails-oracle) | [atiertant](https://github.com/atiertant) | | |
| [Sails-Cassandra](https://github.com/dtoubelis/sails-cassandra) | [dtoubelis](https://github.com/dtoubelis) | | [![npm version](https://badge.fury.io/js/sails-cassandra.svg)](http://badge.fury.io/js/sails-cassandra) |
| [Sails-Solr](https://github.com/sajov/sails-solr) | [sajov](https://github.com/sajov) | | [![npm version](https://badge.fury.io/js/sails-solr.svg)](http://badge.fury.io/js/sails-solr) |
| [Sails-Filemaker](https://github.com/geistinteractive/sails-filemaker) | [toddgeist](https://github.com/toddgeist) | Semantic | [![npm version](https://badge.fury.io/js/sails-filemaker.svg)](http://badge.fury.io/js/sails-filemaker) |
| [Sails-Derby](https://github.com/dash-/node-sails-derby) | [dash-](https://github.com/dash-) | Semantic, Queryable, Associations, SQL | |

### Add your custom adapter to this list

Have you written a Sails adapter? Submit a PR to this file and add it here!


<docmeta name="displayName" value="Available Adapters">
