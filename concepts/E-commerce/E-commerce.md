# E-commerce

Like any web application framework, Sails can be used for e-commerce apps. Depending on your project's specific needs, you can use Sails as the base for your own custom solution, or integrate with an existing e-commerce platform.

### Custom solutions
When building a custom e-commerce solution on Sails, there are a number of possibilities for how to structure your data. A good place to start is with 3 [models](https://sailsjs.com/documentation/concepts/models-and-orm): `User` (already included in the "Web app" template for new Sails apps), `Product`, and `Order`. By including [associations](https://sailsjs.com/documentation/concepts/models-and-orm/associations), you can track things like shopping carts and a user's individual order history.

For example:

```js
// api/models/User.js
{
  attributes: {
    stripeCustomerId: {
      type: 'string'
    },
    orders: { collection: 'Order', via: 'owner', },
    cart: { collection: 'Product', via: 'isInCartsOf'}
  },
}
```

```js
// api/models/Product.js
{
  attributes: {
    price: {
      type: 'number'
    },
    numAvailable: { type: 'number' },
    isInCartsOf: { collection: 'User', via: 'cart' },
    isInOrders: { collection: 'Order', via: 'products' }
  },
}
```

```js
// api/models/Order.js
{
  attributes: {
    stripeChargeId: {
      type: 'string',
      description: 'The Stripe charge ID for refn'
    },
    totalPrice: { type: 'number'},
    owner: { model: 'User' },
    products: { collection: 'Product', via: 'isInOrders' },
  },
}
```

Items can be added to a cart using [`.addToCollection()`](https://sailsjs.com/documentation/reference/waterline-orm/models/add-to-collection):

```js
// To add products 3 and 7 to user 1's cart:
await User.addToCollection(1, 'cart')
.members([3, 7]);
```

When handling check out, items in the cart can be totaled up with [`.sum()`](https://sailsjs.com/documentation/reference/waterline-orm/models/sum), and used to create a new order. (If using the "Web app" template, there's a built-in helper for creating Stripe charges.)
```js
// Look up user 1
var user = User.findOne(1);

// Get the total price of all items in the cart
var total = await Product.sum('price', {
  id: { in: user.cart }
});

// Create and capture charge.
let stripeChargeId = await sails.helpers.stripe.chargeCustomer(
  user.stripeCustomerId,
  total,
  'Custom Squid Ink Art'
)
.intercept('couldNotCharge', 'couldNotCharge');

// Create the order
var newOrder = await Order.create({
  stripeChargeId: stripeChargeId,
  totalPrice: total,
  owner: user.id,
}).fetch();

// Add the cart items to the order
Order.addToCollection(newOrder.id, 'products')
.members(user.cart);

// Update the inventory of each ordered product to reflect this purchase.
for (let productId of user.cart) {
  let product = await Product.findOne(productId);
  await Product.update(productId).set({
    numAvailable: product.numAvailable - 1
  });
}

// Clear the user's shopping cart.
User.replaceCollection(user.id, 'cart')
.members([]);

```

The example above is just a starting point, but sets the groundwork for basic inventory and order tracking.


### E-commerce platforms
If the prospect of rolling custom e-commerce features from scratch is rather daunting, you may consider integrating an existing platform with your Sails app.

##### [Ymple](https://www.ymple.com/en/partner/sailsjs/)
Ymple is an open-source e-commerce framework built on Sails. It includes both server-side logic and UI templates for storefronts and administration. For more information about how to integrate Ymple with your Sails app, check out their installation guide [here](https://www.ymple.com/en/doc/).


<docmeta name="displayName" value="E-commerce">
