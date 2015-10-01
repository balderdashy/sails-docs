# サービス

## 概要

サービスはアプリケーションの中の多くの場所で使いたいような機能を含むライブラリのようなものです。例えば、デフォルトのメール送信のボイラーテンプレートをラップするようなEmailServiceをアプリケーションの中の多くの場所で使いたい場合です。Sailsでサービスを使う主な利点はこれらは *グローバル化* されていることです。つまりアクセスするのに`require()`を使う必要がありません。


## どのようにサービスを作成できますか。

単にプロジェクトの**api/services**ファイルにオブジェクトやファンクションの書かれたjavascriptファイルを保存するだけです。ファイル名はグローバルにアクセス可能なサービス名として使われます。例えば、Eメールサービスは次のようになります。:

```javascript
// EmailService.js - in api/services
module.exports = {

    sendInviteEmail: function(options) {
    
        var opts = {"type":"messages","call":"send","message":
            {
                "subject": "YourIn!",
                "from_email": "info@balderdash.co",
                "from_name": "AmazingStartupApp",
                "to":[
                    {"email": options.email, "name": options.name}
                ],
                "text": "Dear "+options.name+",\nYou're in the Beta! Click <insert link> to verify your account"
            }
        };
    
        myEmailSendingLibrary.send(opts);
        
    }
};
```

これでアプリケーションのどこからでも`EmailService`で使うことが出来ます。:

```javascript
// コントローラのどこかで
  EmailService.sendInviteEmail({email: 'test@test.com', name: 'test'});
```

<docmeta name="uniqueID" value="Services157331">
<docmeta name="displayName" value="Services">

