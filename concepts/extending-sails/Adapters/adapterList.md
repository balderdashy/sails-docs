# Available Database Adapters

This page is meant to be an up to date, comprehensive list of all of the core adapters available for the Sails.js framework, and a reference of a few of the most robust community adapters out there.  

All supported adapters can be configured in roughly the same way: by passing in a Sails/Waterline adapter (`adapter`), as well as a       connection URL (`url`).  For more information on configuring datastores, see [sails.config.datastores](http://sailsjs.com/documentation/reference/configuration/sails-config-datastores).


### Officially-supported database adapters

The following core adapters are maintained, tested, and used by the Sails.js core team.

> Want to help out with a core adapter?  Get started by reading [the Sails project contribution guide](http://sailsjs.com/contributing).

|  Database technology    | Adapter                                                        | Connection URL structure                      | For production?     |
|:------------------------|:---------------------------------------------------------------|:----------------------------------------------|:--------------------|
|  MySQL                  | [require('sails-mysql')](http://npmjs.com/package/sails-mysql)            | `mysql://user:password@host:port/database`      | Yes
|  PostgreSQL             | [require('sails-postgresql')](http://npmjs.com/package/sails-postgresql)  | `postgresql://user:password@host:port/database` | Yes
|  MongoDB                | [require('sails-mongo')](http://npmjs.com/package/sails-mongo)            | `mongo://user:password@host:port/database`      | Yes
|  Local disk             | _(built-in, see [sails-disk](http://npmjs.com/package/sails-disk))_          | _n/a_                                         | **No!**
|  Local memory           | [require('sails-memory')](http://npmjs.com/package/sails-memory)          | _n/a_                                         | **No!**



### sails-mysql

[MySQL](http://en.wikipedia.org/wiki/MySQL) is the world's most popular relational database.


```bash
npm install sails-mysql --save
```

```javascript
adapter: require('sails-mysql'),
url: 'mysql://user:password@host:port/database',
```

[![NPM package info](https://nodei.co/npm/sails-mysql.png?downloads=true)](http://npmjs.com/package/sails-mysql)


### sails-postgresql

[PostgreSQL](http://en.wikipedia.org/wiki/postgresql) is a modern relational database with powerful features.

[![NPM package info](https://nodei.co/npm/sails-postgresql.png?downloads=true)](http://npmjs.com/package/sails-postgresql)

##### Install
```bash
npm install sails-postgresql --save
```

##### Configure
```javascript
adapter: require('sails-postgresql'),
url: 'postgresql://user:password@host:port/database',
```

##### sails-mongo

https://npmjs.com/package/sails-mongo

[MongoDB](http://en.wikipedia.org/wiki/MongoDB) is the leading NoSQL database.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Streaming



### sails-disk

Write to your computer's hard disk, or a mounted network drive.  Not suitable for at-scale production deployments, but great for a small project, and essential for developing in environments where you may not always have a database set up.  This adapter is bundled with Sails and works out of the box with zero configuration.

_Available out of the box in every Sails app._

_Configured as the default database, by default._

```javascript
adapter: undefined,
```


### sails-memory

Pretty much like disk... but doesn't actually write to disk, so it's not persistent.  Not suitable for at-scale production deployments, but useful when developing on systems with little or no disk space.

[![NPM package info](https://nodei.co/npm/sails-memory.png?downloads=true)](http://npmjs.com/package/sails-memory)

### Install
```bash
npm install sails-memory --save
```

### Configure
```javascript
adapter: require('sails-memory'),
```






### Community-supported database adapters

Is your database not supported by one of the core adapters?  Good news!  There are many different community database adapters for Sails.js and Waterline [available on NPM](https://www.npmjs.com/search?q=sails+adapter).

Here are a few highlights:

| Database technology      | Adapter                | Maintainer | Interfaces implemented | Latest stable version |
|:-------------------------|:-----------------------|------------|------------------------|-----------------------|
| Redis                    | [sails-redis](https://github.com/misterGF/sails-mssqlserver) | [misterGF](https://github.com/misterGF)|  | [![NPM version](https://img.shields.io/npm/v/sails-sqlserver.svg?style=flat-square)](https://npmjs.org/package/sails-sqlserver) |
| MS SQL Server            | [Sails-MSsqlserver](https://github.com/misterGF/sails-mssqlserver) | [misterGF](https://github.com/misterGF)|  | [![NPM version](https://img.shields.io/npm/v/sails-sqlserver.svg?style=flat-square)](https://npmjs.org/package/sails-sqlserver) |
| OrientDB                 | [Sails-OrientDB](https://github.com/appscot/sails-orientdb) | [appscot](https://github.com/appscot) | Semantic, Queryable, Associations, Migratable | [![npm version](https://badge.fury.io/js/sails-orientdb.svg)](http://badge.fury.io/js/sails-orientdb) |
| External REST API (HTTP) | [Sails-REST](https://github.com/zohararad/sails-rest) | [zohararad](https://github.com/zohararad) | Semantic | [![npm version](https://badge.fury.io/js/sails-rest.svg)](http://badge.fury.io/js/sails-rest) |
| Oracle                   | [Sails-Oracle](https://github.com/atiertant/sails-oracle) | [atiertant](https://github.com/atiertant) | | |
| Cassandra                | [Sails-Cassandra](https://github.com/dtoubelis/sails-cassandra) | [dtoubelis](https://github.com/dtoubelis) | Semantic, Migratable, Iterable | [![npm version](https://badge.fury.io/js/sails-cassandra.svg)](http://badge.fury.io/js/sails-cassandra) |
| Solr                     | [Sails-Solr](https://github.com/sajov/sails-solr) | [sajov](https://github.com/sajov) | Semantic, Migratable, Queryable | [![npm version](https://badge.fury.io/js/sails-solr.svg)](http://badge.fury.io/js/sails-solr) |
| FileMaker Database       | [Sails-Filemaker](https://github.com/geistinteractive/sails-filemaker) | [toddgeist](https://github.com/toddgeist) | Semantic | [![npm version](https://badge.fury.io/js/sails-filemaker.svg)](http://badge.fury.io/js/sails-filemaker) |
| Apache Derby             | [Sails-Derby](https://github.com/dash-/node-sails-derby) | [dash-](https://github.com/dash-) | Semantic, Queryable, Associations, SQL | [![npm version](https://badge.fury.io/js/sails-derby.svg)](http://badge.fury.io/js/sails-derby) |

> Learn [how to install and configure community adapters](http://sailsjs.com/docs/concepts/extending-sails/adapters).


##### Add your custom adapter to this list

If you see out of date information on this page, or if you want to add an adapter you made, please submit a pull request to this file updating the table of community adapters above.

Note that, to be listed on this page, an adapter must:

1. Be free and open-source (_libre_ and _gratis_), preferably under the MIT license.
2. Pass all of the Waterline adapter tests for the interface layers declared in its package.json file.
3. Support configuration via a connection URL, as `url` (if applicable)


If you find that any of these conventions are not true for any of the community adapters above (i.e. for latest stable release published on NPM, not for the code on GitHub), then please reach out to the maintainer of the adapter.  If you can't reach them or need further assistance, then please [get in touch](http://sailsjs.com/contact) with a member of the Sails core team.



<docmeta name="displayName" value="Available Adapters">
