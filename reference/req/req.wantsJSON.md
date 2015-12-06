# req.wantsJSON

クライアントが（XMLやHTMLではなく）JSONレスポンスを求めていることを示すフラグです。

`req.wantsJSON`はSailsの全ての[ビルトインのカスタムレスポンス](http://sailsjs.org/documentation/anatomy/myApp/api/responses)で利用されています。


### 使い方
```js
req.wantsJSON;
```

### 詳細

`req.wantsJSON`の意図している使い道はサーバがJSONを返すべきなのか、それとも(HTMLページや302リダイレクトのような)何か別のものを返すべきなのかのクリーンで再利用可能な判断方法を提供することです。これは _全ての_ コンテンツネゴシエーション問題に利用できるわけではありませんが、シンプルで殆どのケースで使える方法です。

例えば、URLバーに入力されたリクエストに関しては全てのメジャーなブラウザは"Accept: text/plain;"リクエストヘッダーを付加します。このケースでは`req.wantsJSON`はFalseです。しかし別のケースでは区別はそれほど明確ではありません。これらのシナリオではSailsは`req.wantsJSON`に最適な値をヒューリスティックに判断します。

厳密には、`req.wantsJSON`はリクエストの`"Content-type"`、`"Accepts"`、`"X-Requested-With"`を確認してリクエストがJSONを求めているかどうかを推測します。リクエストが確な判断ができるのに十分な情報を持っていない場合、SailsはJSONの側を選びます(すなわち`req.wantsJSON`は`true`になります)。

これによりアプリケーションはより未来志向で堅牢なものになります: つまり、長期的なコンテンツネゴシエーションの変化（新しい消費者向けデバイスや企業向けユーザエージェントが別のヘッダを導入するような）に対するベストプラクティスとしてSailsは`req.wantsJSON`をフレームワークレベルでパッチしてヒューリスティックをそれに応じて変更します。言うまでもなく、これによりコードの重複が抑制できそれぞれのルートでヘッダーを確認するイライラからも逃れることが出来ます。

### 例
```javascript
if (req.wantsJSON) {
  return res.json(data);
}
else {
  return res.view(data);
}
```

### 詳細

`req.wantsJSON`がリクエストを検査する際の具体的な順序は以下のとおりです。 ** 以下のいずれかにマッチした時は、それから先のチェックは無視されます **

もし以下ならリクエストは"wantsJSON" :

+ AJAXリクエストのように見えれば
+ ソケットからのバーチャルなリクエストに見えれば
+ 明示的にHTMLを要求していなければ
+ JSONのcontent-typeヘッダーを持っていて"Accept"ヘッダーを持っていれば
+ `req.options.wantsJSON`がTrueであれば

### 備考
> + 低レベルなコンテントネゴシエーションは、もちろん`req.is()`、`req.accepts()`、`req.xhr`と`req.get()`を使って行えます。
> + Sails v0.10からはWebSocketを出元とするリクエストは全て"want JSON"として扱われます。

<docmeta name="uniqueID" value="reqwantsJSON30891">
<docmeta name="displayName" value="req.wantsJSON">
