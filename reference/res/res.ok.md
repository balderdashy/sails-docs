# res.ok()

Send a 200 ("OK") response back down to the client.


### Usage

```js
return res.ok();
```


### Details

Like the other built-in custom response modules, the behavior of this method is customizable.


### Example

```javascript
return res.ok();
```


### Notes
> + This method is **terminal**, meaning it is generally the last line of code your app should run for a given request (hence the advisory usage of `return` throughout these docs).
>+ `res.ok()` (like other userland response methods) can be overridden or modified.  It runs the response method defined in [`api/responses/ok.js`](http://sailsjs.com/anatomy/api/responses/ok-js), which is bundled automatically in newly generated Sails apps.  If an `ok.js` response method does not exist in your app, Sails will implicitly use the default behavior.







<docmeta name="displayName" value="res.ok()">
<docmeta name="pageType" value="method">

