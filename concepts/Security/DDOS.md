# DDOS

[DDOS攻撃](https://www.owasp.org/index.php/Application_Denial_of_Service)への対応はネットワークの上から下まで様々なレイヤーでの対策を含んだ[複雑な問題](http://en.wikipedia.org/wiki/Denial-of-service_attack#Handling) です。
この種の攻撃はここ数年Anonymousのようなグループの勢いが増したことで[悪名高t](http://www.darkreading.com/vulnerabilities-and-threats/10-strategies-to-fight-anonymous-ddos-attacks/d/d-id/1102699)ものになっています。

APIレイヤーでできる防護策はあまり多くありません。しかしながらSailsではDDOS攻撃を和らげる幾つかの設定を用意しています。:

+ Sailsのセッションは別々のセッションストレージ([Redis](http://redis.io/)のような)が利用可能なように[設定](http://sailsjs.org/documentation/reference/sails.config/sails.config.session.html)することができ、これによって一つのAPIサーバのメモリー状態に依存することなく実行することができます。これはトラフィックに応じた複数のサーバのコピーをデプロイすることが出来るということです。これは[ロードバランサ](http://en.wikipedia.org/wiki/Load_balancing_(computing))を使ってリクエストを空いているサーバに振り分け、単一障害点を排除する事ができるということです。
+ Socket.ioコネクションは別々の[ソケットストア](https://github.com/balderdashy/sails-docs/blob/master/PAGE_NEEDED.md) (例えばRedis)を使ってpub/subステートやメッセージキューを管理できるように[設定](http://sailsjs.org/documentation/reference/sails.config/sails.config.sockets.html)することができます。これはロードバランサーでの固定的なセッションを避けることができ攻撃者と思われる人が何度も何度もサーバを同じサーバにアクセスするのを防ぐことができます。


### 追加資料

+ [Backpressure and Unbounded Concurrency in Node.js](http://engineering.voxer.com/2013/09/16/backpressure-in-nodejs/) ([Voxer](http://voxer.com/))
+ [Building a Node.js Server That Won't Melt](https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/) ([Mozilla](https://hacks.mozilla.org/))
+ [Security in Node.js](https://www.harrytorry.co.uk/node-js/security-flaws-in-node-js/) - "Denial of Service"のセクションをご覧ください。 ([Harry Torry](https://www.harrytorry.co.uk))
+ [Slowloris DDoSAttacks](http://www.ddosattacks.biz/attacks/slowloris-ddos-attack-aka-slow-and-low/)


<docmeta name="uniqueID" value="DDOS139869">
<docmeta name="displayName" value="DDOS">
