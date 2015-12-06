# req.xhr
リクエスト(`req`)がAJAXリクエストに見えるかどうかのフラグ。（すなわち、これは"X-Requested-With"に"XMLHttpRequest"が設定されているかによってもたらされます）


### 使い方
```js
req.xhr;
```

### 例
```javascript
if (req.xhr) {
  // Yup, it's AJAX alright.
}
```


### 備考
> + 可能な限り`req.wantsJSON`を使うことを選択すべきです。あなたのアプリケーションでカスタムのコンテントネゴシエーションを書くことは避けて下さい。それはあなたのコードをより冗長で脆弱なものにします。





<docmeta name="uniqueID" value="reqxhr450203">
<docmeta name="displayName" value="req.xhr">

