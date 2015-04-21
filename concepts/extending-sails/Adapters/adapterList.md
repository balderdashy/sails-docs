# List of Available Adapters
This file is meant to be an up to date, comprehensive list of all of the adapters available for the Sails.js framework.  If we missed one or you would like to add an adapter you made, just submit a Pull Request to this file, adding to the list.

### Officially Supported Adapters

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


### Community Supported Adapters
Have you written a Sails adapter?  Submit a PR to this file and add it here!

<docmeta name="uniqueID" value="adapterList22829">
<docmeta name="displayName" value="Available Adapters">
