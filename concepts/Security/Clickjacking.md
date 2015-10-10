# Clickjacking


[Clickjacking](https://www.owasp.org/index.php/Clickjacking) (別名"UI redress attacks") は攻撃者がユーザーが意図しないUIイベント（例えばDOMイベント等）を行うように仕向ける攻撃です。



### X-FRAME-OPTIONS

Clickjacking攻撃を避けるためのシンプルな方法としてはX-FRAME-OPTIONSを有効化することです。

##### [lusca](https://github.com/krakenjs/lusca#luscaxframevalue)を使う

> `lusca` は[Apache license](https://github.com/krakenjs/lusca/blob/master/LICENSE.txt)で使えるオープンソースです。

```sh
# In your sails app
npm install lusca --save
```

そして、`config/http.js`の中の設定オブジェクトで:

```js
  // ...
  // maxAge ==> Number of seconds strict transport security will stay in effect.
  xframe: require('lusca').xframe('SAMEORIGIN')
  // ...
  order: [
    // ...
    'xframe'
    // ...
  ]
```



### 追加のリソース
+ [Clickjacking (OWasp)](https://www.owasp.org/index.php/Clickjacking)



<docmeta name="uniqueID" value="Clickjacking879453">
<docmeta name="displayName" value="Clickjacking">
<docmeta name="tags" value="clickjacking,ui redress attack">
