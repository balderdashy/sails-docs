# req.param()
指定された名前のパラメータの値を返します。

### 使い方

```javascript
req.param(name[, defaultValue]);
```

### 詳細

`req.param()`は指定さてたパラメータのURLパス、クエリ文字列、リクエストボディを探します。指定された`name`のパラメータがどこにもない場合は`undefined`または、`defaultValue`が指定されている場合はそれを返します。

+ URLパスパラメータ ([`req.params`](http://sailsjs.org/documentation/reference/req/req.params.html))
  + 例えば、ルート`/foo/:id`へのリクエスト"/foo/4"は`{ id: 4 }`を持ちます。
+ クエリ文字列パラメータ ([`req.query`](http://sailsjs.org/documentation/reference/req/req.query.html))
  + 例えば、リクエスト"/foo?email=5"は`{ email: 5 }`を持ちます。
+ ボディパラメータ ([`req.body`](http://sailsjs.org/documentation/reference/req/req.body.html))
  + 例:パース可能なボディ（例:JSON、URLエンコードまたXML）はそのパース済みの値を持ちます。


### 例

以下の様なコードを持つコントローラ、ポリシー、またはBlueprintを指すルート(`POST /product/:sku`) を想定します。:

```javascript
req.param('sku');
// -> 123
```

以下のいずれの方法を使って`sku`を送る際にも期待している結果が得られます。:

+ `POST /product/123`
+ `POST /product?sku=123`
+ `POST /product`
    + 次のJSONのリクエストボディを持って: `{ "sku": 123 }`



### 備考
> + 全てのソースからの全てのパラメータ（URLパス、クエリ文字列、パース済リクエストボディ）を欲しい場合は代わりに[`req.allParams()`](http://sailsjs.org/documentation/reference/req/req.allParams.html)が使えます。



<docmeta name="uniqueID" value="reqparam149618">
<docmeta name="displayName" value="req.param()">
