# req.url

[`req.path`](http://sailsjs.org/documentation/reference/req/req.path.html)に似ていますが、後に続くクエリー文字列も含みます

```js
req.url;

// => "/search?q=worlds%20largest%20dogs"
```


### 備考
> + URLのハッシュ・フラグメント部分は[サーバ側では利用不可能](https://github.com/strongloop/express/issues/1083#issuecomment-5179035)ということを意識することは重要です。これは[現在のHTTPスペックに存在する問題](http://stackoverflow.com/a/2305927/486547)です。そのため、サブドメイン間をリダイレクトするアクションを書く場合などはそのアクションでフラグメンションを見ることは出来ません。
> + しかしながら、もし302リダイレクト(すなわち`res.redirect()`) として扱った場合、もう一方のユーザエージェントはフラグメント・ハッシュを維持し、新しくリダイレクトされたURLでもトラックします。多くの場合、これはあなたのやりたいことそのものです。 



<!--
これはすでに事実ではなさそうです:

Express/Connectのクエリ文字列パーサはNodeの通常の`req.url`ではクエリ文字列を取り除きますのでSails/Express/Koa/Connectでは`req.url`は`req.path`と同じです。使用例に関しては`req.path`を御覧ください。
-->


<docmeta name="uniqueID" value="requrl810500">
<docmeta name="displayName" value="req.url">
