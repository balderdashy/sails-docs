# res.cookie()

レスポンスに加えて (`name`)の名前と(`value`)の値を持つクッキーをセットするよう送信します。


### 使い方
```js
res.cookie(name, value [,options]);
```


### 詳細

"path"オプションのデフォルトは"/"です。

"maxAge"オプションは「有効期限」を現在時刻との相対値で設定する便利なオプションです。以下の例は上記の例と同じ意味です。

```javascript
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```

オブジェクトはシリアライズされたJSONで渡すことが出来、bodyParser()によって自動的にパースされます。

```javascript
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
```

このメソッドではサイン済みのクッキーもサポートされています。単にsignedオプションを追加して下さい。express.cookieParser(secret)で渡された秘密鍵を使ってres.cookie()が値にサインをします。

```javascript
res.cookie('name', 'tobi', { signed: true });
```


### 例
```javascript
res.cookie('name', 'tobi', {
  domain: '.example.com',
  path: '/admin',
  secure: true
});

res.cookie('rememberme', '1', {
  expires: new Date(Date.now() + 900000),
  httpOnly: true
});
```




<docmeta name="uniqueID" value="rescookie624994">
<docmeta name="displayName" value="res.cookie()">

