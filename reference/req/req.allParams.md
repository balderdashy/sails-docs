# req.allParams()

リクエストの中で送信された _全ての_ パラメータを一つのオブジェクトにして送信します。URLパスに含まれるパラメータやクエリストリング、リクエストボディの内容もこれに含まれます。詳しくは[`req.param()`](http://sailsjs.org/documentation/reference/req.param)を御覧ください。

### 使い方

```js
req.allParams();
```


### 例

特定の`sku`を持つ製品を与えられたパラメータの内容を使って編集します。:

```javascript
var values = req.allParams();

// Don't allow `price` or `isAvailable` to be edited.
delete values.price;
delete values.isAvailable;

// At this point, `values` might look something like this:
// values ==> { displayName: 'Bubble Trouble Bubble Bath' }

Product.update({sku: sku})
.set(values)
.then(function (newProduct) {
  // ...
});
```

### 備考

>+ メソッドは`req.params.all()`としても呼び出せます - これらは同期されています。















<docmeta name="uniqueID" value="reqallParams817828">
<docmeta name="displayName" value="req.allParams()">
