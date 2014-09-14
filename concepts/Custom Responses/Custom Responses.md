# カスタムレスポンス

### 概要

Sails 0.10はカスタムレスポンスをサポートしています。また、Sailsは一般的なレスポンスタイプに関して便利なデフォルトのレスポンスを用意しています。これらのレスポンスはプロジェクトファイルの`/api/responses`ディレクトリーに有ります。 これらをカスタマイズするためには適切な.jsファイルを編集してください。

簡単な例として以下のコントローラアクションに関して考えてみましょう。:

```
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

```
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

### デフォルトのレスポンス

新しいSailsのアプリケーションを作成した時に以下のレスポンスが`/api/responses`フォルダに生成されます。それぞれのレスポンスはクライアントがJSONを要求した時は`status`キーをエラーに関するその他の情報とHTTPステータスとともに標準化されたJSONにして送ります。

#### res.serverError(errors)

このレスポンスは{errors} 引数に渡されたエラーを解読可能かつ適切なエラーの配列を含み`Error`オブジェクトにして引き渡します。`errors`は一つまたは複数の文字列か`Error`オブジェクトである必要があります。そしてSailsのロガー（たいていはコンソールに）にエラー出力し、リクエストがHTMLの時は`views/500.*`のビューファイルを、リクエストがJSONの時はJSONオブジェクトを返します。Developmentモードではエラーのリストがレスポンスに含まれますがProductionモードでは実際のエラーは抑制されます。

#### res.badRequest(validationErrors, redirectTo)

このレスポンスはJSONを要求された時には`validationErrors`と400のステータスコードを含むレスポンスを返ます。

トラディショナルな（Ajaxでない）Webフォームの場合はユーザが不正なデータをフォームで送信した時に行う出来ベストプラクティスを以下の手順で行います。:

 - 初めに１回限り利用可能はFlash変数がセットされます。セットされる内容はおそらく文字列化バリデーションエラーオブジェクトの配列です。
 - その後、ユーザがredirectToで指定する場所（すなわち不正なFormデータが生成された箇所）にリダイレクトで戻します。
 - その後コントローラかビュー（あるいはその両方）はFlash変数に入っているエラーを処理し不正な項目をハイライトしたりエラーメッセージを表示したりします。


#### res.notFound()

このレスポンスはJSONが要求された時には単純に404ステータスコードと`{status: 404}`のエラーオブジェクトを返します。

それ以外の時には`myApp/views/404.*`が返され、もしビューファイルが存在しない場合はJSONレスポンスを返します。

#### res.forbidden(message)

このレスポンスはJSONが要求された時には単純に403ステータスコードと`message`の内容返されます。

それ以外の時には`myApp/views/403.*`が返され、もしビューファイルが存在しない場合はJSONレスポンスを返します。

### カスタムのレスポンス

あなたのカスタムのレスポンスメソッドを作成するには単に`/api/responses`につくろうとしているメソッド名と同じファイルを追加するだけで大丈夫です。ファイルはあなたが利用したいと考えているすべてのパラメータをexportしなければなりません。

```
/** 
 * api/responses/myResponse.js
 *
 * これはコントローラではres.myResponse('foo')で呼び出せます;
 */

module.exports = function(message) {
   
  var req = this.req;
  var res = this.res;
   
  var viewFilePath = 'mySpecialView';
  var statusCode = 200;

  var result = {
    status: statusCode
  };

  // 追加のメッセージ
  if (message) {
    result.message = message;
  }

  // ユーザがJSONを要求した時はJSONを返します。
  if (req.wantsJSON) {
    return res.json(result, result.status);
  }

  // ステータスコードとビューのローカルを追加します
  res.status(result.status);
  for (var key in result) {
    res.locals[key] = result[key];
  }
  // そして、ビューをレンダリングします。
  res.render(viewFilePath, result, function(err) {
    // If the view doesn't exist, or an error occured, send json
    if (err) {
      return res.json(result, result.status);
    }

    // あるいは`views/mySpecialView.*` ページを返します。
    res.render(viewFilePath);
  });   
```


<docmeta name="uniqueID" value="CustomResponses867259">
<docmeta name="displayName" value="Custom Responses">

