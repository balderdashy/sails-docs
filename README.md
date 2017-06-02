![Squiddy reads the docs](http://sailsjs.com/images/squidford_swimming.png)

# Sails.js ドキュメント

Sails.js (ver 1.0) の公式ドキュメントの日本語訳を[sails-docs-jaリポジトリ](github.com/yoshioka-s/sails-docs-js)で製作中です。当ページはこのリポジトリの1.0ブランチから生成されます。


## Sailsドキュメントへのコントリビュート

Sailsドキュメントの日本語化へのご協力をお願いします。ドキュメントの修正・追加を行ったら**1.0**ブランチへプルリクエストを送ってください。確認の上、マージします。
編集手順は[こちら](contributing/contributing-to-the-documentation)を参照してください。

また、ドキュメントの管理方法についても提案を受け付けています。[sailsjs-jp](https://sailsjs-jp-slack-invite-me.herokuapp.com/)のslackチームでご提案をお待ちしています。


#### コンパイルの仕組み
当ドキュメントは、日本語化を完了後、slackチームに依頼して公式に公開することを計画しています。
Sailsチームは`doc-templater`を使って.mdファイルをhtmlに変換しています。使い方の詳細は[doc-templater リポジトリ](https://github.com/uncletammy/doc-templater)を参照してください。

各.mdファイルがそれぞれ一つのページになります。ページタイトルを指定するために、各.mdファイルは`<docmeta name="displayName">`タグを持っている必要があります。このタグのvalueプロパティでページタイトルを指定してください。このタグが検索エンジンにおけるページの見え方を決めます。また、ナビゲーションメニューの表示にも使われます。例えば以下のように指定します。

```markdown
<docmeta name="displayName" value="Building Custom Homemade Puddings">
```


#### その他の貢献

Sailsへの貢献一般については[コントリビューションガイド](contributing)を参照してください。


## ライセンス

[MIT](./LICENSE.md)

[Sails](http://sailsjs.com)は[MITライセンス](http://sailsjs.com/license)のオープンソースフレームワークです。

_(このリポジトリのドキュメントも同じく)_
