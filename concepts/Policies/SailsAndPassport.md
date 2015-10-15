# Sails + Passportで認証、認可する

PassportはSailsとの組み合わせでも見事に動作します。一般的な話として、SailsはConnect/ExpressをコアにしていますのであらゆるConnect/Expressオリエンテッドなものはうまく動作します。実際にSaisはsocket.ioと一緒に動作するほとんどのExpressミドルウエアに関してプログラム解釈に関連する問題は起きていません。

#### passport.jsを利用するコミュニティサポートのSails拡張
+ [sails-auth](https://www.npmjs.com/package/sails-auth): Basic Authを内蔵したPassportベースの認証拡張
+ [sails-permissions](https://www.npmjs.com/package/sails-permissions): sails.js向けのパーミッションと権限認可システム: passport.jsを用いた認証と、ロールベースのパーミッション管理、オブジェクトの所有権管理、行ごとのセキュリティをサポートします。
+ [sails-generate-auth](https://www.npmjs.com/package/sails-generate-auth): Sailsアプリケーションに認証レイヤーを生成します
+ [sails.jsへのpassport.jsを実装方法のチュートリアル](http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/).
+ [Waterlock](http://waterlock.ninja/): Sails向けに作られた包括的な認証およびJSON Webトークン管理ツール



<docmeta name="uniqueID" value="Policies766425">
<docmeta name="displayName" value="Sails + Passport">
