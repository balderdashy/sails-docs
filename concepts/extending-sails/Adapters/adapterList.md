# Available Database Adapters

This file is meant to be an up to date, comprehensive list of all of the core adapters available for the Sails.js framework, and a reference of a few of the community adapters out there.  If you see out of date information on this page, or if you want to add an adapter you made, please just submit a pull request to this file, adding to the list of community adapters below.


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

##### sails-orientdb

https://github.com/appscot/sails-orientdb

[OrientDB](http://en.wikipedia.org/wiki/OrientDB) is an Open Source NoSQL DBMS with the features of both Document and Graph DBMSs. 

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Associations
+ Migratable

##### sails-filemaker

https://github.com/geistinteractive/sails-filemaker

[FileMaker](https://en.wikipedia.org/wiki/FileMaker), is cross platform relational database and development platform. It has been owned and published by Apple since 1988.

###### Interfaces implemented:
+ Semantic

##### sails-derby

https://github.com/dash-/node-sails-derby

[Apache Derby](https://db.apache.org/derby/) is an open source relational database implemented entirely in Java and available under the Apache License, Version 2.0.

###### Interfaces implemented:
+ Semantic
+ Queryable
+ Associations
+ SQL


### Add your custom adapter to this list

Have you written a Sails adapter? Submit a PR to this file and add it here!


<docmeta name="displayName" value="Available Adapters">
