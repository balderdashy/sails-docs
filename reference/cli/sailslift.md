# sails lift

カレントディレクトリ（もし`node_modules/sails`があればグローバルにインストールされたSailsの代わりに利用します。）でSailsアプリケーションを実行します。

##### オプション:

  * `--dev` - 開発環境（デフォルト）で実行します。 開発環境ではSailsでは`/assets`フォルダを監視するのに *grunt-watch* を使います。もし何かを変更（たとえばcss-filesのどれかなど）して、ブラウザをリロードした場合、Sailsは自動的に変更を表示します。同様に、ビューはキャッシュされませんのでSailsを再起動することなくアセットのようなビューファイルを変更することが出来ます。
  * `--prod` - 本番環境で実行します。
  * `--port <portNum>` - デフォルトの(1337)ポートに変えて`portNum`で指定されたポート上で実行します。
  * `--verbose` - 多めにログをとります。
  * `--silly` - 異常なほど多めにログをとります。
  

### 例

```sh
$ sails lift

info: Starting app...

info: 
info: 
info:    Sails              <|
info:    v0.10.3             |\
info:                       /|.\
info:                      / || \
info:                    ,'  |'  \
info:                 .-'.-==|/_--'
info:                 `--'-------' 
info:    __---___--___---___--___---___--___
info:  ____---___--___---___--___---___--___-__
info: 
info: Server lifted in `/Users/mikermcneil/code/sandbox/second`
info: To see your app, visit http://localhost:1337
info: To shut down Sails, press <CTRL> + C at any time.

debug: --------------------------------------------------------
debug: :: Sat Apr 05 2014 17:03:39 GMT-0500 (CDT)

debug: Environment : development
debug: Port        : 1337
debug: --------------------------------------------------------
```







<docmeta name="uniqueID" value="sailslift482554">
<docmeta name="displayName" value="sails lift">

