# myApp/package.json
### 目的
これは[npm](https://npmjs.org/doc/json.html)の標準設定ファイルです。このファイルはあなたのアプリケーションを実行するのに依存している全てのNodeモジュールの名前とバージョンその他の情報を含みます。このファイルを手動で編集することも出来ますが、彼らのルールに則らなかればならないということと、もしかしたら何かを壊してしまうかもしれないということに気をつけてください。

### さらなる情報
> package.jsonを説明している[Nodejitsuによる素晴らしいインタラクティブガイド](http://package.json.nodejitsu.com)をご覧下さい。 


<docmeta name="uniqueID" value="packagejson891874">
<docmeta name="displayName" value="package.json">

```
{
  "name": "myApp",
  "private": true,
  "version": "0.0.0",
  "description": "a Sails application",
  "keywords": [],
  "dependencies": {
    "sails": "~0.10.0-rc7",
    "sails-disk": "~0.10.0",
    "rc": "~0.3.3",
    "include-all": "~0.1.3",
    "ejs": "~0.8.4",
    "grunt": "0.4.2",
    "grunt-sync": "~0.0.4",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-sails-linker": "~0.9.5",
    "grunt-contrib-jst": "~0.6.0",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-contrib-uglify": "~0.4.0",
    "grunt-contrib-cssmin": "~0.9.0",
    "grunt-contrib-less": "~0.10.0",
    "grunt-contrib-coffee": "~0.10.1"
  },
  "scripts": {
    "start": "node app.js",
    "debug": "node debug app.js"
  },
  "main": "app.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/dude/myApp.git"
  },
  "author": "dude",
  "license": ""
}
```
