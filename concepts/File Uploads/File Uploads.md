# File Uploads

> TODO: Normalize/expand this section

### 예제

#### `api` 만들기

파일을 저장하고 제공하기 위해 해야할 첫번째 일은 새로운 `api`를 만드는 일이다. sails 커맨드 라인 툴을 이용해서 이것을 해보자.

```sh

dude@littleDude:~/node/myApp$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FileController.js!
debug: Generated a new model `File` at api/models/File.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.

dude@littleDude:~/node/myApp$ 

```

#### 컨트롤러 액션 작성


파일 업로드 초기화를 위한 `index` 액션과 파일은 받기 위한 `upload` 액션을 만들어보자.

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

#### 업로드 된 파일은 어디에 저장이 되는가?
기본 `receiver`를 사용하면, 파일은 `myApp/.tmp/uploads/` 디렉토리로 업로드 된다. `upload` 액션에서 원하는것을 처리하면된다.


> `receivers`를 대체할 수 있는 리스트와 Skipper에 대한 자세한 내용은, [skipper docs](https://github.com/balderdashy/skipper)를 참고하자!



<docmeta name="uniqueID" value="fileuploads72947">
<docmeta name="displayName" value="File Uploads">
