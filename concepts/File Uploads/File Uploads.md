# File Uploads

> TODO: Normalize/expand this section

### Example

#### Generate an `api` 
First we need to generate a new `api` for serving/storing files.  Do this using the sails command line tool.

```sh

dude@littleDude:~/node/myApp$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FileController.js!
debug: Generated a new model `File` at api/models/File.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.

dude@littleDude:~/node/myApp$ 

```

#### Write Controller Actions

Lets make an `index` action to initiate the file upload and an `upload` action to receive the file.

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

#### Where do they go?
When using the default `receiver`, file uploads go to the `myApp/.tmp/uploads/` directory.  You can do whatever you want with it in the `upload` action.


> For a much more detailed look at Skipper along with a list of alternative `receivers`, see the [skipper docs](https://github.com/balderdashy/skipper) ! 



<docmeta name="uniqueID" value="fileuploads72947">
<docmeta name="displayName" value="File Uploads">
