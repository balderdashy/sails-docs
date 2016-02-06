# req.fresh

このフラグはユーザエージェントがこのリクエスト(`req`)に関してデータをフラッシュすることを求めているということを意味します。（これは"[if-none-match](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.26)"、"[cache-control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)"、あるいは"[if-modified-since](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.25)"リクエストヘッダーによって示されています。）

リクエストがデータをフラッシュして欲しい時には通常最新のデータをデータ・モデルから`.find()`してクライアントに送り返さなければなりません。

### 使い方
```js
req.fresh;
```

### 例
```js
if (req.fresh) {
  // The user-agent is asking for a more up-to-date version of the requested resource.
  // Let's hit the database to get some stuff and send it back.
}
```

### 備考
> + Sails/Express/Koa/Connectの実際の実装に関しては[`node-fresh`](https://github.com/visionmedia/node-fresh) モジュールを御覧ください。








<docmeta name="uniqueID" value="reqfresh718346">
<docmeta name="displayName" value="req.fresh">

