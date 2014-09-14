# ファイルアップロード

> TODO: このセクションを一般化・拡充する

### 例

#### `api`を作る
最初にデータを保存するための新しい`api`を作る必要があります。これをコマンドラインツールを使って行います。

```sh

dude@littleDude:~/node/myApp$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FileController.js!
debug: Generated a new model `File` at api/models/File.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.

dude@littleDude:~/node/myApp$ 

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


> その他の`receivers`を含め、Skipperに関するさらなる詳細は[skipperドキュメンテーション](https://github.com/balderdashy/skipper) を御覧ください! 



<docmeta name="uniqueID" value="fileuploads72947">
<docmeta name="displayName" value="File Uploads">
