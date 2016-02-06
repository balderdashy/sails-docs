# res.clearCookie()

レスポンス中のクッキー(`name`)を削除する。

### 使い方

```js
res.clearCookie(name [,options]);
```

### 詳細

パスのオプションのデフォルトは"/"です。


### 例
```javascript
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```







<docmeta name="uniqueID" value="resclearCookie314533">
<docmeta name="displayName" value="res.clearCookie()">

