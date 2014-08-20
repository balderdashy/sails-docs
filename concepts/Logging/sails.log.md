# sails.log()
### 개요

아래의 각각의 매소드들의 형식은, 인자의 형식이나, 콤마로 분리된 인자의 갯수에 제한이 없다. `console.log`와 같이, 매개변수를 통해 Sails 로거로 전달된 데이터는, 자동으로 노드의 [`util.inspect()`](http://nodejs.org/api/util.html#util_util_inspect_object_options)를 통해 시각화 된다. 결과적으로, 정규 Node.js의 관례가 적용이 된다- 예를들면, `inspenct()` 메서드가 있는 객체를 로그에 전달하면, 자동으로 메서드가 실행되고, 리턴되는 문자열이 콘솔에 찍힌다. 비슷하게, 객체, 날짜, 배열 및 대부분의 다른 데이터 타입들도 `util.inspect()`에 내장된 로직을 통해 시각화 된다 (예. `[object Object]` 대신에 `{ pet: { name: 'Hamlet' } }`을 보게 될것이다. )


### `sails.log()`

기본 로그 함수로, 콘솔의 `stderr`으로 "debug" 로그레벨로 출력된다.


```js
sails.log('hello');
// -> debug: hello.
```

### `sails.log.error()`

콘솔의 `stderr`으로 "error" 로그레벨로 출력된다.

```js
sails.log.error('Unexpected error occurred.');
// -> error: Unexpected error occurred.
```

### `sails.log.warn()`

콘솔의 `stderr`으로 "warn" 로그레벨로 출력된다.

```js
sails.log.warn('File upload quota exceeded for user','request aborted.');
// -> warn: File upload quota exceeded for user- request aborted.
```

### `sails.log.debug()`
_`sails.log()`와 동일함_

### `sails.log.info()`

콘솔의 `stdout`으로 "info" 로그레벨로 출력된다.

```js
sails.log.info('A new user (', 'mike@foobar.com', ') just signed up!');
// -> info: A new user ( mike@foobar.com ) just signed up!
```


### `sails.log.verbose()`

콘솔의 `stdout`으로 "verbose" 로그레벨로 출력된다. 
어플리케이션에서 드물게 일어나는 일에 대한 자세한 정보를 추적하는데 유용하다.

```js
sails.log.verbose('A user initiated an account transfer...')
// -> verbose: A user initiated an account transfer...
```


### `sails.log.silly()`

콘솔의 `stdout`으로 "silly" 로그레벨로 출력된다.
어플리케이션에서 거의 발생하지 않는 완전히 말도 안되는 정보를 추적하는데 유용하다.

```js
sails.log.silly('A user probably clicked on something..?');
// -> silly: A user probably clicked on something..?
```





<docmeta name="uniqueID" value="sailslog321347">
<docmeta name="displayName" value="sails.log()">

