# req.headers

リクエストの中の規定及びカスタムのヘッダー。

### 使い方

```javascript
req.headers;
```

### 詳細

しばしば現在のリクエストのヘッダーを確認したいことがありますが、Sailsではそれが簡単にできます。

### 例

`req.headers`オブジェクトの出力例:

```javascript
console.log(req.headers);

{ host: 'localhost:1337',
  connection: 'keep-alive',
  'cache-control': 'no-cache',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
  accept: '*/*',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'en-US,en;q=0.8,hi;q=0.6',
  cookie: 'sdfkslddklfk; sails.sid=s%3skdlfjkj1231lsdfnsc,m' }
```
  
  
### 例 

規定及びカスタムのヘッダから特定のものにアクセスしたい場合はカッコを使ったノーテーションで行えます:

```javascript
req.headers['custom-header'];
```

あるいはドットを使ったノーテーションで:

```javascript
req.headers.host;
```
<docmeta name="displayName" value="req.headers">
