# io.socket.request()

Socket.ioを使ってSailsサーバに仮想的なリクエストを送信します。

リクエストのヘッダーやパラメータ、メソッド、URLへの低レベルなアクセスが提供されているところ以外は`io.socket.get()`や`io.socket.post()`などと極めて似ています。

この関数は`sails.io.js`のJavaScriptクライアントによって提供されており、**ブラウザ** からアクセス可能です。


### 使い方

```js
io.socket.request(options, function (data, jwr)){
  // ...
  // jwr.headers
  // jwr.statusCode
  // jwr.body === data
  // ...
});
```


### 使用例

```javascript
io.socket.request({
  method: 'get',
  url: '/user/3/friends',
  params: {},
  headers: {}
})
```


<docmeta name="uniqueID" value="socketrequest682488">
<docmeta name="displayName" value="io.socket.request()">

