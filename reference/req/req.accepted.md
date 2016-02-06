# req.accepted

リクエスト(`req`)が受け入れられるメディアタイプ(例: `text/html` や `application/json`)の配列をクオリティ順に持っています。

### 使いかた
```javascript
req.accepted;
```

### 例

```javascript
req.accepted;

/*
  [ { value: 'application/json',
      quality: 1,
      type: 'application',
      subtype: 'json' },
  { value: 'text/html',
       quality: 0.5,
       type: 'text',
       subtype: 'html' } ]
*/
```

### 備考
> + Sails/Express/Koa/Connectでのヘッダーパースアルゴリズムの詳細に関しては[`accepts` module](https://github.com/expressjs/accepts)を御覧ください。




<docmeta name="uniqueID" value="reqaccepted334477">
<docmeta name="displayName" value="req.accepted">

