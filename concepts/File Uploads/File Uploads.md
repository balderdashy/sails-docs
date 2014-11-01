# File Uploads

> TODO: Normalize/expand this section

### Example

#### Generate an `api` 
First we need to generate a new `api` for serving/storing files.  Do this using the sails command line tool.

```sh
$ sails generate api file

debug: Generated a new controller `file` at api/controllers/FileController.js!
debug: Generated a new model `File` at api/models/File.js!

info: REST API generated @ http://localhost:1337/file
info: and will be available the next time you run `sails lift`.
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

#### Uploading to a custom folder
In the above example we could upload the file to .tmp/uploads . So how do we configure it with a custom folder , say ‘assets/images’. We can achieve this by adding options to upload function as shown below.
```javascript

  var uploadPath = './assets/images';
  uploadFile.upload({ dirname: uploadPath },function onUploadComplete (err, files) {             
                                                                              
      if (err) 
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        path:uploadPath
        file:files
      });
  });
```

#### Uploading to S3
Other than saving files on disk you can directly stream them to Amazon S3.

First you have to install [S3 filesystem adapter](https://github.com/balderdashy/skipper-s3) for Skipper (Sails upload helper):
```sh
$ npm install skipper-s3 --save
```

and then use it in controller:

```javascript
  req.file('avatar').upload({
    adapter: require('skipper-s3'),
    key: 'S3 Key'
    secret: 'S3 Secret'
    bucket: 'Bucket Name'
  }, function whenDone(err, uploadedFiles) {
    if (err) return res.negotiate(err);
    else return res.ok({
      files: uploadedFiles,
      textParams: req.params.all()
    });
  });
```

> For a much more detailed look at Skipper along with a list of alternative `receivers`, see the [skipper docs](https://github.com/balderdashy/skipper) ! 



<docmeta name="uniqueID" value="fileuploads72947">
<docmeta name="displayName" value="File Uploads">
