# req.params

URLパスから得られたパラメータ値を持ったオブジェクトです。

例えば、`/user/:name`がある場合、"name"は`req.params.name`としてURLパスから得ることが出来ます。このオブジェクトのデフォルト値は`{}`です。


### 使い方

```javascript
req.params;
```

### 備考
> + ルートアドレスが正規表現を使って出来ていた場合、正規表現のそれぞれのマッチから得られた値は`req.params[0]`、`req.params[1]`のように得られます。この方法は`/file/*`のような命名されていないワイルドカードマッチにも使えます。






<docmeta name="uniqueID" value="reqparams977271">
<docmeta name="displayName" value="req.params">

