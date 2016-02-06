# socket.get()

仮想的なGETリクエストをSocket.ioを使っているサーバに送信します。


### 使い方

```js
io.socket.get(url, data, function (data, jwres){
  // ...
});
```

|   | 引数   | 型         | 詳細 |
|---|------------|:------------:|---------|
| 1 | `url`      | ((string))   | 宛先のURLパス。（例："/checkout"）
| 2 | `data`     | ((*))        | （オプションのリクエストデータ）存在する場合、URLエンコードされ、`url`に追加されます。（urlに含まれる既存のパラメータも温存されます。）
| 3 | `callback` | ((function)) | （オプションのコールバック）存在する場合、サーバがレスポンスを返した時にコールされます。

##### コールバック

|   | 引数  | 型         | 詳細 |
|---|-----------|:------------:|---------|
| 1 | `resData` | ((*))        | Sailsサーバから返されたデータ(=== `jwres.body`、HTTPレスポンスボディと同等)
| 2 | `jwres`   | ((JWR))      | [JSON WebSocket Response](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) オブジェクト。`headers`と`body`、`statusCode`を持っています。


### 使用例

```html
<script>
io.socket.get('/users/9', function (resData) {
  resData; // => {id:9, name: 'Timmy Mendez'}
});
</script>
```


<docmeta name="uniqueID" value="socketget480208">
<docmeta name="displayName" value="io.socket.get()">

