# Associations

With Sails and Waterline, you can associate models across multiple data stores. This means that even if your users live in [PostgreSQL]() and their photos live in [MongoDB](), you can interact with the data as if they lived together in the same database. You can also have associations that span different [connections]() (i.e. datastores/databases) using the same adapter.  This comes in handy if, for example, your app needs to access/update legacy recipe data stored in a [MySQL]() database in your company's data center, but also store/retrieve ingredient data from a brand new MySQL database in the cloud.

<docmeta name="uniqueID" value="Associations913185">
<docmeta name="displayName" value="Associations">

