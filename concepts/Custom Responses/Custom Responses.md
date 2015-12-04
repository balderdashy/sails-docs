# カスタムレスポンス

### 概要

Sails 0.10はカスタムレスポンスをサポートしています。また、Sailsは一般的なレスポンスタイプに関して便利なデフォルトのレスポンスを用意しています。これらのレスポンスはプロジェクトファイルの`/api/responses`ディレクトリーに有ります。 これらをカスタマイズするためには適切な.jsファイルを編集してください。

簡単な例として以下のコントローラアクションに関して考えてみましょう。:

```javascript
foo: function(req, res) {
   if (!req.param('id')) {
     res.status(400);
     res.view('400', {message: 'Sorry, you need to tell us the ID of the FOO you want!'});
   }
   ...
}
```

このコードではBad requestを処理してエラー原因を記述したエラーメッセージを返信しています。しかし、このコードには以下の様な問題が有ります。:

* *一般化されていない*：このコードはこのインスタンス特有のものですので、他の場所でもフォーマットが同じようになるために気を付けなければなりません。
* *抽象化されていない*：他の場所で同じことをやらなければならない場合、コピーペーストしなければなりません。
* レスポンスが*content-negotiated*でない： クライアントがJSONをリクエストしていた場合は残念なことになります。

それではこれを解決することを考えてみましょう。:

```javascript
foo: function(req, res) {
   if (!req.param('id')) {
     res.badRequest('Sorry, you need to tell us the ID of the FOO you want!');
   }
   ...
}
```


この方法は多くの利点があります:

 - エラーのペイロードが一般化されている
 - プロダクション環境と開発環境の間でエラーログの管理ができる。
 - エラーコードが一貫している。
 - JSONとHTMLなどのコンテンツネゴシエーションが処理されている。
 - APIの微調整が適切な１箇所のファイルを簡単に編集するだけでできる。

### レスポンスメソッドとファイル

`/api/respons`フォルダに保存されたすべての`.js`スクリプトはコントローラ内で`res.[responseName]`の形式で呼び出すことで実行が出来ます。例えば`/api/responses/serverError.js`は`res.serverError(errors)`で呼び出すことが出来ます。リクエストとレスポンスはレスポンススクリプトの中ではt`his.req`と`this.res`で呼び出すことが出来ます。これにより任意のパラメータ（`serverError`の`errors`パラメータのように）を実際のレスポンスファンクションに引き渡すことが出来ます。


<docmeta name="displayName" value="Custom Responses">
