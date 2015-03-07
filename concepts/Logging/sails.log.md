# sails.log()
### 概要

以下に挙げる各メソッドはカンマで区切られた無限個の引数をタイプにかかわらず受け取ります。`console.log`のように、渡された各引数はSailsのロガーによって[`util.inspect()`](http://nodejs.org/api/util.html#util_util_inspect_object_options)を利用して読解可能な形に自動的に変換されます。その結果通常のNode.jsとの互換性が維持されています。すなわち、`inspect()`メソッドを使ってオブジェクトをログした時にはそれが自動的に実行され、その戻り値の文字列がコンソールに出力されます。同じようにオブジェクトや日付、配列などほとんどのデータ型がビルトインの`util.inspect()`メソッドにより読みやすく変換されます。(例えば`[object Object]`の代わりに`{ pet: { name: 'Hamlet' } }`と表示されます。



### `sails.log()`

デフォルトのログファンクションです。ログレベルが"debug"の時に`stderr`に対してコンソール出力します。

```js
sails.log('hello');
// -> debug: hello.
```

### `sails.log.error()`

ログレベルが"error"の時に`stderr`に対してコンソール出力します。

```js
sails.log.error('Unexpected error occurred.');
// -> error: Unexpected error occurred.
```

### `sails.log.warn()`

ログレベルが"warn"の時に`stderr`に対してコンソール出力します。

```js
sails.log.warn('File upload quota exceeded for user','request aborted.');
// -> warn: File upload quota exceeded for user- request aborted.
```

### `sails.log.debug()`
_`sails.log()`のエイリアスです。_

### `sails.log.info()`

ログレベルが"info"の時に`stdout`に対してコンソール出力します。

```js
sails.log.info('A new user (', 'mike@foobar.com', ') just signed up!');
// -> info: A new user ( mike@foobar.com ) just signed up!
```


### `sails.log.verbose()`

ログレベルが"verbose"の時に`stdout`に対してコンソール出力します。
あまりよく有効化することはないと思いますが、アプリケーションに関する詳細なログを取得したいときに便利です。

```js
sails.log.verbose('A user initiated an account transfer...')
// -> verbose: A user initiated an account transfer...
```


### `sails.log.silly()`

ログレベルが"silly"の時に`stdout`に対してコンソール出力します。
アプリケーションに関する、ほとんど利用することのないような全く馬鹿げた情報を取得したいときに便利です。

```js
sails.log.silly('A user probably clicked on something..?');
// -> silly: A user probably clicked on something..?
```





<docmeta name="uniqueID" value="sailslog321347">
<docmeta name="displayName" value="sails.log()">

