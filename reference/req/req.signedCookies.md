# req.signedCookies
リクエストに含まれる全てのサイン済クッキー含むオブジェクトです。サイン済クッキーはクライアントサイドでの変更を防ぎます。この保護はクッキー値のHMACハッシュをBase64エンコードしたもので提供されます。クッキーを取得した時、HMACシグネチャがクッキー値を元にしたものとマッチしない時、そのクッキーは`req.signedCookies`オブジェクトの一員としては使えません。

### 目的
リクエスト(`req`)のサイン済みのクッキーをすべて持つオブジェクト


### 使い方
```javascript
req.signedCookies;
```



### 例
"chocolatechip"という名前で"Yummy"の値を持つサイン済クッキーを追加:

```javascript
res.cookie('chocolatechip', 'Yummy', {signed:true});
```

クッキーを取得:
```javascript
req.signedCookies.chocolatechip;
// "Yummy"
```







<docmeta name="uniqueID" value="reqsignedCookies113713">
<docmeta name="displayName" value="req.signedCookies">

