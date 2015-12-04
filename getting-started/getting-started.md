# Sailsをはじめる

## インストール
コマンドラインツールを使って最新の安定版のリリースをインストインストールするには:

	sudo npm -g install sails

Windows(かMac OSとHomebrew)ではsudoする必要はありません:

	npm -g install sails

## 新しいSailsプロジェクトを作成する
新しいアプリケーションを作成する:

	sails new testProject

そして、サーバを立ち上げます。:

	cd testProject
	sails lift

この時点で(http://localhost:1337/)アクセスするとデフォルトのホームページを見ることが出来ます。

それではSailsを使ってクールなものを作る作業を始めましょう。

<docmeta name="displayName" value="Getting Started">
