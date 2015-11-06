# myApp/api/services
### 目的
このフォルダはサービスを格納するところです。「サービス」はコントローラと似ていますが、通常はユーザがリクエストを送り、サーバがレスポンスを返すという流れの間で発生する必要が必ずしも無いものに関して使われます。`.req()`と`.res()`に依存しない全てのロジックは特段の理由がない限りはサービスに変換することが出来、コントローラを綺麗に、メンテナンス性高く保つことが出来ます。

例えば以下のサービスを作る事ができます。

- メールを送信する
- セレブの向けの自動ツイート
- サードパーティのAPIからデータを取得し、準備ができた時に（websockets）を通じてクライアントにプッシュする。

サービスはこのディレクトリにある1つまたは複数の.jsファイルとして欠くことが出来ます。


### Example Email.js

```
module.exports = {
	send: function(to,from,body){
		// fancy code that sends an email
	}
}

```

You would call this service with ` Email.send('rick','bill','lol') `


> Mind your case.  Email.send !== email.send


<docmeta name="uniqueID" value="servicesmd572453">
<docmeta name="displayName" value="services">

