# Upload vers Amazon S3

> Veuillez noter que votre bucket sur Amazon S3 doit être créé dans la région 'US Standard'.
> Si vous ne le faites pas, vous recevrez un 'TypeError('Uncaught, unspecified "error" event.').

Avec Sails, vous pouvez transférer les uploads de fichiers vers Amazon S3 avec très peu de configuration supplémentaire.


D'abord, il faut installer [S3 Skipper adapter](https://github.com/balderdashy/skipper-s3):
```sh
$ npm install skipper-s3 --save
```

Then use it in one of your controllers:

```javascript
  uploadFile: function (req, res) {
    req.file('avatar').upload({
      adapter: require('skipper-s3'),
      key: 'S3 Key',
      secret: 'S3 Secret',
      bucket: 'Nom Du Bucket'
    }, function (err, fichiers) {
      if (err) return res.negotiate(err);
      return res.ok({
        files: fichiers,
        textParams: req.params.all()
      });
    });
  }
```

<docmeta name="displayName" value="Upload vers Amazon S3">
