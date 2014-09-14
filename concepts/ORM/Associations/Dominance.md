# Dominance
## Example Ontology


```javascript
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


```javascript
// Product.js
module.exports = {
  connection: 'ourRedis',
  attributes: {
    name: 'string',
    wishlistedBy: {
      collection: 'user',
      via: 'wishlist'
    }
  }
};
```

### The Problem

It's easy to see what's going on in this cross-adapter relationship.  There's a many-to-many ( `N->...` ) relationship between users and products.  In fact, you can imagine a few other relationships (e.g. purchases) which might exist, but since those are probably better-represented using a middleman model, I went for something simple in this example.

Anyways, that's all great... but where does the relationship resource live?  "ProductUser", if you'll pardon with the SQL-oriented nomenclature.  We know it'll end up on one side or the other, but what if we want to control which database it ends up in? 

> **IMPORTANT NOTE**
>
> This is _only a problem because both sides of the association have a `via` modifier specified_!!
> In the absence of `via`, a collection attribute always behaves as `dominant: true`.
> See the FAQ below for more information.


## The Solution

Eventually, it may be even be possible to specify a 3rd connection/adapter to use for the join table.  For now, we'll focus on choosing one side or the other.


We address this through the concept of "dominance."  In any cross-adapter model relationship, one side is assumed to be dominant.  It may be helpful to think about the analogy of a child with multinational parents who must choose one country or the other for her [citizenship](http://en.wikipedia.org/wiki/Japanese_nationality_law)


Here's the ontology again, but this time we'll indicate the MySQL database as the "dominant".  This means that the "ProductUser" relationship "table" will be stored as a MySQL table.


```javascript
// User.js
module.exports = {
  connection: 'ourMySQL',
  attributes: {
    email: 'string',
    wishlist: {
      collection: 'product',
      via: 'wishlistedBy',
      dominant: true
    }
  }
};
```


```javascript
// Product.js
module.exports = {
  connection: 'ourRedis',
  attributes: {
    name: 'string',
    wishlistedBy: {
      collection: 'user',
      via: 'wishlist'
    }
  }
};
```


## Choosing a "dominant"

Several factors may influence your decision:

+ If one side is a SQL database, placing the relationship table on that side will allow your queries to be more efficient, since the relationship table can be joined before the other side is communicated with.  This reduces the number of total queries required from 3 to 2.
+ If one connection is much faster than the other, all other things being equal, it probably makes sense to put the connection on that side.
+ If you know that it is much easier to migrate one of the connections, you may choose to set that side as `dominant`.  Similarly, regulations or compliance issues may affect your decision as well.  If the relationship contains sensitive patient information (for instance, a relationship between `Patient` and `Medicine`) you want to be sure that all relevant data is saved in one particular database over the other (in this case, `Patient` is likely to be `dominant`).
+ Along the same lines, if one of your connections is read-only (perhaps `Medicine` in the previous example is connected to a read-only vendor database), you won't be able to write to it, so you'll want to make sure your relationship data can be persisted safely on the other side.


## FAQ


##### What if one of the collections doesn't have `via`?

> If a `collection` association does not have a `via` property, it is automatically `dominant: true`.


##### What if both collections don't have `via`?

> If both `collections` don't have `via`, then they are not related.  Both are `dominant`, because they are separate relationship tables!!

##### What about `model` associations?

> In all other types of associations, the `dominant` property is prohibited.  Setting one side to `dominant` is only necessary for associations between two models which have an attribute like: `{ via: '...', collection: '...' }` on both sides.


##### Can a model be dominant for one attribute and not another?
> Keep in mind that a model is "dominant" only in the context of a particular relationship.  A model may be dominant in one or more relationships (attributes) while simultaneously NOT being dominant in other relationships (attributes).
> e.g. if a `User` has a collection of toys called `favoriteToys` via `favoriteToyOf` on the `Toy` model, and `favoriteToys` on `User` is `dominant: true`, `Toy` can still be dominant in other ways.  So `Toy` might also be associated to `User` by way of its attribute, `designedBy`, for which it is `dominant: true`.


##### Can both models be dominant?

> No. If both models in a cross-adapter/cross-connection, many-to-many association set `dominant: true`, an error is thrown before lift.


##### Can neither model be dominant?

> Sort of... If neither model in a cross-adapter/cross-connection, many-to-many association sets `dominant: true`, a warning is displayed before lift, and a guess will be made automatically based on the characteristics of the relationship.  For now, that just means an arbitrary decision based on alphabetical order :)

##### What about non-cross-adapter associations?

> The `dominant` property is silently ignored in non-cross-adapter/cross-connection associations.  We're assuming you might be planning on breaking up the schema across multiple connections eventually, and there's no reason to prevent you from being proactive.  Plus, this reserves additional future utility for the "dominant" option down the road.


<docmeta name="uniqueID" value="Dominance904539">
<docmeta name="displayName" value="Dominance">

