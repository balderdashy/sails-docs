# req.query

パース済みのクエリ文字列です。デフォルトは`{}`です。

### 使い方
```js
req.query;
```

### 例

リクエストが`GET /search?q=mudslide`だった場合:

```js
req.query.q
// -> "mudslide"
```




<docmeta name="uniqueID" value="reqquery553014">
<docmeta name="displayName" value="req.query">

