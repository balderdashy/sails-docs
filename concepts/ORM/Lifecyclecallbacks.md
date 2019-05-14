# Lifecycle callbacks

### Overview

Lifecycle callbacks are functions that are called before or after certain model methods.  For example, you might use lifecycle callbacks to automatically compute the value of a `fullName` attribute before creating or updating a `User` record.

Sails exposes a handful of lifecycle callbacks by default:

##### Lifecycle callbacks on `.create()`

The `afterCreate` lifecycle callback will only be run on queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags, see [Waterline Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeCreate: fn(recordToCreate, proceed)
  - afterCreate: fn(newlyCreatedRecord, proceed)

> `beforeCreate` is also run on bulk inserts of data when you call `.createEach()`. However, `afterCreate` is **not**.

##### Lifecycle callbacks on `.update()`

The `afterUpdate` lifecycle callback will only be run on `.update()` queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags, see [Waterline Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeUpdate: fn(valuesToSet, proceed)
  - afterUpdate: fn(updatedRecord, proceed)

##### Lifecycle callbacks on `.destroy()`

The `afterDestroy` lifecycle callback will only be run on `.destroy()` queries that have the `fetch` meta flag set to `true`. For more information on using the `meta` flags, see [Waterline Queries](https://sailsjs.com/documentation/reference/waterline-orm/queries/meta).

  - beforeDestroy: fn(criteria, proceed)
  - afterDestroy: fn(destroyedRecord, proceed)


### Example

If you want to hash a password before saving in the database, you might use the `beforeCreate` lifecycle callback.

```javascript
// User.js
module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    }

  },


  beforeCreate: function (valuesToSet, proceed) {
    // Hash password
    sails.helpers.passwords.hashPassword(valuesToSet.password).exec((err, hashedPassword)=>{
      if (err) { return proceed(err); }
      valuesToSet.password = hashedPassword;
      return proceed();
    });//_∏_
  }
  
};
```

If you want to delete child objects when deleting its parent, you can use the `beforeDestroy` lifecycle callback. By using `beforeDestory` lifecycle, it will delete the child objects before the parent is deleted. You can stimulate a `cascade on delete` with this. Be careful when using this, as you may lose sensitive data! In this example we will have 2 Models. `Invoice` and `Item`. `Invoice` to `Item` corresponds to `One-to-many` association relation. See [One-to-many associations](https://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many).

```javascript
// Invoice.js

module.exports = {
  attributes: {
    client_name: { type: 'string', required: true },
    client_email: { type: 'string', required: false },
    project_name: { type: 'string', required: true },
    project_description: { type: 'string', required: false },
    invoice_status: { type: 'string', defaultsTo: 'unpaid' },
    due_date: { type: 'string', required: false },
    total_price: { type: 'number', required: true},
    items: {
      collection: 'item',
      via: 'invoice'
    }
  },

  async beforeDestroy(criteria, proceed) {
    try {
      // destroy items related to parent
      // we can access the deleted parent object using 
      // criteria object
      await Item.destroy({invoice: criteria.where.id});      
    } catch (error) {
      return proceed(error);
    }
    return proceed();
  }

};


// Item.js

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    price: { type: 'number', columnType: 'float', required: false },
    invoice: {
      model: 'invoice'
    }
  },
};


// Delete Invoice Action

  deleteInvoice: async(req, res) => {
    let invoice;
    try {
      //invoice_id is parameter send by client
      invoice = await Invoice.destroy({id: req.param('invoice_id')}); 
    } catch (error) {
      console.log(error);
      return false;
    }
    return res.status(202).json({message: 'invoice deleted'});
  },



```


<docmeta name="displayName" value="Lifecycle callbacks">
