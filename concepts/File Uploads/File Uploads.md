# File Uploads

Uploading files in Sails is similar to how you would upload files for a vanilla Node.js or Express application.  It is, however, probably different than what you're used to if you're coming from a different server-side platform like PHP, .NET, Python, Ruby, or Java.  But fear not: the core team has gone to great lengths to make file uploads easier to accomplish, while still keeping them scalable and secure.

Sails comes with a powerful "body parser" called [Skipper](https://github.com/balderdashy/skipper) which makes it easy to implement streaming file uploads-- not only to the server's filesystem (i.e. hard disk), but also to Amazon S3, MongoDB's gridfs, or any of its other supported file adapters.



### Uploading a file

Files are uploaded to HTTP web servers as _file parameters_.  In the same way you might send a form POST to a URL with text parameters like "name", "email", and "password", you send files as file parameters, like "avatar" or "newSong".

Take this simple example:

```javascript
req.file('avatar').upload(function (err, uploadedFiles) {
  // ...
});
```

Files should be uploaded inside of an `action` in one of your controllers.  Here's a more in-depth example that demonstrates how you could allow users to upload an avatar image and associate it with their accounts.  It assumes you've already taken care of access control in a policy, and that you're storing the id of the logged-in user in `req.session.me`.

```javascript
// api/controllers/UserController.js
//
// ...


/**
 * Upload avatar for currently logged-in user
 *
 * (POST /user/avatar)
 */
uploadAvatar: function (req, res) {

  req.file('avatar').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000
  },function whenDone(err, uploadedFiles) {
    if (err) {
      return res.negotiate(err);
    }

    // If no files were uploaded, respond with an error.
    if (uploadedFiles.length === 0){
      return res.badRequest('No file was uploaded');
    }


    // Save the "fd" and the url where the avatar for a user can be accessed
    User.update(req.session.me, {

      // Generate a unique URL where the avatar can be downloaded.
      avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

      // Grab the first file and use it's `fd` (file descriptor)
      avatarFd: uploadedFiles[0].fd
    })
    .exec(function (err){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  });
},


/**
 * Download avatar of the user with the specified id
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

    // User has no avatar image uploaded.
    // (should have never have hit this endpoint and used the default image)
    if (!user.avatarFd) {
      return res.notFound();
    }

    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    // Stream the file down
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




#### Where do the files go?
When using the default `receiver`, file uploads go to the `myApp/.tmp/uploads/` directory.  You can override this using the `dirname` option.  Note that you'll need to provide this option both when you call the `.upload()` function AND when you invoke the skipper-disk adapter (so that you are uploading to and downloading from the same place.)


#### Uploading to a custom folder
In the above example we upload the file to .tmp/uploads. So how do we configure it with a custom folder, say ‘assets/images’. We can achieve this by adding options to upload function as shown below.

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

## Read more

+ [Skipper docs](https://github.com/balderdashy/skipper)
+ [Uploading to Amazon S3](http://sailsjs.org/documentation/concepts/File-Uploads/uploading-to-amazon-s3.html)
+ [Uploading to Mongo GridFS](http://sailsjs.org/documentation/concepts/File-Uploads/uploading-to-mongo-gridfs.html)



<docmeta name="displayName" value="File Uploads">
