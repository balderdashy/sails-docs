# File Uploads

Uploading files in Sails is similar to how you would upload files for a vanilla Node.js or Express application.  It is, however, probably different than what you're used to if you're coming from a different server-side platform like PHP, .NET, Python, Ruby, or Java.  But fear not: the core team has gone to great lengths to make file uploads easier to accomplish, while still keeping them scalable and secure.

Sails comes with a powerful "body parser" called [Skipper](https://github.com/balderdashy/skipper) which makes it easy to implement streaming file uploads-- not only to the server's filesystem (i.e. hard disk), but also to Amazon S3, MongoDB's gridfs, or any of its other supported file adapters.



<!--

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
req.file('avatar').upload({
  dirname: './assets/images'
},function (err, uploadedFiles) {
  if (err) return res.negotiate(err);

  return res.json({
    message: uploadedFiles.length + ' file(s) uploaded successfully!'
  });
});
```

-->

## Read more

+ [Skipper docs](https://github.com/balderdashy/skipper)
+ [Uploading to Amazon S3](./uploading-to-amazon-s3.html)
+ [Uploading to Mongo GridFS](./uploading-to-mongo-gridfs.html)



<docmeta name="displayName" value="File Uploads">
