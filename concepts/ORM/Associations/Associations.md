# Associations

With Sails and Waterline, you can associate models across multiple data stores. This means that even if your users live in [PostgreSQL](http://www.postgresql.org/) and their photos live in [MongoDB](http://www.mongodb.com/), you can interact with the data as if they lived together in the same database. You can also have associations that span different [connections](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html) (i.e. datastores/databases) using the same adapter.  This comes in handy if, for example, your app needs to access/update legacy recipe data stored in a [MySQL](http://www.mysql.com/) database in your company's data center, but also store/retrieve ingredient data from a brand new MySQL database in the cloud.

<docmeta name="uniqueID" value="Associations913185">
<docmeta name="displayName" value="Associations">

