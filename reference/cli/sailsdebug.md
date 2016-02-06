# sails debug

nodeデバッガを接続した状態でSailsアプリケーションを起動します。`node --debug app.js`と似ています。`sails lift`の用意幾つかのオプションを取ります。これから[node-inspector](https://github.com/node-inspector/node-inspector)を使ってアプリケーションが動くのをデバッグできます。


### 例

```sh
$ sails debug

info: Running node-inspector on this app...
info: If you don't know what to do next, type `help`
info: Or check out the docs:
info: http://nodejs.org/api/debugger.html

info: ( to exit, type <CTRL>+<C> )

debugger listening on port 5858
```




> 通常の（コマンドラインの）nodeデバッガをSailsで使うには常に`node debug app.js`を単に実行するだけで事足ります。

<docmeta name="uniqueID" value="sailsdebug521538">
<docmeta name="displayName" value="sails debug">

