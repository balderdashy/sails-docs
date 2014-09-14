# .sailsrcファイルを使う

バージョン0.10からは、アプリケーションを設定するその他の方法がそれぞれのアプリケーションのみを設定できるということに加えて`.sailsrc`では一つのファイルに複数のアプリケーションの設定を書くことが出来るようになりました。これによりあなたのコンピュータの中で動作しているすべてのSailsアプリケーションの設定を1つのファイルで行うことが出来るようになり、`rc`ファイルはSailsのCLIを設定する上で最も便利な方法になりました。(素晴らしい[`rc` module](https://github.com/dominictarr/rc)モジュールによりこれを実現させてくれたTarrに感謝します。)

SailsのCLIが実行された時は現在の作業ディレクトリまたはホームディレクトリ(例えば　`~/.sailsrc`) からから最も近い`.salsrc`ファイル(JSONか[.ini](http://en.wikipedia.org/wiki/INI_file)かフォーマットを問わず)を探しに行き。それから既存の設定とのマージを行います。

> 実際のところ[rcの慣習](https://github.com/dominictarr/rc#standards)に則ってSailsはその他の場所へも`.sailsrc`を探しに行きます。あなたは`.sailsrc`をそれらのパスのどの場所にも置くことが出来ます。しかしながらあなたのグローバルな.sailsrcファイルを置くのに最も適した場所はホームディレクトリ(すなわち`~/.sailsrc`) ですのでその慣習にしたがって構わない時にはそうしてください。


<docmeta name="uniqueID" value="sailsrc374211">
<docmeta name="displayName" value="Using `.sailsrc` Files">

