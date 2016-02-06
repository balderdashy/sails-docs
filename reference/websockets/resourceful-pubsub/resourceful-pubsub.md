# リソースフルなPubSub

### 概要

P2PのチャットやSNSアプリケーションのようなリアルタイムのクライアント・サーバ通信に大きく依存したアプリケーションではソケットイベントの送受信はすぐに膨大なものになります。SailsはリソースフルなPubSub([Publish / Subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern))を提供することでこの複雑さをスムーズにすることに貢献します。アプリケーションの全てのモデル（あるいは*リソース*）は自動的にインスタンスの作成やアップデート、削除に関してソケットで通知をするクラスメソッドを持っています。[Blueprint API](http://sailsjs.org/documentation/reference/blueprint-api)を利用している場合、ソケットのメッセージはモデルイベントが発生した時に自動的にブロードキャストされます。そうでない時にもこのセクションで書かれた方法を使って、クライアントに手動でモデルイベントの通信ができます。

### クライアントでイベントをリッスンする

Javascriptライブラリを自由に使ってクライアント側でソケットイベントをリッスンできますが、Sailsでは独自の[Socketクライアント](http://sailsjs.org/documentation/reference/websockets/sails.io.js)をサーバと通信するための簡便な方法として用意しています。SailsのソケットクライアントはリソースフルなPubSubを以下のように簡単にリッスンすることができます。:

```
io.socket.on("<model identity>", listenerFunction)
```

> モデルファイルで手動で定義しない限り、_model identity_は通常モデル名の小文字版です。


### 使用例

アプリケーションの中に"name"と名づけられた一つのアトリビュートを持つ`User`というモデルが有るとしましょう。まずはじめに"user"イベントにイベントリスナーを追加します。:

```
io.socket.on("user", function(event){console.log(event);})
```

これで`User`に関する全ての通知がコンソールに記録されます。しかしながら実在する`User`モデルインスタンスを*サブスクライブする*までそのようなメッセージを受け取ることはありません。もしデフォルトのblueprintを使っている場合、クライアントから`/user`へのWebsocketリクエストを行うことでサブスクライブができます。:

```
io.socket.get("/user", function(resData, jwres) {console.log(resData);})
```

これでSailsサーバに現在のユーザのリストをリクエストし、クライアントはそれぞれのユーザに関してのイベントをサブスクライブします。。加えて、[`autoWatch`設定](http://sailsjs.org/documentation/reference/sails.config/sails.config.blueprints.html?q=properties) がonであれば（デフォルトではonです。）、新規の`User`が作成された時にも通知を受け、新しいユーザもまたサブスクリプトされます。この例のコールバックは単にユーザのリストをコンソールにログします。このメソッドに関してのより詳細の情報は [socket.get](http://sailsjs.org/documentation/reference/websockets/sails.io.js/socket.get.html)のリファレンスをご覧ください。

ここで大切なことはサブスクリプションが行われるためには`/user`へのリクエストは通常の*HTTPリクエストではなく*、Websocketのリクエストである必要があるということです。つまり、AJAXリクエストを行うこと(例えば`jQuery.get("/user")`) では`User`に対してのリソースフルなPubsubをサブスクライブすることはできないということです。しかし、一旦サブスクリプションが行われると、ソケットのコールでもAjaxリクエストでも、cURLのリクエストでも、*全ての*モデル変更が通知されます。上の例に続けでブラウザを開き、以下のURLへのリクエストを行うと:

    /user/create?name=joe

以下の様な通知が最初のウインドウのコンソールで表示されます。:

```
{
	data: {
		createdAt: "2014-08-01T05:50:19.855Z"
		id: 1
		name: "joe"
		updatedAt: "2014-08-01T05:50:19.855Z"
	},
	id: 1,
	verb: "created"
}
```

`verb`はどのようなアクションが起こったかを示します。`id`はアクションが発生したインスタンスを、`data`はそれが発生した`User`に関しての更なる情報を示します。それぞれのイベントタイプはそれぞれちょっと違う情報を含みます。さらなる情報に関してはそれぞれのリソースフルPubSubメソッドのドキュメントをご覧ください。

<docmeta name="uniqueID" value="resourcefulpubsub293545">
<docmeta name="displayName" value="Resourceful PubSub">
