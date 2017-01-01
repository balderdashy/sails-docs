# Associations

With Sails and Waterline, you can associate models across multiple data stores. This means that even if your users live in [PostgreSQL](http://www.postgresql.org/) and their photos live in [MongoDB](http://www.mongodb.com/), you can interact with the data as if they lived together in the same database. You can also have associations that span different [connections](http://sailsjs.com/documentation/reference/sails.config/sails.config.connections.html) (i.e. datastores/databases) using the same adapter.  This comes in handy if, for example, your app needs to access/update legacy recipe data stored in a [MySQL](http://www.mysql.com/) database in your company's data center, but also store/retrieve ingredient data from a brand new MySQL database in the cloud.

> **IMPORTANT NOTE**
>
> In tutorials and example code, you might sometimes see associations' `collection`, `model`, or `through` properties reference models in either lowercase (the _identity_) or capitalized (the _global ID_).  For example, in the following association, the `collection` property is set to `product`-- the identity of the Sails model called `Product`:
>
>```javascript
>wishlist: {
>  collection: 'product',
>  via: 'wishlistedBy'
>}
>```
>
> In the Sails docs, we always use the global ID approach for consistency's sake.  But realize that either approach will work.

<docmeta name="displayName" value="Associations">
