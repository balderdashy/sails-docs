# 檔案上傳（File Uploads）

> TODO: Normalize/expand this section

### 範例

#### 產生一個 `api`
首先，我們需要替 serving/storing 產生一個新的 `api` 檔案。用 sails 命令列工具執行此動作。

```sh

dude@littleDude:~/node/myApp$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FileController.js!
debug: Generated a new model `File` at api/models/File.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.

dude@littleDude:~/node/myApp$ 

```

#### 撰寫控制器動作

讓我們建立一個 `index` 動作來開始檔案上傳及 `upload` 動作來接收檔案。

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

#### 它們去哪了？
使用預設的 `receiver`，上傳的檔案會在 `myApp/.tmp/uploads/` 目錄。你可以在 `upload` 動作內做你想做的任何事情。


> 請查看 [Skipper 文件](https://github.com/balderdashy/skipper)取得更多資訊及其他可用的 `receivers` 清單！



<docmeta name="uniqueID" value="fileuploads72947">
<docmeta name="displayName" value="File Uploads">
