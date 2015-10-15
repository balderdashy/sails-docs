## コードカバレッジ

コードをテストするのに人気のもう一つの方法は[Code Coverage](http://en.wikipedia.org/wiki/Code_coverage)です。

[mocha](http://visionmedia.github.io/mocha/)と[istanbul](https://github.com/gotwarlost/istanbul)を使うことで、コードをテストし、様々なコードカバレッジレポートを用意し、[Jenkins](http://jenkins-ci.org)のような継続的CIサービスで利用することが出来ます。

コードをテストしてシンプルなHTMLレポートを生成するには以下のコマンドを使います。:
```bash
istanbul cover -x "**/config/**" _mocha -- --timeout 5000
istanbul report html
```

<docmeta name="displayName" value="Code Coverage">
