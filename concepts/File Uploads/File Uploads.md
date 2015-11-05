# ファイルアップロード

SailsでのファイルアップロードはプレーンなNode.jsやExpressアプリケーションと似ています。しかし、PHP、.NET、Python、Ruby、Javaのような異なるプラットフォームを使ってきた人からすると、それらとはちょっと違うかもしれません。しかし、恐れることはありません:コアチームは安全性とスケーラビリティを維持したうえで簡単にファイルアップロードを出来るようにしました。

Sailsには[Skipper](https://github.com/balderdashy/skipper)と呼ばれるパワフルな「ボディーパーサ」があり、サーバのファイルシステム（すなわちハードディスク）に限らずAmazon S3やMongoDBのgridfsなど対応する全てのファイルアダプタに対して簡単にストリーミングアップロードを行うことが出来ます。



### ファイルをアップロードする

ファイルは _ファイルパラメータ_ としてHTTPWebサーバにアップロードされます。これは"name"、"email"、"password"にようなテキストパラメータをURLに対してPOSTすると同じように"avatar"、"newSong"のようなファイルパラメータを送れるということです。

以下の例を見てみましょう:

```javascript
req.file('avatar').upload(function (err, uploadedFiles) {
  // ...
});
```

ファイルはどれかのコントローラの中の`action`の中でアップロードされなければなりません。以下はどのようにユーザにアバターをアップロードさせて、それを彼らのアカウントに紐付けるかの関してのもう少し掘り下げた例です。アクセスコントロールに関してはすでにポリシーで実行され、ログイン済みのユーザのidは`req.session.me`に保管されていると想定します。

```javascript
// api/controllers/UserController.js
//
// ...


/**
 * ログイン済みのユーザに関してのアバターをアップロードする
 *
 * (POST /user/avatar)
 */
uploadAvatar: function (req, res) {

  req.file('avatar').upload({
    // 合計10MBを超えるサイズのファイルはアップロードを許可しない
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.negotiate(err);
    }

    // 何のファイルもアップロードされなければエラーを返す。
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }


    // ユーザがアバターにアクセス可能なURLと"fd"を保管する
    User.update(req.session.me, {

      // アバターがダウンロード可能なユニークなURLを生成する
      avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

      // ひとつ目のファイルを取得し、その`fd` (ファイルディスクリプタ)を使う
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  });
},


/**
 * 指定されたidのユーザーのアバターをダウンロードする
 *
 * (GET /user/avatar/:id)
 */
avatar: function (req, res){

  req.validate({
    id: 'string'
  });

  User.findOne(req.param('id')).exec(function (err, user){
    if (err) return res.negotiate(err);
    if (!user) return res.notFound();

    // アバターイメージをアップロードしていないユーザ。
    // (このエンドポイントをヒットするべきではなく、デフォルトの画像を使うべき)
    if (!user.avatarFd) {
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // ファイルをストリーム送信する
    fileAdapter.read(user.avatarFd)
    .on('error', function (err){
      return res.serverError(err);
    })
    .pipe(res);
  });
}

//
// ...
```




#### これらのファイルはどこへいきますか？
デフォルトの`receiver`を使っているときはアップロードされたファイルは`myApp/.tmp/uploads/`ディレクトリに行きます。これは`dirname`オプションを使って上書きできます。`.upload()`とコールする時とskipper-diskアダプタをコールするときの両方でこのオプションを提供しなければならない（このようにして同じ場所にアップロード、ダウンロードする）ということを覚えておいてください。


#### カスタムのフォルダにアップロードする.tmp/uploads.
上記の例では.tmp/uploadsにファイルをアップロードしました。カスタムフォルダー‘assets/images’に設定するにはどうすればいいでしょうか。以下のようにアップロードファンクションにオプションを追加することで出来ます。

```javascript
req.file('avatar').upload({
  dirname: require('path').resolve(sails.config.appPath, '/assets/images')
},function (err, uploadedFiles) {
  if (err) return res.negotiate(err);

  return res.json({
    message: uploadedFiles.length + ' file(s) uploaded successfully!'
  });
});
```

### 例

#### `api`を作る
最初にデータを保存するための新しい`api`を作る必要があります。これをコマンドラインツールを使って行います。

```sh
$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FileController.js!
debug: Generated a new model `File` at api/models/File.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.
```

#### コントローラアクションを書く

それではファイルアップロードを初期化するための`index`アクションとファイルを受け取るための`upload`アクションを書きましょう。

```javascript

// myApp/api/controllers/FileController.js

module.exports = {

  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: function  (req, res) {
    req.file('avatar').upload(function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }

};
```

#### これらはどこに行きますか？
デフォルトの`receiver`を使うとアップロードされたファイルは`myApp/.tmp/uploads/`に保存されます。`upload`で好きな保存場所に変更することが出来ます。

#### カスタムのフォルダにアップロードする.tmp/uploads.
上記の例では.tmp/uploadsにファイルをアップロードしました。カスタムフォルダー‘assets/images’に設定するにはどうすればいいでしょうか。以下のようにアップロードファンクションにオプションを追加することで出来ます。

```javascript
req.file('avatar').upload({
  dirname: './assets/images'
},function (err, uploadedFiles) {
  if (err) return res.negotiate(err);

  return res.json({
    message: uploadedFiles.length + ' file(s) uploaded successfully!'
  });
});
```

## Read more

+ [Skipper docs](https://github.com/balderdashy/skipper)
+ [Uploading to Amazon S3](http://sailsjs.org/documentation/concepts/file-uploads/uploading-to-s-3)
+ [Uploading to Mongo GridFS](http://sailsjs.org/documentation/concepts/file-uploads/uploading-to-grid-fs)



<docmeta name="displayName" value="File Uploads">
