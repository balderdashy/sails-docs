# ロギング

### 概要
Sailsは[`captains-log`](https://github.com/balderdashy/captains-log)と呼ばれるシンプルなビルドインのロガーが備わっています。この使い方はあえてNodeの[`console.log`](http://nodejs.org/api/stdio.html)にとても良く似せて作っていますが、「複数のログレベルが色分けされ、前置詞で分けられて表示される」という便利な機能が追加されています。

### 設定
Sailsのロガーの設定は通常Sailsプロジェクトが新しく作成された時に[`config/log.js`](http://beta.sailsjs.org/#/documentation/anatomy/myApp/config/log.js.html)に生成される[`sails.config.log`](http://beta.sailsjs.org/#/documentation/reference/sails.config/sails.config.log.html)で定義されています。

各ログレベルが設定された時、Sailsは現在設定されているレベル以上のログに関して出力をします。このログレベルは標準化されておりsocket.ioやWaterlineその他の依存ファイルからのログを出力する際にも適用されます。ログレベルの上下関係と相対的優先度に関して以下の表にまとめます。:

| 優先度 | レベル     | 見えるログの種類   |
|----------|-----------|-------------------|
| 0        | silent    | N/A
| 1        | error     | `.error()`            |
| 2        | warn      | `.warn()`, `.error()` |
| 3        | debug     | `.debug()`, `.warn()`, `.error()` |
| 4        | info      | `.info()`, `.debug()`, `.warn()`, `.error()` |
| 5        | verbose   | `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |
| 6        | silly     | `.silly()`, `.verbose()`, `.info()`, `.debug()`, `.warn()`, `.error()` |


#### 備考
+ デフォルトのログレベルは"info"です。アプリケーションのログレベルが"info"の時にはSailsはサーバやアプリケーションのステータスに関して限定的な情報を記録します。
+ ログレベルが"silly"にセットされた時、Sailsはどのルートがルーティングされたかや詳細なフレームワークのライフサイクルに関する情報や診断結果、実装の詳細などの内部的な情報を記録します。
+ ログレベルが"verbose"に設定されている時、Sailsはルートやモデル、hookなどのさらに詳細な情報に加えてGruntの出力を記録します。


<docmeta name="uniqueID" value="Logging277763">
<docmeta name="displayName" value="Logging">

