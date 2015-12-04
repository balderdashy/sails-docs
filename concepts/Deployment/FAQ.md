# FAQ


##### 環境変数を利用することは出来ますか?

はい。`port`と`environment`環境の選択を環境変数を用いて設定することも出来ます。
`NODE_ENV=production sails lift`
`PORT=443 sails lift`

##### プロダクション環境のデータベースの認証情報などはどこに置けばいいですか。?

その他のdeployment/machine-specificな設定（様々な認証情報を含む）に関しては`config/local.js`を使うべきです。
このファイルはデフォルトで`.gitignore`に登録されているのでうっかり認証情報の入ったファイルをレポジトリにアップロードしてしまう心配がありません。

**config/local.js**
```javascript
// ローカル設定
// 
// デフォルトで.gitignoreに入っています。
// ここはあなたのローカルのシステムやプロダクション環境に合わせた設定のオーバーライドを書くところです。
// あるいは、本番環境へのデプロイには
//
// 例えばローカルマシンの80番ポートを利用するためには`port`設定をオーバーライドします。
module.exports = {
    port: 80,
    environment: 'production',
    adapters: {
        mysql: {
            user: 'root',
            password: '12345'
        }
    }
}
```

##### Sailをプロダクション環境のサーバにどうやってアップロードすればいいですか。
すでにNode.jsのサーバが走っていますか。サーバのIPアドレスが分かるのであればそこにSSHアクセスし、最初に`sudo npm install -g forever`を実行してSailsとforeverをセットアップしてください。

その後、新規フォルダーを作成しそこにプロジェクトを`git clone`（もしgitレポジトリがないなら`scp`を）してください。さらにそのフォルダにcdし、`forever start app.js`でサーバを起動します。


### パフォーマンスのベンチマーク

SailsのパフォーマンスはNode.js/Express相当です。つまり別の言葉で言えば「速い！」SailsとWaterlineにおいて幾らかのチューニングをしていますが、我々の第一の目標は「元々ものすごく速いものを台無しにしない」というものです。いずれにせよ@ry, @visionmedia, @isaacs, #v8, @joyentを始めとしたNode.jsのコアチームに感謝します。

+ http://serdardogruyol.com/?p=111

問題[#3099](https://github.com/balderdashy/sails/issues/3099) と [#2779](https://github.com/balderdashy/sails/issues/2779)はメモリリークに関するものです。これはデフォルトで利用され、セッションをメモリ内に保管する`express-session`に存在する問題です。
これを無効化するには`.sailsrc`でセッションを無効化してください。:
```
"hooks": {
  "session": false
}
```

セッションを保管する別の方法(redis/mongo/cookies)もあります。

<docmeta name="uniqueID" value="FAQ475097">
<docmeta name="displayName" value="FAQ">

