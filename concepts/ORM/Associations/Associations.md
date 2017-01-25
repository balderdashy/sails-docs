# Associations

### Overview

In addition to being literal types like `string` and `number`, attributes in a Sails model can represent links to other records in a datastore.  Attributes of this type are called _associations_.  For example, given a `User` model and a `Pet` model, the `User` may contain a `pets` attribute that links a given user to one or more pets.

##### Setting values for associations

Depending on the type of link, an association attribute can be set in a [`.create()`](http://sailsjs.com/documentation/reference/waterline-orm/models/create) or [`.update()`](http://sailsjs.com/documentation/reference/waterline-orm/models/update) call by giving it the value of another record&rsquo;s primary key, or by using special model methods like [`.addToCollection`](http://sailsjs.com/documentation/reference/waterline-orm/models/add-to-collection) or [`.removeFromCollection()`](http://sailsjs.com/documentation/reference/waterline-orm/models/remove-from-collection).

##### Associations in retrieved records

Unlike normal attributes, association attribute values are not always returned when retrieving a record with [`.find()`](http://sailsjs.com/documentation/reference/waterline-orm/models/find) or [`.findOne()`](http://sailsjs.com/documentation/reference/waterline-orm/models/find-one).  Instead, you declare which associations to retrieve by using the [`.populate()`](http://sailsjs.com/documentation/reference/waterline-orm/queries/populate) method:

```
// Find a single user, including its pets
User.findOne(123).populate('pets').exec(...);
```

How an association attribute is represented in a returned record depends on the type of association, whether there are actual records linked, and whether `.populate()` is chained to the query.  See [this table](http://sailsjs.com/documentation/concepts/models-and-orm/records#?expected-types-values-for-association-attributes) for a full description of what to expect in a returned record with association attributes.

### Cross-adapter associations

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
