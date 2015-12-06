# req.body

リクエストボディをパースしたテキストパワメータが含まれ、デフォルトは`{}`です。

デフォルトで、リクエストボディはURLエンコードされているか、Json文字列です。シリアライズされたXMLなど、その他フォーマットのサポートは[middleware](http://sailsjs.org/documentation/concepts/Middleware)を設定を使って可能です。

### 使い方
```js
req.body;
```

### 備考
>+ リクエストが、一つまたは複数のファイルアップロードを含んでいる場合、文字列属性は`req.body`の中の最初のパラメータの _**前に**_ あるもののみ取得可能です。


<docmeta name="uniqueID" value="reqbody1481">
<docmeta name="displayName" value="req.body">
