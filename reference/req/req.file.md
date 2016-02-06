# req.file()

特定の`field`のマルチパートアップロード入力([`Upstream`](https://github.com/balderdashy/skipper/blob/master/lib/Upstream.js))からの[読み込み可能なNodeストリーム](http://nodejs.org/api/stream.html#stream_class_stream_readable) を返します。


### 使い方
```js
req.file(field);
```

### 詳細

`req.file()`はオリジナルのConnectのbodyパーサーとは違う考え方でアプリケーションロジックに動的な変更を加えることなくストリーミングアップロードのハイパフォーマンスさを利用できる[Skipper](https://github.com/balderdashy/skipper)から来ています。

これは非常な簡易化ですが、ちょっと注意しなければならいこともあります。: **文字列のパラメータはリクエストボディー中のファイルより前になかればいけません** 一般的にこれらのテキストパラメータはファイルアップロードに関する追加情報を提供するメタデータの文字列を含んでいます。

Sailsに対するマルチパートのリクエストは _いかなる_ **ファイルパラメータより前に** 全ての　**テキストパラメータ** を送る必要があります。例えば、Sails通信するWebフロントエンドの作成している場合、いかなるファイルアップロードを行うフォームに関してもテキストのパラメータを _最初に_ 含める必要があります。ここにおける「テキストパラメータ」とは、ファイルのアップロードに際して一緒に何かの情報を送るメタデータパラメータを指します。


### どのように動作するのか

Skipperは _全ての_ ファイルアップロードをストリームとして扱います。これによってユーザは大きなファイルアップロードをディスクのフットプリントに影響をあたえることがなくなるので、tmpファイル関連の醜いDOSアタックから守ることが出来ます。

マルチパートのリクエストがサーバに来た場合、一時ファイルに書き込むことなくSkipperはリクエストをアプリケーションコードが実行されるに十分な長さに渡りバッファーし、適切なBLOBレシーバをプラグインする機会を与えます。特定のフィールドに適切なデータフォームがプラグインされなかった場合、アップストリームは"high water mark"を呼び出し、バッファはクリアーされ、そのフィールドに対するその後の入力は無視されます。

### 例

コントローラアクションかポリシーで:

```javascript
var SomeReceiver = require('../services/SomeReceiver');

req.file('avatar').upload( SomeReceiver(), function (err, files) {
    if (err) return res.serverError(err);
    return res.json({
      message: files.length + ' file(s) uploaded successfully!',
      files: files
    });
  });
});
```


### 備考
> + クライアントのリクエストの **テキストパラメータは先に送られなければならず** 、その後ファイルパラメータを送るべきということを覚えておいて下さい。
> + `req.file()`は同一のフィールドに対する複数のファイル送信をサポートしていますが、それはそれほど大事なことではありませんので、その結果Upstreamとして実際に返されるものはバイナリーストリーム（ファイル）の候補となるストリーム（バッファされたイベントエミッタ）です。
> + ストリームのストリームとしてのUpstreamを直接扱いたいときは`.upload()`メソッドを省いて代わりに"finish"か"error"のイベントをバインドして (あるいは`.pipe()`を使って) 下さい。 events (or use `.pipe()`) instead.





<docmeta name="uniqueID" value="reqfile784692">
<docmeta name="displayName" value="req.file()">

