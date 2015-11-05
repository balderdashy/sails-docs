# カスタムレスポンス

独自のカスタムレスポンスを生成するには、単に作成したいメソッド名と同じ名前のファイルを`/api/responses`に追加するだけです。このファイルはファンクションをエクスポートする必要があり、好きなパラメータを持つことが出来ます。

```
/** 
 * api/responses/myResponse.js
 *
 * This will be available in controllers as res.myResponse('foo');
 */

module.exports = function(message) {
   
  var req = this.req;
  var res = this.res;
   
  var viewFilePath = 'mySpecialView';
  var statusCode = 200;

  var result = {
    status: statusCode
  };

  // オプションのメッセージ
  if (message) {
    result.message = message;
  }

  // ユーザーエージェントがJSONを欲しがっていればJSONを送信する。
  if (req.wantsJSON) {
    return res.json(result, result.status);
  }

  // ステータスコードを設定し、ビューを参照する
  res.status(result.status);
  for (var key in result) {
    res.locals[key] = result[key];
  }
  // そしてビューをレンダリングする
  res.render(viewFilePath, result, function(err) {
    // ビューが存在しないか、エラーが起こればJSONを送信する。
    if (err) {
      return res.json(result, result.status);
    }

    // そうでなければ`views/mySpecialView.*`ページを渡す。
    res.render(viewFilePath);
  });   
```
<docmeta name="displayName" value="Adding a Custom Response">
