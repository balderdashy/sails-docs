# req.accepts()

リクエストが許容される[media types](http://www.iana.org/assignments/media-types/media-types.xhtml) に特定の`type`が含まれるかどうかを確認します。TrueかFalseを返します。


### 使いかた
```javascript
req.accepts(type);
```

### 例

```javascript
req.accepts('application/json');
// -> true
req.accepts('json');
// -> true
```

### 備考
> + Sails/Express/Koa/Connectでのヘッダーパースアルゴリズムの詳細に関しては[`accepts` module](https://github.com/expressjs/accepts)を御覧ください。


<docmeta name="displayName" value="req.accepts()">

