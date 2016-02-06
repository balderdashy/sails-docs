# req.get()

リクエスト(`req`)の指定された`header`フィールドの中身を返します。ヘッダー名は _大文字小文字を区別しない_ ということにお気をつけ下さい。

### 使い方

```js
req.get(header);
```

### 例
`req`が'myField'と名付けられ、'cat'の値を持つヘッダーを持つと仮定します。:

```javascript
req.get('myField');
// -> cat
```

### 備考
>+ `header`引数は大文字小文字を区別しません。
>+ スペルの関係上、`header`引数は"referrer"と"referer"を同じく扱います。





<docmeta name="uniqueID" value="reqget839626">
<docmeta name="displayName" value="req.get()">

