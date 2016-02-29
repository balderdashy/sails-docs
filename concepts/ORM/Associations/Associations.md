# Associations

With Sails and Waterline, you can associate models across multiple data stores. This means that even if your users live in [PostgreSQL](http://www.postgresql.org/) and their photos live in [MongoDB](http://www.mongodb.com/), you can interact with the data as if they lived together in the same database. You can also have associations that span different [connections](http://sailsjs.org/documentation/reference/sails.config/sails.config.connections.html) (i.e. datastores/databases) using the same adapter.  This comes in handy if, for example, your app needs to access/update legacy recipe data stored in a [MySQL](http://www.mysql.com/) database in your company's data center, but also store/retrieve ingredient data from a brand new MySQL database in the cloud.

> **IMPORTANT NOTE**
>
> In the examples in the used throughout the associations concepts guide, note that all references to Sails model classes are in _lowercase_.  For example, in:
```
// User.js
module.exports = {
  connection: 'ourMySQL',
  attributes: {
    email: 'string',
    wishlist: {
      collection: 'product',
      via: 'wishlistedBy'
    }
  }
};
```
the `collection` key is set to `product`--this is the _identity_ of the Sails model called `Product`.  Whenever models are referenced in `collection`, `via`, `model` or `through` keys, their lowercased identity names should be used.

<docmeta name="displayName" value="Associations">
