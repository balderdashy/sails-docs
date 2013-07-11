<span id="bootstrap.js"></span>
## bootstrap.js
The bootstrap function is run before the server is launched.  A callback function is passed as the first argument that you must trigger when you're finished, e.g.

```
module.exports.bootstrap = function (cb) {
  User.create({
    name: 'Colonel Sanders',
    email: 'colonel@kfc.com',
    age: 286
  }, cb);
};
```
