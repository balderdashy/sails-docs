# myApp/config/locales/_README

<docmeta name="uniqueID" value="READMEmd329624">
<docmeta name="displayName" value="_README">

# 国際化・ローカライゼーション設定

> 国際化・ローカライゼーション設定に関しての公式ドキュメントもご覧ください:
> http://links.sailsjs.org/docs/config/locales

## ロケール
全てのロケールファイルは`config/locales`にあります。ここにJSONのキー・値のペアとして翻訳を加える事が出来ます。
ファイル名はリクエストヘッダーに基づく自動言語選択でサポートする言語とマッチしていなければなりません。

以下はスペイン語ロケールファイルの例です(`config/locales/es.json`):
```json
{
    "Hello!": "Hola!",
    "Hello %s, how are you today?": "¿Hola %s, como estas?"
}
```
## 利用方法
ロケールは`res.i18n()`を通じ、コントローラとポリシーからアクセス可能なほか、`__(key)` や `i18n(key)`のファンクションを通じてビューからアクセス可能です。
キーは大文字と小文字を区別し、完全一致が必要ということを覚えておいてください。例えば、

```ejs
<h1> <%= __('Welcome to PencilPals!') %> </h1>
<h2> <%= i18n('Hello %s, how are you today?', 'Pencil Maven') %> </h2>
<p> <%= i18n('That\'s right-- you can use either i18n() or __()') %> </p>
```

## 設定
国際化・ローカライゼーション設定は`config/i18n.js`にあり、ここからサポートするロケールが設定できます。
