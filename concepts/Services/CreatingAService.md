# サービスを作成しますか?

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

<docmeta name="displayName" value="Creating a Service">
