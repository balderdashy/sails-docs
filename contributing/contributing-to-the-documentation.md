# 日本語ドキュメントへのコントリビュート
Sailsの日本語ドキュメントは、[日本語版sails-docsリポジトリ](https://github.com/yoshioka-s/sails-docs-ja)のmarkdownをコンパイルして生成されています。**1.0**ブランチに修正・追加のプルリクエストを送ってください。確認の上マージし、[日本語ドキュメントページ](http://sailsjs-jp.org/)に反映します。

ドキュメントの管理・運用やコミュニティのあり方に関する提案は歓迎です。[sailsjs-jp](https://sailsjs-jp-slack-invite-me.herokuapp.com/)のslackチームで提案をお待ちします。

#### 編集ルール
1. [英語版の最新ドキュメント](https://github.com/balderdashy/sails-docs)の該当バージョンを確認する(v1.0なら1.0ブランチ)
1. 英語版に不備があれば、上記リポジトリにプルリクエストを送る
1. 最新の英語ドキュメントを日本語訳する
1. コミットメッセージに、その時点の最新の英語ドキュメントのコミットハッシュを記載する
1. [日本語版sails-docsリポジトリ](https://github.com/yoshioka-s/sails-docs-ja)の該当ブランチにプルリクエストを送る

#### コンパイルの仕組み
Sailsチームは`doc-templater`を使って.mdファイルをhtmlに変換しています。使い方の詳細は[doc-templater リポジトリ](https://github.com/uncletammy/doc-templater)を参照してください。

各.mdファイルがそれぞれ一つのページになります。ページタイトルを指定するために、各.mdファイルは`<docmeta name="displayName">`タグを持っている必要があります。このタグのvalueプロパティでページタイトルを指定してください。このタグが検索エンジンにおけるページの見え方を決めます。また、ナビゲーションメニューの表示にも使われます。例えば以下のように指定します。

```markdown
<docmeta name="displayName" value="Building Custom Homemade Puddings">
```

<docmeta name="displayName" value="Contributing to the Docs">
