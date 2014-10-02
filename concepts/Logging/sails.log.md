# sails.log()
### 概觀

下列方法接受以逗點分隔的參數，沒有數量與資料型態限制。如同 `console.log`，作為參數傳入 Sails 日誌記錄器的資料會使用 Node 的 [`util.inspect()`](http://nodejs.org/api/util.html#util_util_inspect_object_options) 自動美化，以方便閱讀。因此，適用於標準 Node.js 慣例，也就是說，如果你使用 `inspect()` 方法記錄一個物件，它會自動執行並返回將被寫入到終端機的字串。相同的，物件、日期、陣列和大多數其它資料型態會使用 `util.inspect()` 內建的邏輯來美化（例如，你會看到 `{ pet: { name: 'Hamlet' } }` 而不是 `[object Object]`。）



### `sails.log()`

預設的日誌功能，會將「debug」等級的日誌輸出到 `stderr`。

```js
sails.log('hello');
// -> debug: hello.
```

### `sails.log.error()`

將「error」等級的日誌輸出到 `stderr`。

```js
sails.log.error('Unexpected error occurred.');
// -> error: Unexpected error occurred.
```

### `sails.log.warn()`

將「warn」等級的日誌輸出到 `stderr`。

```js
sails.log.warn('File upload quota exceeded for user','request aborted.');
// -> warn: File upload quota exceeded for user- request aborted.
```

### `sails.log.debug()`
_`sails.log()` 的別名_

### `sails.log.info()`

將「info」等級的日誌輸出到 `stderr`。

```js
sails.log.info('A new user (', 'mike@foobar.com', ') just signed up!');
// -> info: A new user ( mike@foobar.com ) just signed up!
```


### `sails.log.verbose()`

將「verbose」等級的日誌輸出到 `stderr`。
可用於截取應用程式的詳細資訊，你可能只會在少數情況下使用。

```js
sails.log.verbose('A user initiated an account transfer...')
// -> verbose: A user initiated an account transfer...
```


### `sails.log.silly()`

將「silly」等級的日誌輸出到 `stderr`。
可用於截取應用程式的完整資訊，你可能只會在少數情況下使用。

```js
sails.log.silly('A user probably clicked on something..?');
// -> silly: A user probably clicked on something..?
```





<docmeta name="uniqueID" value="sailslog321347">
<docmeta name="displayName" value="sails.log()">

