# req.ip
### 目的
リクエスト(`req`)の送信元のIPアドレス。

> **備考:**
>
> Expressの`trust proxy`オプションが無効の際、これは「リモートアドレス」です。`trust proxy`オプションが有効の際、これは「アップストリームアドレス」です。
> [app.set()](http://expressjs.com/api.html#app.set)に関してはExpressドキュメントをご覧ください。
> Sailsでは`config/bootstrap.js`で`sails.hooks.http.app.set('trust proxy', true);`の行を追加することで可能です。

### 使い方
```javascript
req.ip;
```

### 例
```javascript
req.ip;
// -> "127.0.0.1"
```


<docmeta name="uniqueID" value="reqip681943">
<docmeta name="displayName" value="req.ip">

