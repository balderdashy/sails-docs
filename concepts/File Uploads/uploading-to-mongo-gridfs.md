# Mongo GridFSにアップロードする

GridFSファイルシステムのおかげでMongoDBへのアップロードが可能です。Sailsでは[MongoDB's GridFS](https://github.com/willhuang85/skipper-gridfs)のSkipperアダプタを使うことで、とても僅かな設定の追加でこれを実現できます。

以下のようにインストールします:

```sh
$ npm install skipper-gridfs --save
```

そしてコントローラ内で利用します:

```javascript
  uploadFile: function (req, res) {
    req.file('avatar').upload({
      adapter: require('skipper-gridfs'),
      uri: 'mongodb://[username:password@]host1[:port1][/[database[.bucket]]'
    }, function (err, filesUploaded) {
      if (err) return res.negotiate(err);
      return res.ok();
    });
  }
```

<docmeta name="displayName" value="Uploading to GridFS">
